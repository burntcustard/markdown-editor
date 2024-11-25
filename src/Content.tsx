import { Component } from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './Content.css'

const Content: Component<{children?: string}> = ({ children }) => (
  <SolidMarkdown
    class="content"
    children={children}
    rehypePlugins={[rehypeRaw] as any}
    remarkPlugins={[remarkGfm] as any}
  />
)

export default Content
