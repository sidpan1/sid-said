# Slides Includes

These includes make it easy to add slides to your blog posts.

## Quick Link Include with Embedded Slides

Use the `quick-link.html` include to embed slides directly in your post:

```liquid
{% include slides/quick-link.html slug="your-slides-filename" %}
```

This will create a container with embedded PDF slides that readers can browse directly in the page without leaving your blog post.

## Full Options Include

Use the `full-options.html` include to provide both PDF and PowerPoint download options:

```liquid
{% include slides/full-options.html slug="your-slides-filename" pptx=true %}
```

The `pptx` parameter is optional. If set to `true`, it will show a PowerPoint download link.

## File Structure

Your slides should be stored in the `/assets/slides/` directory with the following naming convention:

- PDF slides: `your-slides-filename.pdf`
- PowerPoint slides: `your-slides-filename.pptx`

## Creating New Slides

To add slides for a new blog post:

1. Create your slides using Slidev:
   ```bash
   npx slidev slides/your-slides-filename.md
   ```

2. Export to PDF and optionally PowerPoint:
   ```bash
   npx slidev export slides/your-slides-filename.md
   npx slidev export --format pptx slides/your-slides-filename.md
   ```

3. Move the exported files to your assets directory:
   ```bash
   mv your-slides-filename-export.pdf assets/slides/
   mv your-slides-filename-export.pptx assets/slides/
   ```

4. Add the include to your blog post:
   ```liquid
   {% include slides/quick-link.html slug="your-slides-filename-export" %}
   ```
