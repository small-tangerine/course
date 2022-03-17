<template>
  <div>
    <div class="video-info">
      <h1 :title="learningDuration.title" class="video-title">
        <span class="tit tr-fix">{{ learningDuration.title }}</span>
      </h1>
      <div class="video-data">
        <span class="view">{{ learningDuration.personsTitle }}&nbsp;·&nbsp;</span>
        <span>{{ learningDuration.createdAt }}</span>
      </div>
    </div>
    <div id="to_this1" style="margin: 5px">
      <!--         @mouseover="mouseOnPlayerPlay"-->
      <!--         @mouseleave="mouseOnPlayerPause"-->

      <video-player ref="videoPlayer"
                    class="video-player vjs-custom-skin"

                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @ready="playerReadied"
                    @statechanged="playerStateChanged($event)"
      >
      </video-player>
    </div>
    <div v-if="catalog && (catalog.videos || []).length>1" id="to_this"
         style="display: flex;justify-content: space-between;padding: 10px 15px 0 25px;"
    >
      <span v-if="before" style="color: #7e8c8d">  上一个视频:
        <el-button style="width: 300px;overflow: hidden; text-overflow: ellipsis;" type="text" :title="beforeTitle"
                   @click="returnBefore"
        >{{ beforeTitle.title }}</el-button>
      </span>
      <span v-if="after" style="color: #7e8c8d;">下一个视频: <el-button :title="afterTitle"
                                                                   style="text-overflow: ellipsis;width: 300px;overflow: hidden;"
                                                                   type="text"
                                                                   @click="goAfter"
      >{{ afterTitle.title }}</el-button></span>
    </div>
  </div>
</template>

<script>

import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import {getAfter, getBefore} from "utils/utils";
import {getLessonSetVideo, getLessonVideo} from "api/lesson";
import {ERR_OK} from "api/config";
export default {
  props: {
    video: {
      type: Object,
      default () {
        return {}
      }
    },
    catalog: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      readly: false,
      paused: true,
      beforeTitle: undefined,
      afterTitle: undefined,
      after: true,
      before: true,
      learningDuration: {
        id: '',
        userId: '',
        type: '0',
        title: undefined,
        createdAt: undefined,
        persons: undefined,
        personsTitle: undefined,
        current:0
      },
      end:false,
      current: 0,
      thisId: undefined,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          // src: '../../static/video/test.mp4', // 路径
          src: require('../../assets/video/test.mp4'),
          type: 'video/mp4' // 类型
        }],
        poster: 'http://localhost/image/default.png', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  components: {
    videoPlayer
  },
  // 对应的methods
  methods: {
    putLearningObj () {
      if (!this.paused) {
        // 请求后台保存时间
        getLessonSetVideo(this.learningDuration).then(res=>{
          if (res.error===ERR_OK){
            if (end){
              this.paused=true
            }
          }
          if (end){
            this.paused=true
          }
        }).catch(()=>{
          this.paused =true
        })
      }
    },
    returnBefore () {
      this.setLearningDuration(this.beforeTitle)
      this.getThisVideo({videoId:this.beforeTitle.id})
      this.getTitle()
    },
    goAfter () {
      this.setLearningDuration(this.afterTitle)
      this.getThisVideo({videoId:this.afterTitle.id})
      this.getTitle()
    },
    //监听播放
    onPlayerPlay () {
      this.paused = false
      this.$refs.videoPlayer.player.play();
    },
    //监听暂停
    onPlayerPause (player) {
      this.paused = true
      this.$refs.videoPlayer.player.pause();
    },
    //监听播放状态改变
    playerStateChanged (player) {
    },
    //监听媒体是否已到达结尾，播放完
    onPlayerEnded (player) {
      this.paused = false
      this.putLearningObj()
      this.end=true
    },
    //DOM元素上的readyState更改导致播放停止。
    onPlayerWaiting (player) {
    },
    //媒体不再被禁止播放，并且已开始播放。
    onPlayerPlaying (player) {
    },
    //当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata (player) {
    },
    //当前播放位置发生变化时触发。
    onPlayerTimeupdate (player) {
      this.learningDuration.current = player.cache_.currentTime
    },
    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay (player) {
    },
    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough (player) {
    },
    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied (player) {
      if (this.readly === false) {
        player.currentTime(this.current)
      }
      this.readly = true
    },
    setLearningDuration (item) {
      Object.assign(this.learningDuration, item)
    },
    getTitle () {
      const beforeVideo = getBefore(this.catalog.videos || [], this.learningDuration)
      // console.log(beforeVideo)
      if (beforeVideo === undefined) {
        this.before = false
      } else {
        this.beforeTitle = beforeVideo
        this.before = true
      }
      const afterVideo = getAfter(this.catalog.videos || [], this.learningDuration)
      if (afterVideo === undefined) {
        this.after = false
      } else {
        this.afterTitle = afterVideo
        this.after = true
      }
    },
    getThisVideo(params){
      getLessonVideo(params).then(res=>{
        if (res.error===ERR_OK){
          const {data} =res||{}
          this.playerOptions.sources[0].src=data.url||''
          if (data.thumbUrl&&data.thumbUrl !=='')
          {
            this.playerOptions.poster = data.thumbUrl
          }
        }
      })
    },
  },
  created () {
    const thisId = this.video
    this.thisId = thisId
    this.current = thisId.current
    this.setLearningDuration(thisId)
    this.getTitle()
    this.getThisVideo({videoId:thisId.id})
    // this.playerOptions.sources[0].src = this.sysConfig.fdfsHttpHost + '/' + this.training.examAvatar
  }, mounted () {
    this.timer = setInterval(this.putLearningObj, 10000)
    const setThis = document.querySelector("#to_this") || document.querySelector("#to_this1")
    setThis.scrollIntoView(true);
  },
  destroyed () {
    // 如果定时器在运行则关闭
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="stylus">
.video-info {
  width: 900px;
  box-sizing: border-box;

  .video-title {
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .tit {
      vertical-align: middle;
    }
  }

  .video-data {
    font-size: 12px;
    height: 16px;
    color: #999;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }
}
</style>
