import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useDarkMode from 'use-dark-mode'
import { ReactUtterances } from '../components/ReactUtterances'

export interface Friend {
  id: string
  link: string
  avatar: string
  bgColor: string
}

const Friends = () => {
  const friends: Friend[] = [
    // {
    //   id: '@Felinae',
    //   link: 'https://code.felinae98.cn/',
    //   avatar: 'https://avatars3.githubusercontent.com/u/23295345?s=160',
    //   bgColor: '#473922'
    // }
  ]

  const darkMode = useDarkMode(false)

  return (
    <>
      <Head>
        <title>Friends & Guestbook - Kherrisan&apos;s Blog</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-3xl">
          <Navbar />

          <div className="my-16">
            <div className="mb-12 text-center text-3xl font-bold dark:text-white">Friends & Guestbook</div>

            <div className="flex justify-center items-center flex-wrap space-x-3">
              {friends.map(f => (
                <a
                  key={f.id}
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: f.bgColor }}
                  className="inline-block relative overflow-hidden px-4 py-2 rounded mb-3 hover:opacity-90"
                >
                  <img
                    src={f.avatar}
                    alt="avatar"
                    className="absolute w-12 h-12 top-0 bottom-0 left-0 rounded-xl transform rotate-12"
                  />
                  <div className="text-white ml-12">{f.id}</div>
                </a>
              ))}
            </div>

            <div className="text-center text-gray-400 mt-4">
              <a className="rounded text-purple-400 hover:text-purple-300" href="mailto:zoudikai@outlook.com">
                Email me
              </a>{' '}
              if you want to get in touch!
            </div>

            {/* <div className="mt-8">
              <DiscussionEmbed shortname="blog-kherrisan" config={{ identifier: 'friend-kherrisan' }} />
            </div> */}

            <ReactUtterances
              repo="Kherrisan/gitalk"
              issueMap="issue-term"
              issueTerm="title"
              theme={darkMode.value ? 'photon-dark' : 'github-light'}
              // theme='github-light'
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Friends
