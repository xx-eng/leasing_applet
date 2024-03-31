<template name="tabBar">
<view class="tabBar">
  <!-- <block wx:for="{{tabBar}}" wx:for-item="item" wx:key="tabBar"> -->
    <view class="tabBar-item" @click="changeToHome">
      <!-- <navigator open-type="redirect" > -->
        <view><u-icon name="home" size="40"></u-icon></view>
        <view class="">校租租</view>
      <!-- </navigator>  -->
    </view>
	<view class="tabBar-item" @click="changeToOrder">
	  <!-- <navigator open-type="redirect" > -->
	    <view><u-icon name="file-text" size="40"></u-icon></view>
	    <view class="">订单管理</view>
	  <!-- </navigator>  -->
	</view>
	<view class="tabBar-item" @click="changeToGoods">
	  <!-- <navigator open-type="redirect"> -->
	    <view><u-icon name="bag" size="40"></u-icon></view>
	    <view class="">商品管理</view>
	  <!-- </navigator>  -->
	</view>
	<view class="tabBar-item"@click="changeToAdd">
	  <!-- <navigator open-type="redirect" > -->
	    <view><u-icon name="account" size="40"></u-icon></view>
	    <view class="">添加商品</view>
	  <!-- </navigator>  -->
	</view>
  <!-- </block> -->
</view>
</template>

<script>
	export default{
		name: "shoolTabBar",
		data() {
		},
		props:{
			currentTab: ''
		},
		methods:{
			changeToHome(){
				this.currentTab = 1
				uni.navigateTo({
					url: "/pages/personal/school/SchoolHome/SchoolHome",
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			changeToOrder(){
				this.currentTab = 2
				uni.redirectTo({
					url: "../order/Order",
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			changeToGoods(){
				this.currentTab = 3
				uni.navigateTo({
					url: "../Goods/Goods",
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			changeToAdd(){
				this.currentTab = 4
				uni.navigateTo({
					url: "../Add/Add",
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
	
	
</script>

<style>
	.icon{
	  width:54rpx;
	  height: 54rpx;
	}
	.tabBar{
	  width:100%;
	  position: fixed;
	  bottom:0;
	  padding:10rpx;
	  margin-left:-4rpx;
	  background:#F7F7FA;
	  font-size:20rpx;
	  color:#8A8A8A;
	  background-color: white;
	  box-shadow: 6rpx 6rpx 6rpx 6rpx #aaa;
	}
	
	 .tabBar-item{
	  float:left;
	  width:25%;
	  text-align: center;
	  overflow: hidden;
	}
	/*当前字体颜色*/
	.tabBartext{
	  color:red;
	}
</style>
