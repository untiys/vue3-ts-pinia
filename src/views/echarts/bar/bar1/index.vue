<template>
  <div class="pie1-box">
    <div class="pie1-item" v-for="item in pieNames" :key="item">
      <component :is="item"></component>
    </div>
    <!-- 换肤小案例 -->
    <!-- <div>
      <div>点击换肤</div>
      <el-button color="pink" @click="handleClickColor('默认')"
        >默认样式粉色</el-button
      >
      <el-button type="success" @click="handleClickColor('绿色')"
        >绿色</el-button
      >
      <el-button type="danger" @click="handleClickColor('红色')"
        >红色</el-button
      >
      <div class="text-alternate">样式换肤</div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import Bar1 from "./bar1.vue"
import Bar2 from "./bar2.vue"
import Bar3 from "./bar3.vue"
import Bar4 from "./bar4.vue"

export default defineComponent({
  components: { Bar1, Bar2, Bar3, Bar4 },
  setup() {
    const pieNames = ref(["Bar1", "Bar2", "Bar3", "Bar4"])

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
    })

    return { pieNames, handleClickColor }
  },
})
</script>

<style lang="scss" scoped>
.pie1-box {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .pie1-item {
    width: 33%;
    height: 33%;
    min-width: 330px;
    margin-left: 0.5%;
    margin-bottom: 8px;
    &:nth-child(3n + 1) {
      margin-left: 0;
    }
  }
}
</style>
