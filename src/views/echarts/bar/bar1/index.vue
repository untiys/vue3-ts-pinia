<template>
  <div class="pie1-box">
    <div class="pie1-item" v-for="item in pieNames" :key="item">
      <component :is="item"></component>
    </div>
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
