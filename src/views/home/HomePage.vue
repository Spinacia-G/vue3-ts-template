<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const appTitle = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="relative size-full flex flex-col overflow-hidden text-slate-600">
    <div class="relative h-12 w-full shrink-0 bg-slate-100 p-4">
      <div
        class="size-full flex flex-row items-center justify-start select-none"
      >
        <svg-icon
          name="carbon/rain"
          class="absolute -left-2 -top-2 size-12 opacity-15"
        />
        <div
          class="font-header text-2xl tracking-widest gradient-text bg-gradient-to-r from-slate-600 to-sky-700"
        >
          {{ appTitle }}
        </div>
        <div class="font-header ml-2 text-sm translate-y-1">
          // {{ authStore.user?.nickname }}
        </div>
        <router-link
          :to="{ name: 'dashboard' }"
          class="ml-auto text-slate-400"
          active-class="text-slate-600"
        >
          <svg-icon
            name="carbon/home"
            class="size-7 p-1 rounded-md cursor-pointer hover:bg-slate-200"
          />
        </router-link>
        <router-link
          :to="{ name: 'management' }"
          class="text-slate-400"
          active-class="text-slate-600"
        >
          <svg-icon
            name="carbon/settings"
            class="size-7 p-1 rounded-md cursor-pointer hover:bg-slate-200"
          />
        </router-link>
        <router-link
          :to="{ name: 'sample' }"
          class="text-slate-400"
          active-class="text-slate-600"
        >
          <svg-icon
            name="carbon/help"
            class="size-7 p-1 rounded-md cursor-pointer hover:bg-slate-200"
          />
        </router-link>
        <svg-icon
          name="carbon/logout"
          class="ml-6 size-5 cursor-pointer hover:text-slate-400"
          @click="authStore.logout"
        />
      </div>
    </div>
    <router-view class="relative size-full overflow-hidden" />
  </div>
</template>
