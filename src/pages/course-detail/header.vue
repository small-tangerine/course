<template>
  <div class="course-detail-header" :style="{ 'background-image': `url(`+base.bgImg+`)`}">
    <div class="header">
      <div class="header-content m-center">
        <p class="breadcrumb-box">
          <span>课程 \ {{ base.title }}</span>
        </p>
        <h2 class="title">
          {{ base.title }}
        </h2>
        <div class="information">
          <div v-if="base.teacher" class="teacher">
            <img :src="base.teacher.avatar" class="avatar" alt="">
            <div class="teacher-introduce">
              <p class="name">
                {{ base.teacher.name }}
              </p>
              <p class="job">
                {{ base.teacher.job }}
              </p>
            </div>
            <dl>
              <dd>时长：{{ (base.length || 0)|filterSecond }}分钟</dd>
              <dd>学习人数：{{ base.learnPersons }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {normalSeconds} from "utils/utils";

export default {
  props: {
    base: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    filterSecond (val) {
      return normalSeconds(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .course-detail-header
    height: 200px;
    background-image: linear-gradient(90deg, #19172D, #645DB7);
    .header
      height: 100%;
      .header-content
        position: relative;
        height: 100%;
        color: #fff;
        .breadcrumb-box
          padding: 16px 0 24px 0;
          line-height: 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        .share-box
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          & > span
            margin: 0 12px;
            &:hover
              color: #fff;
          .iconfont
            font-size: 24px;
        .title
          margin-bottom: 8px;
          font-size: 32px;
          color: #fff;
          line-height: 48px;
        .information
          .teacher
            vertical-align: middle;
            display: flex;
            align-items: center;
            .avatar
              width: 48px;
              heighth: 48px;
              border-radius: 50%;
            .teacher-introduce
              margin-left: 8px;
              .name
                font-size: 14px;
                line-height: 24px;
                font-weight: 700;
              .job
                font-size: 12px;
            dl
              flex: 1;
              margin-left: 50px;
              dd
                display: inline-block;
                vertical-align: middle;
                margin: 0 10px;
                font-size: 12px;
                font-weight: 700;
                color: rgba(255,255,255,0.8);
</style>
