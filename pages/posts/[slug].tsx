import path from "path"
import { listContentFiles, readContentFile } from '../../lib/content-loader'
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

export async function getStaticProps({ params }: {params: Params}) {
  const content = await readContentFile({ slug: params.slug })

  return {
    props: {
      ...content
    }
  }
}

export async function getStaticPaths() {
  const paths = listContentFiles()
    .map((filename: string) => ({
      params: {
        slug: path.parse(filename).name
      }
    }))
  return { paths, fallback: false }
}
