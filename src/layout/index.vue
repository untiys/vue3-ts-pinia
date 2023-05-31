<template>
  <div class="container">
    <div class="left">
      <el-menu
        router
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <h3 class="juan">
          {{ !isCollapse ? "卷无止境" : "卷" }}
        </h3>
        <menuItem :list="menuList" />
      </el-menu>
    </div>
    <div class="right" :style="{ marginLeft: !isCollapse ? '200px' : '64px' }">
      <div class="head">
        <div class="head-left">
          <div class="icon" @click="isCollapse = !isCollapse">
            <i class="iconfont icon-caidanshouqi" v-if="!isCollapse" />
            <i v-else class="iconfont icon-caidanzhankai" />
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, i) in breadcrumb" :key="i">{{
              item.meta.title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="head-right"></div>
      </div>
      <div class="nav-bar">
        <el-scrollbar>
          <span
            :class="['btn', item.active ? 'btn-active' : '']"
            v-for="(item, index) in tabs"
            :key="item.path"
            @click="tabClick(item.name)"
            >{{ item.name }}
            <el-icon
              v-if="index !== 0"
              class="icon-close"
              @click.stop="tabClose(item.name)"
              ><Close /></el-icon
          ></span>
        </el-scrollbar>
      </div>

      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import menuItem from "../components/CeShi.vue"
import { useStore } from "@/pinia"
export default defineComponent({
  components: {
    menuItem,
  },
  setup() {
    interface Tabs {
      path: string
      active: boolean
      name: string
    }

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    let isCollapse = ref<boolean>(false)
    const breadcrumb = ref([])
    const defaultActive = ref<string>()
    const menuList = ref(store.routes[0].children)

    // 导航栏遍历
    let tabs = ref<Tabs[]>([{ path: "/home", active: true, name: "工作台" }])

    onMounted(() => {
      // html.value = initMenu(routeI[0].children)
    }),
      // 监听路由变化，面包屑变化
      watch(
        () => route,
        (newV) => {
          defaultActive.value = newV.fullPath
          breadcrumb.value = newV.matched.slice(1)
          // 监听路由变化，向导航栏添加
          const isHave = tabs.value.some((e) => e.path == newV.fullPath)
          if (!isHave) {
            tabs.value = tabs.value.map((e) => {
              e.active = false
              return e
            })
            tabs.value.push({
              path: newV.fullPath,
              active: true,
              name: newV.meta.title as string,
            })
            router.push(newV.fullPath)
          } else {
            tabs.value = tabs.value.map((e) => {
              if (e.path == newV.fullPath) {
                e.active = true
                router.push(e.path)
              } else {
                e.active = false
              }
              return e
            })
          }
        },
        { deep: true, immediate: true }
      )
    // 点击导航栏
    const tabClick = (name) => {
      tabs.value = tabs.value.map((e) => {
        if (e.name == name) {
          e.active = true
          router.push(e.path)
        } else {
          e.active = false
        }
        return e
      })
    }
    // 关闭导航栏
    const tabClose = (name) => {
      tabs.value.map((e, i) => {
        if (e.name == name && e.active) {
          tabs.value.splice(i, 1)
          tabs.value[tabs.value.length - 1].active = true
          router.push(tabs.value[tabs.value.length - 1].path)
        } else if (e.name == name) {
          tabs.value.splice(i, 1)
        }
      })
    }
    // 根据接口url列表初始化菜单
    const initMenu = (list) => {
      let str = ""
      list.map((e) => {
        if (!e.children) {
          str += `<el-menu-item index="${e.path}">
            
             <el-icon v-if='${e.meta.icon}'><${e.meta.icon} /></el-icon>
               <template #title>${e.meta.title}</template>
            </el-menu-item>`
        } else {
          str += `
              <el-sub-menu index="${e.path}">
                 <template emplate #title>
                  <el-icon v-if='${e.meta.icon}'><${e.meta.icon} /></el-icon>
                   <span>${e.meta.title}</span>
                 </template>

                 ${initMenu(e.children)}
              </el-sub-menu>
          `
        }
      })
      return str
    }

    return {
      isCollapse,
      breadcrumb,
      tabs,
      defaultActive,
      menuList,
      tabClick,
      tabClose,
      initMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .left {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background-color: #fff;
    box-shadow: 1px 0 5px rgba(40, 40, 41, 0.08);
    transition: 0.3s;
    .juan {
      padding: 10px 0;
      font-size: 22px;
      font-weight: 600;
      text-align: center;
      white-space: nowrap;
    }
  }
  .right {
    height: 100%;
    margin-left: 200px;
    display: flex;
    flex-direction: column;
    transition: 0.28s;
    background-color: #eee;
    .nav-bar {
      height: 34px;
      line-height: 34px;
      width: 100%;
      background-color: #fff;
      position: relative;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
      .btn {
        height: 26px;
        line-height: 26px;
        display: inline-block;
        position: relative;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        cursor: pointer;
        &:first-child {
          margin-left: 15px;
        }
        &:last-child {
          margin-right: 15px;
        }
      }
      .btn-active {
        color: #fff;
        background-color: rgb(64, 158, 255);
        border-color: rgb(64, 158, 255);
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 3px;
        }
      }
    }
    .head {
      height: 50px;
      background-color: #fff;
      position: relative;
      z-index: 3;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      .head-left {
        height: 100%;
        display: flex;
        align-items: center;
        .icon {
          width: 50px;
          height: 100%;
          margin-right: 5px;
          line-height: 50px;
          text-align: center;
          font-size: 20px;
          transition: all 0.3s;
          cursor: pointer;
          &:hover {
            background-color: rgb(243, 240, 240);
          }
        }
      }
      .head-right {
      }
    }
    .main {
      flex: 1;
      overflow: auto;
      padding: 15px;
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
.icon-close {
  margin-left: 5px;
  font-size: 8px;
  vertical-align: middle;
  transition: 0.3s;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: rgba(84, 83, 83, 0);
  &:hover {
    color: #fff;
    background-color: rgba(84, 83, 83, 0.7);
  }
}

:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 200px;
}
:deep(.el-menu) {
  border: none;
}

:deep(.el-scrollbar__view) {
  white-space: nowrap;
}
</style>
