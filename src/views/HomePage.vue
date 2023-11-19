<template>
  <div>hello, {{ username }}</div>
  <el-button @click="logout">
    <svg-icon name="arrow-left-box" />
    <span>Logout</span>
  </el-button>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store'

const { logout, username } = useAuthStore()
</script>

<style lang="scss" scoped>
.el-button {
  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
}
</style>
