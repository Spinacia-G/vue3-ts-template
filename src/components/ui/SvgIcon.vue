<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
const dynamicIcon = shallowRef('')
const icons = import.meta.glob('../../assets/icons/**/*.svg', {
  eager: true,
  import: 'default',
})
const loadSvgIcon = (iconName: string) => {
  const key = `../../assets/icons/${iconName}.svg`
  dynamicIcon.value = icons[key] as unknown as string
}
watch(
  () => props.name,
  (newName) => loadSvgIcon(newName),
  { immediate: true },
)
</script>

<template>
  <component v-if="dynamicIcon" :is="dynamicIcon" v-bind="$attrs" />
</template>
