<template>
	<view class="wrap">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="top">
			<view class="item">
				<view class="left">省</view>
				<input type="text" v-model="province" placeholder-class="line" placeholder="省" />
			</view>
			<view class="item">
				<view class="left">市</view>
				<input type="text" v-model="city" placeholder-class="line" placeholder="市" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">区</view>
				<input v-model="county" type="text" placeholder-class="line" placeholder="区" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">县</view>
				<input v-model="town" type="text" placeholder-class="line" placeholder="县" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">街道</view>
				<input v-model="street" type="text" placeholder-class="line" placeholder="街道" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="addressInfo" placeholder-class="line" placeholder="街道、楼牌等" />
				</view>
		</view>
		
		<u-button @click="addAddress()" style="color: white; background-color: #339966; position: absolute; bottom: 0px; width: 100%;">添加地址</u-button>
		
	</view>
</template>

<script>
	import {addAddress, deleteAddress, updateAddress} from "@/api/address";
	import user from '@/storev/module/user.js'
	import {getUserInfo} from "@/api/rental";
export default {
	data() {
		return {
			show: false,
			title: '添加地址',
			backIconName: 'nav-back',
			backText: '返回',
			background: {
				'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			changeAcc: false,
			      isDefault: '',
			      province: '',
			      city: '',
			      county: '',
			      street: '',
			      town: '',
			      addressInfo: ''
		};
	},
	mounted() {
		getUserInfo(user.state.Id).then(res => {
		      console.log("res-user",res.data)
		      this.userInfo = res.data
		    }).catch(error => {
		      console.log(error)
		    });
	},
	methods: {
		setDefault() {},
		showRegionPicker() {
			this.show = true;
		},
		isChangeAcc(){
		      console.log(this.changeAcc)
		      this.changeAcc = !this.changeAcc;
		      console.log(this.changeAcc)
		},
		    handleChange(value) {
		      console.log(`selected ${value}`);
		      this.sex = value;
		    },
		
		    updateUserInfo(){
		      updateUserInfo(this.userInfo.id,this.account, this.sex).then(res => {
		        console.log("res",res.data)
		      }).catch(error => {
		        console.log(error)
		      });
		    },
		    addAddress(){
				console.log('进入', user.state.userId)
				console.log(this.province)
		      addAddress(user.state.userId, 2, this.province, this.city, this.county, this.street, this.town, this.addressInfo).then(res => {
		        if(res.code === 2006){
		          uni.showToast({
		          	title: '添加成功'
		          })
		        }else{
					uni.showToast({
						title: '失败'
					})
				}
		      })
		    },
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.switchTab({
					url: "./Address",
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
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.navigateTo({
					url: "./Address",
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
// /deep/ .line {
// 	color: $u-light-color;
// 	font-size: 28rpx;
// }
::v-deep .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
