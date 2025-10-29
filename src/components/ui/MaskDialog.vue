<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Dialog Title',
  },
  visible: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['handleClose'])
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="visible"
        class="absolute z-2001 bg-slate-950/80 inset-0 size-full flex flex-col items-center justify-center"
      >
        <div
          class="relative rounded-lg shadow-lg bg-slate-50 text-slate-600 min-w-64 min-h-36 max-w-4/5 max-h-4/5 overflow-hidden flex flex-col"
        >
          <div
            class="h-10 w-full select-none flex flex-row items-center justify-start px-4 shrink-0"
          >
            <div
              class="size-2 rounded-full bg-green-300 shadow-green-200 shadow-md shrink-0"
            />
            <div
              class="ml-2 font-semibold tracking-widest whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ title }}
            </div>
            <svg-icon
              name="carbon/close-outline"
              class="ml-auto size-4 shrink-0 cursor-pointer transition hover:text-slate-400 active:scale-75"
              @click.stop="emits('handleClose')"
            />
          </div>
          <div class="w-full h-px bg-slate-200" />
          <div class="flex-1 m-2 overflow-auto">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
