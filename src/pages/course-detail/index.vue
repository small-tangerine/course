<template>
  <div class="course-detail">
    <!-- 头部 -->
    <course-header v-if="courseDetail.id" :base="courseDetail" />
    <!-- 内容部分 -->
    <course-content v-if="courseDetail.id" :data="courseDetail" />
    <empty v-else message="无效的课程信息">
      <template slot="info">
        <div style="margin-top: 15px;"> <a href="/home">返回首页</a></div>
      </template>
    </empty>
  </div>
</template>
<script>
import CourseHeader from './header.vue'
import CourseContent from './content.vue'
import {getLessonDetail} from 'api/lesson.js'
import {ERR_OK} from 'api/config.js'
import empty from "components/empty/empty";

export default {
  name: 'CourseDetail',
  data () {
    return {
      courseDetail: {
        base: {}
      }
    }
  },
  mounted () {
    this.getCourseDetailData()
  },

  methods: {
    // 获取课程详情
    getCourseDetailData () {
      const params = {
        alias: this.$route.params.id
      }
      getLessonDetail(params).then(res => {
        let {error, data} = res
        if (error === ERR_OK) {
          this.courseDetail = data
        } else {
          this.courseDetail = {}
        }
      }).catch(() => {
        this.courseDetail = {}
        this.$message.error('接口异常')
      })
    }
  },
  components: {
    CourseHeader,
    CourseContent,
    empty
  }
}
</script>
