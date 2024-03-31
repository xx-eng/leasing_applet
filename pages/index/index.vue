<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
			<view class="search-wrap" v-if="true">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<u-search placeholder="搜索易起租商品" v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search>
			</view>
		</u-navbar>



		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast><!-- :mode="mode"  :indicator-pos="indicatorPos" -->
			<u-swiper @change="change" :height="300" :list="adverts" :title="false" 
			 :interval="3000" @click="click"></u-swiper>
		</view>

		<view class="category">
			<view class="category-box" style="position: absolute; left: 5%">
				<u-icon name="camera-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center; color: #339966;">电子数码</view>
			</view>
			<view class="category-box" style="position: absolute; left: 29%; top: 0px;">
				<u-icon name="plus-square-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center; color: #339966;">医疗器械</view>
			</view>
			<view class="category-box" style="position: absolute; left: 53%; top: 0px;">
				<u-icon name="volume-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center; color: #339966;">影响出版</view>
			</view>
			<view class="category-box" style="position: absolute; left: 77%; top: 0px;">
				<u-icon name="car-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center;  color: #339966;">交通出行</view>
			</view>

			<view class="category-box" style="position: absolute; left: 5%; top: 80px;">
				<u-icon name="calendar-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center; color: #339966;">办公设备</view>
			</view>
			<view class="category-box" style="position: absolute; left: 29%; top: 81px;">
				<u-icon name="tags-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center; color: #339966;">母婴玩具</view>
			</view>
			<view class="category-box" style="position: absolute; left: 53%; top: 80px;">
				<u-icon name="coupon-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center; color: #339966;">音乐器材</view>
			</view>
			<view class="category-box" style="position: absolute; left: 77%; top: 80px;">
				<u-icon name="bag-fill" color="#339966" size="100"></u-icon>
				<view style="width: 100%; text-align: center;  color: #339966;">服装道具</view>
			</view>

		</view>

		<view class="goods">
			<view class="goods-container">
				<header class="goods-header">热门商品</header>
				<view class="goods-box">
					<view class="goods-item" v-for="item in popularGoods" :key="item.id" @click="goToDetail(item)">
						<img :src="item.image" class="show-pop" />
						<view class="goods-desc">
							<view class="title">{{item.title}}</view>
							<view class="rental">{{item.rental}}</view>
						</view>
					</view>
				</view>
			</view>



			<view class="goods-container" style="position: relative; top: 80px;">
				<header class="goods-header">最新优选</header>
				<view class="goods-box">
					<view class="goods-item" v-for="item in newGoods" :key="item.id" @click="goToDetail(item)">
						<img :src="item.image" class="show-pop" />
						<view class="goods-desc">
							<view class="title" style="display: block;">{{item.title}}</view>
							<view class="rental">{{item.rental}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-tabbar 
			v-model="current" 
			:show="show" 
			:bg-color="bgColor" 
			:border-top="borderTop" 
			:list="list" 
			:inactive-color="inactiveColor" 
			:activeColor="activeColor"
			@change="gotoOther">
		</u-tabbar>

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
	export default {
		data() {
			return {
				title: '',
				backIconName: 'home-fill',
				backText: '易起租',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				popularGoods: [],
				newGoods: [],

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
						count:0,
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
		onLoad() {
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
			click(index) {
				this.$refs.uToast.show({
					title: `点击了第${index + 1}张图片`,
					type: 'success'
				})
			},

			change(index) {
				// console.log(index);
			},
			gotoOther(){
				console.log('index', this.current)
			}
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			//正常返回页面
			uni.navigateTo({
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
</style>
