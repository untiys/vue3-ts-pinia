import { createWebHistory, createRouter } from "vue-router"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import routesComponents from "./routesComponents"
import { useStore } from "@/pinia"

const routes = [
  {
    path: "/",
    redirect: { path: "/layout" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/A",
    name: "A",
    component: () => import("../components/A"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let getRouter = false

router.beforeEach((to, from, next) => {
  Nprogress.start()
  const store = useStore()
  const token = localStorage.getItem("token")
  document.title = to.meta.title as string

  if (!token) {
    if (to.name === "login") {
      next()
    } else {
      next("/login")
    }
  } else {
    // next()
    if (!getRouter) {
      //如果仓库没有路由表，请求接口拿到
      if (!store.routes) {
        // 如果没有，请求路由接口，放到pinia里
      } else {
        getRouter = true
        let routers = initRoute(store.routes)
        routers.forEach((e) => {
          router.addRoute(e)
        })

        next({ ...to, replace: true })
      }
    } else {
      next()
    }
  }
})

function initRoute(routerList) {
  return routerList.map((e) => {
    e.component = routesComponents[e.component] || ""
    if (e.children) {
      initRoute(e.children)
    }
    return e
  })
}

router.afterEach(() => {
  Nprogress.done()
})
export default router
