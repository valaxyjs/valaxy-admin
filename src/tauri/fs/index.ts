import { invoke } from '@tauri-apps/api'
import type { FileEntry } from '@tauri-apps/api/fs'
import { readDir } from '@tauri-apps/api/fs'

export * from './file'

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

  // convert windows path to unix path
  // folderPath = folderPath.replace(/\\/g, '/')

  let entries: FileEntry[] = []
  try {
    entries = await readDir(folderPath, {
      // recursive: true,
    })
  }
  catch (e) {
    console.error(e)
    console.error('Error reading folder')
  }
  return entries
}

export async function processEntries(entries: FileEntry[]) {
  for (const entry of entries) {
    if (entry.children)
      processEntries(entry.children)
  }
}
