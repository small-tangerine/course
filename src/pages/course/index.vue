<template>
  <div class="course mx-center">
    <!-- 搜索模块 -->
    <div class="course-search">
      <div class="search-tag">
        <img src="https://www.imooc.com/static/img/course/logo-course2.png" width="96" height="60" alt="">
        <img src="https://www.imooc.com/static/img/course/course-top.png" style="margin-bottom: 17px;" alt="">
      </div>
      <course-search @searchList="getCourseListData" />
    </div>

    <!-- 导航模块 -->
    <course-nav v-if="navList.length" :list="navList" :params.sync="params" />

    <!-- 课程列表 -->
    <course-list :list="courseList" :sort.sync="sort" />

    <!-- 分页 -->
    <pagination v-if="total>0" :total="total" :page.sync="page" :size="size" @change="handlePaginationChange" />
  </div>
</template>
<script>
import CourseSearch from './search.vue'
import CourseNav from './nav.vue'
import CourseList from './list.vue'
import Pagination from '../../components/pagination/pagination'
import { getLessonNav, getLessonList } from 'api/lesson'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      sort: 0,
      params: {},
      navList: [],
      courseList: [],
      page: 1,
      size: 15,
      total: 0
    }
  },
  mounted () {
    this.getCourseNavList()
    this.getCourseListData()
  },
  methods: {
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getCourseListData()
    },
    // 获取课程导航信息
    getCourseNavList () {
      getLessonNav().then(res => {
        let { error, data } = res
        if (error === ERR_OK) {
          this.navList = data
        } else {
          this.navList = []
          this.$message.error('获取课程分类数据失败')
        }
      }).catch(() => {
        this.navList = []
        this.$message.error('接口异常')
      })
    },
    // 获取课程信息接口
    getCourseListData (keyword) {
      const params = {
        page: this.page,
        size: this.size,
        keyword:keyword,
        type: 1,
        category: this.params.direction || 0,
        label: this.params.category || 0,
        sort: this.sort
      }
      getLessonList(params).then(res => {
        let { error, data, msg } = res
        if(error === ERR_OK) {
          const {items, totalCount} = data || []
          this.courseList = items || []
          this.total = totalCount || 0
        } else {
          this.courseList = []
          this.total = 0
          this.$message.error(msg)
        }
      }).catch(() => {
        this.courseList = []
        this.total = 0
        this.$message.error('接口异常')
      })
    }
  },
  watch: {
    params () {
      this.page = 1
      this.getCourseListData()
    },
    sort () {
      this.getCourseListData()
    }
  },
  components: {
    CourseSearch,
    CourseNav,
    CourseList,
    Pagination
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .course
    padding-top: 20px;
    .course-search
      padding: 12px 0;
      border-bottom: 1px solid $border-second-color;
      .search-tag
        display: inline-block;
        & > img:nth-child(2)
          margin-left: 16px;
</style>
