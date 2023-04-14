<template>
  <div class="home">
    <!-- 换肤小案例 -->
    <div>
      <div style="margin: 10px 0px; font-size: 14px">换肤小案例：点击换肤</div>
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
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import { setWatermark } from "@/utils/watermark.js"

export default defineComponent({
  setup() {
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
    })
    return { handleClickColor }
  },
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>
