import { _RouteRecordBase } from "vue-router"

declare module "vue-router" {
  // 扩展路由属性
  interface _RouteRecordBase {
    hidden?: boolean | string | number
  }
}
