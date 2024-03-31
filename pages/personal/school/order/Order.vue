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
			<!-- {{current}} -->
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!--待付款-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in order" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.firmId }}</view>
										<!--frimId-->
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.status }}</view>
									<!--status-->
								</view>
								<view class="item">
									<!-- v-for="(item, index) in res.goodsList" :key="index" -->
									<view class="left">
										<image :src="res.image" mode="aspectFill"></image>
										<!--image-->
									</view>
									<view class="content">
										<view class="title u-line-2">{{ res.goodsTitle }}</view>
										<!--goodsTitle-->
										<view class="type">{{ res.typeName }}</view>
										<!--typeName-->
										<view class="delivery-time">开始时间 {{ res.startTime }}</view>
										<view class="delivery-time">租赁天数 {{ res.reletTime + res.rentTime }}</view>
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
									<view class="logistics btn" @click="gotoPay(res)">付款</view>
									<!-- <view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>

					</scroll-view>
				</swiper-item>
				<!--待退款-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in order" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.firmId }}</view>
										<!--frimId-->
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.status }}</view>
									<!--status-->
								</view>
								<view class="item">
									<!-- v-for="(item, index) in res.goodsList" :key="index" -->
									<view class="left">
										<image :src="res.image" mode="aspectFill"></image>
										<!--image-->
									</view>
									<view class="content">
										<view class="title u-line-2">{{ res.goodsTitle }}</view>
										<!--goodsTitle-->
										<view class="type">{{ res.typeName }}</view>
										<!--typeName-->
										<view class="delivery-time">开始时间 {{ res.startTime }}</view>
										<view class="delivery-time">租赁天数 {{ res.reletTime + res.rentTime }}</view>
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
									<!-- <view class="logistics btn">付款</view> -->
									<!-- <view class="exchange btn" @click="deleteOrder(res)">取消订单</view>
									<view class="evaluate btn" @click="gotoPay(res)">付款</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!--待付款他人-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in order" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.firmId }}</view>
										<!--frimId-->
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.status }}</view>
									<!--status-->
								</view>
								<view class="item">
									<!-- v-for="(item, index) in res.goodsList" :key="index" -->
									<view class="left">
										<image :src="res.image" mode="aspectFill"></image>
										<!--image-->
									</view>
									<view class="content">
										<view class="title u-line-2">{{ res.goodsTitle }}</view>
										<!--goodsTitle-->
										<view class="type">{{ res.typeName }}</view>
										<!--typeName-->
										<view class="delivery-time">开始时间 {{ res.startTime }}</view>
										<view class="delivery-time">租赁天数 {{ res.reletTime + res.rentTime }}</view>
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
										￥{{ res.deposit + res.rental  }}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view> -->
									<!-- <view class="exchange btn" @click="deleteOrder(res)">取消订单</view>
									<view class="evaluate btn">投诉商家</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!--带退款他人-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in order" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.firmId }}</view>
										<!--frimId-->
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.status }}</view>
									<!--status-->
								</view>
								<view class="item">
									<!-- v-for="(item, index) in res.goodsList" :key="index" -->
									<view class="left">
										<image :src="res.image" mode="aspectFill"></image>
										<!--image-->
									</view>
									<view class="content">
										<view class="title u-line-2">{{ res.goodsTitle }}</view>
										<!--goodsTitle-->
										<view class="type">{{ res.typeName }}</view>
										<!--typeName-->
										<view class="delivery-time">开始时间 {{ res.startTime }}</view>
										<view class="delivery-time">租赁天数 {{ res.reletTime + res.rentTime }}</view>
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
										￥{{ res.deposit + res.rental  }}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">投诉商家</view> -->
									<!-- <view class="exchange btn">投诉商家</view> -->
									<view class="evaluate btn" @click="refund(res)">退款</view>
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
		<school-tab-bar :currentTab="2" style="position: fixed; bottom: 0px; z-index: 100;"></school-tab-bar>
	</view>
</template>

