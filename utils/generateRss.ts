import { Feed } from 'feed'
import { Post } from '../pages/index'
import { formatSlug } from './slugFormat'

const domain = 'https://blog.kherrisan.com'

export const generateRss = (posts: Post[]) => {
  const year = new Date().getFullYear()
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "Kherrisan's Blog",
    copyright: `All rights reserved ${year}, Kherrisan`,
    image: `${domain}/favicon.ico`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Kherrisan',
      email: 'zdkscope@qq.com',
      link: 'https://kherrisan.com'
    },
    description: 'RSS of Kherrisan\'s blog articles.'
  })

  posts.forEach(post => {
    if (post.published) {
      feed.addItem({
        title: post.name,
        id: `${domain}${formatSlug(post.date, post.slug)}`,
        link: `${domain}${formatSlug(post.date, post.slug)}`,
        description: post.preview,
        date: new Date(post.date)
      })
    }
  })

  return feed.rss2()
}
