<template>
  <div class="home">
    工作台
    <div id="shan" v-show="true"></div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import { setWatermark } from "@/utils/watermark.js"

export default defineComponent({
  setup() {
    onMounted(() => {
      setWatermark("shan", "侯炳辉", "微信号：xiaci_buyiding")
    })

    return {}
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
