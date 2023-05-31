<template>
  <div class="baidu-marker">
    <Card dialogTitle="核心代码" :documentText="documentText">
      <template #content>
        <div id="gaode-map"></div>
      </template>
      <template #title> 地图打点(.apng图片可以动态显示) </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import zaiXH from "@/assets/image/zaix_h.png"
import guZH from "@/assets/image/guz_h.png"
import Card from "@/components/Card.vue"
export default defineComponent({
  components: {
    Card,
  },
  setup() {
    // 0是在线，1是离线
    const markerList = [
      {
        deviceStatus: 0,
        latitude: 120.21279,
        longitude: 30.260896,
      },
      {
        deviceStatus: 1,
        latitude: 120.20279,
        longitude: 30.263896,
      },
      {
        deviceStatus: 0,
        latitude: 120.20879,
        longitude: 30.268896,
      },
      {
        deviceStatus: 1,
        latitude: 120.20779,
        longitude: 30.260196,
      },
    ]
    let map1: any

    let markers = <any>[]
    const init = () => {
      map1 = new window.AMap.Map("gaode-map", {
        viewMode: "3D", // 默认使用 2D 模式
        mapStyle: "amap://styles/5e813ad8960c9c33572ac55f90e73f01",
        zoom: 17, //初始化地图层级
        center: [120.21279, 30.260896], //初始化地图中心点
        pitch: 65, // 立体旋转
        rotation: 45, // 顺时针平面旋转
      })
      markerInit({ list: markerList, type: false })
    }

    interface param {
      list: any
      type: boolean
      deviceCode?: string
      index?: number
    }
    const markerInit = (data: param) => {
      const { list, type, deviceCode, index } = data
      let Amap = window.AMap
      map1.remove(markers) //删除所有点
      markers = []
      //   循环打点
      // 说明是设备搜索进来的，直接高亮
      // if (type) {
      //   let searchI
      //   const arr = markerList.filter((item, i) => {
      //     if (item.deviceCode == deviceCode) {
      //       searchI = i
      //       return true
      //     }
      //   })
      //   if (arr.length == 0) {
      //     this.equipObj = {}
      //   } else {
      //     arr.map((item) => {
      //       // 匹配指定设备
      //       if (item.longitude && item.latitude) {
      //         if (item.deviceCode == deviceCode) {
      //           this.markerInit(this.markerList, false, "", searchI)

      //           this.map1.setCenter([
      //             item.longitude || 120.20279,
      //             item.latitude || 30.260896,
      //           ])
      //         } else {
      //           this.markerInit(this.markerList)
      //         }
      //       } else {
      //         this.markerInit(this.markerList, false, "", searchI)
      //         this.map1.setCenter([120.20279, 30.260896])
      //       }
      //     })
      //   }
      // } else {
      console.log(list)
      list.map((e, i) => {
        let marker
        if (e.deviceStatus == "1") {
          marker = new Amap.Marker({
            map: map1,
            position: [e.latitude || 120.20279, e.longitude || 30.260896],
            icon: new Amap.Icon({
              image: guZH,
              imageSize: new Amap.Size(56, 56),
            }),
            offset: new Amap.Pixel(-56, -56), //解决地图缩放，图标偏移问题
          })

          if (index == i) {
            marker.setIcon(
              new Amap.Icon({
                image: require("../assets/zaix_h.png"),
                imageSize: new Amap.Size(56, 56),
              })
            )
            // this.equipObj = e
          }
          markers.push(marker)
        }

        if (e.deviceStatus == "0") {
          marker = new Amap.Marker({
            map: map1,
            position: [e.latitude || 120.20279, e.longitude || 30.260896],
            icon: new Amap.Icon({
              image: zaiXH,
              imageSize: new Amap.Size(56, 56),
            }),
            offset: new Amap.Pixel(-56, -56), //解决地图缩放，图标偏移问题
          })
          if (index == i) {
            marker.setIcon(
              new Amap.Icon({
                image: require("../assets/guz_h.png"),
                imageSize: new Amap.Size(56, 56),
              })
            )
            // this.equipObj = e
          }
          markers.push(marker)
        }

        marker.on("click", () => {
          // markerInit(list, false, "", i)
          // this.equipObj = e
        })
      })
      // }
    }

    onMounted(() => {
      init()
    })

    const documentText = ref<string>()
    return { documentText }
  },
})
</script>

<style lang="scss" scoped>
.baidu-marker {
  height: 100%;
  position: relative;
}
#gaode-map {
  width: 100%;
  height: 100%;
}
</style>
