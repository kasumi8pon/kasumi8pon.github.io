import path from "path"
import matter from "gray-matter"
import dayjs from "dayjs"
import fs from "fs"

const DIRECTORY = path.join(process.cwd(), "content/posts")
const EXTENSION = ".md"

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

export { readPosts }
