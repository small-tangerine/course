<template>
  <div class="course-detail-tips" v-if="lastest.tips || lastest.learn">
    <!-- 课程须知 -->
    <div class="tips-content">
      <dl v-if="lastest.tips && (lastest.tips || []).length>0">
        <dt>课程须知</dt>
        <dd v-for="(item,index) in lastest.tips||[]" :key="index">{{ item }}</dd>
      </dl>
      <dl v-if="lastest.learn && (lastest.learn || []).length>0">
        <dt>老师告诉你能学到什么？</dt>
        <dd v-for="(item,index) in lastest.learn||[]" :key="index">{{ item }}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lastest: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .course-detail-tips
    padding: 24px 32px 32px;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
    border-radius: 12px;
    .learn-info
      padding-bottom: 12px;
      font-size: 12px;
      color: #545c63;
      & > p
        margin-bottom: 9px;
        line-height: 24px;
        &.latest
          margin-top: 24px;
          line-height: 1;
        .percent
          font-size: 14px;
          font-weight: 700;
        .duration
          float: right;
    .tips-btn
      padding: 11px 32px;
      border-radius: 24px;
      background-color: #f20d0d;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      &:hover
        background-color: #c20a0a;
    .tips-content
      dl
        margin-top: 24px;
        dt
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        dd
          color: #545c63;
          font-size: 12px;
          line-height: 24px;
</style>
