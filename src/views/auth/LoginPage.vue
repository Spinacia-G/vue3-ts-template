<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const username = ref<string>('')
const password = ref<string>('')

const appTitle = import.meta.env.VITE_APP_TITLE

const doLogin = () => {
  if (!username.value || !password.value) {
    ElMessage.error('Please enter username and password')
    return
  }
  authStore.login(username.value, password.value)
}
</script>

<template>
  <div class="size-full p-4">
    <div class="size-full grid grid-cols-2 rounded-lg overflow-hidden gap-x-4">
      <div class="flex flex-col items-center justify-center gap-y-4">
        <div
          class="text-slate-600 text-shadow-blue-200 text-shadow-md text-4xl select-none font-mono font-semibold -skew-x-12 mb-4"
        >
          {{ appTitle }}
        </div>
        <div class="flex flex-row items-center gap-x-2">
          <svg-icon name="carbon/user" class="size-6 text-slate-600" />
          <el-input
            class="!w-48"
            v-model.trim="username"
            placeholder="username"
          />
        </div>
        <div class="flex flex-row items-center gap-x-2">
          <svg-icon name="carbon/unlocked" class="size-6 text-slate-600" />
          <el-input
            class="!w-48"
            v-model.trim="password"
            type="password"
            show-password
            placeholder="password"
          />
        </div>
        <div
          class="bg-slate-500 text-white cursor-pointer font-mono tracking-wider w-56 mt-4 text-center py-1 rounded-sm transition hover:bg-slate-400"
          @click="doLogin"
        >
          Login
        </div>
      </div>
      <img
        src="@/assets/images/login-bg.webp"
        alt=""
        class="size-full object-cover rounded-lg overflow-hidden"
      />
    </div>
  </div>
</template>
