import type { FileEntry } from '@tauri-apps/api/fs'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const folderPath = useStorage('folderPath', '')
  const folderEntries = ref<FileEntry[]>([])

  return {
    folderPath,
    folderEntries,
  }
})

/**
 * sort entries
 * @param entries
 */
export function setFolderEntries(entries: FileEntry[]) {
  const app = useAppStore()
  app.folderEntries = entries.sort((a, b) => {
    // isDir when entry has children
    if (a.children && !b.children)
      return -1
    if (!a.children && b.children)
      return 1
    return a.path.localeCompare(b.path)
  })
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
