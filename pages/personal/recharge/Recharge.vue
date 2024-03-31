<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="uni-form-item uni-column">
			<view class="title"><text class="uni-form-item__title">账户余额：</text></view>
			<view class="uni-input-wrapper">
				<text class="uni-input">{{userInfo.balance}}</text>
			</view>
			<view class="title"><text class="uni-form-item__title">充值金额：</text></view>
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="money" focus placeholder="请输入" @click="changeAcc" />
			</view>
			<view class="title"><text class="uni-form-item__title">密码：</text></view>
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="pass" focus placeholder="请输入" @click="changeAcc" />
			</view>
			
			<u-button class="btn" @click="rechargeMoney">保存</u-button>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from "@/api/rental";
	import {recharge} from "@/api/account";
	import user from '@/storev/module/user.js'
	export default {
		data() {
			return {
				userInfo: [],
				pass: '',
				money: '',
				title: '充值中心',
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
				this.userInfo.balance = Number(this.userInfo.balance)
			}).catch(error => {
				console.log(error)
			})
		},
		methods: {
			isChangeAcc() {
				console.log(this.changeAcc)
				this.changeAcc = !this.changeAcc;
				console.log(this.changeAcc)
			},
			handleChange(value) {
				console.log(`selected ${value}`);
				this.sex = value;
			},

			rechargeMoney() {
				// if(sha256(md5(this.pass)+this.userInfo.salt) === this.userInfo.password){
				recharge(user.state.userId, this.money).then(res => {
					console.log("res", res.data)
					if (res.code === 2006) {
						uni.showToast({
							title: '充值成功'
						})
						uni.switchTab({
							url: '../Personal'
						})
					} else {
						uni.showToast({
							title: '充值失败'
						})
					}
				}).catch(error => {
					console.log(error)
				})
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
			
		},
	}
</script>

<style>
	.uni-form-item__title {
		font-size: 16px;
		line-height: 24px;
		position: relative;
		left: 12px;
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
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
		border-bottom: 1px solid #339966;
		/* color: #F8F8F8; */
	}

	.btn {
		background-color: #339966;
		color: white;
		position: absolute;
		left: 2%;
	}
</style>
