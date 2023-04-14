<template>
  <div class="login">
    <div class="login-form">
      <img
        src="../../assets/image/project_title.png"
        class="login-title"
        alt=""
      />
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="userName">
          <el-input
            v-model.number="form.userName"
            type="text"
            placeholder="请输入账号"
          >
            <template #prefix>
              <el-icon><Avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.number="form.password"
            :type="passwordType ? 'password' : 'text'"
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
            <template #suffix>
              <el-icon style="cursor: pointer" @click="viewPassword"
                ><View
              /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button
        style="margin: 60px 0 20px 0"
        type="primary"
        @click="submitForm"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { useRouter } from "vue-router"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
export default defineComponent({
  setup() {
    type Form = {
      userName: string
      password: number | null
    }
    const form = reactive<Form>({
      userName: "",
      password: null,
    })
    const formRef = ref<FormInstance>()

    const passwordType = ref<boolean>(true)
    const viewPassword = () => {
      passwordType.value = !passwordType.value
    }
    const rules = reactive<FormRules>({
      userName: [
        {
          required: true,
          message: "请输入账号",
          trigger: ["change", "blur"],
        },
        {
          pattern: /^[\w]{3,10}$/,
          message: "账号长度应该在3-10位,大小写字母和数字,下划线组成",
          trigger: "blur",
        },
        {
          pattern: /^[a-zA-Z]/,
          message: "应英文字母开头，不限制大小写",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: ["blur"],
        },
        {
          pattern: /^[\w]{6,16}$/,
          message: "密码长度应该在6-16位,大小写字母和数字,下划线组成",
          trigger: "blur",
        },
        {
          pattern: /^[a-zA-Z]/,
          message: "应英文字母开头，不限制大小写",
          trigger: "blur",
        },
      ],
    })

    const router = useRouter()
    const submitForm = () => {
      formRef.value.validate((val: boolean) => {
        if (val) {
          ElMessage({
            type: "success",
            message: "登录成功",
          })
          localStorage.setItem("token", "123456")
          router.push("/")
        }
      })
    }
    const resetForm = () => {}
    return {
      form,
      rules,
      formRef,
      passwordType,
      submitForm,
      resetForm,
      viewPassword,
    }
  },
})
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  width: 100%;
  height: 100vh;
  background: url("../../assets/image/login_bgc.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-title {
    height: 60px;
    margin-bottom: 20px;
  }
  .login-form {
    width: 350px;
    height: 350px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    backdrop-filter: blur(14px);
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
  }
}

:deep(.el-button--primary) {
  width: 100%;
  --el-button-bg-color: rgba(255, 255, 255, 0.4) !important;
  --el-button-active-bg-color: rgba(255, 255, 255, 0.4) !important;
  --el-button-hover-bg-color: rgba(255, 255, 255, 0.6) !important;

  border: transparent;
}

:deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.17) !important;
  border-radius: 5px;
}
:deep(.el-input) {
  --el-input-border-color: rgba(255, 255, 255, 0.1) !important;
  --el-input-focus-border-color: rgba(255, 255, 255, 0.6) !important;
  --el-input-hover-border-color: rgba(255, 255, 255, 0.6) !important;
}
:deep(.el-input__inner) {
  color: #fff !important;
}
</style>
