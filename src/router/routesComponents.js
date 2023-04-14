export default {
  layout: () => import("../layout/index.vue"),
  home: () => import("../views/home/index.vue"),
  gisBai: () => import("../views/gis/BaiDu/marker.vue"),
  gaoDeMarker: () => import("../views/gis/GaoDe/marker.vue"),
  menuManagement: () => import("../views/sys/menuManagement/index.vue"),
  baiBoundary: () => import("../views/gis/BaiDu/boundary.vue"),

  caseOne: () => import("../views/cases/caseOne.vue"),
  pie1: () => import("../views/echarts/pie/pie1/index.vue"),
  bar1: () => import("../views/echarts/bar/bar1/index.vue"),
}
