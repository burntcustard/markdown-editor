---
title: Cheatsheet
---

# Markdown Cheatsheet

This editor supports the majority of **[GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)** via [micromark](https://github.com/micromark/micromark) and [micromark-extension-gfm](https://github.com/micromark/micromark-extension-gfm).

It also supports raw [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), although some elements may act unexpectedly or may not have styling.

Syntax examples:

# Heading 1

## Heading 2

### Heading 3

**bold**, *italic*, ~~strikethrough~~, `code`

```
Fenced Code Block
```

- Unordered list
- I.e. bullet points

1. Ordered list
2. I.e. numbers

- [ ] A checkbox list
- [x] With a checked item

> Blockquote.

<details open>
<summary><h3>Expandable Section</h3></summary>

Content in `<details>` elements is hidden when editing. To work around that, include the `open` attribute when editing, and then remove it when finished.

You cannot use regular markdown heading syntax (`###`) within `<summary>` elements, so you have to use HTML tags like `<h3>` instead.
</details>
