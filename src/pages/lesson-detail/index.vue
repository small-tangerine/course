<template>
  <div class="lesson-detail">
    <!-- 头部 -->
    <lesson-header :base="detail" />

    <!-- 内容部分 -->
    <lesson-content v-if="Object.keys(detail).length" :data="detail" />
  </div>
</template>
<script>
import LessonHeader from './header.vue'
import LessonContent from './content.vue'
import { getLessonDetail } from 'api/lesson.js'
import { ERR_OK } from 'api/config.js'
export default {
  data () {
    return {
      detail: {},
      alias:undefined
    }
  },
  mounted () {
    this.alias = this.$route.params.id
    this.getLessonDetailData()
  },
  methods: {
    // 获取课程详情
    getLessonDetailData () {
      const params = {
        alias: this.alias
      }
      getLessonDetail(params).then(res => {
        let { error, data, msg } = res
        if (error === ERR_OK) {
          this.detail = data || {}
        } else {
          this.detail = {}
          this.$message.error(msg)
        }
      }).catch(() => {
        this.detail = {}
        this.$message.error('接口异常')
      })
    }
  },
  components: {
    LessonHeader,
    LessonContent
  }
}
</script>
<style lang="stylus" scoped>

</style>
