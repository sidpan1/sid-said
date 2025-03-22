#!/bin/bash
# Slidev Setup Script for Sid Said Blog
# Save this file to your repository root and run it once to set up Slidev

# Navigate to blog repository
echo "Setting up Slidev in blog repository..."
cd /Users/sid/Code/workspace_20250321_sid-said

# Initialize NPM if not already initialized
if [ ! -f package.json ]; then
  echo "Initializing NPM..."
  npm init -y
fi

# Install Slidev and required themes
echo "Installing Slidev and dependencies..."
npm install @slidev/cli @slidev/theme-default @slidev/theme-seriph

# Create directory structure for slides
echo "Creating directory structure..."
mkdir -p slides

# Add scripts to package.json
echo "Adding npm scripts to package.json..."
# Check if jq is available
if command -v jq &> /dev/null; then
  # Use jq to update package.json
  jq '.scripts += {"slides:dev": "slidev", "slides:build": "slidev build", "slides:export": "slidev export"}' package.json > package.json.tmp
  mv package.json.tmp package.json
else
  # Notify user to add scripts manually
  echo "Please add the following scripts to your package.json manually:"
  echo '"scripts": {'
  echo '  "slides:dev": "slidev",'
  echo '  "slides:build": "slidev build",'
  echo '  "slides:export": "slidev export"'
  echo '}'
fi

# Create README file for slides directory
echo "Creating README file for slides directory..."
cat > slides/README.md << 'EOL'
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

### Export slides to PDF
```bash
npm run slides:export -- slides/your-presentation.md
```

## Creating New Presentations

Work with Claude to create new presentations based on your blog posts.
EOL

# Create a sample template slide deck
echo "Creating sample template..."
cat > slides/template.md << 'EOL'
---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## Sid Said Blog
  Presentation slides for blog content.
drawings:
  persist: false
transition: slide-left
title: Template Presentation
---

# Template Presentation

Presentation slides for blog content

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide
  </span>
</div>

---
layout: default
---

# What is Slidev?

Slidev is a slides maker and presenter designed for developers

<v-clicks>

- 📝 **Text-based** - focus on the content with Markdown
- 🎨 **Themable** - easily customizable with CSS
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding
- 📱 **Responsive** - works on all devices
- 🎥 **Recording** - built-in recording and camera view

</v-clicks>

---
layout: section
---

# Section Title

This is a section divider slide

---
layout: default
---

# Code Example

```python
def hello_world():
    print("Hello, World!")
    
# Call the function
hello_world()
```

---
layout: two-cols
---

# Left Column

This content will be on the left side.

::right::

# Right Column

This content will be on the right side.

---
layout: end
---

# Thank You!

[Back to the blog](https://sidpan1.github.io/sid-said/)
EOL

echo "Slidev setup complete!"
echo "To create a new presentation, work with Claude to develop presentation content"
echo "based on your blog posts, then save them in the slides/ directory."
