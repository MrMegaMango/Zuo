# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a hybrid portfolio website combining Hugo (static site generator) and SvelteKit. The site consists of:

- **Hugo Site** (`site/`): Main portfolio/blog using PaperMod theme
- **SvelteKit App** (`svelte/`): Interactive components embedded in Hugo
- **Build Pipeline**: SvelteKit builds into Hugo's static directory

The architecture integrates a SvelteKit application as a sub-application within a Hugo-generated static site, with SvelteKit components accessible at `/app/*` paths.

## Build Commands

### Development
```bash
# Hugo development server (includes built Svelte app)
cd site && hugo server

# SvelteKit development server (standalone)
cd svelte && npm run dev

# Full development build
./build.sh  # Builds Svelte, copies to Hugo, starts Hugo server
```

### Production Build
```bash
# Local production build
cd svelte && npm install && npm run build
cd ../site && hugo --gc --minify

# Vercel deployment (automated via vercel.json)
# Downloads Hugo binary, builds Svelte, runs Hugo production build
```

### Verification Commands
```bash
# SvelteKit type checking
cd svelte && npm run check

# Hugo build validation
cd site && hugo --gc --minify --destination public
```

## Project Structure

- `svelte/`: SvelteKit application with TypeScript, Vite, and Vercel adapter
- `site/`: Hugo site with PaperMod theme, content in Markdown
- `build.sh`: Development build script that integrates both systems
- `vercel.json`: Production deployment configuration for Vercel platform

## Key Configuration Files

- `site/hugo.toml`: Hugo configuration with PaperMod theme settings
- `svelte/svelte.config.js`: SvelteKit config with Vercel adapter, base path `/app`
- `svelte/package.json`: SvelteKit dependencies and build scripts
- `vercel.json`: Production build command and routing configuration

## Development Workflow

1. SvelteKit components are built into `svelte/build/`
2. Build script copies SvelteKit output to `site/static/app/`
3. Hugo serves the combined site with SvelteKit at `/app/*` routes
4. Vercel handles production deployment with automated Hugo installation