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

		<!-- <view class="uni-input-wrapper">
			<input class="uni-input" v-model="reletTime" focus placeholder="请输入续租时间" @click="changeAcc" />
		</view> -->


		<view class="uni-input-wrapper">
			<input class="uni-input" v-model="logisticsId" focus placeholder="请输入退租物流单号" />
		</view>

		<u-button @click="terminalOrder" style="color: white; background-color: #339966; position: absolute; bottom: 0px; width: 100%;">退租</u-button>

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
		getOrderInfo,
		terminalOrder
	} from '@/api/order.js'

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
				reletTime: '',
				title: '退租',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				logisticsId: ''
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

			terminalOrder() {
				terminalOrder(this.order.id, this.logisticsId).then(res => {
					console.log("res-order", res.data)
					if (res.code === 2004) {
						uni.showToast({
							title: '退租成功'
						})
						uni.navigateTo({
							url: '../order/Order',
							success: (res) => {
								console.log(res)
							},
							fail: (res) => {
								console.log(res)
							}
						})
					}

				}).catch(error => {
					console.log(error)
				})
			},
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id)
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
		terminalOrder() {
			terminalOrder(this.order.id, this.logisticsId).then(res => {
				console.log("res-order", res.data)
				if (res.code === 2004) {
					alert('退租成功')
					this.$router.push({
						path: '/order'
					})
				}

			}).catch(error => {
				console.log(error)
			})
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

	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
		border-bottom: 1px solid #339966;
	}
</style>
