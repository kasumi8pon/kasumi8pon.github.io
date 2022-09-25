import fs from "fs"
import Link from "next/link"
import Layout from "../components/layout"
import { readContentFiles } from '../lib/content-loader'

type Post = {
  title: string
  date: string
  content: string
  slug: string
}

type Props = {
  posts: Post[]
}

export default function Home(props: Props) {
  const { posts } = props

  return (
    <Layout>
      {posts.map((post) => <div
        key={post.slug}
      >
        <h2><Link href="/posts/[id]" as={`/posts/${post.slug}`}>{post.title}</Link></h2>
      </div>)}
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await readContentFiles({ fs })

  return {
    props: {
      posts
    }
  }
}
