import fs from 'fs'
import { Feed } from 'feed'
import dayjs from 'dayjs'
import { readPosts, readPost } from './post-loader'
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const generateRSSFeed = async () => {
  const feed = new Feed({
    title: "kasumi8pon",
    description: "kasumi8pon's blog",
    id: "https://kasumi8pon.net/",
    link: "https://kasumi8pon.net/",
    language: "ja", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: "https://kasumi8pon.net/kasumi8pon.jpg",
    // favicon: "", # TODO
    copyright: "All rights reserved 2022, kasumi8pon",
    author: {
      name: "kasumi8pon",
      email: "all.splashing@gmail.com",
      link: "https://kasumi8pon.net/"
    }
  });

  const onlyPublished = process.env.NODE_ENV === 'production'
  const posts = readPosts(onlyPublished)

  const DIRECTORY = path.join(process.cwd(), "content/posts")

  posts.forEach(async post => {
    const raw = fs.readFileSync(path.join(DIRECTORY, `${post.slug}.md`), 'utf8')
    const matterResult = matter(raw)
    const metadata = matterResult.data as Metadata

    feed.addItem({
      title: metadata.title,
      id: `https://kasumi8pon.net/posts/${post.slug}`,
      link: `https://kasumi8pon.net/posts/${post.slug}`,
      description: metadata.description,
      content: matterResult.content,
      date: dayjs(post.date).toDate()
    });
  });
  fs.writeFileSync(`./public/feed.xml`, feed.rss2(), 'utf8')
}

export { generateRSSFeed }
