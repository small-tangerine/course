<template>
  <ul class="login-area">
    <li class="item cart" @mouseenter="showMiniCart = true" @mouseleave="handleCarItemtMouseLeave">
      <a href="javascript:">
        <i class="iconfont">&#xe63b;</i>
        <span class="login-text">购物车</span>
        <div class="mini-chart-container" @mouseenter="handleCartMouseEnter" @mouseleave="showMiniCart = false">
          <mini-cart v-if="showMiniCart" :list="cartList" @close="showMiniCart=false" />
        </div>
      </a>
    </li>
    <template v-if="userInfo && userInfo.id">
      <li class="item userinfo" @mouseenter="showUserInfo = true" @mouseleave="showUserInfo = false">
        <div class="img-box">
          <img :src="userInfo.avatar" alt="">
        </div>
        <div v-show="showUserInfo" class="userinfo-wrapper">
          <div class="userinfo-message-wrapper" style="justify-content: center">
            <img :src="userInfo.avatar" alt="">
          </div>
          <p class="name ellipsis" style="text-align: center;line-height: 3">
            {{ userInfo.nickname }}
          </p>
          <div class="fast-nav" @click.stop="showUserInfo = false">
            <router-link to="/user/course">
              <div class="fast-nav-item">
                <i class="iconfont">&#xe60e;</i>
                我的课程
              </div>
            </router-link>
            <router-link to="/order">
              <div class="fast-nav-item">
                <i class="iconfont">&#xe611;</i>
                订单中心
              </div>
            </router-link>
            <router-link to="/user">
              <div class="fast-nav-item">
                <i class="iconfont">&#xe680;</i>
                个人设置
              </div>
            </router-link>
          </div>
          <p class="exit-btn">
            <span @click="handleUserLogout">安全退出</span>
          </p>
        </div>
      </li>
    </template>
    <li v-else class="item sign">
      <span class="sign-btn" @click="handleLoginClick">登录</span>/
      <span class="sign-btn" @click="handleRegisterClick">注册</span>
    </li>
  </ul>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isDot: false,
      cartList: [],
      showMiniCart: false,
      showUserInfo: false
    }
  },
  methods: {
    // 购物车：项鼠标移出
    handleCarItemtMouseLeave () {
      this.timer = setTimeout(() => {
        this.showMiniCart = false
      }, 150)
    },
    // 购物车：鼠标移入
    handleCartMouseEnter () {
      clearTimeout(this.timer)
    },
    // 登录点击
    handleLoginClick () {
      this.setShowLogin(true)
      this.setLoginAction('login')
    },
    // 注册点击
    handleRegisterClick () {
      this.setShowLogin(true)
      this.setLoginAction('register')
    },
    // 安全退出
    handleUserLogout () {
      this.logout().then(() => {
        this.showUserInfo = false
        this.$router.push('/home')
      }).catch(() => {
        this.$message.error('退出登录失败')
      })
    },
    // vuex
    ...mapMutations('login', {
      'setShowLogin': 'SET_SHOW_LOGIN',
      'setLoginAction': 'SET_LOGIN_ACTION',
      'setUserInfo': 'SET_USER_INFO'
    }),
    ...mapActions('login', {
      'logout': 'logout'
    })
  },
  computed: {
    // vuex
    ...mapGetters(['userInfo'])
  },
  components: {
    MiniCart: () => import('components/cart/cart.vue')
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl'
  .login-area
    float: right;
    position: relative;
    .item
      float: left;
      line-height: 72px;
      font-size: 14px;
      color: #71777d;
      &:hover
        .login-text
          color: $red
      &.invite > a
        display: block;
        width: 100px;
        text-align: center;
        & > img
          margin-right: 8px
          dispaly: inline-block;
          vertical-align: middle;
        & > span
          dispaly: inline-block;
          vertical-align: middle;
      &.download
        position: relative;
        line-height: 74px;
        & > a
          display: block;
          padding: 0 12px;
          width: 60px;
      &.cart
        position: relative;
        margin: 18px 0;
        padding: 0 18px;
        border: 1px solid #d9dde1;
        border-radius: 18px;
        line-height: 36px;
        cursor: pointer;
        &:hover
          background-color: #f8fafc;
        .iconfont
          margin-right: 5px;
          font-weight: 700;
        .mini-chart-container
          z-index: 999;
          position: absolute;
          right: 0;
          top: 53px;
      &.sign
        margin-left: 10px;
        .sign-btn
          display: inline-block;
          padding: 0 18px;
          cursor: pointer;
          &:hover
            color: $red;
      &.bell
        padding: 2px 20px 0;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        .mooc-badge
          line-height: 1;
          .iconfont
            font-size: 22px;
        &:hover
          .iconfont
            color: #F01414
      &.userinfo
        position: relative;
        padding: 0 20px 0 15px;
        height: 75px;
        cursor: pointer;
        &:hover
          .img-box
            box-shadow: 0 0 0 2px #F01414;
        .img-box
          margin-top: 22px;
          width: 32px;
          height: 32px;
          background-color: #ccc;
          border-radius: 50%;
          &>img
            display:block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        .userinfo-wrapper
          z-index: 999;
          position: absolute;
          right: 0;
          top: 72px;
          width: 170px;
          padding: 24px;
          background-color: #fff;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          box-shadow: 0 4px 8px $shadow;
          box-sizing: border-box;
          .userinfo-message-wrapper
            display: flex;
            align-items: center;
            & > img
              display: block;
              margin-right: 20px;
              width: 72px;
              height: 72px;
              border-radius: 50%;
          .fast-nav
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
            .fast-nav-item
              flex: 0 0 126px;
              width: 126px;
              height: 36px;
              margin-right: 2px;
              margin-bottom: 2px;
              line-height: 36px;
              color: #4d555d;
              background-color: #F8FAFC;
              border-radius: 2px;
              text-indent: 10px;
              &:hover
                background-color: #D9DDE1;
              .iconfont
                margin-right: 5px;
                color: #000;
                font-weight: 700;
                font-size: 16px;
              a
                color: #000;
          .course-history
            position: relative;
            margin-bottom: 8px;
            padding-bottom: 16px;
            border-bottom: 1px solid #edf1f2;
            color: #787d82;
            line-height: 1;
            .iconfont
              display: inline-block;
              vertical-align: middle;
              font-size: 16px;
              font-weight: 700;
            span
              padding-left: 4px;
              width: 90%;
              display: inline-block;
              vertical-align: middle;
              &.course-name
                font-weight: 700;
                line-height: 24px;
              &.course-chapter
                width: calc(90% - 20px);
                margin-top: 8px;
                padding-left: 20px;
              &.course-btn
                position: absolute;
                right: 0;
                bottom: 15px;
                text-align: right;
                color: #00b43c;
          .exit-btn
            line-height: 24px;
            text-align: center;
            & > span
              font-size: 14px;
              line-height: 24px;
            &:hover
              color: #F01414;
</style>
