import path from "path"
import fs from "fs"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"
import { readContentFiles } from '../../lib/content-loader'
import Layout from "../../components/layout"
import dayjs from "dayjs"

type Props = {
  title: string
  date: string
  content: string
}

export default function Post(props: Props) {
  return (
    <Layout>
      <div>
        <h1>{props.title}</h1>
        <div className="font-serif">
          {dayjs(props.date).format('YYYY-MM-DD')}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="pt-5 markdown"
      >
      </div>
    </Layout>
  )
}

type Params = {
  slug: string
}

const DIRECTORY = path.join(process.cwd(), "content/posts")

export async function getStaticProps({ params }: {params: Params}) {
  const raw = fs.readFileSync(path.join(DIRECTORY, `${params.slug}.md`), 'utf8')
  const matterResult = matter(raw)
  const { title, date } = matterResult.data
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()

  return {
    props: {
      title,
      date: dayjs(date).format(),
      content,
      slug: params.slug
    }
  }
}

export async function getStaticPaths() {
  const paths = readContentFiles()
    .map((post) => ({
      params: {
        slug: post.slug
      }
    }))
  return { paths, fallback: false }
}
