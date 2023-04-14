<template>
  <div class="card">
    <slot name="content"></slot>
    <!-- 底部功能栏 -->
    <div class="footer">
      <el-divider />
      <div class="footer-left">
        <slot name="title"></slot>
      </div>
      <div class="footer-right">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="查看代码"
          placement="bottom-start"
        >
          <el-icon class="icon" @click.stop="viewText"><View /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <!-- 查看内容弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      draggable
      :title="dialogTitle"
      :before-close="close"
      :fullscreen="isFullscreen"
      :modal="false"
    >
      <div class="icon-box">
        <el-icon class="copy-icon" @click.stop="copyDocumnet"
          ><DocumentCopy
        /></el-icon>
        <el-icon class="fullScreen" @click="isFullscreen = !isFullscreen">
          <component :is="!isFullscreen ? 'FullScreen' : 'Minus'"></component>
        </el-icon>
      </div>
      <el-scrollbar :max-height="isFullscreen ? '100%' : '530px'">
        <pre class="language-js line-numbers">
        <code class="language-js " v-html="Prism.highlight(documentText, Prism.languages.js)"></code>
        </pre>
      </el-scrollbar>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="close"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, nextTick } from "vue"
import Prism from "prismjs"
import { ElMessage } from "element-plus"
export default defineComponent({
  props: {
    dialogTitle: {
      type: String,
      default: () => {
        return "查看内容"
      },
    },
    documentText: {
      type: String,
      default: () => {
        return ""
      },
    },
  },
  setup(props) {
    let dialogVisible = ref<boolean>(false)
    const isFullscreen = ref<boolean>(false)

    // 关闭弹窗
    const handleClose = () => {}
    // 开启全屏
    const fullScreenClick = () => {
      isFullscreen.value = true
    }
    // 查看代码
    const viewText = () => {
      dialogVisible.value = true
    }
    // 复制代码
    const documentCopy = () => {}
    // 关闭
    const close = () => {
      dialogVisible.value = false
      setTimeout(() => {
        isFullscreen.value = false
      }, 300)
    }

    const copyDocumnet = () => {
      // 创建输入框元素
      let oInput = document.createElement("input")
      // 将想要复制的值
      oInput.value = props.documentText
      // 页面底部追加输入框
      document.body.appendChild(oInput)
      // 选中输入框
      oInput.select()
      // 执行浏览器复制命令
      document.execCommand("Copy")
      // 弹出复制成功信息
      ElMessage({
        message: "复制成功",
        type: "success",
      })
      // 复制后移除输入框
      oInput.remove()
    }

    nextTick(() => {
      Prism.highlightAll()
    })

    return {
      dialogVisible,
      isFullscreen,
      handleClose,
      viewText,
      documentCopy,
      fullScreenClick,
      close,
      copyDocumnet,
      Prism,
    }
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: 10px 10px 50px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  position: relative;
  .footer {
    height: 40px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 40px;
    z-index: 999;
    background-color: #fff;
    .footer-left {
      float: left;
      padding-left: 15px;
    }
    .footer-right {
      float: right;
      .icon {
        margin-right: 15px;
        color: $font-color;
        cursor: pointer;
        &:hover {
          color: $main-color;
        }
      }
    }
  }
  .icon-box {
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 0;
    width: 80px;
    right: 50px;
  }
  .fullScreen {
    position: absolute;
    top: 23.5px;
    right: 0px;
    color: $font-color;
    cursor: pointer;
    &:hover {
      color: $main-color;
    }
  }
  .copy-icon {
    @extend .fullScreen;
    right: 30px;
  }
}
:deep(.el-divider--horizontal) {
  margin: 0;
}
:deep(.el-dialog) {
  max-height: 100%;
  overflow: auto;
}
:deep(.is-draggable) {
  --el-dialog-margin-top: 5vh !important;
}
</style>
<style>
/* pre[class*="language-"] {
  padding: 0;
  margin: 0;
} */
/* // 全局设置行号样式才能展示white-space: pre-wrap */
/* pre.line-numbers,
pre.no-line-numbers {
  white-space: pre-wrap;
} */
</style>
