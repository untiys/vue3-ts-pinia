<template>
  <!-- 小案例页面一 -->
  <div class="case-one">
    <div class="drag-box">
      <Card dialogTitle="核心代码" :documentText="documentText">
        <template #content>
          <ul class="el-upload-list el-upload-list--picture-card">
            <!-- 需要设置handle 绑定可拖动的类名，然后给想拖动的标签绑定此类名 -->
            <draggable
              v-model="coverFileList"
              handle=".animated"
              style="display: flex; flex-wrap: wrap"
            >
              <li
                v-for="item in coverFileList"
                :key="item.fileId"
                class="el-upload-list__item is-success animated"
              >
                <img
                  :src="item.url"
                  alt=""
                  class="el-upload-list__item-thumbnail"
                />
                <i class="el-icon-close"></i>
                <span class="el-upload-list__item-actions"> </span>
              </li>
              <el-upload
                :file-list="coverFileList"
                list-type="picture-card"
                accept=".jpg , .png"
                :show-file-list="false"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </draggable>
          </ul>
        </template>
        <template #title>拖拽上传(上传只写了样式)</template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue"
import Card from "@/components/Card.vue"
// import draggable from "vuedraggable"
import { VueDraggableNext } from "vue-draggable-next"
import { getAssetsImages } from "@/utils/getAssetsImages.js"

export default defineComponent({
  components: {
    Card,
    draggable: VueDraggableNext,
  },
  setup() {
    let documentText = ref<string>()

    const coverFileList = ref([
      {
        fileId: "123",
        // 本地引入图片方法，代替vue2的require
        url: getAssetsImages("juan.png"),
      },
      {
        fileId: "147",
        url: getAssetsImages("login_bgc.png"),
      },
      {
        fileId: "195",
        url: getAssetsImages("guz-an.png"),
      },
    ])

    documentText.value = `
        vue2用法：import draggable from "vuedraggable"

        vue3用法：import { VueDraggableNext } from "vue-draggable-next"

        vue2和vue3除了插件引入有所变化，用法一模一样


          <ul class="el-upload-list el-upload-list--picture-card">

            <!-- 需要设置handle 绑定可拖动的类名，然后给想拖动的标签绑定此类名 -->
            <draggable
              v-model="coverFileList"
              handle=".animated"
              style="display: flex; flex-wrap: wrap"
            >
              <li
                v-for="(item, index) in coverFileList"
                :key="item.fileId"
                class="el-upload-list__item is-success animated"
              >
                <img
                  :src="item.url"
                  alt=""
                  class="el-upload-list__item-thumbnail"
                />
                <span class="el-upload-list__item-actions"> </span>
              </li>

            //  文件上传的列表和循环遍历的图片，保持一致就可以了
              <el-upload
                :file-list="coverFileList"
                list-type="picture-card"
                accept=".jpg , .png"
                :show-file-list="false"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </draggable>
          </ul>
      `

    return {
      coverFileList,
      documentText,
    }
  },
})
</script>

<style lang="scss" scoped>
.case-one {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .drag-box {
    width: 33%;
    height: 50%;
  }
}
</style>
