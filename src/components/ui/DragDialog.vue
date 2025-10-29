<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Dialog Title',
  },
  visible: {
    type: Boolean,
    required: true,
  },
  initX: {
    type: Number,
    required: false,
    default: 80,
  },
  initY: {
    type: Number,
    required: false,
    default: 80,
  },
})

const emits = defineEmits(['handleClose'])

const handle = useTemplateRef('handle')
const { style } = useDraggable(handle, {
  initialValue: { x: props.initX, y: props.initY },
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="visible"
        :style="style"
        class="absolute z-100 rounded-lg shadow-lg bg-slate-50 text-slate-600 min-w-48 min-h-36 max-w-4/5 max-h-4/5 overflow-hidden flex flex-col"
      >
        <div class="relative size-full flex flex-col overflow-hidden">
          <div
            ref="handle"
            class="h-10 w-full cursor-move select-none flex flex-row items-center justify-start px-4 shrink-0"
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
          <div class="flex-1 m-2 overflow-auto">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
