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
						<view class="title u-line-2">{{ goodsDetial.title }}</view>
						<!--goodsTitle-->
						<view class="type">{{ typeName }}</view>
						<!--typeName-->
						<view class="delivery-time">租赁开始时间 {{ startTime }}</view>
						<!--startTime-->
					</view>
					<view class="right">
						<view class="price">
							￥{{ goodsDetial.rental }}
						</view>
						<!-- <view class="number">x{{ goodsDetial.rental }}</view> -->
					</view>
				</view>
				<view class="total">
					合计:
					<text class="total-price">
						￥{{ Number(goodsDetial.deposit) + Number(this.rental)  }}
					</text>
				</view>
			</view>

		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="租赁时间" @click="showChange(0)">{{startTime}}~{{endTime}}</u-cell-item>
				<u-cell-item title="租赁方式" @click="showSelectChange(0)">{{typeName}}</u-cell-item>
				<!-- <u-cell-item icon="heart" title="修改密码"></u-cell-item> -->
			</u-cell-group>
			<u-calendar v-model="show" ref="calendar" @change="change" :mode="mode" :start-text="startText" :end-text="endText"
			 :range-color="rangeColor" :range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
			 max-date="3000-01-01">
			</u-calendar>
			<u-select v-model="showSelect" :list="list" @confirm="changeSelect"></u-select>
			<!-- <u-calendar v-model="show" :mode="mode" @change="change"></u-calendar> -->
		</view>

		<u-button @click="addOrder()" style="color: white; background-color: #339966; position: absolute; bottom: 0px; width: 100%;">提交订单</u-button>

	</view>
</template>

<script>
	//import {getAllAddress} from "@/api/rental";
	import moment from 'moment'
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
		addOrder
	} from "@/api/rental";
	import {
		getOrderInfo
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
				typeName: '',
				startTime: '',
				endTime: '',
				rentTime: '',
				rental: '',
				contranctId: '',
				order: [],
				title: '订单详情',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},


				show: false,
				mode: 'range',
				result: "请选择日期",
				startText: '开始',
				endText: '结束',
				rangeColor: '#339966',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#339966',
				btnType: 'default',

				showSelect: false,
				list: [{
						value: '1',
						label: '以租代售'
					},
					{
						value: '2',
						label: '共享租赁'
					},
					{
						value: '3',
						label: '先租后买'
					}
				],
			}
		},
		methods: {
			addOrder() {
				addOrder(this.userInfo.id, this.goodsDetial.id,
					this.type, this.rentTime, this.startTime,
					this.endTime, this.rental, this.contranctId, 2).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					//this.$router.push({path: '/pay/'+this.goodsDetial.id})
					uni.navigateTo({
						url: '/pages/personal/Pay/Pay?id=' + this.order.id,
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}).catch(error => {
					console.log(error)
				})
			},
			showChange(index) {
				console.log('index', index)
				index = 0
				this.show = !index;
				console.log(index, this.show)
			},
			showSelectChange(index) {
				index = 0
				this.showSelect = !index
			},
			change(e) {
				if (this.mode == 'range') {
					this.result = e.endDate - e.startDate;
					this.startTime = e.startDate
					this.endTime = e.endDate
					this.rentTime = (moment(e.endDate, 'YYYY-MM-DD').valueOf() - moment(e.startDate, 'YYYY-MM-DD').valueOf()) /
						86400000 + 1
					this.rental = this.goodsDetial.rental * this.rentTime
				} else {
					this.result = e.result;
				}
			},
			changeSelect(e) {
				this.type = e[0].value
				this.typeName = e[0].label
				console.log(this.typeName)
			},
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.navigateTo({
					url: "../detail/Detail?id="+ this.goodsDetial.id,
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
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id)
		},

		async mounted() {
			const id = this.id
			getGoodsInfo(id).then(res => {
				console.log("res", res.data)
				this.goodsDetial = res.data
				this.goodsDetial.image = 'http://121.40.235.133:8080' + this.goodsDetial.image
				console.log("goodsDetail", this.goodsDetial)

			}).catch(error => {
				console.log(error)
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
