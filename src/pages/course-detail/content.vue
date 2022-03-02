<template>
  <div class="course-detail-content">
    <!-- 导航部分 -->
    <div class="detail-nav">
      <ul class="m-center">
        <li
          v-for="(nav,index) in navList"
          :key="index"
          class="nav-item"
          :class="{active: index===currentNavIndex}"
          @click="currentNavIndex = index"
        >
          {{ nav.title }}
        </li>
      </ul>
    </div>

    <!-- 内容部分 -->
    <div class="detail-information m-center">
      <div class="information-left">
        <component :is="componentName" :catalog="catalogList" />
      </div>
      <div class="information-right">
        <detail-tips :lastest="data" />
      </div>
    </div>
  </div>
</template>
<script>
import DetailTips from './tips.vue'
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      currentNavIndex: 0,
      navList: []
    }
  },
  created () {
    // 初始化导航数据
    this.navList = [
      { title: '课程', componentName: 'chapter' }
    ]
  },
  computed: {
    componentName () {
      return this.navList[this.currentNavIndex].componentName
    },
    catalogList () {
      return this.data.catalog || {}
    }
  },
  components: {
    DetailTips,
    Chapter: () => import('components/chapter/chapter.vue')
  }
}
</script>
<style lang="stylus" scoped>
  .course-detail-content
    .detail-nav
      position: relative;
      height: 68px;
      line-height: 68px;
      box-shadow: 0 4px 8px 0 rgba(7,17,27,0.15);
      .nav-item
        position: relative;
        display: inline-block;
        margin-right: 80px;
        font-size: 16px;
        color: #1c1f21;
        font-weight: 700;
        cursor: pointer;
        &.active
          color: #f20d0d;
          &::after {
            content: '';
            display: block;
            margin: -15px auto 0px;
            width: 16px;
            height: 3px;
            border-radius: 15px;
            background-color: #f20d0d;
          }
    .detail-information
      margin-top: 36px;
      margin-bottom: 36px;
      display: flex;
      align-items: top;
      .information-left
        flex: 1;
      .information-right
        margin-left: 32px;
        flex: 0 0 320px;
        width: 320px;
        & > div
          margin-bottom: 36px;
</style>
