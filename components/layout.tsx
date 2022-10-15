import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

type Props = {
  pageTitle?: string
  description?: string
  children?: ReactNode
}

const Layout = (props: Props) => {
  const { pageTitle, children, description } = props
  const siteUrl = "https://kasumi8pon.net"
  const siteTitle = "kasumi8pon"
  const ogTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
  const ogDescription = description || 'kasumi8pon\'s website'
  const ogUrl = `${siteUrl}${useRouter().asPath}`
  const ogImg = `${siteUrl}/images/kasumi8pon.jpg`


  return (
    <div className="h-full">
      <Head>
        <title>{ogTitle}</title>
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={ogTitle} />
        <meta property="twitter:image" content={ogImg} />
        <meta property="twitter:creator" content="@kasumi8pon" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:img" content={ogImg} />
        <meta property="og:url" content={ogUrl} />
      </Head>

      <header className="flex justify-center items-center h-28 bg-red-100">
        <div className="max-w-xl w-full pl-3 pr-3 text-3xl font-bold text-center">
          <Link href="/">
            <a>{siteTitle}</a>
          </Link>
        </div>
      </header>

      <main className="min-h-[calc(100%-14.25rem)]">
        <div className="flex justify-center pt-10 pb-10">
          <div className="max-w-xl w-full pl-3 pr-3">
            <div>
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center items-center h-28 bg-red-100">
        <div className="flex justify-end max-w-xl w-full pl-3 pr-3">
          <Link href="/about">
            <img
              src="https://kasumi8pon.net/images/kasumi8pon.jpg"
              alt="kasumi8pon's icon, Ponta in front of seibu dome"
              className="w-10 rounded-full"
            />
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
