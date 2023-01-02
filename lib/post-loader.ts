import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import dayjs from "dayjs"
import fs from "fs"

const DIRECTORY = path.join(process.cwd(), "content/posts")
const EXTENSION = ".md"

const readPost = async (slug: string) => {
  const raw = fs.readFileSync(path.join(DIRECTORY, `${slug}.md`), 'utf8')
  const matterResult = matter(raw)
  const metadata = matterResult.data as Metadata
  const parsedContent = await remark().use(html, {sanitize: false}).process(matterResult.content)
  const content = parsedContent.toString()


  return {
    ...metadata,
    content,
    slug: slug
  }
}

const readPosts = (onlyPublished: boolean = true) => {
  const posts = fs.readdirSync(DIRECTORY)
    .filter((filename) => path.parse(filename).ext === EXTENSION)
    .map((filename) => {
      const file = fs.readFileSync(path.join(DIRECTORY, filename), 'utf8')
      const metadata = matter(file).data as Metadata
      return {
        slug: path.parse(filename).name,
        ...metadata
      }
    }).filter((post) => onlyPublished ? post.published : true)
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())

  return posts
}

export { readPosts, readPost }
