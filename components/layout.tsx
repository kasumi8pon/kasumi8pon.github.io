import Head from "next/head"
import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  title?: string
  children?: ReactNode
}

const Layout = (props: Props) => {
  const { title, children } = props
  const siteTitle = "kasumi8pon blog"

  return (
    <div>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>

        <header>
          <h1>
            <Link href="/">
              <a>{siteTitle}</a>
            </Link>
          </h1>
        </header>
      </Head>

      <main>
        <h1>{title}</h1>
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
