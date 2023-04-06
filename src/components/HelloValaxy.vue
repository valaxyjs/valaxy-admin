<script setup lang="ts">
import { setFolderEntries, useAppStore } from '~/stores/app'
import { getFolderEntries } from '~/tauri/fs'
import { openFolderDialog } from '~/utils'

const app = useAppStore()

async function openFolder() {
  app.folderPath = await openFolderDialog()

  // fileList.value = await readFolderApi(app.folderPath)

  setFolderEntries(await getFolderEntries(app.folderPath))
  // const entries = await getEntries()
  // processEntries(entries)
  // console.log(entries)
  // processEntries()
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
