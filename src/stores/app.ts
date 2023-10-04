import type { FileEntry } from '@tauri-apps/api/fs'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { resolve } from '@tauri-apps/api/path'

export const useAppStore = defineStore('app', () => {
  const folderPath = useStorage('folderPath', '')
  const folderEntries = ref<FileEntry[]>([])

  const postsFolder = computed(async () => {
    return await resolve(folderPath.value, 'pages', 'posts')
  })

  return {
    folderPath,
    folderEntries,

    postsFolder,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
