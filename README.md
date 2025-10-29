<h1 align="center">Project Template</h1>

<p align='center'>
<b>English</b> | <a href="./README.zh-CN.md">简体中文</a>
</p>

## Features

- ⚡️ Modern stack: Vite + Vue 3 + TypeScript
- 🦾 TypeScript strict mode, type-safe APIs and stores
- 🎨 Built-in Tailwind CSS & CSS Modules for flexible styling
- 🧩 Modular components and composables
- 🔒 Integrated authentication and state management (Pinia)
- 🚀 ESM-first, fast cold start and build
- 🛠️ Preconfigured code quality tools (ESLint, Stylelint, Prettier, Commitlint)
- 📊 Build analysis and performance report
- 📦 Pnpm for dependency installation: faster, lower disk usage, efficient cache

## Quick Start

### 1. Install

The project maintains a `pnpm-lock.yaml` file to ensure deterministic
installations. While npm and yarn are supported, **pnpm** is the recommended
package manager for optimal development experience and build consistency.

```bash
# https://github.com/nvm-sh/nvm
nvm install 22
nvm use 22

# Install pnpm globally (requires v10+)
npm install -g pnpm

pnpm install
```

### 2. Run

Launch development server with hot-reload.

```bash
pnpm run dev
```

### 3. Build

```bash
pnpm run build
```

Build artifacts will be output to the `dist/` directory.

### 4. Deploy

Configure your nginx server with the following settings:

```bash
# .env

VITE_BASE='/base/'

VITE_BACKEND_API='/backend-api'
```

```bash
# /nginx/conf/nginx.conf

server {
  listen 3456;
  server_name localhost;

  # Main Application
  location /base {
    alias /path/to/your/dist;
    index index.html;
  }

  # Backend service proxy configuration
  location /backend-api/ {
    proxy_pass http://backend-service:80/;
  }

  # Additional recommended settings
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

  # Prevent 413 Request Entity Too Large errors
  client_max_body_size 0;
}
```

After deployment, verify the application by accessing:

- Frontend: `http://your-domain:3456/base/#/`

## Project Structure

```bash
./
├── public/          # Static assets copied directly to the build output
├── docs/            # Project documentation
├── plugins/         # Custom scripts
├── dist/            # Build output directory
│
├── src/             # Main source code
│   ├── api/         # API request logic
│   ├── assets/      # Static assets
│   ├── components/  # API request logic.
│   │   └── ui/      # UI-related components
│   ├── composables/ # Composable functions
│   ├── router/      # Vue Router configuration
│   ├── stores/      # Pinia state management
│   ├── styles/      # Global styles
│   ├── types/       # Global type definitions
│   ├── utils/       # Utility functions
│   ├── views/       # Page views
│   ├── main.ts      # Project entry point
│   └── App.vue      # Root Vue component
│
├── index.html       # Main HTML entry
├── stats.html       # Build analysis report
├── package.json     # Project dependencies and scripts
├── tsconfig*.json   # TypeScript configuration files
└── vite.config.ts   # Vite build tool configuration
```

## IDE

### Webstorm

1. `Settings` -> `Tools` -> `Actions on Save`:

- [Run stylelint --fix](https://www.jetbrains.com/help/webstorm/using-stylelint-code-quality-tool.html#ws_stylelint_configure)
  - Enable
  - Run for files: `src/**/*.{css,vue}`
- [Run eslint --fix](https://www.jetbrains.com/help/webstorm/linting-typescript.html#ts_lint_eslint_configure)
  - Automatic ESLint configuration
  - Run for files: `src/**/*.{js,ts,jsx,tsx,vue}`
- [Run Prettier](https://www.jetbrains.com/help/webstorm/prettier.html#ws_prettier_configure)
  - Automatic Prettier configuration
  - Run for files: `**/*.{vue,html,css,js,ts,jsx,tsx,json,md}`
- _Deselect all other options._

2. Other features:
   - [Tailwind CSS](https://www.jetbrains.com/help/webstorm/tailwind-css.html)

### VS Code

_In Progress_

- [Prettier](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code#formatting-code-on-save)
