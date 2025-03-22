# Slides for Sid Said Blog

This directory contains slide presentations created with [Slidev](https://sli.dev) based on blog posts from the Sid Said Blog.

## How to Use

### Preview slides locally
```bash
npm run slides:dev -- slides/your-presentation.md
```

### Build slides for deployment
```bash
npm run slides:build -- slides/your-presentation.md
```

### Export slides to PowerPoint (default)
```bash
npm run slides:export -- slides/your-presentation.md
```

This will export to `assets/slides/your-presentation.pptx` in dark mode, which is to be used as the default.

## Creating New Presentations

Work with Claude to create new presentations based on your blog posts.

## Export Options

### Different Formats
```bash
# Export as PDF
npm run slides:export -- slides/your-presentation.md --format pdf

# Export as PNGs
npm run slides:export -- slides/your-presentation.md --format png
```

### Light Mode
```bash
# Override dark mode with light mode
npm run slides:export -- slides/your-presentation.md --no-dark
```

### Custom Output
```bash
# Specify custom output location/name
npm run slides:export -- slides/your-presentation.md --output=custom-path/custom-name.pptx
```
