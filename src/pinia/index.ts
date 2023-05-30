import { defineStore } from "pinia"

// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: "Eduardo",
      isAdmin: true,
      users: [
        {
          id: "sss",
        },
      ],
      routes: [
        {
          path: "/layout",
          name: "layout",
          component: "layout",
          redirect: "/home",
          meta: {
            title: "首页",
          },
          children: [
            {
              path: "/home",
              name: "home",
              component: "home",
              meta: {
                icon: "Monitor",
                title: "工作台",
              },
            },
            {
              path: "/gis",
              name: "gis",
              meta: {
                title: "GIS地图",
                icon: "location",
              },
              children: [
                {
                  path: "gisBai",
                  name: "gisBai",
                  meta: {
                    title: "百度地图",
                    parentPath: "/gis",
                  },
                  children: [
                    {
                      path: "marker",
                      name: "marker",
                      component: "gisBai",
                      meta: {
                        title: "打点",
                        parentPath: "/gis/gisBai",
                      },
                    },
                    {
                      path: "boundary",
                      name: "boundary",
                      component: "baiBoundary",
                      meta: {
                        title: "边界",
                        parentPath: "/gis/gisBai",
                      },
                    },
                  ],
                },
                {
                  path: "gisGao",
                  name: "gisGao",
                  meta: {
                    title: "高德地图",
                    parentPath: "/gis",
                  },
                  children: [
                    {
                      path: "gisGao1",
                      name: "gisGao1",
                      component: "gaoDeMarker",
                      meta: {
                        title: "打点",
                        parentPath: "/gis/gisGao",
                      },
                    },
                  ],
                },
              ],
            },
            {
              path: "/case",
              name: "case",
              meta: {
                icon: "Tickets",
                title: "常用小案例",
              },
              children: [
                {
                  path: "caseOne",
                  name: "caseOne",
                  component: "caseOne",
                  meta: {
                    title: "案例一",
                    parentPath: "/case",
                  },
                },
              ],
            },
            {
              path: "/echarts",
              name: "echarts",
              meta: {
                icon: "Tickets",
                title: "echarts图表",
              },
              children: [
                {
                  path: "pie",
                  name: "pie",
                  meta: {
                    title: "环形图",
                    parentPath: "/echarts",
                  },
                  children: [
                    {
                      path: "pie1",
                      name: "pie1",
                      component: "pie1",
                      meta: {
                        title: "环形图一",
                        parentPath: "/echarts/pie",
                      },
                    },
                  ],
                },
                {
                  path: "bar",
                  name: "bar",
                  meta: {
                    title: "柱形图",
                    parentPath: "/echarts",
                  },
                  children: [
                    {
                      path: "bar1",
                      name: "bar1",
                      component: "bar1",
                      meta: {
                        title: "柱形图一",
                        parentPath: "/echarts/bar",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
  },
  getters: {
    // 普通调用
    doubleCount: (state) => state.counter * 2,
    // 传参调用
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
  //  像methods一样，可以执行异步函数
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
