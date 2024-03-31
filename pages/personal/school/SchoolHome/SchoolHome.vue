<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
			<view class="search-wrap" v-if="true">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<!-- <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search> -->
			</view>
		</u-navbar>

		<u-waterfall v-model="schoolGoods" ref="uWaterfall" style="width:100%;">
			<template v-slot:left="{ leftList }">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="goToDetail(item)">
					<!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">{{ item.title }}</view>
					<view class="demo-price">{{ item.rental }}元/天</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">自投</view>
						<view class="demo-tag-text">{{item.deposit}}</view>
					</view>
					<view class="demo-shop">{{ item.shop }}</view>
					<view class="u-close">
						<u-icon name="close-circle-fill" color="#fa3534" size="34" @click="remove(item.id)"></u-icon>
					</view>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index"  @click="goToDetail(item)">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">{{ item.title }}</view>
					<view class="demo-price">{{ item.rental }}元/天</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">自投</view>
						<view class="demo-tag-text">{{item.deposit}}</view>
					</view>
					<view class="demo-shop">{{ item.shop }}</view>
					<view class="u-close">
						<u-icon name="close-circle-fill" color="#fa3534" size="34" @click="remove(item.id)"></u-icon>
					</view>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>

		<!-- <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
		<br><br>
		<school-tab-bar :currentTab="1" style="position: fixed; bottom: 0px; z-index: 100;"></school-tab-bar>
	

	</view>
</template>

<script>
	import {
		ACCESS_TOKEN
	} from '@/storev/mutation-types'
	// import uActionSheet from "@/uview-ui/components/u-action-sheet/u-action-sheet.vue";
	import {
		getPopularGoods,
		getNewGoods,
		getAllAdvert
	} from "@/api/home";
	import { getAllSchoolGoods }
	from '../../../../api/user.js'
	import schoolTabBar from '../components/schoolTabBar.vue'
	export default {
		components: {schoolTabBar},
		data() {
			return {
				title: '校租租',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				popularGoods: [],
				newGoods: [],
				schoolGoods: [],

				adverts: [],

				keyword: '',
				useSlot: true,
				showAction: true,
				rightSlot: false,
				search: true,
				slotRight: false,

				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				list: [{
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
					// {
					// 	iconPath: "account",
					// 	selectedIconPath: "account-fill",
					// 	text: '商品管理',
					// 	customIcon: false,
					// 	pagePath: '/pages/personal/school/order/Order',
					// },
					// {
					// 	iconPath: "/static/uview/example/min_button.png",
					// 	selectedIconPath: "/static/uview/example/min_button_select.png",
					// 	text: '发布',
					// 	midButton: true,
					// 	customIcon: false,
					// },
					// {
					// 	iconPath: "heart",
					// 	selectedIconPath: "heart-fill",
					// 	text: '收藏',
					// 	customIcon: false,
					// 	pagePath: '/pages/favourite/Favourite',
					// },
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
				activeColor: '#339966'

			}
		},
		mounted() {
			getAllSchoolGoods().then(res => {
				console.log("school", res.data)
				this.schoolGoods = res.data
				for (let good of this.schoolGoods) {
					good.image = 'http://121.40.235.133:8080' + good.image
					good.rental = Number(good.rental)
					good.deposit = Number(good.deposit)
					console.log(good)
				}
				console.log("school", this.schoolGoods)
			}).catch(error => {
				console.log(error)
			})
		},
		onShow() {
			getAllSchoolGoods().then(res => {
				console.log("school", res.data)
				this.schoolGoods = res.data
				for (let good of this.schoolGoods) {
					good.image = 'http://121.40.235.133:8080' + good.image
					good.rental = Number(good.rental)
					good.deposit = Number(good.deposit)
					console.log(good)
				}
				console.log("school", this.schoolGoods)
			}).catch(error => {
				console.log(error)
			})
		},
		onLoad() {
			console.log(getAllSchoolGoods)
			getAllSchoolGoods().then(res => {
				console.log("school", res.data)
				this.schoolGoods = res.data
				for (let good of this.schoolGoods) {
					good.image = 'http://121.40.235.133:8080' + good.image
					good.rental = Number(good.rental)
					good.deposit = Number(good.deposit)
					console.log(good)
				}
				console.log("school", this.schoolGoods)
			}).catch(error => {
				console.log(error)
			})
			getNewGoods().then(res => {
				console.log("res", res.data)
				this.newGoods = res.data
				for (let good of this.newGoods) {
					good.image = 'http://121.40.235.133:8080' + good.image
					console.log(good)
				}
				console.log("new", this.newGoods)
			}).catch(error => {
				console.log(error)
			})
			getPopularGoods().then(res => {
				console.log("res", res.data)
				this.popularGoods = res.data
				for (let good of this.popularGoods) {
					good.image = 'http://121.40.235.133:8080' + good.image
					console.log(good)
				}
				console.log("popular", this.popularGoods)
			}).catch(error => {
				console.log(error)
			})
			getAllAdvert().then(res => {
				console.log("res", res.data)
				this.adverts = res.data
				for (let ad of this.adverts) {
					ad.image = 'http://121.40.235.133:8080' + ad.image
					console.log(ad)
				}
				console.log("adverts", this.adverts)
			}).catch(error => {
				console.log(error)
			})
		},
		methods: {
			goToDetail(item) {
				console.log('' + item.id)
				uni.switchTab({
					url: '../goodsDetail/goodsDetail?id='+ item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			click(index) {
				this.$refs.uToast.show({
					title: `点击了第${index + 1}张图片`,
					type: 'success'
				})
			},

			change(index) {
				// console.log(index);
			},
			gotoOther() {
				console.log('index', this.current)
			}
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			//正常返回页面
			uni.switchTab({
				url: "/pages/personal/Personal",
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
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.goods {
		position: absolute;
		top: 430px;
		width: 100%;
		/* height: 700px; */
		/* background-color: #F5F5F5; */
	}

	.goods-header {
		height: 50px;
		line-height: 50px;
		display: block;
		font-size: 15pt;
		font-weight: bold;
		position: absolute;
		left: 20px;
	}

	.goods-box {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		position: relative;
		left: 50%;
		top: 50px;
		transform: translate(-50%);
		width: 92%;
		/* background-color: #F5F5F5; */
	}

	.goods-item {
		box-sizing: border-box;
		width: 48%;
		border: 1px solid #e9e9e9;
		padding: 10px 10px;
		margin: 3px 3px;
		background-color: white;
	}

	.show-pop {
		width: 160px;
		display: block;
		position: relative;
		left: 50%;
		transform: translate(-50%);
	}

	.category {
		height: 100px;
		width: 100%;
		/* background-color: #4CD964; */
		position: absolute;
		top: 260px;
	}

	.category-box {
		/* display: flex;
		justify-content: start;
		flex-wrap: wrap; */
		/* background-color: #C0C0C0; */
		width: 70px;
		text-align: center;
	}

	.u-demo-area {
		padding: 40rpx;
		width: 100%;
	}

	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}
	
	
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
	</style>
	
	<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-img-wrap {
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
		word-break: break-all;
	}
	
	.demo-tag {
		display: flex;
		margin-top: 5px;
	}
	
	.demo-tag-owner {
		background-color: $u-type-error;
		color: #ffffff;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}
	
	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}
	
	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}
	
	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