<script>
	import {
		getUserUnpayOrder,
		getUserReturnOrder,
		getFirmUnpayOrder,
		getFirmReturnOrder,
		// getUnpayOrders,
		getCompleteOrders,
		refund,
		getTerminalOrder,
		getContinueOrder,
		getBuyOrder,
		deleteOrder,
	} from "@/api/order";
	import user from '@/storev/module/user.js'
	import schoolTabBar from '../components/schoolTabBar.vue'
	export default {
		components: {schoolTabBar},
		data() {
			return {
				order: [],
				title: '订单管理',
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
						name: '我的待付款',
						value: 0
					},
					{
						name: '我的待退款',
						value: 1
					},
					{
						name: '待付款',
						value: 3
					},
					{
						name: '待退款',
						// count: 12
					}
					/*,
					{
						name: '待退款',
					},
					{
						name: '退租',
					},
					{
						name: '续租',
					},
					{
						name: '已购',
					},
					{
						name: '已完成',
					}*/
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			console.log(user.state.userId)
			this.getOrderList(0);
			this.getOrderList(1);
			this.getOrderList(3);

			getUserUnpayOrder(user.state.userId).then(res => {
				console.log("res-order", res.data)
				this.order = res.data
				for (let orderinfo of this.order) {
					orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
					orderinfo.rental = Number(orderinfo.rental)
					orderinfo.deposit = Number(orderinfo.deposit)
					if (orderinfo.orderState === 1) {
						orderinfo.status = '待付款'
					}
					if (orderinfo.orderState === 3) {
						orderinfo.status = '待发货'
					}
					if (orderinfo.orderState === 4) {
						orderinfo.status = '待收货'
					}
					if (orderinfo.orderState === 6) {
						orderinfo.status = '续租'
					}
					if (orderinfo.orderState === 7) {
						orderinfo.status = '已购买'
					}
					if (orderinfo.orderState === 8) {
						orderinfo.status = '退租'
					}
					if (orderinfo.orderState === 9) {
						orderinfo.status = '返还'
					}
					if (orderinfo.orderState === 10) {
						orderinfo.status = '结束'
					}
					if (orderinfo.type === '1') {
						console.log('type', orderinfo.type)
						orderinfo.typeName = '以租代售'
					}
					if (orderinfo.type === '2') {
						orderinfo.typeName = '共享租赁'
					}
					if (orderinfo.type === '3') {
						orderinfo.typeName = '先租后售'
					}
					console.log(orderinfo)
				}
				console.log("order", this.order)
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
					this.getUserUnpayOrder()
				} else if (index === 1) {
					this.getUserReturnOrder()
				} else if (index === 2) {
					this.getFirmUnpayOrder()
				} else if (index === 3) {
					this.getFirmReturnOrder()
				} else if (index === 4) {
					this.getNotReturnOrders()
				} else if (index === 5) {
					this.getTerminalOrder()
				} else if (index === 6) {
					this.getContinueOrder()()
				} else if (index === 7) {
					this.getBuyOrder()
				} else if (index === 8) {
					this.getCompleteOrders()
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


			getUserUnpayOrder() {
				console.log('type', this.type)
				getUserUnpayOrder(user.state.userId).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getUserReturnOrder() {
				console.log('currentType', this.currentType)
				console.log('type', this.type)
				getUserReturnOrder(user.state.userId).then(res => {
					console.log("unpay-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getFirmUnpayOrder() {
				console.log('type', this.type)
				getFirmUnpayOrder(user.state.userId).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getFirmReturnOrder() {
				console.log('type', this.type)
				getFirmReturnOrder(user.state.userId, 1, 10, this.type).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getNotReturnOrders() {
				console.log('type', this.type)
				getNotReturnOrders(user.state.userId, 1, 10, this.type).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getCompleteOrders() {
				console.log('type', this.type)
				getCompleteOrders(user.state.userId, 1, 10, this.type).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getTerminalOrder() {
				console.log('type', this.type)
				getTerminalOrder(user.state.userId, 1, 10, this.type).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getContinueOrder() {
				console.log('type', this.type)
				getContinueOrder(user.state.userId, 1, 10, this.type).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},
			getBuyOrder() {
				console.log('type', this.type)
				getBuyOrder(user.state.userId, 1, 10, this.type).then(res => {
					console.log("res-order", res.data)
					this.order = res.data
					for (let orderinfo of this.order) {
						orderinfo.image = 'http://121.40.235.133:8080' + orderinfo.image
						orderinfo.rental = Number(orderinfo.rental)
						orderinfo.deposit = Number(orderinfo.deposit)
						if (orderinfo.orderState === 1) {
							orderinfo.status = '待付款'
						}
						if (orderinfo.orderState === 3) {
							orderinfo.status = '待发货'
						}
						if (orderinfo.orderState === 4) {
							orderinfo.status = '待收货'
						}
						if (orderinfo.orderState === 6) {
							orderinfo.status = '续租'
						}
						if (orderinfo.orderState === 7) {
							orderinfo.status = '已购买'
						}
						if (orderinfo.orderState === 8) {
							orderinfo.status = '退租'
						}
						if (orderinfo.orderState === 9) {
							orderinfo.status = '返还'
						}
						if (orderinfo.orderState === 10) {
							orderinfo.status = '结束'
						}
						if (orderinfo.type === '1') {
							console.log('type', orderinfo.type)
							orderinfo.typeName = '以租代售'
						}
						if (orderinfo.type === '2') {
							orderinfo.typeName = '共享租赁'
						}
						if (orderinfo.type === '3') {
							orderinfo.typeName = '先租后售'
						}
						console.log(orderinfo)
					}
					console.log("order", this.order)
				}).catch(error => {
					console.log(error)
				})
			},

			refund(record) {
				refund(record.id).then(res => {
					if (res.code === 2004) {
						uni.showToast({
							title: '确认收货！'
						})
						this.getFirmUnpayOrder()
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
					url: '../SchoolPay/SchoolPay?id=' + item.id,
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
