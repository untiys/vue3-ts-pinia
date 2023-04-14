<!-- <template>
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
</template>  -->

<script lang="tsx">
import { h, resolveComponent, defineComponent } from "vue"

export default defineComponent({
  props: ["list", "isChildren"],
  name: "menuItem",
  setup(props, ctx) {
    return () => {
      return (
        <>
          {props.list.map((item) => {
            if (!item.children) {
              return (
                <el-menu-item
                  index={
                    props.isChildren
                      ? item.meta.parentPath + "/" + item.path
                      : item.path
                  }
                >
                  {
                    <>
                      <el-icon>
                        {item.meta.icon && h(resolveComponent(item.meta.icon))}
                      </el-icon>
                      <span>{item.meta.title}</span>
                    </>
                  }
                </el-menu-item>
              )
            } else {
              return (
                // <template  #title> 在此使用v-slots插槽写法，和component标签的resolveComponent写法，动态加载图标
                <el-sub-menu
                  index={item.path}
                  v-slots={{
                    title: () => {
                      return (
                        <>
                          <el-icon>
                            {item.meta.icon &&
                              h(resolveComponent(item.meta.icon))}
                          </el-icon>
                          <span>{item.meta.title}</span>
                        </>
                      )
                    },
                  }}
                >
                  {/* 此处需要用<template emplate #title> */}
                  {/*
                    <>
                      <el-icon>
                        {item.meta.icon && h(resolveComponent(item.meta.icon))}
                      </el-icon>
                      <span>{item.meta.title}</span>
                  </>
                    */}
                  <menuItem list={item.children} isChildren={true} />
                </el-sub-menu>
              )
            }
          })}
        </>
      )
    }
  },
})
</script>

<style lang="scss" scoped></style>
