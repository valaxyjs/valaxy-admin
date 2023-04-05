<script lang="ts" setup>
import { onMounted } from 'vue'
import { listenMenuIdApi } from '~/tauri'

onMounted(() => {
  listenMenuIdApi()
})
</script>

<template>
  <RouterView />
</template>
