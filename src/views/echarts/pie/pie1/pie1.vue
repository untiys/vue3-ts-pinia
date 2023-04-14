<template>
  <!-- legend背景渐变 -->
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="pie1"></div>
    </template>
    <template #title>legend背景渐变+调整环形角度</template>
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
      let myEchart = ec.init(document.getElementById("pie1"))

      var data1 = [
        { value: 6000, name: "在用量" },
        { value: 3000, name: "储备量" },
        { value: 3000, name: "临近报废量" },
        { value: 3000, name: "报废量" },
      ]
      var colorList = ["#DFB749", "#117BF4", "#064FD2", "#06DDFE"]
      var legendData = []
      data1.forEach((item, index) => {
        legendData.push({
          orient: "horizontal",
          left: "45%",
          top: index * 18 + 15 + "%",
          textStyle: {
            color: "#fff",
            fontSize: 14,
            rich: {
              a: {
                fontSize: 14,
                width: 80,
              },
              b: {
                fontSize: 14,
              },
            },
          },
          padding: [7, 15],
          //图例标记的图形高度
          itemHeight: 11,
          //图例标记的图形宽度
          itemWidth: 11,
          icon: "path://M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z",
          backgroundColor: new ec.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(179, 230, 253, 0)",
            },
            {
              offset: 1,
              color: "rgba(124, 179, 250, 0.18)",
            },
          ]),
          borderRadius: 10,
          data: [{ name: item.name }],
          formatter: (name) => {
            const item = data1.filter((item) => item.name === name)[0]
            return `{a|${name}}{b|${item.value}}`
          },
        })
      })
      let option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          show: false,
        },
        legend: legendData,
        series: [
          {
            type: "pie",
            center: ["25%", "50%"],
            radius: ["55%", "80%"],
            startAngle: -200, //改变饼图顺时针角度
            avoidLabelOverlap: false,
            label: {
              show: true,
              color: "#fff",
              position: "inside",
              formatter: (value) => {
                return value.percent + "%"
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: data1,
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
          var data1 = [
        { value: 6000, name: "在用量" },
        { value: 3000, name: "储备量" },
        { value: 3000, name: "临近报废量" },
        { value: 3000, name: "报废量" },
      ]
      var colorList = ["#DFB749", "#117BF4", "#064FD2", "#06DDFE"]
      var legendData = []


      //  给每个legend一个单独的背景色，需要循环创建legend对象单独设置

      data1.forEach((item, index) => {
        legendData.push({
          orient: "horizontal",
          left: "45%",
          top: index * 18 + 15 + "%",
          textStyle: {
            color: "#fff",
            rich: {
              a: {
                fontSize: 14,
                width: 110,
              },
              b: {
                fontSize: 14,
              },
            },
          },
          padding: [7, 15],
          //图例标记的图形高度
          itemHeight: 11,
          //图例标记的图形宽度
          itemWidth: 11,
          icon: "path://M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z",
          backgroundColor: new ec.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(179, 230, 253, 0)",
            },
            {
              offset: 1,
              color: "rgba(124, 179, 250, 0.18)",
            },
          ]),
          borderRadius: 10,
          data: [{ name: item.name }],
          formatter: (name) => {
            const item = data1.filter((item) => item.name === name)[0]
            return '{a|\${name}}{b|\${item.value}}'
          },
        })
      })


      let option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          show: false,
        },
        legend: legendData,
        series: [
          {
            type: "pie",
            center: ["25%", "50%"],
            radius: ["55%", "80%"],
            startAngle: -200,    //改变饼图顺时针角度
            avoidLabelOverlap: false,
            label: {
              show: true,
              color: "#fff",
              position: "inside",
              formatter: (value) => {
                return value.percent + "%"
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: data1,
          },
        ],
      }
    
    `

    return { documentText }
  },
})
</script>

<style lang="scss" scoped>
#pie1 {
  width: 100%;
  height: 100%;
}
</style>
