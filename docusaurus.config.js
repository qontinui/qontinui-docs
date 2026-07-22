// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Qontinui Documentation",
  tagline: "Model-based GUI automation with AI-enhanced perception",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://qontinui.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "qontinui", // Usually your GitHub org/user name.
  projectName: "qontinui-docs", // Usually your repo name.

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      // Top-level `onBrokenMarkdownLinks` is deprecated and removed in v4.
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "/",
          editUrl: "https://github.com/qontinui/qontinui-docs/tree/main/",
        },
        // No blog: this repo has no posts, and the preset's blog plugin fails
        // the build when its content directory is absent. Re-enable by setting
        // this to an options object once a `blog/` directory exists.
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/logo.png",
      navbar: {
        title: "Qontinui",
        logo: {
          alt: "Qontinui Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            href: "https://github.com/qontinui/qontinui",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        // Every `to:` here must resolve to a real page — `onBrokenLinks: "throw"`
        // fails the build otherwise, which is what these links previously did
        // (`/docs/api` and `/docs/migration` were never authored).
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/",
              },
              {
                label: "The Three Tiers",
                to: "/tiers",
              },
              {
                label: "DSL Reference",
                to: "/dsl/",
              },
            ],
          },
          {
            title: "Project",
            items: [
              {
                label: "Core library",
                href: "https://github.com/qontinui/qontinui",
              },
              {
                label: "Runner",
                href: "https://github.com/qontinui/qontinui-runner",
              },
              {
                label: "Issues",
                href: "https://github.com/qontinui/qontinui/issues",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub organization",
                href: "https://github.com/qontinui",
              },
              {
                label: "Contributing",
                href: "https://github.com/qontinui/qontinui-docs/blob/main/CONTRIBUTING.md",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Qontinui Project. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["python", "rust", "bash"],
      },
    }),
};

export default config;
