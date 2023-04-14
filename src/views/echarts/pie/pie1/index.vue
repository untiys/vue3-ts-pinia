<template>
  <div class="pie1-box">
    <div class="pie1-item" v-for="item in pieNames" :key="item">
      <component :is="item"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import Pie1 from "./pie1.vue"
import Pie2 from "./pie2.vue"
import Pie3 from "./pie3.vue"
import Pie4 from "./pie4.vue"

export default defineComponent({
  components: { Pie1, Pie2, Pie3, Pie4 },
  setup() {
    const pieNames = ref(["Pie1", "Pie2", "Pie3", "pie4"])

    return { pieNames }
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
