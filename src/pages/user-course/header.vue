<template>
  <div class="course-header">
    <div class="m-center">
      <div class="left">
        <div class="img-box">
          <img :src="userInfo.avatar" alt="">
        </div>
        <div class="user-info">
          <p class="name">
            {{ userInfo.nickname }}
          </p>
          <p class="other">
            <span>{{ userInfo.sex === 'male' ? '男' : userInfo.sex === 'female' ? '女':'保密' }}</span>
            <span>{{ userInfo.job }}</span>
          </p>
        </div>
      </div>
      <div class="right">
        <dl>
          <dd>
            <span>{{ learn |filterSecond}}分钟</span>
            <span>学习时长</span>
          </dd>
          <dt>
            <router-link class="setting" to="/user">
              <i class="iconfont">&#xe680;</i>个人设置
            </router-link>
          </dt>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {getUserLearn} from "api/user";
import {ERR_OK} from "api/config";
import {normalSeconds} from "utils/utils";
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },data(){
    return{
      learn:0
    }
  },
  created () {
    getUserLearn().then(res=>{
      if (res.error===ERR_OK){
        const { data } =res || {}
        this.learn= data.learn || 0
      }
    })
  },  filters: {
    filterSecond (val) {
      return normalSeconds(val)
    }
  },
}
</script>
<style lang="stylus" scoped>
  .course-header
    padding-top: 24px;
    width: 100%;
    height: 148px;
    background: url('~@/assets/images/course-bg.png') no-repeat center top;
    background-size: cover;
    box-sizing: border-box;
    color: #fff;
    .left
      float: left;
      display: flex;
      align-items: center;
      .img-box
        margin-right: 20px;
        flex: 0 0 140px;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 4px solid #fff;
        & > img
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
      .user-info
        margin-top: -40px;
        .name
          font-size: 24px;
          line-height: 38px;
          color: #fff;
          font-weight: 600;
        .other
          margin-top: 6px;
          font-size: 14px;
          color: #fff;
          & > span
            display: inline-block;
            margin-right: 10px;
    .right
      float: right;
      margin-top: 24px;
      dl
        dt,dd
          display: inline-block;
          vertical-align: middle;
          margin-right: 24px;
          & > span
            display: block;
            font-size: 14px;
            color: rgba(255,255,255,0.8);
            text-align: center;
            line-height: 24px;
            &:first-child
              margin-bottom: 4px;
              font-size: 26px;
              font-weight: 700;
        dt
          margin-right: 24px;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,.4);
          border-radius: 18px;
          line-height: 20px;
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          cursor: pointer;
          &:hover
            border-color: rgba(255,255,255,1);
            color: #fff;
          .iconfont
            padding-right: 5px;
          .setting
            font-size: 14px;
            color: rgba(255,255,255,0.8);
</style>
