<template>
  <div class="course-list-container m-center">
    <!-- 标题 -->
    <h2 class="home-title">
      <i class="title-icon left-icon" :style="getBackgroundPosition(true)" />
      {{ title }}
      <i class="title-icon right-icon" :style="getBackgroundPosition(false)" />
    </h2>

    <!-- 课程列表 -->
    <course-list v-if="list.length" class="course-list" :list="list" />
  </div>
</template>
<script>
import CourseList from 'components/course/course.vue'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: String,
    position: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getBackgroundPosition (isLeft) {
      return {
        'background-position': `center ${ - (isLeft ? this.position : this.position + 1) * 36}px`
      }
    }
  },
  computed: {
    currentBanner () {
      return this.bannerList[this.type]
    }
  },
  components: {
    CourseList
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  @import '~assets/stylus/mixin.styl';
  .course-list-container
    padding: 36px 0 48px;
    .split-banner
      display: flex;
      align-items: center;
      margin-top: 24px;
      .split-banner-item
        position: relative;
        flex: 1;
        margin: 0 8px 16px 8px;
        height: 108px;
        background-color: rgba(7,17,27,0.5);
        & > img
          display: block;
          width: 100%;
          height: 100%;
          background-color: #ccc;
          border-radius: 8px;
        .title
          z-index: 3;
          position: absolute;
          left: 0;
          right: 0;
          color: #fff;
          text-align: center;
          &.main
            top: 30%;
            font-size: 20px;
            line-height: 28px;
            font-weight: 700;
          &.sub
            top: 55%;
            font-size: 12px;
            line-height: 24px;
        .mask
          z-index: 1;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: rgba(7,17,27,0.4);
          border-radius: 8px;
    .course-list
      margin-top: 24px;
</style>
