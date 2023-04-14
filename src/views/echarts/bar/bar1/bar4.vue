<template>
  <!-- legend背景渐变 -->
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="bar4"></div>
    </template>
    <template #title>圆柱柱图</template>
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
    const init = () => {
      const myEchart = ec.init(document.getElementById("bar4"))
      var xData2 = [
        "容城谷庄",
        "雄县七间房",
        "安新三台",
        "雄县张岗",
        "安新寨里",
      ]
      var data1 = [30, 100, 200, 200, 100]
      var data2 = [300, 200, 300, 300, 400]
      let option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          trigger: "item",
        },
        grid: {},
        xAxis: {
          data: xData2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            margin: 20, //刻度标签与轴线之间的距离。
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            //三个最低下的圆片
            // "name": "",
            type: "pictorialBar",
            symbolSize: [35, 15],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function (params) {
                return new ec.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FF9A22", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFD56E", // 100% 处的颜色
                    },
                  ],
                  false
                )
              },
            },
            data: [1, 1, 1, 1, 1],
          },

          //下半截柱状图
          {
            name: "2020",
            type: "bar",
            barWidth: 35,
            barGap: "-100%",
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function (params) {
                return new ec.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FF9A22", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFD56E", // 100% 处的颜色
                    },
                  ],
                  false
                )
              },
            },

            data: data1,
          },
          // 柱图头部的圆
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [35, 15],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function (params) {
                return new ec.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FF9A22", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFD56E", // 100% 处的颜色
                    },
                  ],
                  false
                )
              },
            },
            symbolPosition: "end",
            data: data1,
          },
          {
            name: "", //头部
            type: "pictorialBar",
            symbolSize: [35, 15],

            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              color: "#163F7A",
              opacity: 1,
            },
            data: data2,
          },
          {
            name: "2019",
            type: "bar",
            barWidth: 35,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "#163F7A",
              opacity: 0.7,
            },
            data: data2,
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
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          trigger: "item",
        },
        grid: {},
        xAxis: {
          data: xData2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            margin: 20, //刻度标签与轴线之间的距离。
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            //三个最低下的圆片
            // "name": "",
            type: "pictorialBar",
            symbolSize: [35, 15],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function (params) {
                return new ec.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FF9A22", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFD56E", // 100% 处的颜色
                    },
                  ],
                  false
                )
              },
            },
            data: [1, 1, 1, 1, 1],
          },

          //下半截柱状图
          {
            name: "2020",
            type: "bar",
            barWidth: 35,
            barGap: "-100%",
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function (params) {
                return new ec.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FF9A22", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFD56E", // 100% 处的颜色
                    },
                  ],
                  false
                )
              },
            },

            data: data1,
          },
          // 柱图头部的圆
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [35, 15],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function (params) {
                return new ec.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#FF9A22", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFD56E", // 100% 处的颜色
                    },
                  ],
                  false
                )
              },
            },
            symbolPosition: "end",
            data: data1,
          },
          {
            name: "", //头部
            type: "pictorialBar",
            symbolSize: [35, 15],

            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              color: "#163F7A",
              opacity: 1,
            },
            data: data2,
          },
          {
            name: "2019",
            type: "bar",
            barWidth: 35,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "#163F7A",
              opacity: 0.7,
            },
            data: data2,
          },
        ],
      }
    `

    return { documentText }
  },
})
</script>

<style lang="scss" scoped>
#bar4 {
  width: 100%;
  height: 100%;
}
</style>
