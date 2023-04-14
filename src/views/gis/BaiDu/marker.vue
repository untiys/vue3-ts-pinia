<template>
  <!-- 百度地图打点 -->
  <div class="baidu-marker">
    <Card dialogTitle="核心代码" :documentText="documentText">
      <template #content>
        <div id="baidu-map"></div>
      </template>
      <template #title> 地图打点 </template>
    </Card>
    <div class="icon-box">
      <img :src="isHiddenZ ? zaiAn : zaiH" alt="" @click="filter(true)" />
      <img :src="isHiddenG ? guAn : guH" alt="" @click="filter(false)" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, toRefs } from "vue"
import Card from "@/components/Card.vue"
import zaiH from "@/assets/image/zaix.png"
import zaiAn from "@/assets/image/zaix-an.png"
import guH from "@/assets/image/guz.png"
import guAn from "@/assets/image/guz-an.png"
import zaiX from "@/assets/image/zaix_icon.png"
import zaiXH from "@/assets/image/zaix_icon.png"
import guZ from "@/assets/image/guz_icon.png"
import guZH from "@/assets/image/guz_h.png"

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    // 待展示代码块
    const documentText = ref<string>()
    const icons = reactive({
      zaiH,
      zaiAn,
      guH,
      guAn,
    })

    let isHiddenZ = ref<boolean>(false)
    let isHiddenG = ref<boolean>(false)

    // 0是在线，1是离线
    const markerList = [
      {
        status: 0,
        lat: 120.21279,
        long: 30.260896,
      },
      {
        status: 1,
        lat: 120.20279,
        long: 30.263896,
      },
      {
        status: 0,
        lat: 120.20879,
        long: 30.268896,
      },
      {
        status: 1,
        lat: 120.20779,
        long: 30.260196,
      },
    ]

    let Bmap = window.BMapGL
    let map
    const initMap = () => {
      map = new Bmap.Map("baidu-map")
      map.centerAndZoom(new Bmap.Point(120.21279, 30.260896), 19)
      map.enableScrollWheelZoom(true)
      // 平台顺时针旋转
      map.setHeading(40)
      // 根据Y轴倾斜
      map.setTilt(60)
      // 设置地图层级，越大，地图放大越明显，反之地图缩小
      map.setZoom(18)
      // 地图个性化配置
      map.setMapStyleV2({
        styleId: "33b8985660b5c39e8704edf861609458",
      })
      initMarker(markerList)
    }
    // 打点操作
    const initMarker = (list) => {
      // 删除所有点位
      map.clearOverlays()
      list.map((e) => {
        let myIcon
        if (e.status) {
          // 创建图标
          myIcon = new Bmap.Icon(zaiX, new Bmap.Size(54, 58))
        } else {
          myIcon = new Bmap.Icon(guZ, new Bmap.Size(54, 58))
        }
        // 创建经纬度
        var pt = new Bmap.Point(e.lat, e.long)
        // 将经纬度和图标结合
        var marker = new Bmap.Marker(pt, {
          icon: myIcon,
        })
        // 将标注添加到地图
        map.addOverlay(marker)

        marker.addEventListener("click", () => {
          // 调用自身 清除所有点
          initMarker(list)
          // 再高亮本身,在此可以请求接口
          if (e.status) {
            myIcon = new Bmap.Icon(zaiXH, new Bmap.Size(54, 58))
          } else {
            myIcon = new Bmap.Icon(guZH, new Bmap.Size(54, 58))
          }

          marker = new Bmap.Marker(pt, {
            icon: myIcon,
          })
          map.addOverlay(marker)
          // map.centerAndZoom(pt, 19)
          // // 平台顺时针旋转
          // map.setHeading(40)
          // 根据Y轴倾斜
          // map.setTilt(60)
        })
      })
    }
    // 过滤操作
    const filter = (bool) => {
      // 点击在线按钮
      if (bool) {
        isHiddenZ.value = !isHiddenZ.value
      }
      // 点击故障按钮
      else {
        isHiddenG.value = !isHiddenG.value
      }

      // 双方都为true，全部隐藏
      if (isHiddenZ.value && isHiddenG.value) {
        map.clearOverlays()
      }
      // 双方都为false,都选中显示
      if (!isHiddenZ.value && !isHiddenG.value) {
        initMarker(markerList)
      }
      // 隐藏在线，显示故障
      if (isHiddenZ.value && !isHiddenG.value) {
        //筛选的在线列表
        let zaiList = markerList.filter((e) => {
          if (!e.status) {
            return e
          }
        })
        initMarker(zaiList)
      }
      // 隐藏故障。显示在线
      if (!isHiddenZ.value && isHiddenG.value) {
        //筛选的故障列表
        let guZlist = markerList.filter((e) => {
          if (e.status) {
            return e
          }
        })
        initMarker(guZlist)
      }
    }

    onMounted(() => {
      initMap()
    })

    documentText.value = `
      let map = new Bmap.Map("baidu-map")

      map.centerAndZoom(new Bmap.Point(120.20279, 30.260896), 19)

      map.enableScrollWheelZoom(true)

      // 平台顺时针旋转
      map.setHeading(40)

      // 根据Y轴倾斜
      map.setTilt(60)

      // 设置地图层级，越大，地图放大越明显，反之地图缩小
      map.setZoom(18)

      // 地图个性化配置
      map.setMapStyleV2({
        styleId: "33b8985660b5c39e8704edf861609458",
      })


    // 打点操作
    const initMarker = (list) => {
      // 删除所有点位
      map.clearOverlays()
      list.map((e) => {
        let myIcon
        if (e.status) {
          // 创建图标
          myIcon = new Bmap.Icon(zaiX, new Bmap.Size(54, 58))
        } else {
          myIcon = new Bmap.Icon(guZ, new Bmap.Size(54, 58))
        }
        // 创建经纬度
        var pt = new Bmap.Point(e.lat, e.long)
        // 将经纬度和图标结合
        var marker = new Bmap.Marker(pt, {
          icon: myIcon,
        })
        // 将标注添加到地图
        map.addOverlay(marker)

        marker.addEventListener("click", () => {
          // 调用自身 清除所有点
          initMarker(list)
          // 再高亮本身,在此可以请求接口
          if (e.status) {
            myIcon = new Bmap.Icon(zaiXH, new Bmap.Size(54, 58))
          } else {
            myIcon = new Bmap.Icon(guZH, new Bmap.Size(54, 58))
          }

          marker = new Bmap.Marker(pt, {
            icon: myIcon,
          })
          map.addOverlay(marker)
        })
      })
    }


    // 过滤操作
    const filter = (bool) => {
      // 点击在线按钮
      if (bool) {
        isHiddenZ.value = !isHiddenZ.value
      }
      // 点击故障按钮
      else {
        isHiddenG.value = !isHiddenG.value
      }

      // 双方都为true，全部隐藏
      if (isHiddenZ.value && isHiddenG.value) {
        map.clearOverlays()
      }
      // 双方都为false,都选中显示
      if (!isHiddenZ.value && !isHiddenG.value) {
        initMarker(markerList)
      }
      // 隐藏在线，显示故障
      if (isHiddenZ.value && !isHiddenG.value) {
        //筛选的在线列表
        let zaiList = markerList.filter((e) => {
          if (!e.status) {
            return e
          }
        })
        initMarker(zaiList)
      }
      // 隐藏故障。显示在线
      if (!isHiddenZ.value && isHiddenG.value) {
        //筛选的故障列表
        let guZlist = markerList.filter((e) => {
          if (e.status) {
            return e
          }
        })
        initMarker(guZlist)
      }
    }
    `
    return {
      documentText,
      isHiddenZ,
      isHiddenG,
      ...toRefs(icons),
      initMap,
      filter,
    }
  },
})
</script>

<style lang="scss" scoped>
.baidu-marker {
  height: 100%;
  position: relative;
}
#baidu-map {
  width: 100%;
  height: 100%;
}
.icon-box {
  position: absolute;
  bottom: 50px;
  left: 20px;
  z-index: 999;
  img {
    height: 60px;
    cursor: pointer;
  }
}
</style>
