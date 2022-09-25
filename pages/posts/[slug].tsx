import path from "path"
import { listContentFiles, readContentFile } from '../../lib/content-loader'
import Layout from "../../components/layout"

type Props = {
  title: string
  date: string
  content: string
}

export default function Post(props: Props) {
  return (
    <Layout title={props.title}>
      <div>
        <span>
          {props.date}
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.content }}>
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
