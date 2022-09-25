import path from "path"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"
import dayjs from "dayjs"
import fs from "fs"

const DIRECTORY = path.join(process.cwd(), "content/posts")
const EXTENSION = ".md"

type Fs = typeof fs

const listContentFiles = ({ fs }: { fs: Fs }) => {
  const markdownFilenames = fs.readdirSync(DIRECTORY)
    .filter((filename) => path.parse(filename).ext === EXTENSION )
  return markdownFilenames
}

const readContentFile = async ({ fs, slug }: { fs: Fs; slug: string }) => {
  const raw = fs.readFileSync(path.join(DIRECTORY, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const { title, published: rawPublished } = matterResult.data
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()

  return {
    title,
    published: dayjs(rawPublished).format(),
    content,
    slug
  }
}

export { listContentFiles, readContentFile }
