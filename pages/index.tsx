import Link from "next/link"
import Layout from "../components/layout"
import { readPosts } from '../lib/post-loader'
import { generateRSSFeed } from "../lib/generate-feeds"
import dayjs from "dayjs"

type Post = {
  title: string
  date: string
  content: string
  slug: string
  published: boolean
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
        className="pb-2"
      >
        <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
          <a>
            <div className="flex">
              <div className="flex-none w-24">
                {dayjs(post.date).format('YYYY-MM-DD')}
              </div>
              <div className="flex-none w-3"></div>
              <div className="flex-auto">
                {post.title}
              </div>
            </div>
          </a>
        </Link>
      </div>)}
    </Layout>
  )
}

export async function getStaticProps() {
  await generateRSSFeed()

  const onlyPublished = process.env.NODE_ENV === 'production'
  const posts = readPosts(onlyPublished)

  return {
    props: {
      posts
    }
  }
}
