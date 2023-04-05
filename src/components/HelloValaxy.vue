<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '~/stores/app'
import { readFolderApi } from '~/tauri'
import { openFolderDialog } from '~/utils'

const app = useAppStore()

const fileList = ref<string[]>()

async function openFolder() {
  app.folderPath = await openFolderDialog()

  fileList.value = await readFolderApi(app.folderPath)
  // const entries = await getEntries()
  // processEntries(entries)
  // console.log(entries)
  // processEntries()
}
</script>

<template>
  <h1 font="bold">
    Valaxy Admin
  </h1>

  <div class="card">
    <button class="t-button mb-4" type="button" @click="openFolder">
      Open Folder ...
    </button>

    <div>
      {{ app.folderPath }}
    </div>

    <ul>
      <li v-for="name in fileList" :key="name">
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
