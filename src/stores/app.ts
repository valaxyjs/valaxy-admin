import type { FileEntry } from '@tauri-apps/api/fs'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const folderPath = ref('')
  const folderEntries = ref<FileEntry[]>([])

  /**
   * sort entries
   * @param entries
   */
  function setFolderEntries(entries: FileEntry[]) {
    folderEntries.value = entries.sort((a, b) => {
      // isDir when entry has children
      if (a.children && !b.children)
        return -1
      if (!a.children && b.children)
        return 1
      return a.path.localeCompare(b.path)
    })
  }

  return {
    folderPath,
    folderEntries,

    setFolderEntries,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
