# [burnt.md](https://burnt.md/)

An installable markdown editor web-app. Built using [Solid Website](https://solidjs.com) and [Vite PWA](https://vite-pwa-org.netlify.app/).

This project was originally created to learn about Markdown and Progressive Web App (PWA) development, and to neatly contain random encounter info for TTRPG sessions.

## Features

Supports the majority of [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/) via [micromark](https://github.com/micromark/micromark) and [micromark-extension-gfm](https://github.com/micromark/micromark-extension-gfm).

Raw [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) is supported, although some elements may act unexpectedly or may not be styled.

Content is stored in [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). To transfer content to another browser or device, or to ensure it's not lost if site data is cleared, you can import and export `.md` files.

There are two [YAML](https://yaml.org/) properties: The **`title`** or 'name' of the tab, and **`language`**, which determines the language of the editor to allow for spellchecking. Not all browsers support `lang` tags on `textarea`s, and some may need focus-toggling or a page-refresh to apply it.

## Local Development

### Install

```bash
$ npm install # or pnpm install or yarn install
```

### Available Scripts

In the project directory:

```bash
npm run dev
```

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

```bash
npm run build`
```

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
