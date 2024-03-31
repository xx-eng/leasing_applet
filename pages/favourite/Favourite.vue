<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<view class="goods-container">
			<view style="border-bottom:5px solid #339966; height: 50px; line-height: 50px; width: 100px; position: absolute;left: 20px; text-align: center;">我的收藏</view>
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
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getFavorites
	} from "@/api/favourite";
	import user from '../../storev/module/user.js'
	// import NavBar from '../../components/NavBar.vue';
	export default {
		// components: {NavBar},
		data() {
			return {
				title: '我的收藏',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				goods: [],
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
		mounted() {
			getFavorites(user.state.userId).then(res => {
				console.log("收藏", res.data)
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
		onLoad() {
			console.log('favorite', user.state.userId === "")
			if (user.state.userId === "") {
				uni.navigateTo({
					url: '/pages/login/Login',
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			} else {
				console.log('进入收藏')
				getFavorites(user.state.userId).then(res => {
					console.log("收藏", res.data)
					this.goods = res.data
					for (let good of this.goods) {
						good.image = 'http://121.40.235.133:8080' + good.image
						console.log(good)
					}
					console.log("大类goods:", this.goods)
				}).catch(error => {
					console.log(error)
				})
			}

		},
		onShow() {
			getFavorites(user.state.userId).then(res => {
				console.log("收藏", res.data)
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
		},

	}
</script>

<style>
	.goods-box {
		display: flex;
		justify-content: start;
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
</style>
