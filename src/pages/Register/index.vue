<template>
<div class="register">
	<h3>注册新用户
		<span class="go">我有账号，去 <router-link to="/login">登录</router-link>
		</span>
	</h3>
	<el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" label-position="left" :hide-required-asterisk="true">
		<el-form-item label="手机号:" prop="phone">
			<el-input type="text" v-model="registerForm.phone"></el-input>
		</el-form-item>
		<el-form-item label="验证码:">
			<el-input type="text" v-model="registerForm.code"></el-input>
			<el-button @click="sendCode">获取验证码</el-button>
		</el-form-item>
		<el-form-item label="登录密码:" prop="pass1">
			<el-input type="password" v-model="registerForm.pass1"></el-input>
		</el-form-item>
		<el-form-item label="重复登录密码:" prop="pass2">
			<el-input type="password" v-model="registerForm.pass2"></el-input>
		</el-form-item>
		<el-form-item prop="agree">
			<el-checkbox v-model="registerForm.agree">同意协议并注册《尚品汇用户协议》</el-checkbox>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm()">提交</el-button>
		</el-form-item>
	</el-form>
</div>
</template>


<script>
import { getRegisterCode,reqRegisterUser } from "@/api"
export default {
	name: "Register",
	data() {
		// 必须靠var变量提升 否则获取不到好像
		var validatePass2 = (rule, value, callback)=>{
			if(!value){
				callback(new Error('请再次输入密码'))
			} else if (value!=this.registerForm.pass1){
				// 不一致信息
				callback(new Error('密码输入不一致'))
			} else {
				callback()
			}
		}
		var validateConfirm = (rule, value, callback)=>{
			if(!value){
				callback(new Error('请勾选用户协议'))
			}else{
				callback()
			}
		}
		return {
			registerForm:{
				phone:'',
				code:'',
				pass1:'',
				pass2:'',
				agree:false,
			},
			rules:{
				phone:[
					{required: true, message: '请输入手机号', trigger: 'blur'},
					{
						pattern:/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
						message:'手机号不合法',
						trigger:'blur'
					}
				],
				pass1:[
					{required: true, message: '请输入密码', trigger: 'blur'},
					{min:8,max:16, message: '长度应在 8 到 16 个字符', trigger: 'blur'},
				],
				pass2:[
					{validator:validatePass2,trigger: 'blur'}
				],
				agree:[
					{validator:validateConfirm,trigger: 'change'}
				]
			}
		}
	},
	methods: {
		submitForm(){
			this.$refs['registerForm'].validate(async (valid)=>{
				// 验证都成功了发注册请求
				if(valid){
					let{phone,pass1,code} = this.registerForm
					const result = await reqRegisterUser(phone,pass1,code)
					result.code === 200 ? alert('注册成功') : alert('注册失败')
				} else{
					return false
				}
			})

		},
		sendCode(){
			// 先对phone字段进行校验 表单的validateField方法见官网
			this.$refs.registerForm.validateField('phone',async errorMessage => {
				// 存在errorMessage说明phone没通过校验 直接return
				if(errorMessage) return
				const result = await getRegisterCode(this.registerForm.phone)
				if(result.code === 200) this.registerForm.code = result.data
				else alert('发送验证码失败，稍后再试')
			})
		}

	}
}
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 500px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  .el-form {
	padding-top:20px;

	.el-form-item{
		margin:20px auto;
		width:300px;
	}

  }

}
</style>