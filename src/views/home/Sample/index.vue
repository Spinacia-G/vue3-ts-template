<script setup lang="ts">
const isDragDialogVisible = ref(false)
const isMaskDialogVisible = ref(false)
</script>

<template>
  <div>
    <div
      class="size-full flex flex-col gap-y-2 px-4 items-center justify-center"
    >
      <div class="font-header tracking-widest mb-2">Sample List:</div>
      <base-button
        label="Show Drag Dialog"
        icon="carbon/bottom-panel-open"
        @handleClick="isDragDialogVisible = true"
      />
      <base-button
        label="Show Mask Dialog"
        icon="carbon/bottom-panel-open-filled"
        @handleClick="isMaskDialogVisible = true"
      />
      <div class="my-1 h-px w-24 bg-gradient-to-r via-slate-400" />
      <base-button label="Upload File" icon="carbon/cloud-upload" />
      <base-button label="Download File" icon="carbon/cloud-download" />
      <svg-icon name="ultimate/colors/dashboard" class="size-6" />
    </div>
    <drag-dialog
      :visible="isDragDialogVisible"
      title="Hello"
      @handle-close="isDragDialogVisible = false"
    >
      <div class="flex flex-col">
        <div
          v-for="item in 20"
          :key="item"
          class="p-2 font-mono odd:bg-slate-200"
        >
          Item: {{ item }}
        </div>
      </div>
    </drag-dialog>
    <mask-dialog
      :visible="isMaskDialogVisible"
      title="Mask"
      @handle-close="isMaskDialogVisible = false"
    >
      <div class="flex flex-col">
        <div
          v-for="item in 20"
          :key="item"
          class="p-2 font-mono odd:bg-slate-200"
        >
          Item: {{ item }}
        </div>
      </div>
    </mask-dialog>
  </div>
</template>
