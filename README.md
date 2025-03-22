# Sid Said

This is the repository for my personal blog "Sid Said". It's built with Jekyll and hosted on GitHub Pages.

## Local Development

To run this site locally:

1. Clone the repository
2. Install Jekyll and Bundler: `gem install jekyll bundler`
3. Navigate to the repository directory
4. Run `bundle install`
5. Start the local server: `bundle exec jekyll serve`
6. Visit `http://localhost:4000/sid-said/` in your browser

## Structure

- `_posts/`: Blog posts in Markdown format
- `_layouts/`: HTML templates for different page types
- `assets/`: Static files like images, CSS, etc.
  - `assets/slides/`: Exported slide presentations
- `slides/`: Source files for slide presentations
- `_config.yml`: Configuration file for the Jekyll site

## Contributing

This is a personal blog, but if you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

Content is © Sidhant, unless otherwise noted.

## Slide Presentations

This repository includes functionality to create and export slide presentations from blog posts using [Slidev](https://sli.dev/).

### Creating Slides

1. Create a new slide presentation in the `slides/` directory (use `template.md` as a starting point)
2. Preview slides with: `npm run slides:dev -- slides/your-file.md`

### Exporting Slides

Slides are automatically exported as PowerPoint files in dark mode to the `assets/slides/` directory:

```bash
# Export slides to PowerPoint (PPTX) in dark mode
npm run slides:export -- slides/your-file.md
```

This will create a file at `assets/slides/your-file.pptx`.

### Options

To override the default settings:

```bash
# Export as PDF instead of PowerPoint
npm run slides:export -- slides/your-file.md --format pdf

# Export with light mode instead of dark mode
npm run slides:export -- slides/your-file.md --no-dark

# Specify a custom output filename
npm run slides:export -- slides/your-file.md --output=custom-name.pptx
```
