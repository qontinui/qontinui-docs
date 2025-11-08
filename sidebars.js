/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/first-automation',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'concepts/states',
        'concepts/elements',
        'concepts/transitions',
        'concepts/perception',
      ],
    },
    {
      type: 'category',
      label: 'DSL Reference',
      items: [
        'dsl/syntax',
        'dsl/examples',
        'dsl/best-practices',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/state-management',
        'api/perception',
        'api/actions',
        'api/migrations',
      ],
    },
    {
      type: 'category',
      label: 'Migration Guide',
      items: [
        'migration/from-brobot',
        'migration/converter-tool',
        'migration/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        'advanced/ai-models',
        'advanced/custom-perception',
        'advanced/mcp-integration',
        'advanced/performance',
      ],
    },
  ],
};

export default sidebars;