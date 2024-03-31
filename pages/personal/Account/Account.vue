<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar><br>
		<!-- <NavBar :current="1"  style="z-index: 100; position: fixed; bottom: 0px;"></NavBar> -->
		
		<!-- <view  class="uni-panel"  @click="changeAccount">
			<view class="uni-panel-h" >
				<text class="uni-panel-text">账号：{{ userInfo.account }}</text>
				<text class="uni-panel-icon uni-icon">></text>
			</view>
		</view>
		<view  class="uni-panel" @click="gotoSex">
			<view class="uni-panel-h" >
				<text class="uni-panel-text">性别：{{ userInfo.sexName }}</text>
				<text class="uni-panel-icon uni-icon">></text>
			</view>
		</view>
		
		<view  class="uni-panel" >
			<view class="uni-panel-h" >
				<text class="uni-panel-text">手机号：{{ userInfo.mobile }}</text>
				<text class="uni-panel-icon uni-icon">></text>
			</view>
		</view>
		
		<view  class="uni-panel" >
			<view class="uni-panel-h" >
				<text class="uni-panel-text">邮箱：{{ userInfo.email }}</text>
				<text class="uni-panel-icon uni-icon">></text>
			</view>
		</view> -->
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="account" title="账号" @click="changeAccount">{{userInfo.account}}</u-cell-item>
				<u-cell-item icon="man" title="性别"  @click="gotoSex">{{userInfo.sexName}}</u-cell-item>
				<u-cell-item icon="phone" title="手机号">{{userInfo.mobile}}</u-cell-item>
				<u-cell-item icon="email" title="邮箱">{{userInfo.email}}</u-cell-item>
				<!-- <u-cell-item icon="heart" title="修改密码"></u-cell-item> -->
			</u-cell-group>
		</view>
		
		
	</view>
</template>

<script>
	// import NavBar from '../../../components/NavBar.vue';
	import {getUserInfo} from "@/api/rental";
	import user from '@/storev/module/user.js'

	export default {
		// components: {NavBar},
		data() {
			return {
				userInfo: [],
				title: '账号管理',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		onLoad() {
			getUserInfo(user.state.userId).then(res => {
				  console.log("res-user",res.data)
				  this.userInfo = res.data
				  if(this.userInfo.sex === 1){
					  this.userInfo.sexName = "男"
				  }else if (this.userInfo.sex === 2){
					  this.userInfo.sexName = "女"
				  }else{
					  this.userInfo.sexName = "未填写"
				  }
				}).catch(error => {
				  console.log(error)
			})	
		},
		onShow() {
			getUserInfo(user.state.userId).then(res => {
				  console.log("res-user",res.data)
				  this.userInfo = res.data
				  if(this.userInfo.sex === 1){
					  this.userInfo.sexName = "男"
				  }else if (this.userInfo.sex === 2){
					  this.userInfo.sexName = "女"
				  }else{
					  this.userInfo.sexName = "未填写"
				  }
				}).catch(error => {
				  console.log(error)
			})	
		},
		methods: {
			changeAccount() {
				uni.navigateTo({
					url: './AccountUpdate',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			
			gotoSex(){
				uni.navigateTo({
					url: './Sex',
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
	    font-size: 20px;
	    font-weight: normal;
	}
	
	.uni-panel-icon {
	    margin-left: 15px;
	    color: #999999;
	    font-size: 20px;
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
