<template>
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="pie2"></div>
    </template>
    <template #title>环形刻度渐变色</template>
  </Card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, inject, onMounted } from "vue"
import Card from "@/components/Card.vue"

export default defineComponent({
  components: { Card },
  setup() {
    const ec: any = inject("ec")

    let documentText = ref<string>()
    const init = () => {
      let myEchart = ec.init(document.getElementById("pie2"))
      let option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          show: false,
        },
        series: [
          // 使用仪表板，隐藏外层边界，只保留刻度
          {
            type: "gauge",
            center: ["50%", "50%"],
            radius: "90%",
            splitNumber: 50, // 设置刻度密度
            startAngle: 259, //设置刻度起始
            endAngle: -85, //设置刻度结尾
            axisLine: {
              show: false,
              lineStyle: {
                color: [
                  [0.1, "rgba(23,156,172,0.1)"],
                  [0.3, "rgba(23,156,172,0.3)"],
                  [0.5, "rgba(23,156,172,0.5)"],
                  [0.7, "rgba(23,156,172,0.7)"],
                  [1, "rgba(23,156,172,1)"],
                ],
              },
            },
            // detail: {
            //   formatter: function (value) {
            //     return "{a|全市设备总数}\n{b|" + value + "}{a|件}"
            //   },
            //   rich: rich,
            //   offsetCenter: ["0%", "0%"],
            // },
            // data: dataArr,
            axisTick: {
              show: false,
            },
            // 刻度长度样式
            splitLine: {
              show: true,
              length: 10,
              lineStyle: {
                color: "auto",
                width: 1.5,
              },
            },
            axisLabel: {
              show: false,
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
        // 实现原理，使用仪表板，隐藏外层边界，只保留刻度
        {
            type: "gauge",
            center: ["50%", "50%"],
            radius: "90%",
            splitNumber: 50, // 设置刻度密度
            startAngle: 259, //设置刻度起始
            endAngle: -85, //设置刻度结尾
            axisLine: {
              show: false,
              lineStyle: {
                color: [
                  [0.1, "rgba(23,156,172,0.1)"],
                  [0.3, "rgba(23,156,172,0.3)"],
                  [0.5, "rgba(23,156,172,0.5)"],
                  [0.7, "rgba(23,156,172,0.7)"],
                  [1, "rgba(23,156,172,1)"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            // 刻度长度
            splitLine: {
              show: true,
              length: 10,
              lineStyle: {
                color: "auto",
                width: 1.5,
              },
            },
            axisLabel: {
              show: false,
            },
          },
    
      `
    return { documentText }
  },
})
</script>

<style lang="scss" scoped>
#pie2 {
  height: 100%;
  width: 100%;
}
</style>
