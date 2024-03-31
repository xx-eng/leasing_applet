<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<!-- <NavBar :current="1"  style="z-index: 100; position: fixed; bottom: 0px;"></NavBar> -->

		<view class="uni-form-item uni-column">
			<!-- <view class="title"><text class="uni-form-item__title">账号</text></view> -->
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="pass" focus placeholder="请输入密码" @click="changeAcc" />
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="newPass" focus placeholder="请输入新密码" @click="changeAcc" />
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="confirmPass" focus placeholder="请输入确认密码" @click="changeAcc" />
			</view>
			<u-button class="btn" @click="updateUserPassword">保存</u-button>
		</view>


	</view>
</template>

<script>
	// import NavBar from '../../../components/NavBar.vue';
	import {
		getUserInfo
	} from "@/api/rental";
	import {
		updateUserPassword
	} from "@/api/account";
	import user from '@/storev/module/user.js'
	import md5 from 'md5'

	export default {
		// components: {NavBar},
		data() {
			return {
				userInfo: [],
				newPass: '',
				confirmPass: '',
				pass: '',
				title: '更改密码',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		onLoad() {
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
				if (this.userInfo.sex === 1) {
					this.userInfo.sexName = "男"
				} else if (this.userInfo.sex === 2) {
					this.userInfo.sexName = "女"
				} else {
					this.userInfo.sexName = "未填写"
				}
			}).catch(error => {
				console.log(error)
			})
		},
		methods: {
			updateUserPassword() {
				console.log('updatePassword')
				if (this.newPass === this.confirmPass) {
					updateUserPassword(user.state.userId, md5(this.pass), md5(this.newPass)).then(res => {
						console.log("res", res.data)
						if (res.code === 2004) {
							uni.showToast({
								title: '更改成功'
							})
							uni.switchTab({
								url: '../Personal',
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
				} else {
					alert("两次密码不一致")
				}
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
	}
</script>

<style>
	.uni-form-item__title {
		font-size: 16px;
		line-height: 24px;
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

	.btn {
		background-color: #339966;
		color: white;
		position: absolute;
		left: 2%;
		width: 100px;
		height: 50px;
	}
</style>
