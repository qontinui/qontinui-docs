# Qontinui Documentation

This repository contains the documentation for the Qontinui project, built with [Docusaurus](https://docusaurus.io/).

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using GitHub Pages:

```bash
npm run deploy
```

This command builds the website and pushes to the `gh-pages` branch.

## 📚 Documentation Structure

```
docs/
├── intro.md                 # Welcome page
├── getting-started/         # Installation and quick start
├── concepts/               # Core concepts
├── dsl/                   # DSL reference
├── api/                   # API documentation
├── migration/             # Migration guides
└── advanced/              # Advanced topics
```

## 🎨 Customization

### Adding a New Doc

1. Create a new Markdown file in the `docs/` directory
2. Add frontmatter with metadata:

```markdown
---
sidebar_position: 1
title: My New Doc
---

# My New Doc

Content here...
```

### Updating the Sidebar

Edit `sidebars.js` to customize the sidebar structure.

### Styling

Custom CSS can be added to `src/css/custom.css`.

## 🤝 Contributing

We welcome contributions to the documentation! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Writing Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Follow the existing structure and style
- Test all code examples
- Check for broken links

## 📄 License

This documentation is licensed under the MIT License.
