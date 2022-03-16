<template>
  <div class="user-center m-center">
    <div class="user-center-container">
      <div class="user-left-nav">
        <div class="user-avatar">
          <img :src="avatar" title="点击上传头像" alt="" @click="editCropper()">
        </div>
        <p class="user-name ellipsis">
          {{ userInfo.nickname }}
        </p>
        <p class="user-id">
          ID: {{ userInfo.uid }}
        </p>
        <dl class="user-nav">
          <dt class="nav-title">
            账户管理
          </dt>
          <dt
            v-for="(item,index) in navList"
            :key="index"
            class="nav-item"
            :class="{active: currentNavIndex===index}"
            @click="handleNavClick(item,index)"
          >
            {{ item.title }}
            <i class="iconfont">&#xe627;</i>
          </dt>
        </dl>
      </div>
      <component
        :is="componentName"
        v-if="Object.keys(userInfo).length > 0"
        class="user-right-content"
        :userinfo="userInfo"
        @componentClick="handleComponentClick"
      />
      <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body @open="modalOpened">
        <el-row>
          <el-col :xs="24" :md="12" :style="{height: '350px'}">
            <vue-cropper
              ref="cropper"
              :img="options.img"
              :info="true"
              :auto-crop="options.autoCrop"
              :auto-crop-width="options.autoCropWidth"
              :auto-crop-height="options.autoCropHeight"
              :fixed-box="options.fixedBox"
              enlarge="1"
              @realTime="realTime"
            />
          </el-col>
          <el-col :xs="24" :md="12" :style="{height: '350px'}">
            <div class="avatar-upload-preview">
              <img v-if="visible" :src="previews.url" :style="previews.img" alt="">
            </div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :lg="2" :md="2">
            <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
              <el-button size="small">
                上传
                <i class="el-icon-upload el-icon--right" />
              </el-button>
            </el-upload>
          </el-col>
          <el-col :lg="{span: 1, offset: 2}" :md="2">
            <el-button icon="el-icon-plus" size="small" @click="changeScale(1)" />
          </el-col>
          <el-col :lg="{span: 1, offset: 1}" :md="2">
            <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)" />
          </el-col>
          <el-col :lg="{span: 1, offset: 1}" :md="2">
            <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()" />
          </el-col>
          <el-col :lg="{span: 1, offset: 1}" :md="2">
            <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()" />
          </el-col>
          <el-col :lg="{span: 2, offset: 6}" :md="2">
            <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import AccountBind from "./account-bind.vue"
import Information from "./information.vue"
import { updateUserAvatar } from 'api/user'
import { mapGetters, mapMutations } from 'vuex'
import store from "../../store";
import {VueCropper} from "vue-cropper";
import {subUrlFileName} from "utils/utils";

export default {
  data () {
    return {
      componentName: "account-bind",
      currentNavIndex: 0,
      navList: [],
      fileName: subUrlFileName(store.getters.userInfo.avatar),
      // 是否显示弹出层
      open: false,
      visible: true,
      width: undefined,
      // 弹出层标题
      title: '修改头像',
      options: {
        img: store.getters.userInfo.avatar, // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {}
    };
  },
  created () {
    this.navList = [
      { id: 1, title: "账号绑定", componentName: "account-bind" },
      { id: 2, title: "个人信息", componentName: "information" }
    ];
  },
  // vuex
  ...mapMutations('login', {
    'setUserInfo': 'SET_USER_INFO',
  }),
  methods: {
    // 打开弹出层结束时的回调
    modalOpened () {
      this.visible = true
    },
    // 编辑头像
    editCropper () {
      this.open = true
    },
    // 覆盖默认的上传行为
    requestUpload () {
    },
    // 向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 上传预处理
    beforeUpload (file) {
      if (file.type.indexOf('image/') === -1) {
        this.$message.error('请上传正确的图片')
      } else {
        this.fileName = file.name
        this.previews = {}
        this.options.img = ''
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.options.img = reader.result
        }
      }
    },
    // 上传图片
    uploadImg () {
      this.$refs.cropper.getCropBlob(data => {
        const formData = new FormData()
        formData.append('image', data, this.fileName)
        updateUserAvatar(formData).then(res => {
          console.log(res)
          if (res.error === 0) {
            this.$message.success(res.msg)
            this.open = false
            // 缓存用户数据
            this.setUserInfo(res.data)
          }
        }).catch(() => {
          this.open = false
        })
      })
    },
    // 实时预览
    realTime (data) {
      console.log(data)
      this.previews = data
    },
    // 导航点击事件
    handleNavClick (item, index) {
      this.currentNavIndex = index
      this.componentName = item.componentName
    },
    // 动态组件点击事件
    handleComponentClick (data) {
      this.setUserInfo(data)
    },
    // vuex
    ...mapMutations({
      'setUserInfo': 'login/SET_USER_INFO'
    })
  },
  computed: {
    ...mapGetters(['userInfo']),
    avatar () {
      return store.getters.userInfo.avatar
    }
  },
  components: {
    AccountBind,
    Information,
    VueCropper
  }
};
</script>

<style lang="stylus" scoped>
.user-center
  margin: 30px auto;
  min-height: 700px;
  background-color: #fefefe;
  .user-center-container
    display: flex;
    align-items: flex-start;
    .user-left-nav
      flex: 0 0 216px;
      width: 216px;
      margin-right: 48px;
      background-color: #f8fafc;
      text-align: center;
      .user-avatar
        margin: 32px auto 8px;
        width: 92px;
        height: 92px;
        border: 4px solid #d9dde1;
        box-sizing: border-box;
        border-radius: 50%;
        & > img
          dispaly: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
      .user-name
        font-size: 16px;
        line-height: 24px;
      .user-id
        margin: 8px 0 6px;
        font-size: 12px;
        color: #545c63;
      .user-nav
        text-align: left;
        .nav-title
          margin: 0 24px 10px;
          padding: 12px 0;
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          border-bottom: 1px solid #ddd;
        .nav-item
          padding-left: 54px;
          height: 48px;
          line-height: 48px;
          font-size: 14px;
          color: #1c1f21;
          cursor: pointer;
          &.active
            color: #fff !important;
            background-color: #ef1515 !important;
            .iconfont
              color: inherit;
          &:hover
            background-color: #f2f4f6;
            color: #ef1515;
            .iconfont
              color: inherit;
          .iconfont
            float: right;
            margin-right: 25px;
            font-size: 14px;
            color: #b5b9bc;
    .user-right-content
      flex: 1;
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
