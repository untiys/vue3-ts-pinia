<template>
  <Fragment v-for="item in menuList" :key="item.path">
    <el-menu-item
      :index="isChildren ? item.meta.parentPath + '/' + item.path : item.path"
      v-if="!item.children"
    >
      <el-icon><component :is="item.meta.icon"></component></el-icon>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-else>
      <template emplate #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <menuItem :list="item.children" :isChildren="true" />
    </el-sub-menu>
  </Fragment>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, Fragment, h } from "vue"

export default defineComponent({
  props: ["list", "isChildren"],
  name: "menuItem",
  setup(props) {
    const menuList = props.list
    return {
      menuList,
    }
  },
})
</script>

<style lang="scss" scoped></style>
