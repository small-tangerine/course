<template>
  <div class="home">
    <!-- 背景阴影 -->
    <div class="bg-mask" :style="getBackgroundImage" />

    <!--  实战导航 -->
    <course-list :list="lessonData.recommend" title="实／战／推／荐" type="recommend" :position="0" />

    <!-- 新上好课 -->
    <course-list :list="lessonData.new" title="新／上／好／课" type="new" :position="1" />
  </div>
</template>
<script>
import CourseList from './course-list.vue'
import { getHomeCourse} from 'api/home.js'
import { ERR_OK } from 'api/config.js'
export default {
  name: 'Home',
  data () {
    return {
      swiperList: [],
      currentSwiper: '',
      lessonData: {
        recommend: [],
        new: [],
        easy: [],
        improve: [],
        advanced: []
      }
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    // 获取课程信息
    getCourseList () {
      getHomeCourse().then(res => {
        let { error, data, msg } = res
        if (error === ERR_OK) {
          this.lessonData = data
        } else {
          this.lessonData = {}
          this.$message.error(msg)
        }
      }).catch(() => {
        this.lessonData = {}
        this.$message.error('接口异常')
      })
    }
  },
  computed: {
    getBackgroundImage () {
      return {
        'background-image': `url(${this.currentSwiper})`
      }
    }
  },
  components: {
    CourseList
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .home
    margin-top: 32px;
    min-height: 750px;
    .bg-mask
      position: absolute;
      top: 0;
      background-size: cover;
      transition: all 0.3s;
      width: 100%;
      height: 180px;
      opacity: 0.3;
      filter: blur(100px);
    .home-container
      position: relative;
      box-shadow: 0 12px 24px 0 $shadow;
      border-radius: 8px;
      .mooc-carousel
        position: absolute;
        left: 216px;
        top: 0;
        right: 0;
        >>> .mooc-carousel-indicators
          left: initial;
          right: 20px;
          transform: none;
        .swiper-img
          display: block;
          width: 100%;
          height: 316px;
          border-top-right-radius: 8px;
</style>
