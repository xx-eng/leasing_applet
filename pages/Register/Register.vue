<template>
	<view class="wrap">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
			<view class="search-wrap" v-if="true">
				<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
				<!-- <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search> -->
			</view>
		</u-navbar>


		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
			 label="名称" prop="name">
				<u-input :border="border" placeholder="请输入名称" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sexName">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sexName" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学生" prop="isStu">
				<u-input :border="border" type="select" :select-open="actionStudentShow" v-model="model.isStu" placeholder="是否学生" @click="actionStudentShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="账号" prop="account">
				<u-input type="text" :border="border" placeholder="请填写账号" v-model="model.account" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="邮箱" prop="emaiL">
				<u-input :border="border" type="text" v-model="model.email" placeholder="请输入邮箱"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="电话号" prop="mobile">
				<u-input :border="border" type="number" v-model="model.mobile" placeholder="请输入电话号"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="卡号" label-width="150" prop="bankCard">
				<u-input :border="border" type="number" v-model="model.bankCard" placeholder="请输入卡号"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="密码" label-width="150" prop="password">
				<u-input :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>

			<!-- <u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
				<u-upload :beforeUpload="beforeUpload" width="160" height="160" action="http://121.40.235.133:8080/file/upload"></u-upload>

				<u-upload max-count="1" ref="uUpload" action="http://121.40.235.133:8080/file/upload" :auto-upload="true"></u-upload>
				<u-button @click="submitPhoto">提交图片<text style="font-size:5pt;">(提交前点击)</text></u-button>



			</u-form-item> -->
		</u-form>
		<!-- <view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				勾选代表同意uView的版权协议
			</view>
		</view> -->
		<u-button @click="submit">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-action-sheet :list="actionStudentList" v-model="actionStudentShow" @click="actionSheetStudentCallback"></u-action-sheet>
		<!-- <u-tabbar v-model="navcurrent" :show="navshow" :bg-color="navbgColor" :border-top="borderTop" :list="navlist"
		 :inactive-color="inactiveColor" :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
	</view>
</template>

