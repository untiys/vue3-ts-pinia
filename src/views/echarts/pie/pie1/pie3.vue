<template>
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="pie3"></div>
    </template>
    <template #title>极坐标环形图</template>
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
      let myEchart = ec.init(document.getElementById("pie3"))
      let option = {
        backgroundColor: "rgba(0,0,0)",
        polar: {
          radius: ["60%", "75%"],
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true, //是否圆角
            showBackground: true, //显示背景颜色
            backgroundStyle: {
              color: "#2e2856",
            },
            data: [80],
            coordinateSystem: "polar",
            itemStyle: {
              normal: {
                color: new ec.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#585fe1",
                  },
                  {
                    offset: 1,
                    color: "#0ff",
                  },
                ]),
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
        polar: {
          radius: ["60%", "75%"],
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true, //是否圆角
            showBackground: true, //显示背景颜色
            backgroundStyle: {
              color: "#2e2856",
            },
            data: [80],
            coordinateSystem: "polar",
            itemStyle: {
              normal: {
                color: new ec.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#585fe1",
                  },
                  {
                    offset: 1,
                    color: "#0ff",
                  },
                ]),
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
#pie3 {
  height: 100%;
  width: 100%;
}
</style>
