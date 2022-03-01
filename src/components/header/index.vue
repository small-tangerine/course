<template>
  <div class="header">
    <!-- logo -->
    <div class="logo-box">
      <router-link to="/">
        <img src="https://www.imooc.com/static/img/index/logo.png" height="60" style="margin-top: 6px" alt="Logo">
      </router-link>
    </div>

    <!-- 导航栏模块 -->
    <m-nav v-if="navList.length" :list="navList" />

    <!-- 登录模块 -->
    <login-area />
  </div>
</template>
<script>
import MNav from './nav.vue'
import LoginArea from './login.vue'
export default {
  data () {
    return {
      navList: [
        {
          "path": "/home",
          "title": "首页",
          "icon":''
        },
        {
          "path": "/course",
          "title": "免费课程",
          "icon": ""
        },
        {
          "path": "/lesson",
          "title": "付费课程",
          "icon": ""
        }
      ]
    }
  },
  components: {
    MNav,
    LoginArea
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .header
    z-index: 200;
    position: relative;
    padding-right: 10px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 4px 8px $shadow;
    .logo-box
      float: left;
      width: 140px;
      margin: 0 20px;
      height: 100%;
</style>
