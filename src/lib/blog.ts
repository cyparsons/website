import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostMeta {
  title: string
  description: string
  date: string
  author: string
  readTime: string
  slug: string
}

const contentDir = path.join(process.cwd(), "content", "blog")

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8")
    const { data } = matter(raw)

    return {
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "",
      readTime: data.readTime ?? "",
      slug,
    } satisfies PostMeta
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  const meta: PostMeta = {
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "",
    readTime: data.readTime ?? "",
    slug,
  }

  return { meta, content }
}
