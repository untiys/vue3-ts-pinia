<template>
  <router-view />
  <!-- <Btn @on-click="getBtn">
    <template #default> h之函数渲染 </template>
  </Btn> -->
</template>

<script lang="ts" setup>
import { defineComponent, provide, h } from "vue"
import * as ehcarts from "echarts"
provide("ec", ehcarts)

const Btn = (props, ctx: any) => {
  return h(
    "div",
    {
      class: ["rounded", "bg-c"],
      onClick: () => {
        ctx.emit("on-click", "我是按钮")
      },
    },
    [ctx.slots.default(),h('div',null,'哈喽')]
  )
}
const getBtn = (str: string) => {
  console.log(str)
}
</script>

<style></style>
