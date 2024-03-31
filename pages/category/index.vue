<template>
	<view>

		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<view class="u-wrap">
			<view class="u-search-box">
				<view class="u-search-inner">
					<u-icon name="search" color="#909399" :size="28"></u-icon>
					<text class="u-search-text">搜索uView</text>
				</view>
			</view>
			<view class="u-menu-wrap">
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
					<view v-for="(item,index) in categories" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
					 :data-current="index" @tap.stop="swichMenu(index,item)">
						<text class="u-line-1">{{item.name}}</text>
					</view>
				</scroll-view>

			</view>
		</view>


		<view style="position: absolute; left: 25%; top: 100px; width: 70%;">
			<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" v-for="item in categoryDetial" @click="changeTab(item.id)">
					<text class="uni-tab-item-title" :class="tabIndex==item.id ? 'uni-tab-item-title-active' : ''">{{item.name}}</text>
				</view>
			</scroll-view>

			<view class="goods-container" style="position: relative; top: 5px; left: 5%;">
				<view class="goods-box">
					<view class="goods-item" v-for="item in goods" :key="item.id" @click="goToDetail(item)">
						<img :src="item.image" class="show-pop" />
						<view class="goods-desc">
							<view class="title">{{item.title}}</view>
							<view class="rental">{{item.rental}}</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<u-tabbar v-model="ucurrent" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getACategory
	} from "@/api/category";
	import {
		getAllCategory
	} from "@/api/home";
	import {
		getSelectGoods
	} from "@/api/categoryPage";
	import {
		getSelectedGoods
	} from "@/api/categoryPage";
	export default {
		// components: { NavBar},
		data() {
			return {
				title: '易起租',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				categories: [],
				categoryDetial: [],
				tabIndex: 0,
				goods: [],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度

				ucurrent: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 0,
						isDot: true,
						customIcon: false,
						pagePath: '/pages/index/index',
					},
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '分类',
						customIcon: false,
						pagePath: '/pages/category/index',
					},
					// {
					// 	iconPath: "/static/uview/example/min_button.png",
					// 	selectedIconPath: "/static/uview/example/min_button_select.png",
					// 	text: '发布',
					// 	midButton: true,
					// 	customIcon: false,
					// },
					{
						iconPath: "heart",
						selectedIconPath: "heart-fill",
						text: '收藏',
						customIcon: false,
						pagePath: '/pages/favourite/Favourite',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath: '/pages/personal/Personal',
					},
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#339966'
			}
		},
		// components: {Search, NavBar},
		onLoad() {
			getAllCategory().then(res => {
				console.log("res", res.data)
				this.categories = res.data
				console.log("categories", this.categories)
			}).catch(error => {
				console.log(error)
			})
			getACategory(1).then(res => {
				console.log("res", res.data)
				this.categoryDetial = res.data
				console.log("categoryDetial", this.categoryDetial)
			}).catch(error => {
				console.log(error)
			})
			getSelectedGoods(1).then(res => {
				console.log("大类res", res.data)
				this.goods = res.data
				for (let good of this.goods) {
					good.image = 'http://121.40.235.133:8080' + good.image
					console.log(good)
				}
				console.log("大类goods:", this.goods)
			}).catch(error => {
				console.log(error)
			})
		},
		methods: {
			goToDetail(item) {
				console.log('../detail/Detail?id=' + item.id)
				uni.navigateTo({
					url: '../detail/Detail?id=' + item.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			changeTab(index) {
				console.log('index', index)
				this.tabIndex = index
				getSelectGoods(index, 1, 100).then(res => {
					console.log("res", res.data)
					this.goods = res.data
					for (let good of this.goods) {
						good.image = 'http://121.40.235.133:8080' + good.image
						console.log(good)
					}
					console.log("goods", this.goods)

				}).catch(error => {
					console.log(error)
				})
			},
			getCategoryDetail(id) {
				this.tabIndex = 0
				getACategory(id).then(res => {
					console.log("res", res.data)
					this.categoryDetial = res.data
					console.log("categoryDetial", this.categoryDetial)
				}).catch(error => {
					console.log(error)
				})
				getSelectedGoods(id).then(res => {
					console.log("大类res", res.data)
					this.goods = res.data
					for (let good of this.goods) {
						good.image = 'http://121.40.235.133:8080' + good.image
						console.log(good)
					}
					console.log("大类goods:", this.goods)
				}).catch(error => {
					console.log(error)
				})
			},

			async swichMenu(index, item) {
				this.getCategoryDetail(item.id)

				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			//正常返回页面
			uni.switchTab({
				url: "/pages/index/index",
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
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}

	.scroll-h {
		width: 750rpx;
		/* #ifdef H5 */
		width: 100%;
		/* #endif */
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}


	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #339966;
	}

	.goods-box {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		position: relative;
		left: 50%;
		top: 0px;
		transform: translate(-50%);
		width: 100%;
		/* background-color: #F5F5F5; */
	}

	.goods-item {
		box-sizing: border-box;
		width: 47%;
		border: 1px solid #e9e9e9;
		padding: 10px 10px;
		margin: 3px 3px;
		background-color: white;
	}

	.show-pop {
		width: 90%;
		display: block;
		position: relative;
		left: 50%;
		transform: translate(-50%);
	}
</style>
