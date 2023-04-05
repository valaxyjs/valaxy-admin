import { invoke } from '@tauri-apps/api'
import { BaseDirectory, readDir } from '@tauri-apps/api/fs'

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

export async function getEntries() {
  const entries = await readDir('users', {
    dir: BaseDirectory.AppData,
    recursive: true,
  })
  return entries
}

export async function processEntries() {
  const entries = await readDir('users', {
    dir: BaseDirectory.AppData,
    recursive: true,
  })

  for (const entry of entries) {
    console.log(`Entry: ${entry.path}`)
    if (entry.children)
      processEntries(entry.children)
  }
}
