<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar><br>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#339966" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!--全部订单-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in goods" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="bag" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.firmId }}</view>
										<!--frimId-->
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">{{ res.goodsStatus }}</view>
									<!--status-->
								</view>
								<view class="item">
									<!-- v-for="(item, index) in res.goodsList" :key="index" -->
									<view class="left">
										<image :src="res.image" mode="aspectFill"></image>
										<!--image-->
									</view>
									<view class="content">
										<view class="title u-line-2">{{ res.title }}</view>
										<!--goodsTitle-->
										<view class="type">{{ res.typeName }}</view>
										<!--typeName-->
										<view class="delivery-time">租金： ￥{{ res.rental }}</view>
										<view class="delivery-time">押金：￥ {{ res.deposit }}</view>
										<!--startTime-->
									</view>
									<view class="right">
										<view class="price">
											￥{{ res.rental }}
										</view>
										<view class="number">x{{ res.rental }}</view>
									</view>
								</view>
								<view class="total">
									合计:
									<text class="total-price">
										￥{{ res.deposit + res.rental }}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn" @click="gotoDetail(res)">删除商品</view> -->
									<!-- <view class="exchange btn" @click="gotoUpdate(res)">更改商品</view> -->
									<view class="evaluate btn" @click="deleteUserGoods(res)">删除商品</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>

					</scroll-view>
				</swiper-item>

			</swiper>
		</view>

		<!-- <u-tabbar v-model="navcurrent" :show="navshow" :bg-color="navbgColor" :border-top="borderTop" :list="navlist"
		 :inactive-color="inactiveColor" :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
		<school-tab-bar :currentTab="1" style="position: fixed; bottom: 0px; z-index: 100;"></school-tab-bar>
	</view>
</template>

