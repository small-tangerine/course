<template>
  <div class="mini-cart" @click="handleCloseClick">
    <!-- 列表 -->
    <dl>
      <dt class="title">
        我的购物车
        <span class="total">共加入{{ total }}门课程</span>
      </dt>
      <el-scrollbar>
        <div v-if="cartList.length > 0" class="cart-item-wrapper">
          <div v-for="(item,index) in cartList" :key="index" class="cart-item" @click="handleCartItemClick">
            <div class="img-box">
              <img :src="item.img" alt="">
            </div>
            <div class="cart-content">
              <p class="name">
                {{ item.title }}
              </p>
              <p class="price-box">
                <span class="price">¥ {{ item.price }}</span>
                <span class="delete" @click.stop="handleDeleteClick(item)">删除</span>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="empty-box">
          <span class="iconfont">&#xe63b;</span>
          <h2 class="empty-title">
            购物车里空空如也
          </h2>
          <p class="empty-desc">
            快去选购你中意的课程
          </p>
          <router-link class="empty-link" tag="p" to="/lesson">实战课程</router-link>
        </div>
      </el-scrollbar>
    </dl>

    <!-- 底部 -->
    <div class="cart-bottom">
      <router-link class="text" to="/order">我的订单中心</router-link>
      <router-link class="account-btn" to="/cart">去购物车</router-link>
    </div>
  </div>
</template>
<script>
import {getCartList, deleteCart} from "../../api/cart";
import {ERR_OK} from "../../api/config";
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      cartList: [],
      total:0,
    }
  },
  mounted () {
    if (this.userInfo && this.userInfo.id) {
      this.getCartListData()
    }
  },
  methods: {
    // emit父组件事件
    handleCloseClick () {
      this.$emit('close')
    },
    // 购物车课程点击
    handleCartItemClick () {
      this.$router.push({ path: '/lesson', query: { id: new Date().getTime() } })
      this.$emit('close')
    },
    // 购物车课程删除点击
    handleDeleteClick (item) {
      const params = {
        id: item.id
      }
      deleteCart(params).then(res => {
        const { error, msg } = res
        if (error === ERR_OK) {
          this.$message.success(msg)
          this.getCartListData()
        } else {
          this.$message.error(msg)
        }
      }).catch(() => {
        this.$message.error('接口异常')
      })
    },
    // 获取购物车数据
    getCartListData () {
      getCartList().then(res => {
        let { error, data, msg } = res
        if (error === ERR_OK) {
          const { items, totalCount } = data
          this.cartList = items || []
          this.total = totalCount || 0
        } else {
          this.cartList = []
          this.total = 0
          this.$message.error(msg)
        }
      }).catch(() => {
        this.cartList = []
        this.$message.error('接口异常')
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="stylus" scoped>
  .mini-cart
    padding: 0 16px;
    width: 344px;
    border-radius: 0 0 8px 8px;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(7,17,27,0.2)
    .title
      padding: 12px;
      border-bottom: 1px solid #D3D6D9;
      color: #1C1F21;
      font-weight: 700;
      font-size: 14px;
      .total
        float: right;
        color: #9199A1;
        font-size: 12px;
    >>>.el-scrollbar
      height: 300px;
    .cart-item-wrapper
      border-bottom: 1px solid #D3D6D9;
      .cart-item
        display: flex;
        align-items: center;
        padding: 12px;
        line-height: 1;
        &:hover
          background-color: #f8fafc;
        .img-box
          flex: 0 0 100px;
          margin-right: 10px;
          width: 100px;
          height: 56px;
          & > img
            display: block;
            width: 100%;
            height: 100%;
            background-color: #eee;
        .cart-content
          flex: 1;
          color: #07111b;
          font-size: 12px;
          line-height: 16px;
          .price-box
            margin-top: 8px;
            color: rgba(240,20,20,0.6);
            .delete
              float: right;
              cursor: pointer;
              &:hover
                color: #f01414;
    .empty-box
      height: 284px;
      border-bottom: 1px solid #D3D6D9;
      text-align: center;
      .iconfont
        display: inline-block;
        padding: 36px 0 8px 0;
        font-size: 72px;
        color: #D3D6D9;
      & > p
        font-size: 14px;
        line-height: 1;
        &.empty-title
          color: #545C63;
        &.empty-desc
          margin-bottom: 8px
          color: #9199A1;
        &.empty-link
          line-height: 24px;
          color: rgba(240,20,20,0.6);
          &:hover
            color: #f01414;
    .cart-bottom
      padding: 16px 12px;
      color: #93999f;
      font-size: 12px;
      .text
        &:hover
          color: #f01414;
      .account-btn
        float: right;
        padding: 8px 26px;
        border-radius: 24px;
        background-color: #f01414;
        color: #fff;
        line-height: 16px;
        cursor: pointer;
</style>
