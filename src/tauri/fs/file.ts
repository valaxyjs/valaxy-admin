import type { FileEntry } from '@tauri-apps/api/fs'
import { readTextFile } from '@tauri-apps/api/fs'
import type { Post } from 'valaxy'
import matter from 'gray-matter'

export async function getFilesMetadata(entries: FileEntry[]): Promise<Post[]> {
  const filesMetadata: Post[] = []

  const promiseTasks = entries.map(async (entry) => {
    const content = await readTextFile(entry.path)
    const { data } = matter(content)

    filesMetadata.push({
      path: entry.path,
      name: entry.name,
      data,
    })
    return data
  })

  await Promise.all(promiseTasks)
  return filesMetadata.sort((a, b) => {
    const dateA = new Date(a.data.updated || a.data.date)
    const dateB = new Date(b.data.updated || b.data.date)
    return dateB.getTime() - dateA.getTime()
  })
}
