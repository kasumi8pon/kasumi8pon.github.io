import path from "path"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"
import dayjs from "dayjs"
import fs from "fs"

const DIRECTORY = path.join(process.cwd(), "content/posts")
const EXTENSION = ".md"

const listContentFiles = () => {
  const markdownFilenames = fs.readdirSync(DIRECTORY)
    .filter((filename) => path.parse(filename).ext === EXTENSION )
  return markdownFilenames
}

const readContentFile = async ({ slug }: { slug: string }) => {
  const raw = fs.readFileSync(path.join(DIRECTORY, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const { title, date } = matterResult.data
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()

  return {
    title,
    date: dayjs(date).format(),
    content,
    slug
  }
}

const readContentFiles = async () => {
  const promisses = listContentFiles()
    .map((filename) => readContentFile({ slug: path.parse(filename).name }))

  const contents = await Promise.all(promisses)
  const sortedContents = contents.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())

  return sortedContents
}

export { listContentFiles, readContentFile, readContentFiles }
