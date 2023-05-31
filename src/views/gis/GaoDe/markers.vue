<template>
  <div class="baidu-marker">
    <Card dialogTitle="核心代码" :documentText="documentText">
      <template #content>
        <div id="container"></div>
      </template>
      <template #title>点聚合</template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Card from "@/components/Card.vue"
import { onMounted } from "vue"
var cluster
let map
let AMap = window.AMap
var gridSize = 60

onMounted(() => {
  init()
})

const init = () => {
  map = new AMap.Map("container", {
    center: [104.937478, 35.439575],
    zoom: 5,
  })

  var points = [
    { lnglat: ["108.512621", "34.321149"] },
    { lnglat: ["112.985537", "23.15006"] },
    { lnglat: ["112.985067", "23.15056"] },
    { lnglat: ["112.188067", "28.15056"] },
    { lnglat: ["112.983067", "25.15059"] },
    { lnglat: ["112.584067", "23.15556"] },
  ]
  var count = points.length

  var _renderClusterMarker = function (context) {
    var factor = Math.pow(context.count / count, 1 / 18)
    var div = document.createElement("div")
    var Hue = 180 - factor * 180
    var bgColor = "hsla(" + Hue + ",100%,40%,0.7)"
    var fontColor = "hsla(" + Hue + ",100%,90%,1)"
    var borderColor = "hsla(" + Hue + ",100%,40%,1)"
    var shadowColor = "hsla(" + Hue + ",100%,90%,1)"
    div.style.backgroundColor = bgColor
    var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
    div.style.width = div.style.height = size + "px"
    div.style.border = "solid 1px " + borderColor
    div.style.borderRadius = size / 2 + "px"
    div.style.boxShadow = "0 0 5px " + shadowColor
    div.innerHTML = context.count
    div.style.lineHeight = size + "px"
    div.style.color = fontColor
    div.style.fontSize = "14px"
    div.style.textAlign = "center"
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
    context.marker.setContent(div)
  }
  var _renderMarker = function (context) {
    var content =
      '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>'
    var offset = new AMap.Pixel(-9, -9)
    context.marker.setContent(content)
    context.marker.setOffset(offset)
  }

  cluster = new AMap.MarkerCluster(map, points, {
    gridSize: gridSize, // 设置网格像素大小
    renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
    renderMarker: _renderMarker, // 自定义非聚合点样式
  })
}

// 数据中需包含经纬度信息字段 lnglat

const documentText = `

//基本属于固定写法
const init = () => {
  map = new AMap.Map("container", {
    center: [104.937478, 35.439575],
    zoom: 5,
  })

  var points = [
    { lnglat: ["108.512621", "34.321149"] },
    { lnglat: ["112.985537", "23.15006"] },
    { lnglat: ["112.985067", "23.15056"] },
    { lnglat: ["112.188067", "28.15056"] },
    { lnglat: ["112.983067", "25.15059"] },
    { lnglat: ["112.584067", "23.15556"] },
  ]
  var count = points.length

  var _renderClusterMarker = function (context) {
    console.log(context)
    var factor = Math.pow(context.count / count, 1 / 18)
    var div = document.createElement("div")
    var Hue = 180 - factor * 180
    var bgColor = "hsla(" + Hue + ",100%,40%,0.7)"
    var fontColor = "hsla(" + Hue + ",100%,90%,1)"
    var borderColor = "hsla(" + Hue + ",100%,40%,1)"
    var shadowColor = "hsla(" + Hue + ",100%,90%,1)"
    div.style.backgroundColor = bgColor
    var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
    div.style.width = div.style.height = size + "px"
    div.style.border = "solid 1px " + borderColor
    div.style.borderRadius = size / 2 + "px"
    div.style.boxShadow = "0 0 5px " + shadowColor
    div.innerHTML = context.count
    div.style.lineHeight = size + "px"
    div.style.color = fontColor
    div.style.fontSize = "14px"
    div.style.textAlign = "center"
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
    context.marker.setContent(div)
  }
  var _renderMarker = function (context) {
    var content =
      '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>'
    var offset = new AMap.Pixel(-9, -9)
    context.marker.setContent(content)
    context.marker.setOffset(offset)
  }

  cluster = new AMap.MarkerCluster(map, points, {
    gridSize: gridSize, // 设置网格像素大小
    renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
    renderMarker: _renderMarker, // 自定义非聚合点样式
  })
}


`
</script>

<style lang="scss" scoped>
.baidu-marker {
  height: 100%;
  position: relative;
}
#container {
  width: 100%;
  height: 100%;
}
</style>
