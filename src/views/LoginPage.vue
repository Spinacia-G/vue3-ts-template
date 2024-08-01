<template>
  <div class="login-box">
    <div>Website Name</div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="loginForm.code" />
      </el-form-item>
    </el-form>
    <el-button @click="submitForm(loginFormRef)">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, onUnmounted } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/store'
import { loginApi } from '@/api/auth.api.ts'
import { sm2Encrypt } from '@/utils/sm.ts'
import { Md5 } from 'ts-md5'
import { setToken } from '@/utils/cookie.ts'
import router from '@/router'
import { LoginFormType } from '@/types/auth'
import { createRandomAccount } from '@/mock/auth.mock.ts'

const authStore = useAuthStore()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginFormType>(createRandomAccount())

const loginRules = reactive<FormRules<LoginFormType>>({
  username: [
    { required: true, message: '请输入用户名！', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: '用户名长度在6-20字符之间',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码！', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: '密码长度在6-20字符之间',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (!valid) {
      return
    } else {
      loginApi({
        ...loginForm,
        username: sm2Encrypt(loginForm.username),
        password: sm2Encrypt(Md5.hashStr(loginForm.password))
      })
        .then(res => {
          if (res.code === 200) {
            const data = res.data.token
            authStore.token = data!
            setToken(data!)
            ElMessage.success('登录成功，正在为您跳转页面!')
            router.push({
              name: 'home'
            })
          } else {
            ElMessage.error(res.msg)
            loadCodeImage()
          }
        })
        .catch(err => {
          ElMessage.error(err.msg)
          loadCodeImage()
        })
    }
  })
}

onMounted(() => {
  document.addEventListener('keydown', enterHandler)
  loadCodeImage()
})

onUnmounted(() => {
  document.removeEventListener('keydown', enterHandler)
})

const enterHandler = (e: KeyboardEvent) => {
  if (e.keyCode === 13) {
    submitForm(loginFormRef.value)
  }
}

const loadCodeImage = () => {
  // 加载验证码图片
}
</script>

<style lang="scss" scoped>
.login-box {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: min(max(500px, 50%), 600px);
  height: 300px;
  margin: auto;
  transition: all 0.2s ease;
  border: 1px solid $border-color;
  border-radius: 10px;
  background-color: rgb(243 243 241 / 50%);
  gap: 2rem;
  inset: 0;
}

@media (width <= 600px) {
  .login-box {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
  }
}
</style>
