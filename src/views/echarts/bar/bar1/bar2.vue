<template>
  <!-- legend背景渐变 -->
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="bar2"></div>
    </template>
    <template #title>横向排名柱图</template>
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
      "南湖区",
      "平湖区",
      "秀洲区",
      "嘉善县",
      "桐乡市",
      "经开区",
      "海宁市",
      "海盐县",
      "港区",
    ])
    const value = [7000, 6100, 5200, 4000, 3800, 3600, 3500, 3300, 3000]
    var colorList = [
      { start: "rgba(255,161,25)", end: "rgba(255,227,54,0.5)" },
      { start: "rgba(25,255,250)", end: "rgba(54,255,243,0.5)" },
      { start: "rgba(25,255,162)", end: "rgba(54,255,201,0.5)" },
      { start: "rgba(25,126,255)", end: "rgba(54,157,255,0.5)" },
    ]
    const init = () => {
      let option = {
        backgroundColor: "rgba(0,0,0)",

        legend: {
          show: false,
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "3%",
          top: "2%",
          containLabel: true,
        },
        tooltip: {
          show: false,
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            inside: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              inside: true,
              textStyle: {
                color: "#fff",
                padding: [0, 20],
              },
              formatter: (value, i) => {
                if (i <= 9) {
                  return `0${i + 1}. ${value}`
                }
                return `${i + 1}. ${value}`
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: xAxisData.value,
          },
          {
            type: "category",
            inverse: true,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: value,
          },
        ],
        series: [
          {
            name: "完成率",
            type: "bar",
            zlevel: -1,
            barWidth: 16,
            // label: {
            //   show: true,
            //   position: "insideRight",
            //   padding: [0, 10],
            //   fontSize: 12,
            //   color: "#fff",
            // },
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                opacity: 0.9,
                color: (params) => {
                  if (params.dataIndex < 3) {
                    return new ec.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,

                        color: colorList[params.dataIndex].start,
                      },
                      {
                        offset: 1,
                        color: colorList[params.dataIndex].end,
                      },
                    ])
                  } else {
                    return new ec.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: colorList[3].start,
                      },
                      {
                        offset: 1,
                        color: colorList[3].end,
                      },
                    ])
                  }
                },
              },
            },
            data: value,
          },
          {
            data: [9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000],
            type: "bar",
            barMaxWidth: "auto",
            barWidth: 16,
            barGap: "-100%",
            zlevel: -2,
            itemStyle: {
              color: "rgba(0,0,0,0.15)",
              barBorderRadius: 10,
            },
          },
        ],
      }
      let myEchart = ec.init(document.getElementById("bar2"))
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

        legend: {
          show: false,
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "3%",
          top: "2%",
          containLabel: true,
        },
        tooltip: {
          show: false,
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            inside: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              inside: true,
              textStyle: {
                color: "#fff",
                padding: [0, 20],
              },
              formatter: (value, i) => {
                
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: xAxisData.value,
          },
          {
            type: "category",
            inverse: true,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: value,
          },
        ],
        series: [
          {
            name: "完成率",
            type: "bar",
            zlevel: -1,
            barWidth: 16,
            // label: {
            //   show: true,
            //   position: "insideRight",
            //   padding: [0, 10],
            //   fontSize: 12,
            //   color: "#fff",
            // },
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                opacity: 0.9,
                color: (params) => {
                  if (params.dataIndex < 3) {
                    return new ec.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,

                        color: colorList[params.dataIndex].start,
                      },
                      {
                        offset: 1,
                        color: colorList[params.dataIndex].end,
                      },
                    ])
                  } else {
                    return new ec.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: colorList[3].start,
                      },
                      {
                        offset: 1,
                        color: colorList[3].end,
                      },
                    ])
                  }
                },
              },
            },
            data: value,
          },
          {
            data: [9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000],
            type: "bar",
            barMaxWidth: "auto",
            barWidth: 16,
            barGap: "-100%",
            zlevel: -2,
            itemStyle: {
              color: "rgba(0,0,0,0.15)",
              barBorderRadius: 10,
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
#bar2 {
  width: 100%;
  height: 100%;
}
</style>
