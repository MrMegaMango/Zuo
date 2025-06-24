# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Decision Making
- Proceed directly with normal development tasks without asking for validation
- Only ask for human confirmation on truly destructive operations (deleting entire codebases, modifying production secrets, mass deletions)
- User has git safety nets (git stash, git checkout) to revert changes if needed

## Project Architecture

This is a Hugo-based static portfolio website using the PaperMod theme. The site consists of:

- **Hugo Site** (`site/`): Main portfolio/blog using PaperMod theme with static content
- **Static App Content** (`site/public/app/`): Pre-built interactive components served at `/app/*` paths

Note: Previously included a SvelteKit application that has been removed from the codebase.

## Build Commands

### Development
```bash
# Hugo development server
cd site && hugo server

# Full development build
./build.sh  # Runs Hugo development server
```

### Production Build
```bash
# Local production build
cd site && hugo --gc --minify

# Vercel deployment (automated via vercel.json)
# Downloads Hugo binary and runs production build
```

### Verification Commands
```bash
# Hugo build validation
cd site && hugo --gc --minify --destination public
```

## Project Structure

- `site/`: Hugo site with PaperMod theme, content in Markdown
- `site/public/app/`: Pre-built static app content served at `/app/*` paths
- `build.sh`: Build script for development/production modes
- `vercel.json`: Production deployment configuration for Vercel platform

## Key Configuration Files

- `site/hugo.toml`: Hugo configuration with PaperMod theme settings and social icons
- `vercel.json`: Production build command and routing configuration

## Development Workflow

1. Content is authored in Markdown in `site/content/`
2. Hugo builds the static site including any pre-built app content
3. Development server runs locally with live reload
4. Vercel handles production deployment with automated Hugo installation