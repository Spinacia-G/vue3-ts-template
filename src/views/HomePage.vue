<template>
  <div>hello, {{ username }}</div>
  <el-button @click="logout">Logout</el-button>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store'

const { logout, username } = useAuthStore()
</script>

<style lang="scss" scoped></style>