<script>
	import {
		getAllOrders,
		getShippedOrders,
		getDispatchedOrders,
		getNotReturnOrders,
		getUnpayOrders,
		getCompleteOrders,
		confirm,
		getTerminalOrder,
		getContinueOrder,
		getBuyOrder,
		deleteOrder,
	} from "@/api/order";
	import {
		getUserSchoolGoods,
		deleteUserGoods,
		updateGoods
	} from '../../../../api/user.js'
	import user from '@/storev/module/user.js'
	import schoolTabBar from '../components/schoolTabBar.vue'
	export default {
		components: {schoolTabBar},
		data() {
			return {
				goods: [],
				title: '我的商品',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},

				navcurrent: 0,
				navshow: true,
				navbgColor: '#ffffff',
				borderTop: true,
				navlist: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '校租租',
						count: 0,
						isDot: true,
						customIcon: false,
						pagePath: '/pages/personal/school/SchoolHome/SchoolHome',
					},
					{
						iconPath: "file-text",
						selectedIconPath: "file-text-fill",
						text: '订单管理',
						customIcon: false,
						pagePath: '/pages/personal/school/order/Order',
					},
					{
						iconPath: "bag",
						selectedIconPath: "bag-fill",
						text: '商品管理',
						customIcon: false,
						pagePath: '/pages/personal/school/Goods/Goods',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '添加商品',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath: '/pages/personal/school/Add/Add',
					},
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#339966',

				list: [{
						name: '全部商品',
						value: 0
					},
					
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		mounted() {
			getUserSchoolGoods(user.state.userId).then(res => {
				console.log("res-goods", res.data)
				this.goods = res.data
				for (let orderinfo of this.goods) {
					orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
					orderinfo.rental = Number(orderinfo.rental)
					orderinfo.deposit = Number(orderinfo.deposit)
					if(orderinfo.stuGoods === 1){
						orderinfo.goodsStatus = '未租'
					}else{
						orderinfo.goodsStatus = '已租'
					}
					console.log(orderinfo)
				}
				console.log("goods", this.goods)
			}).catch(error => {
				console.log(error)
			})
		},
		onLoad() {
			// this.getOrderList(0);
			// this.getOrderList(1);
			// this.getOrderList(3);

			getUserSchoolGoods(user.state.userId).then(res => {
				console.log("res-goods", res.data)
				this.goods = res.data
				for (let orderinfo of this.goods) {
					orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
					orderinfo.rental = Number(orderinfo.rental)
					orderinfo.deposit = Number(orderinfo.deposit)
					if(orderinfo.stuGoods === 1){
						orderinfo.goodsStatus = '未租'
					}else{
						orderinfo.goodsStatus = '已租'
					}
					console.log(orderinfo)
				}
				console.log("goods", this.goods)
			}).catch(error => {
				console.log(error)
			})

		},
		onShow() {
			getUserSchoolGoods(user.state.userId).then(res => {
				console.log("res-goods", res.data)
				this.goods = res.data
				for (let orderinfo of this.goods) {
					orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
					orderinfo.rental = Number(orderinfo.rental)
					orderinfo.deposit = Number(orderinfo.deposit)
					if(orderinfo.stuGoods === 1){
						orderinfo.goodsStatus = '未租'
					}else{
						orderinfo.goodsStatus = '已租'
					}
					console.log(orderinfo)
				}
				console.log("goods", this.goods)
			}).catch(error => {
				console.log(error)
			})
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			deleteUserGoods(res){
				deleteUserGoods(res.id).then(res => {
					if (res.code === 2002) {
						uni.showToast({
							title: '删除成功！'
						})
						this.getShippedOrders()
					}
				})
			},
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.switchTab({
					url: "../SchoolHome/SchoolHome",
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
			reachBottom() {
				// 此tab为空数据
				// if (this.order.length != 0) {
				// 	console.log('splice')
				// 	this.loadStatus.splice(this.current, 1, "loading")
				// 	setTimeout(() => {
				// 		this.getAllOrders(this.current);
				// 	}, 1200);
				// }
			},
			// 页面数据
			getOrderList(idx) {
				// for (let i = 0; i < 5; i++) {
				// 	let index = this.$u.random(0, this.dataList.length - 1);
				// 	let data = JSON.parse(JSON.stringify(this.dataList[index]));
				// 	data.id = this.$u.guid();
				// 	this.orderList[idx].push(data);
				// }
				// this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				// item.map(val => {
				// 	price += parseFloat(val.price);
				// });
				// return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				console.log('index', index)
				if (index === 0) {
					this.getAllUserGoods()()
				} 
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},


			getAllUserGoods() {
				console.log('type', this.type)
				getUserSchoolGoods(user.state.userId).then(res => {
					console.log("res-goods", res.data)
					this.goods = res.data
					for (let orderinfo of this.goods) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						console.log(orderinfo)
					}
					console.log("goods", this.goods)
				}).catch(error => {
					console.log(error)
				})
				
			},
			
			confirm(record) {
				confirm(record.id).then(res => {
					if (res.code === 2004) {
						uni.showToast({
							title: '确认收货！'
						})
						this.getShippedOrders()
					}
				})
			},
			deleteOrder(record) {
				console.log('record', record)
				deleteOrder(record.id).then(res => {
					if (res.code === 2002) {
						uni.showToast({
							title: '取消成功！'
						})
						// this.getShippedOrders()
					}
				})
			},

			gotoPay(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/Pay/Pay?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoUpdate(item){
				uni.navigateTo({
					url: '../UpdateGoods/UpdateGoods?id='+item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoContinue(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/Continue/Continue?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoTerminal(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/Terminal/Terminal?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoBuy(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/Buy/Buy?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoDetail(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/orderDetail/orderDetail?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoComment(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/Comment/Comment?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoConitnuePay(item) {
				console.log('item.id', item.id)
				uni.navigateTo({
					url: '/pages/personal/Pay/ContinuePay?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
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

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(51, 116, 90, 1) 0%, rgba(51, 153, 102, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
