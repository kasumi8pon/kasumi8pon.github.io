import Head from "next/head"
import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  title?: string
  children?: ReactNode
}

const Layout = (props: Props) => {
  const { title, children } = props
  const siteTitle = "kasumi8pon"

  return (
    <div className="h-full">
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>

      <header className="flex justify-center items-center h-28 bg-red-100">
        <div className="max-w-xl w-full text-3xl font-bold text-center">
          <Link href="/">
            <a>{siteTitle}</a>
          </Link>
        </div>
      </header>

      <main className="min-h-[calc(100%-14.25rem)]">
        <div className="flex justify-center pt-10 pb-10">
          <div className="max-w-xl w-full">
            <div>
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center h-28 bg-red-100">
        <div className="max-w-xl w-full"></div>
      </footer>
    </div>
  )
}

export default Layout
