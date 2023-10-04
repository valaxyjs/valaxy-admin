import { dialog } from '@tauri-apps/api'

// 打开文件夹
export async function openFolderDialog() {
  const folderPath = await dialog.open({
    // default use last path
    title: 'Please select a folder',
    directory: true,
  }) as string

  return folderPath
}
