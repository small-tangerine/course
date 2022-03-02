<template>
  <div class="search-wrapper">
    <input v-model="keyword" type="text" placeholder="搜索感兴趣的内容" @focus="isFocus=true" @blur="isFocus=false" @keyup.enter="getSearchList">
    <i class="iconfont" @click="getSearchList">&#xe63c;</i>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isFocus: false,
      keyword: ''
    }
  },
  methods: {
    // 获取搜索热词
    getSearchList () {
      this.$emit("searchList", this.keyword)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .search-wrapper
    position: relative;
    float: right;
    width: 466px;
    height: 60px;
    line-height: 60px;
    .iconfont
      position: absolute;
      right: 15px;
      top: 20px;
      font-size: 24px;
      color: $font-four-color;
      cursor: pointer;
      line-height: 1;
    input
      padding: 0 16px;
      width: 100%;
      height: 36px;
      box-sizing: border-box;
      line-height: 36px;
      border-radius: 5px;
      outline: none;
      background: #f3f5f6;
      font-size: 14px;
      color: $font-first-color;
    .search-result
      z-index: 99;
      position: absolute;
      left: 0;
      top: 52px;
      right: 0;
      background-color: #fff;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      box-shadow: 0 4px 8px 0 $shadow;
      .result-item
        padding-left: 20px;
        line-height: 50px;
        color: $font-first-color;
        cursor: pointer;
        font-size: 14px;
        &:hover
          background: #f3f5f6;
</style>
