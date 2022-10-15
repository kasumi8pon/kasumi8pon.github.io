import path from "path"
import fs from "fs"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"
import { readPosts } from '../../lib/post-loader'
import Layout from "../../components/layout"
import dayjs from "dayjs"

type Props = {
  title: string
  date: string
  content: string
  description?: string
}

export default function Post(props: Props) {
  return (
    <Layout
      pageTitle={props.title}
      description={props.description}
    >
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
  const metadata = matterResult.data as Metadata
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()


  return {
    props: {
      ...metadata,
      content,
      slug: params.slug
    }
  }
}

export async function getStaticPaths() {
  const onlyPublished = process.env.NODE_ENV === 'production'
  const paths = readPosts(onlyPublished)
    .map((post) => ({
      params: {
        slug: post.slug
      }
    }))
  return { paths, fallback: false }
}
