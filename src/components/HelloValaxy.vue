<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import { openFolderDialog } from '~/utils'

const app = useAppStore()

async function openFolder() {
  app.folderPath = await openFolderDialog()
}
</script>

<template>
  <div class="card">
    <button class="t-button mb-4" type="button" @click="openFolder">
      Open Folder ...
    </button>

    <div>
      {{ app.folderPath }}
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
