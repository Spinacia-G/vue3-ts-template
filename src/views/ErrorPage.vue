<template>
  <div>Page is not found</div>
  <el-button @click="goBack">Back Home</el-button>
</template>

<script setup lang="ts">
import router from '@/router'

const goBack = () => {
  router.push({
    name: 'home'
  })
}
</script>

<style scoped lang="scss"></style>
