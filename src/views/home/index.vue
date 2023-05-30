<template>
  <div class="home">
    <!-- 换肤小案例 -->
    <div>
      <div style="margin: 10px 0px; font-size: 14px">
        换肤小案例(写在全局可以整项目换色，在此只是本页面换色)：点击换肤
      </div>
      <el-button color="pink" @click="handleClickColor('默认')"
        >默认样式粉色</el-button
      >
      <el-button type="success" @click="handleClickColor('绿色')"
        >绿色</el-button
      >
      <el-button type="danger" @click="handleClickColor('红色')"
        >红色</el-button
      >
      <div class="text-alternate" style="margin: 20px 0; font-size: 20px">
        样式换肤
      </div>
    </div>
    <div id="shan" v-show="true"></div>

    <video
      id="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      playsinline
      autoplay
      width="500px"
    >
      <source :src="url" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineComponent, onMounted } from "vue"
import { setWatermark } from "@/utils/watermark.js"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import { nextTick } from "process"

const url = ref(
  "https://e-sign.dms.t.cn-np.com/files/m3u8_file/c4b94118-3c8d-4410-9987-985c2b44c278/c4b94118-3c8d-4410-9987-985c2b44c278.m3u8"
)
let db = ref<any>()

const loadVideo = () => {
  db.value = videojs("videoPlayer", {
    autoplay: false, // 设置自动播放
    muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音（Chrome66及以上版本，禁止音视频的自动播放）
    preload: "auto", // 预加载
    controls: true,
  })
}

const handleClickColor = (name) => {
  var eleLinks = document.querySelectorAll("link[title]")
  eleLinks.forEach((link) => {
    const link1 = link as HTMLElement
    if (link1.title == name) {
      link1.disabled = false
    } else {
      link1.disabled = true
    }
  })
}
onMounted(() => {
  handleClickColor("默认")
  setWatermark("shan", "侯炳辉", "微信号：xiaci_buyiding")
  nextTick(() => {
    loadVideo()
  })
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
#videoPlayer {
  width: 500px;
  height: 500px;
}
</style>
