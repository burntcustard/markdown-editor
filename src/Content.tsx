import { Component, createComputed, createSignal } from 'solid-js'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import './Content.css'

const stripFrontMatter = (value: string): string => {
  const frontMatterRegex = /^---[\s\S]*?\n---/

  return value.replace(frontMatterRegex, '')
}

const Content: Component<{value?: string}> = (props) => {
  const [html, setHtml] = createSignal();

  createComputed(() => {
    setHtml(micromark(stripFrontMatter(props.value ?? ''), {
      allowDangerousHtml: true,
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
    }))
  })

  return (
    <div class="content" innerHTML={html() as string} />
  )
}

export default Content
