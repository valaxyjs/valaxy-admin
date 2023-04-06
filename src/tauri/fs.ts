import { invoke } from '@tauri-apps/api'
import type { FileEntry } from '@tauri-apps/api/fs'
import { readDir } from '@tauri-apps/api/fs'

// to remove. use api directly
// invoke example
export async function readFolderApi(folderPath: string) {
  try {
    const res = (await invoke('open_folder', {
      folderPath,
    })) as string[]
    return res
  }
  catch (e) {
    return Promise.reject(e)
  }
}

export async function getFolderEntries(folderPath: string) {
  if (!folderPath)
    return []
  const entries = await readDir(folderPath, {
    // recursive: true,
  })
  return entries
}

export async function processEntries(entries: FileEntry[]) {
  for (const entry of entries) {
    if (entry.children)
      processEntries(entry.children)
  }
}
