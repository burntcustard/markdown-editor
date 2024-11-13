import { Component } from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import rehypeRaw from 'rehype-raw'
import './Content.css'

// The Content Component takes a string as it's children, rather than
// JSX.Element, to match SolidMarkdown. Destructuring breaks SolidJS?
const Content: Component<{ children?: string }> = (props) => (
  <SolidMarkdown
    class="content"
    children={props?.children}
    rehypePlugins={[rehypeRaw] as any}
  />
)

export default Content
