<script setup lang="ts">
import { ref, computed } from "vue"

// 此写法不能设置默认值，需要使用withDefaults使用
// defineProps<{ msg: string; title?: string }>()
// const props = withDefaults(defineProps<{ msg: string }>(), {
//   msg: "",
// })

// 此写法可以设置默认值
// const props = defineProps({
//   msg: {
//     type: String,
//     default: "",
//   },
// })

interface User {
  name: string
  age: number
}

// const msg3 = computed(() => msg1.value)

// 计算属性加泛型，意思是返回值定义属性
const user5 = computed<User>(() => {
  return { name: "tang", age: 18 }
})

const count = ref(0)

// const add<string>() => { }
function add(k: string): void {
  //  return k
}
add("5")
</script>

<template>
  <h1>{{ "ssss" }}{{}}</h1>
  <div class="a">
    <div class="b">{{ user5 }}</div>
  </div>
</template>

<style scoped lang="scss">
.a {
  .b {
    color: $aa;
  }
}
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
