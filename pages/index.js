import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle, name } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/Date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  const response = await fetch('https://api.github.com/orgs/rocketseat/repos')
  const allRepositoriesData = await response.json()
  return {
    props: {
      allPostsData,
      allRepositoriesData,
    }
  }
}

export default function Home({allPostsData, allRepositoriesData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <strong>{name}</strong> and I'm learning Next.js!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title})=>{
            return(
              <li className={utilStyles.listItem} key={id}>
                <Link href='/posts/[id]' as={`/posts/${id}`}>
                  <a>
                    {title}
                  </a>
                </Link>
                <br/>
                <div className={utilStyles.lightText}>
                  <Date dateString={date}/>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Repositories</h2>
        <ul className={utilStyles.list}>
          {allRepositoriesData.map(({id, name})=>{
            return(
              <li className={utilStyles.listItem} key={id}>
                {name} <br/>
                {id} <br/>
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}
