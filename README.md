# Todo Client

A simple todo application built with React and TypeScript.

## Features

- Add todo items
- Mark todos as complete/incomplete
- Delete todos
- Empty state handling

## Getting Started

```bash
npm install
npm run dev
```

## Tech Stack

- React
- TypeScript
- Vite

## Desktop App

The app can also be packaged as a Windows or Mac desktop app with [web-terrarium](https://github.com/stevez/web-terrarium). The config, [`terrarium.config.mjs`](terrarium.config.mjs), is just a name and an id: web-terrarium sees Vite and treats the app as a static app, builds it with `npm run build` and ships `dist/` with its own small static server.

```bash
npx web-terrarium build   # zip in dist-desktop/out
npx web-terrarium start   # open the staged app without packaging
```

The [Desktop app workflow](.github/workflows/desktop.yml) builds and smoke-tests the Windows and Mac apps on every pull request, comments the download links on it, and attaches the zips to a release on `v*` tags.
