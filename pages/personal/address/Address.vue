<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="item" v-for="(res, index) in addresses" :key="res.id">
			<view class="top">
				<view class="name">{{ res.name }}</view>
				<view class="phone">{{ res.mobile }}</view>
				<view class="tag">
					<text v-for="(item, index) in res.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text>
				</view>
			</view>
			<view class="bottom">
				{{res.addressInfo}}
				<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
			</view>
		</view>
		<!-- <view class="addSite" @click="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view> -->
		<u-button @click="toAddSite()" style="color: white; background-color: #339966; position: absolute; bottom: 0px; width: 100%;">添加地址</u-button>
	</view>
</template>

<script>
	import {getUserInfo} from "@/api/rental";
	import {getAllAddress} from "@/api/rental";
	import user from '@/storev/module/user.js'
	// import user from "@/store/module/user";
	import {addAddress, deleteAddress, updateAddress} from "@/api/address";
	export default {
		data() {
			return {
				siteList: [],
				title: '地址管理',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				userInfo: [],
				addressInfo: '',
				province: '',
				addresses: [],
				city: '',
				county: '',
				street: '',
				town: '',
				isDefault: 0,
				visible: false
			};
		},
		onLoad() {
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
				this.account = this.userInfo.account
			}).catch(error => {
				console.log(error)
			})
			getAllAddress(user.state.userId).then(res => {
				console.log("res-address", res.data)
				this.addresses = res.data
				for (let add of this.addresses) {
					if (add.isDefault != 1) {
						add.default = '非默认'
					} else {
						add.default = '默认'
					}
				}
			}).catch(error => {
				console.log(error)
			})
		},
		onShow() {
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
				this.account = this.userInfo.account
			}).catch(error => {
				console.log(error)
			})
			getAllAddress(user.state.userId).then(res => {
				console.log("res-address", res.data)
				this.addresses = res.data
				for (let add of this.addresses) {
					if (add.isDefault != 1) {
						add.default = '非默认'
					} else {
						add.default = '默认'
					}
				}
			}).catch(error => {
				console.log(error)
			})
		},
		mounted() {
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
				this.account = this.userInfo.account
			}).catch(error => {
				console.log(error)
			})
			getAllAddress(user.state.userId).then(res => {
				console.log("res-address", res.data)
				this.addresses = res.data
				for (let add of this.addresses) {
					if (add.isDefault != 1) {
						add.default = '非默认'
					} else {
						add.default = '默认'
					}
				}
			}).catch(error => {
				console.log(error)
			})
		},
		methods: {
			getData() {
				this.siteList = [{
						id: 1,
						name: '游X',
						phone: '183****5523',
						tag: [{
								tagText: '默认'
							},
							{
								tagText: '家'
							}
						],
						site: '广东省深圳市宝安区 自由路66号'
					},
					{
						id: 2,
						name: '李XX',
						phone: '183****5555',
						tag: [{
							tagText: '公司'
						}],
						site: '广东省深圳市宝安区 翻身路xx号'
					},
					{
						id: 3,
						name: '王YY',
						phone: '153****5555',
						tag: [],
						site: '广东省深圳市宝安区 平安路13号'
					}
				];
			},
			toAddSite() {
				uni.navigateTo({
					url: './addAddress',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				});
			},
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.switchTab({
					url: "../Personal",
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
	};
</script>

<style lang="scss" scoped>
	.item {
		padding: 40rpx 20rpx;

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

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: red;
		border-radius: 60rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>
