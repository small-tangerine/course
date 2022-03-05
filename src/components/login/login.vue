<template>
  <div class="login-way">
    <el-form ref="loginForm" :model="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input ref="username" v-model.trim="loginForm.username" placeholder="请输入手机号/邮箱" clearable />
      </el-form-item>
      <el-form-item v-if="index === 2" prop="verifyCode" class="code">
        <el-input v-model.trim="loginForm.verifyCode" placeholder="请输入验证码" />
        <el-button :disabled="isDisabled" @click="sendCode">{{ buttonText }}</el-button>
      </el-form-item>
      <el-form-item prop="password">
        <el-input ref="password" v-model.trim="loginForm.password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item v-if="index !== 0" prop="checkPassword">
        <el-input v-model.trim="loginForm.checkPassword" placeholder="请再次输入密码" show-password />
      </el-form-item>
      <el-form-item class="auto-login-item">
      </el-form-item>
    </el-form>
    <button
      class="login-btn"
      @click="handleValidateForm"
    >
      {{ btnText }}
    </button>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { userLogin, userRegister, userForget } from '../../api/user'
import { ERR_OK } from '../../api/config'
import {setToken} from "../../utils/auth";
export default {
  props: {
    index: Number
  },
  data () {
    const checkToPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    const rules = {
      username: [
        { required: true, message: '请输入手机号/邮箱', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ],
      checkPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: checkToPassword, trigger: 'blur' }
      ],
      verifyCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
      ]
    }
    return {
      isLoading: false,
      rules: rules,
      isDisabled: false,
      flag: true,
      buttonText: '发送验证码',
      loginForm: {
        username: '',
        password: '',
        checkPassword: '',
        verifyCode:''
      }
    }
  },
  mounted () {
    // 自动聚焦
    const usernameRef = this.$refs.username
    const passwordRef = this.$refs.password
    if (!this.loginForm.username) {
      usernameRef.focus()
    } else if (!this.loginForm.password) {
      passwordRef.focus()
    }
    // 监听enter事件
    window.addEventListener('keyup', this.handleListenKeyup)
  },
  methods: {
    // 表单校验
    handleValidateForm () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.handleBtnClick()
        }
      })
    },
    // <!--发送验证码-->
    sendCode () {
      this.$refs['loginForm'].validateField('username', valid => {
        console.log(valid)
        if (!valid) {
          let time = 60
          this.buttonText = '重新发送 ' + time
          this.isDisabled = true
          if (this.flag) {
            this.flag = false;
            let timer = setInterval(() => {
              time--;
              this.buttonText = '重新发送 ' + time
              if (time === 0) {
                clearInterval(timer);
                this.buttonText = '重新发送'
                this.isDisabled = false
                this.flag = true;
              }
            }, 1000)
          }
        }
      })
    },
    // 按钮点击
    handleBtnClick () {
      const params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      }
      if (this.index !== 0){
        params.checkPassword = this.loginForm.checkPassword
      }
      if (this.index === 2){
        params.verifyCode = this.loginForm.verifyCode
      }
      // 判断是登陆还是注册
      const func = this.index === 0 ? userLogin : (this.index === 1 ? userRegister : userForget)
      const tips = this.index === 0 ? '登录' : (this.index === 1 ? '注册' : '重置密码')
      this.isLoading = true
      func(params).then(res => {
        this.isLoading = false
        let { error, data} = res
        if (error !== ERR_OK) {
          return false
        }
        this.$message.success(`${tips}成功`)
        this.loginForm = {}
        //token
        setToken(data.token, 1800)
        // 缓存用户数据
        data.token = undefined
        this.setUserInfo(data)
        // 关闭弹窗
        this.setShowLogin(false)
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
        this.$message.error('服务器异常')
      })
    },
    // 监听页面enter事件
    handleListenKeyup (e) {
      if (e.keyCode === 13) {
        this.handleValidateForm()
      }
    },
    // vuex
    ...mapMutations('login', {
      'setUserInfo': 'SET_USER_INFO',
      'setShowLogin': 'SET_SHOW_LOGIN'
    })
  },
  watch: {
    index () {
      this.$refs.loginForm.resetFields()
    }
  },
  computed: {
    btnText () {
      let text = ''
      if (this.index === 0) {
        text = this.isLoading ? '登录中...' : '登录'
      } else if (this.index === 1) {
        text = this.isLoading ? '注册中...' : '注册'
      }else {
        text = this.isLoading ? '提交中...' : '重置密码'
      }
      return text
    }
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.handleListenKeyup)
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/login-form.styl';
  .code >>> .el-form-item__content {
    display: flex;
  }
  .code button {
    margin-left: 5px;
    border :none!important;
  }
</style>
