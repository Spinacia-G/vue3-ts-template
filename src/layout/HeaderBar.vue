<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/store'
import { getInfoApi, logoutApi } from '@/api/auth.api.ts'
import { removeToken } from '@/utils/cookie.ts'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { HttpResponse } from '@/types/http'
import { UserInfo } from '@/types/auth'

const authStore = useAuthStore()

onMounted(() => {
  getInfoApi().then((res: HttpResponse<UserInfo>) => {
    authStore.setUserInfo(res.data)
  })
})

const logout = () => {
  logoutApi().then(() => {
    removeToken()
    ElMessage.success('登出成功，正在返回到登录页面!')
    router.push({
      name: 'login'
    })
  })
}
</script>

<template>
  <div class="header-container">
    <div>{{ authStore.user.nickname }}</div>
    <el-button class="push" @click="logout">
      <svg-icon class="h-4 w-4" name="arrow-left-box" />
      <span>退出登录</span>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}
</style>
