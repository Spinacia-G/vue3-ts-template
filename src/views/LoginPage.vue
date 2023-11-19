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
      <el-form-item label="username" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
    </el-form>
    <el-button @click="submitForm(loginFormRef)">Login</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, onUnmounted } from 'vue'
import { UserInfo } from '@/types/user.d.ts'
import { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/store'

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<UserInfo>({
  username: '',
  password: ''
})

const loginRules = reactive<FormRules<UserInfo>>({
  username: [
    { required: true, message: 'please input username', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: 'The Length should be 6 to 20',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: 'please input password', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: 'The Length should be 6 to 20',
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (!valid) {
      return
    } else {
      const { login } = useAuthStore()
      login(loginForm)
    }
  })
}

onMounted(() => {
  document.addEventListener('keydown', enterHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', enterHandler)
})

const enterHandler = (e: KeyboardEvent) => {
  if (e.keyCode === 13) {
    submitForm(loginFormRef.value)
  }
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
