<template>
  <div class="account-bind">
    <dl>
      <dt class="bind-title">
        账号绑定
        <span class="bind-rate">完成 <strong>{{ complete }}/3</strong></span>
        <mooc-button class="bind-btn" size="mini" round @click="handleEditClick">
          <i class="iconfont">&#xe600;</i>编辑
        </mooc-button>
      </dt>
      <dd class="bind-item">
        <i class="iconfont">&#xe75d;</i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">邮箱</span>
            {{ userinfo.email }}
          </p>
          <p class="bind-subtitle">可用邮箱加密码登录慕课网，可用邮箱找回密码</p>
        </div>
      </dd>
      <dd class="bind-item">
        <i class="iconfont">&#xe61a;</i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">手机</span>
            {{ userinfo.mobile }}
          </p>
          <p class="bind-subtitle">可用手机号加密码登录慕课网，可通过手机号找回密码</p>
        </div>
      </dd>
      <dd class="bind-item">
        <i class="iconfont">&#xe61e;</i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">密码</span>
          </p>
          <p class="bind-subtitle">用于保护账号信息和登录安全</p>
        </div>
      </dd>
    </dl>

    <!-- 账号绑定信息弹窗 -->
    <mooc-dialog title="编辑账号绑定信息" :visible.sync="dialogVisible" width="600px">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" label-position="right">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="editForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="editForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="editForm.password" type="password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model.trim="editForm.checkPassword" type="password" show-password placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <mooc-button size="small" @click="dialogVisible = false">关闭</mooc-button>
        <mooc-button size="small" type="primary" :disable="isLoading" @click="handleValidateForm">保存</mooc-button>
      </template>
    </mooc-dialog>
  </div>
</template>
<script>
import {updateUserBinds} from "api/user";
import {ERR_OK} from "api/config";
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    userinfo: {
      type: Object
    }
  },
  data () {
    const rules = {
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
      ],
      mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
      ]
    }
    return {
      rules: rules,
      isLoading: false,
      complete: 1,
      dialogVisible: false,
      editForm: {
        email: '',
        mobile: '',
        password: '',
        checkPassword: ''
      }
    }
  },
  mounted () {
    if (this.userInfo.email){
      this.complete++
    }
    if (this.userInfo.mobile){
      this.complete++
    }
  },
  methods: {
    // 编辑账号绑定信息
    handleEditClick () {
      this.dialogVisible = true
      this.editForm = {
        email: this.userInfo.email,
        mobile: this.userInfo.mobile,
        password: '',
        checkPassword: ''
      }
      this.$nextTick(() => {
        this.$refs.editForm.resetFields()
      })
    },
    // 校验账号绑定信息
    handleValidateForm () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.handleSaveClick()
        }
      })
    },
    // 保存账号绑定信息
    handleSaveClick () {
      this.isLoading = true
      const params = Object.assign({}, this.editForm)
      if (!this.editForm.password){
        params.password = undefined
      }
      if (!this.editForm.checkPassword){
        params.checkPassword = undefined
      }
      updateUserBinds(params).then(res => {
        this.isLoading = false
        const { error, msg, data} = res
        if (error === ERR_OK) {
          this.$message.success(msg)
          this.dialogVisible = false
          const {isUpdateUsername} = data
          if (isUpdateUsername === 1){
            // 修改成功后，退出登录，调整到首页弹窗登录框
            this.timer = setTimeout(() => {
              this.logout()
              this.$router.replace('/home')
              this.showLogin(true)
            }, 500)
          }else {
            this.setUserInfo(data)
          }
        }
      }).catch(() => {
        this.$message.error('接口异常')
        this.isLoading = false
      })
    },
    // vuex
    ...mapActions({
      'logout': 'login/logout'
    }),
    ...mapMutations({
      'showLogin': 'login/SET_SHOW_LOGIN',
      'setUserInfo': 'SET_USER_INFO',
    })
  },
  computed: {
    // vuex
    ...mapGetters(['userInfo'])
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="stylus" scoped>
  .account-bind
    .last-login-record
      margin-bottom: 20px;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background-color: #fff4e5;
      transition: all 0.1s linear;
      opacity: 1;
      font-size: 12px;
      color: #f56108;
      & > span:not(:first-child) {
        margin-left: 10px;
      }
      .iconfont
        float: right;
        margin-right: -10px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 12px;
      .record-btn
        color: #008cc8;
        cursor: pointer;
    .bind-title
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      color: #333;
      .bind-rate
        margin-left: 15px;
        font-size: 12px;
        color: #93999f;
        &>strong
          font-weight: 700;
          color: #ef1514
      .bind-btn
        float: right;
        border: none;
        font-size: 15px;
    .bind-item
      position: relative;
      display: flex;
      align-items: center;
      height: 88px;
      padding: 0 15px;
      border-top: 1px solid #d0d6d9;
      .iconfont
        flex: 0 0 60px
        width: 60px;
        height: 100%;
        line-height: 88px;
        margin-right: 20px;
        font-size: 36px;
        color: #d9dde1;
        text-align: center;
      .bind-introduction
        flex: 1;
        position: relative;
        .bind-title
          font-size: 14px;
          color: #2b333b;
          font-weight: 400;
          .bind-type
            font-size: 16px;
            font-weight: 700;
            color: #333;
        .bind-subtitle
          font-size: 14px;
          color: #93999f;
    >>> .mooc-dialog
      .mooc-dialog-body
        padding: 30px 30px 30px 20px;
</style>
