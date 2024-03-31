<template>
	<view style="background-color: #f3f4f6;">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<br>
		<view>
			<view class="item">
				<view class="top">
					<view class="name">{{ userInfo.name }}</view>
					<view class="phone">{{ userInfo.mobile }}</view>
					<view class="tag">
						<!-- <text v-for="(item, index) in res.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text> -->
					</view>
				</view>
				<view class="bottom">
					{{userAddress.addressInfo}}
					<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
				</view>
			</view>
		</view>

		<view class="page-box">
			<view class="order">
				<view class="top">
					<view class="left">
						<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
						<view class="store">订单编号：{{ order.id }}</view>
						<!--frimId-->
						<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
					</view>
					<view class="right">{{ order.status }}</view>
					<!--status-->
				</view>
				<view class="item">
					<!-- v-for="(item, index) in res.goodsList" :key="index" -->
					<view class="left">
						<image :src="goodsDetial.image" mode="aspectFill"></image>
						<!--image-->
					</view>
					<view class="content">
						<view class="title u-line-2">{{ order.goodsTitle }}</view>
						<!--goodsTitle-->
						<view class="type">{{ order.typeName }}</view>
						<!--typeName-->
						<view class="delivery-time">租赁开始时间 {{ order.startTime }}</view>
						<!--startTime-->
					</view>
					<view class="right">
						<view class="price">
							￥{{ order.rental }}
						</view>
						<view class="number">x{{ order.rental }}</view>
					</view>
				</view>
				<view class="total">
					合计:
					<text class="total-price">
						￥{{ order.deposit + order.rental }}
					</text>
				</view>
			</view>

		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="租赁时间">{{order.startTime}} ~ {{order.endTime}}</u-cell-item>
				<u-cell-item title="租赁方式">{{order.typeName}}</u-cell-item>
				<!-- <u-cell-item icon="heart" title="修改密码"></u-cell-item> -->
			</u-cell-group>
		</view>

		<u-button @click="showPop(true)" style="color: white; background-color: #339966; position: absolute; bottom: 0px; width: 100%;">付款</u-button>

		<u-keyboard default="" ref="uKeyboard" mode="number" :mask="true" :mask-close-able="false" :dot-enabled="false"
		 v-model="show" :safe-area-inset-bottom="true" :tooltip="false" @change="onChange" @backspace="onBackspace">
			<view>
				<view class="u-text-center u-padding-20 money">
					<text>1.00</text>
					<text class="u-font-20 u-padding-left-10">元</text>
					<view class="u-padding-10 close" data-flag="false" @tap="showPop(false)">
						<u-icon name="close" color="#333333" size="28"></u-icon>
					</view>
				</view>
				<view class="u-flex u-row-center">
					<u-message-input mode="box" :maxlength="6" :dot-fill="true" v-model="password" :disabled-keyboard="true" @finish="finish"></u-message-input>
				</view>
				<view class="u-text-center u-padding-top-10 u-padding-bottom-20 tips">支付键盘</view>
			</view>
		</u-keyboard>

	</view>
</template>

<script>
	//import {getAllAddress} from "@/api/rental";
	import {
		getDefaultAddress
	} from "@/api/rental";
	import {
		getUserInfo
	} from "@/api/rental";
	import user from "@/storev/module/user";
	import {
		getGoodsInfo
	} from "@/api/goodsDetail";
	import {
		pay
	} from '@/api/rental'
	import {
		getOrderInfo
	} from '@/api/order.js'
	// import user from '@/storev/module/user.js'

	export default {
		name: "Rental",
		data() {
			return {
				id: '',
				userAddress: [],
				userInfo: [],
				goodsDetial: [],
				type: '',
				startTime: '',
				endTime: '',
				rentTime: '',
				rental: '',
				contranctId: '',
				order: [],
				title: '付款',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				show:false,
				password:''
			}
		},
		methods: {
			onChangeDate(date, dateString) {
				console.log(date, dateString)
				this.startTime = dateString[0]
				this.endTime = dateString[1]
				this.rentTime = (date[1] - date[0]) / 86400000 + 1
				this.rental = this.goodsDetial.rental * this.rentTime
				console.log(this.rental)
				console.log(this.startTime, '---', this.endTime)
				console.log(this.rentTime)
			},
			/*handleChange(value){
			  this.type = value
			  console.log('value',value)
			},*/
			
			onChange(val){
				if(this.password.length<6){
					this.password += val;
				}
				
				if(this.password.length>=6){
					this.pay();
				}
			},
			onBackspace(e){
				if(this.password.length>0){
					this.password = this.password.substring(0,this.password.length-1);
				}
			},
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.navigateTo({
					url: "../../detail/Detail?id="+ this.goodsDetial.id,
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
				// 此处一定要return为true，否则页面不会返回到指定路径
				return true;
			},

			pay() {
				uni.showLoading({
					title:'支付中'
				})
				
				setTimeout(()=>{
					uni.hideLoading();
					this.show = false;
					uni.showToast({
						icon:'success',
						title:'支付成功'
					})
				},2000);
				pay(this.order.id).then(res => {
					console.log("res-pay", res.data)
					if (res.code === 2004) {
						// alert("付款成功")
						uni.showToast({
							title: '支付'
						})
						uni.navigateTo({
							url: '../order/Order'
						})
					}else{
						uni.showToast({
							title: '余额不足'
						})
						uni.navigateTo({
							url: '../recharge/Recharge'
						})
					}
				}).catch(error => {
					console.log(error)
				})
			},
			showPop(flag = true){
				this.password = '';
				this.show = flag;
			},
			finish(){
				console.log(11111)
			},
			
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id);
			
		},

		async mounted() {
			const id = this.id
			getOrderInfo(id).then(res => {
				console.log('order', res)
				this.order = res.data
				this.order.rental = Number(this.order.rental)
				this.order.deposit = Number(this.order.deposit)
				if (this.order.type === "1") {
					this.order.typeName = "以租代售"
				} else if (this.order.type === "2") {
					this.order.typeName = "共享租赁"
				} else if (this.order.type === "3") {
					this.order.typeName = "先祖后售"
				}
				getGoodsInfo(this.order.goodsId).then(res => {
					console.log("res", res.data)
					this.goodsDetial = res.data
					this.goodsDetial.image = 'http://121.40.235.133:8080' + this.goodsDetial.image
					console.log("goodsDetail", this.goodsDetial)

				}).catch(error => {
					console.log(error)
				})

			})

			// user.state.userId
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
			}).catch(error => {
				console.log(error)
			});
			getDefaultAddress(user.state.userId).then(res => {
				console.log("userId", user.state.userId)
				console.log("res", res.data)
				console.log("user", user.state)
				this.userAddress = res.data
				console.log("userAddress", this.userAddress)
			}).catch(error => {
				console.log(error)
			});
		},
		


	}
</script>

<style lang="scss">
	.item {
		padding: 40rpx 20rpx;
		background-color: #FFFFFF;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}


	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-success-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #339966;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-success-dark;
				border-color: $u-type-success-dark;
			}
		}
	}
</style>
