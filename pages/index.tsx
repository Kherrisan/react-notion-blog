import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { formatSlug } from '../utils/slugFormat'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || '42725490784d400d89125ad8722545d2'

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Post {
  id: string
  name: string
  tag: string
  published: boolean
  date: string
  slug: string
  author: Author[]
  preview: string
  views: number
}

export interface PostView {
  key: string
  value: number
}

export const getAllPosts = async (): Promise<Post[]> => {
  return await axios.get(`https://notion-cloudflare-worker.kherrisan.workers.dev/v1/table/${NOTION_BLOG_ID}`).then(res => res.data.sort((a:Post,b:Post)=> a.date.localeCompare(b.date)).reverse())
}

export const getPostViews = async (): Promise<PostView[]> => {
  const today = new Date()
  const aYearBefore = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

  // console.log(today.toISOString())
  // console.log(aYearBefore.toISOString())

  return await axios
    .post(
      'https://api.splitbee.io/graphql',
      {
        query: `query getTopPages($range: TimeRangeInput!, $filter: StatsFilter) {
        topPages(range: $range, filter: $filter) {
          key
          value
          __typename
        }
      }`,
        operationName: 'getTopPages',
        variables: {
          range: {
            from: aYearBefore.toISOString(),
            to: today.toISOString()
          },
          filter: {}
        }
      },
      {
        headers: {
          projectId: 'kherrisan.com',
          'content-type': 'application/json'
        }
      }
    )
    .then(res => res.data.data.topPages)
}

export const getStaticProps = async () => {
  const postViews = new Map<string, number>()

  const posts = (await getAllPosts()).filter(p => p.published)

  // 获得 post 的阅读量
  const postViewList = await getPostViews()
  postViewList.forEach((v: PostView) => {
    postViews.set(v.key, v.value)
  })

  posts.forEach(p => {
    let views = postViews.get(formatSlug(p.date, p.slug))!
    if (views == undefined) {
      views = 0;
    }
    p.views = views;
  })

  return {
    props: {
      posts
    },
    revalidate: 1
  }
}

const HomePage = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>Kherrisan 的博客</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-3xl">
          <Navbar />

          <div className="my-16">
            <div className="inline-block shadow-lg rounded-full w-18 h-18">
              <Image className="rounded-full" src="/images/avatar.jpg" alt="avatar" width="100%" height="100%" />
            </div>
            <div className="mt-8 text-2xl font-bold dark:text-white">Kherrisan 的博客</div>
            <div className="mt-2 text-gray-400">
              🍯{' '}来点蜂蜜吧
              <Link href="/friends">
                <a className="text-purple-400 hover:text-purple-300 rounded">
                </a>
              </Link>{''}
            </div>

            <div className="mt-12 leading-loose flex flex-col space-y-4">
              {posts.map(post => post.published && <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default HomePage
