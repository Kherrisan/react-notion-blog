import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { formatSlug } from '../utils/slugFormat'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || '82b6c0ea-1172-490f-b99a-d0709405af16'

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

export const getAllPosts = async (): Promise<Post[]> => {
  return await axios.get(`https://notion-cloudflare-worker.kherrisan.workers.dev/v1/table/${NOTION_BLOG_ID}`).then(res => res.data.sort((a:Post,b:Post)=> a.date.localeCompare(b.date)).reverse())
}

export const getPostView = async (slug: string): Promise<number> => {
  return await axios
    .get('https://api.splitbee.io/v1/kherrisan.com/pageviews', {
      params: { page: slug },
      headers: { 'x-api-key': 'LWIRJGVYBHGC' }
    })
    .then(res => res.data.count)
}

export const getStaticProps = async () => {
  const posts = (await getAllPosts()).filter(p => p.published)
  await Promise.all(
    posts.map(async p => {
      p.views = await getPostView(formatSlug(p.date, p.slug))
    })
  )

  return {
    props: {
      posts
    },
    revalidate: 60
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
              <img className="rounded-full" src="/images/avatar.jpg" alt="avatar" width="100%" height="100%" />
            </div>
            <div className="mt-8 text-2xl font-bold dark:text-white">🍯 Kherrisan 的博客</div>
            <div className="mt-2 text-gray-400">
              这里是我的博客，放着我平时写的一些有的没的。
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
