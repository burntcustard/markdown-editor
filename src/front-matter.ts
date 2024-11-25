const frontMatterRegex = /(^---[\s\S]*?\n---)/

export const stripFrontMatter = (text: string): string =>
  text.replace(frontMatterRegex, '')

export const parseFrontMatter = (text: string): Record<string, string> =>
  Object.fromEntries(
    text
      .match(frontMatterRegex)?.[0]
      ?.split('\n')
      ?.map((line) => {
        const [key, value] = line.split(/:\s*/)
        return [key.trim(), value?.trim()]
      }) ?? []
  )
