<template>
  <div class="lesson-nav-container">
    <div class="lesson-nav">
      <ul class="ml-center">
        <li
          v-for="(item,index) in categoryList"
          :key="index"
          class="nav-item"
          :class="{active: index === currentCategoryIndex}"
          @click="handleCategoryClick(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <dl class="label-list ml-center">
      <dd
        v-for="(label,index) in currentLabels"
        :key="index"
        class="label-item"
        :class="{active: index === currentLabelIndex}"
        @click="handleLabelClick(label, index)"
      >
        {{ label.title }}
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: {
    nav: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentCategoryIndex: 0,
      currentLabelIndex: 0
    }
  },
  methods: {
    // 主分类点击事件
    handleCategoryClick (item, index) {
      this.currentCategoryIndex = index
      this.currentLabelIndex = 0
      this.$emit('update:params', this.emitParams)
    },
    // 标签点击事件
    handleLabelClick (label, index) {
      this.currentLabelIndex = index
      this.$emit('update:params', this.emitParams)
    }
  },
  computed: {
    categoryList () {
      if (this.nav.length === 0) {
        return []
      }
      let categoryList = []
      this.nav.forEach(nav => {
        const findIndex = categoryList.findIndex(item => item.title === nav.parentTitle)
        if (findIndex  === -1) {
          categoryList.push({
            title: nav.parentTitle,
            code: nav.parentId,
            sort: nav.parentDisplayOrder,
            list: [nav]
          })
        } else {
          categoryList[findIndex].list.push(nav)
        }
      })
      categoryList.unshift({
        title: '全部',
        code: 0,
        sort: -1,
        list: []
      })
      categoryList.sort(function (a, b) {
        return a.sort - b.sort
      })
      return categoryList
    },
    currentLabels () {
      const currentCategory = this.categoryList[this.currentCategoryIndex]
      let ret = []
      if (!currentCategory) {
        return []
      } else if (currentCategory.title !== '全部') {
        ret = currentCategory.list.slice()
        ret.unshift({
          title: '不限',
          id: 0,
          displayOrder: -1
        })
        ret.sort(function (a, b) {
          return a.displayOrder - b.displayOrder
        })
        return ret
      } else {
        ret = this.categoryList.map(item => item.list).reduce((prev, curr) => {
          return prev.concat(curr)
        }, [])
        ret.unshift({
          title: '不限',
          id: 0,
          displayOrder: -1
        })
        ret.sort(function (a, b) {
          return a.id - b.id
        })
        return ret
      }
    },
    emitParams () {
      const category = this.categoryList[this.currentCategoryIndex]
      const label = this.currentLabels[this.currentLabelIndex]
      return {
        category: category.code === 0 ? undefined : category.code,
        label: label.id === 0 ? undefined : label.id
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .lesson-nav-container
    .lesson-nav
      z-index: 1;
      padding: 16px 0;
      box-sizing: border-box;
      box-shadow: 0 8px 16px 0 rgba(7,17,27,0.1)
      background-color: #fff;
      .nav-item
        position: relative;
        display: inline-block;
        margin-right: 46px;
        height: 40px;
        line-height: 40px;
        color: $font-first-color;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        &:hover
          color: $theme-orange-dark-color;
        &.active
          color: $theme-orange-dark-color;
          &::after
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            margin-left: -8px;
            width: 16px;
            height: 3px;
            background-color: $theme-orange-dark-color;
            border-radius: 2px;
    .label-list
      margin-top: 24px;
      .label-item
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 12px;
        padding: 0 12px;
        line-height: 32px;
        border-radius: 6px;
        font-size: 14px;
        color: $font-second-color;
        cursor: pointer;
        &:hover
          color: $theme-orange-dark-color;
          background-color: rgba(204,136,0,.1);
        &.active
          color: $theme-orange-dark-color;
          background-color: rgba(204,136,0,.1);
</style>
