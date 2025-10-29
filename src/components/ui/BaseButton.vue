<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  type?: 'slate'
}>()
const emits = defineEmits(['handleClick'])
</script>

<template>
  <div
    class="cursor-pointer font-mono flex flex-row items-center gap-x-2 px-4 py-1 rounded-full transition bg-slate-100 hover:text-white hover:bg-slate-500 active:bg-slate-600"
    @click="emits('handleClick')"
  >
    <slot name="icon" />
    <svg-icon v-if="icon" :name="icon" class="size-4 shrink-0" />
    <div
      class="select-none text-sm whitespace-nowrap text-ellipsis overflow-hidden"
    >
      {{ label }}
    </div>
  </div>
</template>
