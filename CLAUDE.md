# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hybrid personal website that combines:
- **Hugo static site** (blog/portfolio) in `site/` using PaperMod theme
- **SvelteKit application** in `svelte/` with interactive features
- **Vercel serverless deployment** configuration

The site serves Zuo Wang's professional portfolio, blog posts, and interactive applications. The Hugo site handles the main content (blog, resume, static pages) while SvelteKit powers dynamic features like games and interactive demos.

## Build System

### Main Build Command
```bash
./build.sh
```

This script:
1. Downloads and installs Hugo Extended v0.144.2
2. Builds the SvelteKit app (`npm run build` in `svelte/`)
3. Builds the Hugo site with minification (`hugo --gc --minify` in `site/`)
4. Copies SvelteKit server output to `../api/` for Vercel serverless functions

### Development Commands

**Hugo site development:**
```bash
cd site
hugo server -D  # Serves with drafts
```

**SvelteKit development:**
```bash
cd svelte
npm run dev     # Development server
npm run check   # Type checking
```

### Vercel Configuration

The `vercel.json` only specifies the build command. The SvelteKit Vercel adapter generates its own `.vercel/output/config.json` that handles:
- Serverless function routing for `/app/*` paths  
- Static file serving for Hugo content
- Proper redirects and caching headers

**Important**: The build process combines both SvelteKit's Vercel output (functions + static app files) and Hugo's static site into the `.vercel/output/` directory structure that Vercel expects.

## Architecture

### Directory Structure
- `site/` - Hugo static site generator
  - `content/posts/` - Blog posts in Markdown
  - `static/` - Static assets
  - `themes/PaperMod/` - Hugo theme
  - `hugo.toml` - Site configuration
- `svelte/` - SvelteKit application
  - `src/routes/` - SvelteKit pages and API routes
  - `package.json` - Dependencies and scripts
  - `svelte.config.js` - Adapter configuration for Vercel
- `api/` - Generated serverless functions (auto-created during build)

### URL Routing
- Root domain (`/`) serves Hugo static content
- `/app/*` routes serve SvelteKit application via Vercel serverless functions
- SvelteKit uses `/app` as base path (configured in `svelte.config.js`)

### Key Dependencies
- **SvelteKit**: Uses `@sveltejs/adapter-vercel` for serverless deployment
- **Hugo**: PaperMod theme for blog/portfolio styling
- **Vercel**: Handles both static site hosting and serverless functions

## Content Management

### Adding Blog Posts
Create new Markdown files in `site/content/posts/` following Hugo front matter format.

### SvelteKit Features
The SvelteKit app includes interactive demos like Sverdle (word guessing game) accessible at `/app/sverdle`.

## Deployment

The site automatically deploys to Vercel when changes are pushed. The build process handles both Hugo static generation and SvelteKit serverless function preparation.