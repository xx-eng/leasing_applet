<template>
	<view style="background-color: rgb(248, 248, 248);">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar><br>

		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="gotoAccount()">
			<view class="u-m-r-10">
				<u-avatar size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.account}}</view>
				<view class="u-font-14 u-tips-color">手机号:{{userInfo.mobile}}</view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="order" title="我的订单" @click="gotoOrder"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="map" title="我的地址" @click="gotoAddress()"></u-cell-item>
				<!-- <u-cell-item icon="chat" title="消息中心"></u-cell-item> -->
				<u-cell-item icon="rmb-circle" title="充值中心" @click="gotoRecharge()"></u-cell-item>
				<!-- <u-cell-item icon="heart" title="修改密码"></u-cell-item> -->
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="修改密码" @click="gotoPassword()"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group v-if="userInfo.isStudent === 1">
				<u-cell-item icon="moments" title="校租租" @click="gotoSchool()"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="退出登录" @click="userLogout()"></u-cell-item>
			</u-cell-group>
		</view>

		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor">
		</u-tabbar>
	</view>
</template>

<script>
	// import NavBar from '../../components/NavBar.vue'
	import {
		getUserInfo
	} from "@/api/rental";
	import { logout } from "@/api/user";
	import user from '@/storev/module/user.js'
	export default {
		// components: {NavBar},
		data() {
			return {
				userInfo: [],
				title: '个人中心',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
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
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
			}).catch(error => {
				console.log(error)
			})
		},
		onShow() {
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
			}).catch(error => {
				console.log(error)
			})
		},
		onLoad() {
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
			}else{
				getUserInfo(user.state.userId).then(res => {
					console.log("res-user", res.data)
					this.userInfo = res.data
				}).catch(error => {
					console.log(error)
				})
			}
			
		},
		// onPullDownRefresh() {
		// 	console.log('refresh');
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 500);
		// },
		methods: {
			userLogout() {
				logout().then(res => {
					console.log("res", res.data)
					uni.switchTab({
						url: '../index/index'
					})
				}).catch(error => {
					console.log(error)
				})
			},
			gotoAccount() {
				uni.navigateTo({
					url: './Account/Account',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			gotoOrder() {
				uni.navigateTo({
					url: './order/Order',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			gotoAddress() {
				uni.navigateTo({
					url: './address/Address',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			gotoRecharge() {
				uni.navigateTo({
					url: './recharge/Recharge',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			gotoPassword() {
				uni.navigateTo({
					url: './Password/Password',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			gotoSchool() {
				uni.navigateTo({
					url: 'school/SchoolHome/SchoolHome',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
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
	}
</script>

<style>
	.user-info {
		background-color: rgb(248, 248, 248);
	}

	.uni-panel {
		margin-bottom: 0px;
		border: 1px solid #E9E9E9;
	}

	.uni-panel-h {
		/* #ifdef H5 */
		display: flex;
		/* #endif */
		background-color: #FFFFFF;
		flex-direction: row !important;
		/* justify-content: space-between !important; */
		align-items: center !important;
		padding: 12px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-panel-text {
		flex: 1;
		color: #000000;
		font-size: 14px;
		font-weight: normal;
	}

	.uni-panel-icon {
		margin-left: 15px;
		color: #999999;
		font-size: 14px;
		font-weight: normal;
		transform: rotate(0deg);
		transition-duration: 0s;
		transition-property: transform;
	}

	.uni-icon {
		font-family: uniicons;
		font-weight: normal;
	}
</style>
