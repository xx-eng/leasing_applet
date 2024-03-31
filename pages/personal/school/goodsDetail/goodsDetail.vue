<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<NavBar :id="goodsDetial.id" style="z-index: 100; position: fixed; bottom: 0px;"></NavBar>
		<view style="text-align: center; border-bottom: 1px solid #E9E9E9;">
			<image :src="goodsDetial.image" mode="widthFix" style="width: 90%;"></image>
		</view>
		<view style="position: relative;left: 10px; font-weight: bold; font-size: 13pt;">{{ goodsDetial.title }}</view><br>
		<view style="position: relative;left: 10px;">租赁价格：<text style=" font-weight: bold; color: #339966;">￥{{ goodsDetial.rental }}/天</text></view>
		<view style="position: relative;left: 10px; color: #999999;">
			<text>押金：￥{{ goodsDetial.deposit }}</text>
			<!-- <text style="position: absolute; right: 20px;">最短租赁天数：￥{{ goodsDetial.rentTime }}天</text>
			<text style="position: absolute; left: 130px;">库存：{{ goodsDetial.stock }}</text> -->
		</view>
		<view style="position: relative;left: 10px;">联系人：{{ userInfo.name }}</view>
		<view style="position: relative;left: 10px;">联系电话：{{ userInfo.mobile }}</view>
		
		<!-- <view style="text-align: center; border-top: 5px solid #E9E9E9;  border-bottom: 5px solid #E9E9E9;">
			<image src="@/static/qq_pic_merged_1611891380665.jpg" mode="widthFix" style="width: 95%;"></image>
		</view> -->

		<view class="goods-desc">
			<!-- <scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" @click="changeTab(0)">
					<text class="uni-tab-item-title" :class="tabIndex==0 ? 'uni-tab-item-title-active' : ''">赔偿标准</text>
				</view>
				<view class="uni-tab-item" @click="changeTab(1)">
					<text class="uni-tab-item-title" :class="tabIndex==1 ? 'uni-tab-item-title-active' : ''">商品评价</text>
				</view>
			</scroll-view> -->
		<!-- 	<a-menu v-model="current" mode="horizontal" style="position:absolute; left: 50%; transform: translate(-50%);">
				<a-menu-item :key="0">赔偿标准</a-menu-item>
				<a-menu-item :key="1">宝贝评价</a-menu-item>
			</a-menu> -->

			<!-- <view v-if="tabIndex === 0" style="position:relative; top: 10px; width: 100%;">
				<image src="@/static/qq_pic_merged_1611892389095.jpg" mode="widthFix" style="position: absolute; left:50%; transform: translate(-50%); width: 90%;" />
			</view> -->
			<!-- <view v-if="current === 0" style="position:relative; top: 50px; width: 100%;">
				<image src="../../static/qq_pic_merged_1611892389095.jpg" mode="widthFix" style="position: absolute; left:50%; transform: translate(-50%); width: 90%;" />
			</view> -->
			<!-- <view v-if="tabIndex === 1" style="position:relative; top: 10px; width: 100%;">
				
				
				<view class="comment" v-for="(res, index) in comments" :key="res.id">
					
					<view class="right">
						<view class="top">
							<view class="name">{{ res.userId }}</view>
							
						</view>
						<view class="content">{{ res.goodsComment }}</view>
					</view>
				</view>
				
			</view> -->
		</view>

	</view>
</template>

<script>
	import {
		getGoodsInfo,
		getAllComments
	} from "@/api/goodsDetail";
	import {
		addFavorites
	} from "@/api/goodsDetail";
	import {
		getUserInfo
	} from "@/api/rental";
	import NavBar from './components/NavBar.vue'
	import user from '@/storev/module/user.js'
	export default {
		data() {
			return {
				id: '',
				userInfo: [],
				goodsDetial: [],
				current: 0,
				comments: [],
				title: '商品详情',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				tabIndex: 0,
			}
		},
		components:{ NavBar},
		onLoad(option) {
			this.id = option.id
			console.log(this.id)
			
		},
		mounted() {
			getGoodsInfo(this.id).then(res => {
				console.log("res", res.data)
				this.goodsDetial = res.data
				this.goodsDetial.image = 'http://121.40.235.133:8080' + this.goodsDetial.image
				this.goodsDetial.rental = Number(this.goodsDetial.rental)
				this.goodsDetial.deposit = Number(this.goodsDetial.deposit)
				this.goodsDetial.price = Number(this.goodsDetial.price)
			
				console.log("goodsDetail", this.goodsDetial)
			}).catch(error => {
				console.log(error)
			})
			// user.state.userId
			getUserInfo(user.state.userId).then(res => {
				console.log("res-user", res.data)
				this.userInfo = res.data
			}).catch(error => {
				console.log(error)
			});
			
			getAllComments(this.id).then(res => {
				console.log('comment', res.data)
				this.comments = res.data
			}).catch(error => {
				console.log(error)
			})
		},
		methods: {
			changeTab(index) {
				console.log('index', index)
				this.tabIndex = index
			},
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.switchTab({
					url: "../SchoolHome/SchoolHome",
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

<style lang="scss">
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
		padding-bottom: 10px;
		border-bottom: 2px solid #339966;
	}
	.goods-desc{
		// text-align: center;
		/* border: 1px solid #2D8CF0; */
	}
	
	.comment {
		display: flex;
		padding: 30rpx;
		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.name {
					color: #18B566;
				}
				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;
					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}
				.highlight {
					color: #71d5a1;
					.num {
						color: #71d5a1;
					}
				}
			}
			.content {
				margin-bottom: 10rpx;
			}
			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;
				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;
					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #71d5a1;
					align-items: center;
					.more {
						margin-left: 6rpx;
					}
				}
			}
			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
				.reply {
					color: #71d5a1;
					margin-left: 10rpx;
				}
			}
		}
	}

</style>