<script>
	import {
		add
	} from '@/api/user.js'
	import md5 from 'md5'
	export default {
		data() {
			let that = this;
			return {
				title: '注册',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},


				navcurrent: 0,
				navshow: true,
				navbgColor: '#ffffff',
				borderTop: true,
				navlist: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '添加商品',
						count: 0,
						isDot: true,
						customIcon: false,
						pagePath: '/pages/personal/school/SchoolHome/SchoolHome',
					},
					{
						iconPath: "file-text",
						selectedIconPath: "file-text-fill",
						text: '订单管理',
						customIcon: false,
						pagePath: '/pages/personal/school/order/Order',
					},
					{
						iconPath: "bag",
						selectedIconPath: "bag-fill",
						text: '商品管理',
						customIcon: false,
						pagePath: '/pages/personal/school/Goods/Goods',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '添加商品',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath: '/pages/personal/school/Add/Add',
					},
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#339966',

				imageId: '',
				image: '',
				photo: {},
				requestParameters: {},

				model: {
					name: '',
					sexName: '',
					sex: '',
					account:'',
					email: '',
					bankCard: '',
					password: '',
					mobile: '',
					isStu: '',
					isStudent: ''
					/*payType: '支付宝',
					agreement: false,
					region: '',
					goodsType: '',
					phone: '',
					code: '',
					password: '',
					rePassword: '',
					remember: false,
					photo: ''*/
				},
				rules: {
					title: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur',
						},
						// {
						// 	min: 3,
						// 	max: 5,
						// 	message: '姓名长度在3到5个字符',
						// 	trigger: ['change', 'blur'],
						// },
						// {
						// 	// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						// 	validator: (rule, value, callback) => {
						// 		// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
						// 		return this.$u.test.chinese(value);
						// 	},
						// 	message: '姓名必须为中文',
						// 	// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						// 	trigger: ['change', 'blur'],
						// },
						// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
						// {
						// 	trigger: ['blur'],
						// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
						// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
						// 	asyncValidator: (rule, value, callback) => {
						// 		this.$u.post('/ebapi/public_api/index').then(res => {
						// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
						// 			if(res.error) {
						// 				callback(new Error('姓名重复'));
						// 			} else {
						// 				// 如果没有错误，也要执行callback()回调
						// 				callback();
						// 			}
						// 		})
						// 	},
						// }
					],
					abstract: [{
						required: true,
						message: '简介',
						trigger: 'change'
					}, ],
					deposit: [{
							required: true,
							message: '请填写押金'
						},
						// {
						// 	min: 5,
						// 	message: '简介不能少于5个字',
						// 	trigger: 'change',
						// },
						// // 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
						// {
						// 	pattern: /^[\u4e00-\u9fa5]+$/gi,
						// 	message: '简介只能为中文',
						// 	trigger: 'change',
						// },
					],
					rental: [{
						required: true,
						message: '请输入租金',
						trigger: 'change',
						// type: 'array',
					}],
					payType: [{
						required: true,
						message: '请选择任意一种支付方式',
						trigger: 'change',
					}],
					region: [{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}],
					goodsType: [{
						required: true,
						message: '请选择商品类型',
						trigger: 'change',
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				},
				border: false,
				check: false,
				
				actionStudentShow: false,
				actionSheetShow: false,
				actionSheetList: [
					{
						text: '男',
						value: 1
					},
					{
						text: '女',
						value: 2
					},
				],
				
				actionStudentList: [
					{
						text: '是',
						value: 1
					},
					{
						text: '否',
						value: 2
					},
				],
				
				
				// pickerShow: false,
				// selectShow: false,
				// radioCheckWidth: 'auto',
				// radioCheckWrap: false,
				labelPosition: 'left',
				// codeTips: '',
				errorType: ['message'],
			};
		},
		onLoad() {

		},
		computed: {
			borderCurrent() {
				return this.border ? 0 : 1;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			onBackPress(e) {
				console.log("监听返回按钮事件", e);
				//正常返回页面
				uni.redirectTo({
					url: "../login/Login",
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

			submitPhoto() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = this.$refs.uUpload.lists.filter(val => {
					this.image = '/file/image/' + val.response.data.fileName
					this.imageId = val.response.data.id
					console.log(val.response, ':filename', this.image)
					return val.progress == 100;

				})
				// 如果您不需要进行太多的处理，直接如下即可
				// files = this.$refs.uUpload.lists;
				console.log(this.$refs.uUpload.lists)
			},

			submit() {
				console.log('提交')
				this.$refs.uForm.validate(valid => {
					console.log(valid)
					if (valid) {
						console.log(this.model)
						const requestParameters = Object.assign({}, this.model)
						console.log('requestParam', requestParameters)
						return add(requestParameters).then(res => {
							if (res.code === 2006) {
								uni.showToast({
									title: '添加成功'
								})
								// this.$router.push({
								// 	path: '/'
								// })
								uni.switchTab({
									url: '../index/index',
									success: (res) => {
										console.log(res)
									},
									fail: (res) => {
										console.log(res)
									}
								})
							}
						})
						// if (!this.model.agreement) return this.$u.toast('请勾选协议');
						console.log('注册成功');
					} else {
						console.log('注册失败');
					}
				});
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sexName = this.actionSheetList[index].text;
				this.model.sex = this.actionSheetList[index].value;
			},
			actionSheetStudentCallback(index) {
				uni.hideKeyboard();
				this.model.isStu = this.actionStudentList[index].text;
				this.model.isStudent = this.actionStudentList[index].value;
			},
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				this.model.likeFruit = e;
			},
			// radio选择发生变化
			radioGroupChange(e) {
				this.model.payType = e;
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 选择商品类型回调
			selectConfirm(e) {
				this.model.goodsType = '';
				e.map((val, index) => {
					this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
				})
			},
			borderChange(index) {
				this.border = !index;
			},
			labelPositionChange(index) {
				this.labelPosition = index == 0 ? 'left' : 'top';
			},
			// codeChange(text) {
			// 	this.codeTips = text;
			// },
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			errorChange(index) {
				if (index == 0) this.errorType = ['message'];
				if (index == 1) this.errorType = ['toast'];
				if (index == 2) this.errorType = ['border-bottom'];
				if (index == 3) this.errorType = ['border'];
			}
		}
	};
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
