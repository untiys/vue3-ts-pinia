<template>
  <!-- legend背景渐变 -->
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="bar1"></div>
    </template>
    <template #title>分割柱图</template>
  </Card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, inject, onMounted } from "vue"
import Card from "@/components/Card.vue"

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const ec: any = inject("ec")
    let documentText = ref<string>()
    const xAxisData = ref<string[]>([
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
    ])
    const chartsData = ref<number[]>([9000, 7000, 3000, 2000, 5000, 6000, 2000])

    const init = () => {
      let myEchart = ec.init(document.getElementById("bar1"))
      let option = {
        backgroundColor: "rgb(0,0,0)",
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: xAxisData.value,
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)", //轴线样式
            },
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,0.6)", //轴文字样式
            },
          },
          axisTick: {
            show: false, //轴刻度设置
          },
        },
        yAxis: {
          name: "单位：个",
          type: "value",
          nameTextStyle: {
            color: "#E6F2FE", //设置单位颜色
          },
          nameGap: 10, //设置单位距离坐标轴距离
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.6)",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255,0.2)",
            },
          },
        },
        series: [
          {
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#44F1B6",
              },
            },
            symbolRepeat: true, //分割是否重复
            symbolMargin: 2, //分割直接的距离
            symbol: "rect", // 分割的图标，可以设置图形
            symbolClip: true, //动画展开方式 true是从下到上，false是y轴从中间展开
            symbolSize: [24, 5], // 分别对应分割的宽高
            data: chartsData.value,
            z: 2,
          },
          {
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              normal: {
                color: "RGBA(30, 61, 107, 1)",
              },
            },
            z: -11,
            silent: true, //不可选中，不触发任何事件
            symbolRepeat: true,
            symbolMargin: 5,
            symbolSize: [24, 5],
            data: chartsData.value.map(() => Math.max(...chartsData.value)),
          },
        ],
      }

      myEchart.setOption(option)
      window.addEventListener("resize", () => {
        myEchart.resize()
      })
    }

    onMounted(() => {
      init()
    })

    documentText.value = `
 let option = {
        backgroundColor: "rgb(0,0,0)",
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: xAxisData.value,
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)", //轴线样式
            },
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,0.6)", //轴文字样式
            },
          },
          axisTick: {
            show: false, //轴刻度设置
          },
        },
        yAxis: {
          name: "单位：个",
          type: "value",
          nameTextStyle: {
            color: "#E6F2FE", //设置单位颜色
          },
          nameGap: 10, //设置单位距离坐标轴距离
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.6)",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255,0.2)",
            },
          },
        },
        series: [
          {
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#44F1B6",
              },
            },
            symbolRepeat: true, //分割是否重复
            symbolMargin: 2, //分割直接的距离
            symbol: "rect", // 分割的图标，可以设置图形
            symbolClip: true, //动画展开方式 true是从下到上，false是y轴从中间展开
            symbolSize: [24, 5], // 分别对应分割的宽高
            data: chartsData.value,
            z: 2,
          },
          {
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              normal: {
                color: "RGBA(30, 61, 107, 1)",
              },
            },
            z: -11,
            silent: true, //不可选中，不触发任何事件
            symbolRepeat: true,
            symbolMargin: 5,
            symbolSize: [24, 5],
            data: chartsData.value.map(() => Math.max(...chartsData.value)),
          },
        ],
      }
    
    `

    return { documentText }
  },
})
</script>

<style lang="scss" scoped>
#bar1 {
  width: 100%;
  height: 100%;
}
</style>
