<template>
  <div>hello</div>
  <el-button @click="logout">Logout</el-button>
</template>

<script lang="ts" setup>
import router from '@/router'

const logout = () => {
  router.push({
    name: 'login'
  })
}
</script>

<style lang="scss" scoped></style>
