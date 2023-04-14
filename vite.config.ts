import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import prismjs from 'vite-plugin-prismjs'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/common.scss";`,
      },
    },
  },
  // 设备别名
  resolve: {
    alias: {
      '@':path.resolve(__dirname,'./src')
    },
  },
  server: {
    proxy: {
      "/public": {
        target: "http://20.21.1.113:28081/document",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  //引入jsx写法
  plugins: [vue(),vueJsx(),prismjs({
                // 添加支持的高亮的语言, 如果需要支持全部的话改成这样:  languages: "all"
                languages: [
                 'javascript',
                    'sql',
                    'css',
                    'html',
                    'java',
                    'json',
                    'sass',
                    'scss',
                    'c',
                    'log',
                    'ts'
                ],
                // 配置prism插件 toolbar是后面两个插件依赖的插件.
                // show-language: 显示语言名。
                // copy-to-clipboard: 添加复制代码功能。
                plugins: ['toolbar', 'show-language', 'copy-to-clipboard',"line-numbers"],
                // 主题名称,支持的主题可以在 node_moduels中安装此库的目录下寻找。
                theme: "okaidia",
                css: true
            })]
})
