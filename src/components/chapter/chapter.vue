<template>
  <div class="chapter">
    <div v-if="catalog.introduction" class="chapter-introduce">
      {{ catalog.introduction }}
    </div>
    <div v-if="catalog.videos &&(catalog.videos || []).length>0" class="chapter-item">
      <ul>
        <li v-for="(term, index) in catalog.videos" :key="index" class="term-item" @click="goToVideo(term)">
          <p>
            <span class="iconfont play">&#xe615;</span>
            <span>{{ term.title }}({{ term.videoLength | filterSecond }})</span>
            <span class="right">
              <i v-if="term.isFinish === 1" class="iconfont complete">&#xe60f;</i>
              <span v-else-if="term.isFinish === 2" class="doning">
                最近学习
                <i class="iconfont">&#xe601;</i>
              </span>
              <i v-else class="iconfont ready">&#xe6e8;</i>
            </span>
          </p>
        </li>
      </ul>
    </div>
    <empty v-else message="该课程暂无教学视频" />
    <p v-if="catalog.isFinish" class="complete-info">
      <i class="iconfont">&#xe786;</i>
      本课程已完结
    </p>
  </div>
</template>
<script>
import { normalSeconds } from 'utils/utils.js'
import empty from "components/empty/empty";
import {getToken} from "utils/auth";
export default {
  components:{
    empty
  },
  props: {
    catalog: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods:{
    goToVideo (item){
      if (getToken()){
        this.$emit('goToVideo', item)
      }else {
        this.setShowLogin(true)
        this.setLoginAction('login')
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
  .chapter
    & > div
      margin-bottom: 16px;
      padding: 24px 32px 32px;
      background-color: #fff;
      box-shadow: 0 8px 16px rgba(7,17,27,0.1);
      border-radius: 12px;
      color: #1c1f21;
      font-size: 14px;
      &.chapter-introduce
        line-height: 28px;
      &.chapter-item
        .chapter-title
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
        .chapter-desc
          margin-top: 2px;
          margin-bottom: 16px;
          font-size: 12px;
          color: #545c63;
        .term-item
          width: 100%;
          padding-left: 12px;
          line-height: 48px;
          cursor: pointer;
          & > p
            display: flex;
            align-items: center;
            & > span
              &:nth-child(2)
                flex: 1;
          &:hover
            background-color: rgba(242,13,13,.05);
            border-radius: 4px;
            color: #f20d0d;
            .play
              color: #f20d0d;
            .right
              & > i
                color: #f20d0d!important;
          .play
            margin-right: 8px;
            font-size: 24px;
            color: #9199a1;
          .right
            margin-right:15px;
            font-size: 16px;
            color: #d9dde1;
            .complete, .doning
              color: #00b43c;
              font-size: 12px;
            .doning
              i
                margin-left: 10px;
                font-size: 12px;
    .complete-info
      margin-bottom: 16px;
      padding: 12px 0 12px 32px;
      font-size: 16px;
      color: #93999f;
      line-height: 24px;
      .iconfont
        display: inline-block;
        vertical-align: middle;
        margin-right: 12px;
        font-size: 24px;
</style>
