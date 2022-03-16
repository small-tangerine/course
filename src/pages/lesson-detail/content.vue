<template>
  <div class="lesson-detail-contnet m-center">
    <!-- 导航数据 -->
    <ul class="nav-list">
      <li
        v-for="(nav,index) in navList"
        :key="index"
        class="nav-item"
        :style="nav.code === show ? 'display:none':''"
        :class="{active: currentNavIndex === index}"
        @click="currentNavIndex=index"
      >
        <span v-if="nav.code===0" class="iconfont">&#xe602;</span>
        <span v-if="nav.code===1" class="iconfont">&#xe615;</span>
        <span>{{ nav.title }}</span>
      </li>
    </ul>

    <!-- 内容部分 -->
    <div class="lesson-information">
      <div class="info-left">
        <component :is="componentName" :catalog="catalogList" :video="video" @goToVideo="goToVideo" />
      </div>
      <div class="info-right">
        <detail-teacher v-if="data && data.teacher" :teacher="data.teacher" />
      </div>
    </div>
  </div>
</template>
<script>
import DetailTeacher from './teacher.vue'
import {addCart} from "api/cart";
import {ERR_OK} from "api/config";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      currentNavIndex: 0,
      navList: [],
      video:{},
      show:1
    }
  },
  created () {
    // 初始化导航数据
    this.navList = [
      { title: '课程', code: 0, componentName: 'chapter' },
      {title: '课程视频', componentName: 'video-player', code: 1}
    ]
  },
  computed: {
    componentName () {
      return this.navList[this.currentNavIndex].componentName
    },
    catalogList () {
      return this.data || {}
    }
  },
  methods:{
    goToVideo (item) {
      if (this.data.isBuy===0 && this.data.type ===2){
        this.$confirm('请先购买该课程', '提示', {
          confirmButtonText: '加入购物车',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addCart({courseId:this.data.id}).then(res => {
            const {error, msg} = res
            if (error === ERR_OK) {
              this.$confirm('添加购物车成功', '提示', {
                confirmButtonText: '去购物车结算',
                cancelButtonText: '再逛逛',
                type: 'success'
              }).then(() => {
                this.$router.push('/cart')
              })
            }
          }).catch(() => {
            this.$message.error('接口异常')
          })
        })
        return
      }
      this.showVideo = true
      this.currentNavIndex = 1
      this.show = -1
      this.video = item
    },
  },
  components: {
    DetailTeacher,
    Chapter: () => import('components/chapter/chapter.vue'),
    VideoPlayer: () => import('components/video-player/index')
  }
}
</script>
<style lang="stylus" scoped>
  .lesson-detail-contnet
    margin-bottom: 40px;
    .nav-list
      margin-top: -60px;
      .nav-item
        display: inline-block;
        margin-right: 72px;
        padding: 12px 24px 16px;
        width: 180px;
        height: 60px;
        box-sizing: border-box;
        cursor: pointer;
        & > span
          display: inline-block;
          vertical-align: middle;
          color: rgba(255,255,255,1);
          font-size: 16px;
          &.iconfont
            margin-right: 10px;
            font-size: 32px;
            color: rgba(255,255,255,1);
        &.active
          background-color: #fff;
          border-radius: 4px 4px 0 0;
          & > span
            color: #2b333b;
            &.iconfont
              color: #f01414;
    .lesson-information
      margin-top: 24px;
      display: flex;
      align-items: flex-start;
      .info-left
        flex: 1;
      .info-right
        flex: 0 0 300px;
        margin-left: 40px;
        width: 300px;
</style>
