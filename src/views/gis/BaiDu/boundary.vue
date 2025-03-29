<template>
  <!--百度地图边界 -->
  <div class="baidu-boundary">
    <Card dialogTitle="核心代码" :documentText="documentText1">
      <template #content>
        <div id="boundary1"></div>
      </template>
      <template #title>根据城市名生成边界</template>
    </Card>
    <div class="space"></div>
    <Card dialogTitle="核心代码" :documentText="documentText2">
      <template #content>
        <div id="boundary2"></div>
      </template>
      <template #title>根据经纬度生成边界</template>
    </Card>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import Card from "@/components/Card.vue"

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    let documentText1 = ref<string>()
    let documentText2 = ref<string>()
    let Bmap = window.BMapGL
    let map = null
    // var bdary = null
    // 根据城市名定位边界
    const initBoundary1 = () => {
      //基础代码介绍在打点页面
      map = new Bmap.Map("boundary1")
      map.centerAndZoom(new Bmap.Point(120.20279, 30.260896), 13)
      map.enableScrollWheelZoom(true)
      map.setZoom(18)

      // 创建行政区域搜索的对象实例

      boundary("周口市", "green")
    }

    const boundary = (name, color) => {
      let bdary = new Bmap.Boundary()
      //获取行政区域边界rs
      bdary.get(name, function (rs) {
        //清除地图覆盖物
        // map.clearOverlays()

        //行政区域的点有多少个
        var count = rs.boundaries.length
        if (count === 0) {
          alert("未能获取当前输入行政区域")
          return
        }
        var pointArray = []

        for (var i = 0; i < count; i++) {
          //建立多边形覆盖物样式
          var ply = new Bmap.Polygon(rs.boundaries[i], {
            strokeWeight: 4,
            fillColor: color,
            fillOpacity: "0.2",
            strokeColor: "#ff0000",
          })
          //添加覆盖物
          map.addOverlay(ply)
          pointArray = pointArray.concat(ply.getPath())
        }

        //调整视野，自动定位到当前区域，否则需要设置地图中心点
        map.setViewport(pointArray)
      })
    }




    // 合并区域边界重叠部分
    const mergeArea = async () => {
      const  init1 =await (await fetch('/json/nanchang.json')).json()
      const  init2 =await (await fetch('/json/yingtan.json')).json()
      addGeoJSONToMap(init1)

    }

    const addGeoJSONToMap = (geojson)=> {
      let map1 = new Bmap.Map("boundary2")
      map1.centerAndZoom(new Bmap.Point(122.393343, 30.002009), 13)
      map1.enableScrollWheelZoom(true)
      const features = geojson.features;
      features.forEach((feature) => {
      const geometry = feature.geometry;
      let overlay;
      if (geometry.type === "Polygon") {
        const points = geometry.coordinates[0].map((coord) => {
          // const points = this.convertPoint(coord);
          return new Bmap.Point(coord[0], coord[1]);
        });
        overlay = new Bmap.Polygon(points);
      } else if (geometry.type === "MultiPolygon") {
        let arr =[]
        geometry.coordinates.forEach((polygonCoords) => {

          const points = polygonCoords[0].map((ring) => {
            arr.push(new Bmap.Point(ring[0], ring[1]))
              // return new Bmap.Point(ring[0], ring[1]); // 创建点
          });

        });
        overlay = new Bmap.Polygon(arr,{
          strokeWeight: 1,
          fillColor: "#00F5FF",
          fillOpacity: "0.2",
          strokeColor: "#ff0000",
        });
        map1.addOverlay(overlay);

      }
      });

    }

    // 根据经纬度定位边界
    const initBoundary2 = () => {
      let map1 = new Bmap.Map("boundary2")
      map1.centerAndZoom(new Bmap.Point(122.393343, 30.002009), 13)
      map1.enableScrollWheelZoom(true)
      var polygon = new Bmap.Polygon(
        [
          new Bmap.Point(122.412275, 30.038554),
          new Bmap.Point(122.413712, 30.035553),
          new Bmap.Point(122.414862, 30.034302),
          new Bmap.Point(122.416874, 30.032051),
          new Bmap.Point(122.415437, 30.03105),
          new Bmap.Point(122.413137, 30.03105),
          new Bmap.Point(122.4117, 30.03105),
          new Bmap.Point(122.410406, 30.0303),
          new Bmap.Point(122.410837, 30.028299),
          new Bmap.Point(122.41055, 30.028424),
          new Bmap.Point(122.412275, 30.025922),
          new Bmap.Point(122.408107, 30.025547),
          new Bmap.Point(122.406094, 30.025172),
          new Bmap.Point(122.408681, 30.023046),
          new Bmap.Point(122.408681, 30.022545),
          new Bmap.Point(122.407532, 30.019293),
          new Bmap.Point(122.409688, 30.014415),
          new Bmap.Point(122.410119, 30.014165),
          new Bmap.Point(122.412706, 30.015916),
          new Bmap.Point(122.412418, 30.013039),
          new Bmap.Point(122.416012, 30.013914),
          new Bmap.Point(122.416155, 30.011037),
          new Bmap.Point(122.409688, 30.014415),
          new Bmap.Point(122.41673, 30.011037),
          new Bmap.Point(122.421473, 30.011913),
          new Bmap.Point(122.424348, 30.008535),
          new Bmap.Point(122.421186, 30.005658),
          new Bmap.Point(122.403938, 30.007034),
          new Bmap.Point(122.399052, 29.987642),
          new Bmap.Point(122.402357, 29.987391),
          new Bmap.Point(122.402932, 29.980009),
          new Bmap.Point(122.398333, 29.978507),
          new Bmap.Point(122.396465, 29.982887),
          new Bmap.Point(122.392728, 29.979133),
          new Bmap.Point(122.392584, 29.978382),
          new Bmap.Point(122.389997, 29.980134),
          new Bmap.Point(122.374905, 29.989268),
          new Bmap.Point(122.379361, 29.988643),
          new Bmap.Point(122.383816, 30.011913),
          new Bmap.Point(122.386835, 30.011037),
          new Bmap.Point(122.386547, 30.021044),
          new Bmap.Point(122.391147, 30.022045),
          new Bmap.Point(122.386547, 30.029675),
          new Bmap.Point(122.392584, 30.028174),
          new Bmap.Point(122.397471, 30.03055),
          new Bmap.Point(122.403076, 30.028924),
          new Bmap.Point(122.411987, 30.038554),
        ],
        {
          strokeWeight: 4,
          fillColor: "#00F5FF",
          fillOpacity: "0.2",
          strokeColor: "#ff0000",
        }
      )
      map1.addOverlay(polygon)
    }

    onMounted(() => {
      initBoundary1()
      // initBoundary2()
      mergeArea()
    })

    // documentText1.value = ``

    documentText2.value = `
      let map1 = new Bmap.Map("boundary2")
      map1.centerAndZoom(new Bmap.Point(122.393343, 30.002009), 13)
      map1.enableScrollWheelZoom(true)
      var polygon = new Bmap.Polygon(
        [
          new Bmap.Point(122.412275, 30.038554),
          new Bmap.Point(122.413712, 30.035553),
          new Bmap.Point(122.414862, 30.034302),
          new Bmap.Point(122.416874, 30.032051),
          new Bmap.Point(122.415437, 30.03105),
          new Bmap.Point(122.413137, 30.03105),
          new Bmap.Point(122.4117, 30.03105),
          new Bmap.Point(122.410406, 30.0303),
          new Bmap.Point(122.410837, 30.028299),
          new Bmap.Point(122.41055, 30.028424),
          new Bmap.Point(122.412275, 30.025922),
          new Bmap.Point(122.408107, 30.025547),
          new Bmap.Point(122.406094, 30.025172),
          new Bmap.Point(122.408681, 30.023046),
          new Bmap.Point(122.408681, 30.022545),
          new Bmap.Point(122.407532, 30.019293),
          new Bmap.Point(122.409688, 30.014415),
          new Bmap.Point(122.410119, 30.014165),
          new Bmap.Point(122.412706, 30.015916),
          new Bmap.Point(122.412418, 30.013039),
          new Bmap.Point(122.416012, 30.013914),
          new Bmap.Point(122.416155, 30.011037),
          new Bmap.Point(122.409688, 30.014415),
          new Bmap.Point(122.41673, 30.011037),
          new Bmap.Point(122.421473, 30.011913),
          new Bmap.Point(122.424348, 30.008535),
          new Bmap.Point(122.421186, 30.005658),
          new Bmap.Point(122.403938, 30.007034),
          new Bmap.Point(122.399052, 29.987642),
          new Bmap.Point(122.402357, 29.987391),
          new Bmap.Point(122.402932, 29.980009),
          new Bmap.Point(122.398333, 29.978507),
          new Bmap.Point(122.396465, 29.982887),
          new Bmap.Point(122.392728, 29.979133),
          new Bmap.Point(122.392584, 29.978382),
          new Bmap.Point(122.389997, 29.980134),
          new Bmap.Point(122.374905, 29.989268),
          new Bmap.Point(122.379361, 29.988643),
          new Bmap.Point(122.383816, 30.011913),
          new Bmap.Point(122.386835, 30.011037),
          new Bmap.Point(122.386547, 30.021044),
          new Bmap.Point(122.391147, 30.022045),
          new Bmap.Point(122.386547, 30.029675),
          new Bmap.Point(122.392584, 30.028174),
          new Bmap.Point(122.397471, 30.03055),
          new Bmap.Point(122.403076, 30.028924),
          new Bmap.Point(122.411987, 30.038554),
        ],
        {
          strokeWeight: 4,
          fillColor: "#00F5FF",
          fillOpacity: "0.2",
          strokeColor: "#ff0000",
        }
      )
      map1.addOverlay(polygon)

      `
    return {
      documentText1,
      documentText2,
      initBoundary1,
      initBoundary2,
      mergeArea
    }
  },
})
</script>

<style lang="scss" scoped>
.baidu-boundary {
  width: 100%;
  height: 100%;
  display: flex;
}
.space {
  height: 100%;
  width: 30px;
}

#boundary1 {
  width: 100%;
  height: 100%;
}

#boundary2 {
  width: 100%;
  height: 100%;
}
</style>
