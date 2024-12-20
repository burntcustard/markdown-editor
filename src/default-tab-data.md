---
title: Cheat Sheet
language: en-US
---

# Markdown Cheat Sheet

This editor supports the majority of **[GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)** via [micromark](https://github.com/micromark/micromark) and [micromark-extension-gfm](https://github.com/micromark/micromark-extension-gfm).

Raw [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) is supported, although some elements may act unexpectedly or may not be styled.

The `title` and `language` [YAML](https://yaml.org/) set the tab name and the language of the editor. A page refresh may be needed for spellcheckers to detect the updated [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).

---

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

Content in `<details>` elements is hidden when editing. As a workaround, include the `open` attribute when editing, and then remove it when finished.

Markdown heading syntax (`###`) does not work within `<summary>` elements. Use HTML tags like `<h3>` instead.
</details>
