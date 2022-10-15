import path from "path"
import fs from "fs"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"
import Layout from "../components/layout"

type Props = {
  title: string
  content: string
  description?: string
}

export default function About(props: Props) {
  return (
    <Layout
      pageTitle={props.title}
      description={props.description}
    >
      <div>
        <h1>{props.title}</h1>
      </div>
      <div className="pt-5">
        <img
          src="https://kasumi8pon.net/images/kasumi8pon.jpg"
          alt="kasumi8pon's icon, Ponta in front of seibu dome"
          className="w-52 rounded-full"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="markdown"
      >
      </div>
    </Layout>
  )
}

const DIRECTORY = path.join(process.cwd(), "content")

export async function getStaticProps() {
  const raw = fs.readFileSync(path.join(DIRECTORY, `about.md`), 'utf8')
  const matterResult = matter(raw)
  const metadata = matterResult.data as Metadata
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()

  return {
    props: {
      ...metadata,
      content
    }
  }
}
