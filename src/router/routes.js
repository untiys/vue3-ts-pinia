import routesComponents from "./routesComponents"

// 以下都是由接口返回回来的动态路由,和路由文件进行匹配，合并到总路由里面
const routeUrls = [
  {
    path: "/layout",
    name: "layout",
    component: "layout",
    redirect: "/home",
    meta: {
      title: "首页", // 做面包屑不要数组第一个
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
            // component: 'gisBai', //父级不带component
            meta: {
              title: "百度地图",
              parentPath: "/gis",
            },
            // 三级路由
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
            // component: 'gisBai',
            meta: {
              title: "高德地图",
              parentPath: "/gis",
            },
            // 三级路由
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
      // {
      //   path: "/sys",
      //   name: "sys",
      //   meta: {
      //     title: "系统管理",
      //     icon:'setting'
      //   },
      //   children: [
      //     {
      //       path: "menuManagement",
      //       name: "menuManagement",
      //       component: 'menuManagement',
      //       meta: {
      //         title: "菜单管理",
      //         parentPath:'/sys'

      //       },
      //     },
      //   ],
      // },
    ],
  },
]

// 递归匹配对应路由文件
function initRoute(routerList) {
  return routerList.map((e) => {
    e.component = routesComponents[e.component] || ""
    if (e.children) {
      initRoute(e.children)
    }
    return e
  })
}

export default initRoute(routeUrls)
