<template>
  <!-- legend背景渐变 -->
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="bar3"></div>
    </template>
    <template #title>x轴label和柱图label自定义距离</template>
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
      let data1 = [120, 200, 150, 70, 110, 130, 120]
      let data3 = data1.map((e, i) => {
        return e + 20
      })
      const myEchart = ec.init(document.getElementById("bar3"))
      let option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          show: true,
          formatter(params) {
            if (params.seriesName != "barbg") {
              return params.marker + params.value
            }
            return ""
          },
        },
        grid: {
          top: "30",
          left: "10",
          bottom: "10",
          right: "10",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
            padding: [5, 0, 0, -10],
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLabel: {
            color: "#fff",
          },
        },

        series: [
          {
            name: "bar1",
            data: data1,
            type: "bar",
            label: {
              show: true,
              align: "center",
              fontSize: 14,
              position: ["5", "-30"],
              color: "#fff",
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: (params) => {
                  return new ec.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#FFC229",
                    },
                    {
                      offset: 1,
                      color: "#FFDF8D",
                    },
                  ])
                },
              },
            },
            z: 1,
          },
          {
            name: "barbg",
            barGap: "-200%",
            type: "bar",
            z: 0,
            data: data3,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,0.15)", // 0% 处的颜色
              },
            },
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
          show: true,
          formatter(params) {
            if (params.seriesName != "barbg") {
              return params.marker + params.value
            }
            return ""
          },
        },
        grid: {
          top: "30",
          left: "10",
          bottom: "10",
          right: "10",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
            padding: [5, 0, 0, -10],
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLabel: {
            color: "#fff",
          },
        },

        series: [
          {
            name: "bar1",
            data: data1,
            type: "bar",
            label: {
              show: true,
              align: "center",
              fontSize: 14,
              position: ["5", "-30"],
              color: "#fff",
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: (params) => {
                  return new ec.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#FFC229",
                    },
                    {
                      offset: 1,
                      color: "#FFDF8D",
                    },
                  ])
                },
              },
            },
            z: 1,
          },
          {
            name: "barbg",
            barGap: "-200%",
            type: "bar",
            z: 0,
            data: data3,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,0.15)", // 0% 处的颜色
              },
            },
          },
        ],
      }
    
    `

    return { documentText }
  },
})
</script>

<style lang="scss" scoped>
#bar3 {
  width: 100%;
  height: 100%;
}
</style>
