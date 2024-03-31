<template>
  <view class="bottom-nav" >
    <navigator url="/pages/index/index" open-type="navigate">
		<view :class="current===0 ? activeClass : notC" style="position: absolute; left: 10%;" @click="changeCurrent(0)">
			<u-icon name="chat" color="#339966" size="60"></u-icon>
			<view style="width: 100%; text-align: center;">消息</view>
		</view>
	</navigator>
	
	
	<!-- <navigator url="/pages/category/index" open-type="navigate">
	     <view class="category-box" style="position: absolute; left: 33%;" @click="changeCurrent1(1)">
	     	<u-icon name="heart" color="#339966" size="60"></u-icon>
	     	<view style="width: 100%; text-align: center;">收藏</view>
	     </view>
	</navigator> -->
	
	
	
	<view class="category-box" style="position: absolute; text-align: center; left: 56%; height: 55px; line-height: 55px; width: 44%; background-color: #339966; color: white;" @click="gotoLogin">
		<view style="width: 100%; text-align: center;">租赁</view>
	</view>


  </view>


</template>

<script>
	import user from '@/storev/module/user.js'
export default {
  name: "NavBar",
  props: ["id"],
  onLoad() {
	  console.log('current', this.current)
	  console.log('id',this.id)
  },
  methods: {
	  changeCurrent(index){
		  console.log('current', this.current, index)
		  console.log('id',this.id)
	  },
	  gotoLogin(){
		  console.log('user', user.state.userId==="")
		  if(user.state.userId===""){
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
			  uni.navigateTo({
			  	url: '/pages/personal/school/SchoolRent/SchoolRent?id='+ this.id,
			  	success: (res) => {
			  		console.log(res)
			  	},
			  	fail: (err) => {
			  		console.log(err)
			  	}
			  })
		  }
		  
	  },
  },
}

</script>

<style>
.bottom-nav{
	width: 100%;
	height: 55px;
	border: 1px solid #e9e9e9;
	background-color: white;
}

/* .category-box{
		 display: flex;
		justify-content: start;
		flex-wrap: wrap; 
		 background-color: #C0C0C0; 
		width: 70px;
		text-align: center;
	} */
	
	.active{
		color: #339966;
		width: 70px;
		text-align: center;
	}
	.notAct{
		color: #C0C0C0;
		width: 70px;
		text-align: center;
	}

</style>