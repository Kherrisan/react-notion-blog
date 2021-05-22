const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className="w-full p-4 text-center text-gray-400 bg-gray-800">
      <div className="container mx-auto">
        <div>
          <a className="hover:text-white" href="https://beian.miit.gov.cn/#/Integrated/index">苏ICP备 17065958 号-2</a>
          ,{' '}
          <a className="hover:text-white" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32040202000292">苏公网安备 2040202000292 号</a>
        </div>
        <div>
          Powered by{' '}
          <a className="hover:text-white" href="https://nextjs.org/">
            Next.js
          </a>
          ,{' '}
          <a className="hover:text-white" href="https://tailwindcss.com/">
            Tailwind CSS
          </a>
          ,{' '}
          <a className="hover:text-white" href="https://notion.so">
            Notion
          </a>{' '}
          and{' '}
          <a className="hover:text-white" href="https://www.typescriptlang.org/">
            TypeScript.
          </a>
        </div>
        <div>react-notion-blog @ Spencer Woo © 2017-{currentYear}</div>
      </div>
    </footer>
  )
}

export default Footer
