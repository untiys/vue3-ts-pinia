<template>
  <Card dialogTitle="核心代码" :documentText="documentText">
    <template #content>
      <div id="pie4"></div>
    </template>
    <template #title>双圆饼图</template>
  </Card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, inject } from "vue"
import Card from "@/components/Card.vue"

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const ec: any = inject("ec")
    let documentText = ref<string>()

    const init = () => {
      interface dataObj {
        name: string
        value: any
      }
      const dataList: Array<dataObj> = [
        {
          name: "农用地",
          value: "50.01",
        },
        {
          name: "建筑用地",
          value: "25.92",
        },
        {
          name: "未利用地",
          value: "25.93",
        },
      ]
      const colorList = ["#4D88FE", "#50CCCB", "#FFBF3C"]

      let myEchart = ec.init(document.getElementById("pie4"))
      var option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          trigger: "item",
        },
        zlevel: 999,
        series: [
          {
            // 外圈
            name: "外圈",
            type: "pie",
            radius: ["40%", "80%"],
            center: ["50%", "50%"],
            z: 666,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
                border: 2,
                opacity: 0.5,
              },
            },
            data: dataList,
          },
          {
            // 内圈
            name: "外圈",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            tooltip: {
              trigger: "none",
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            data: dataList,
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
    用一个数据一样的大圆，提高层级，覆盖住内圆就行了


      var option = {
        backgroundColor: "rgba(0,0,0)",
        tooltip: {
          trigger: "item",
        },
        zlevel: 999,
        series: [
          {
            // 外圈
            name: "外圈",
            type: "pie",
            radius: ["40%", "80%"],
            center: ["50%", "50%"],
            z: 666,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
                border: 2,
                opacity: 0.5,
              },
            },
            data: dataList,
          },
          {
            // 内圈
            name: "外圈",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            tooltip: {
              trigger: "none",
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            data: dataList,
          },
        ],
      }
    
    
      `
    return {
      documentText,
    }
  },
})
</script>

<style lang="scss" scoped>
#pie4 {
  width: 100%;
  height: 100%;
}
</style>
