const remarkPlugins = [
  require("remark-unwrap-images"),
  require("remark-emoji"),
  [require("remark-external-links"), { target: '_blank' }],
]
const options = require("./default-options")
module.exports = {
  siteMetadata: {
    siteTitle: `QiangMa's Blog`,
    siteTitleAlt: `QiangMa's Blog`,
    siteHeadline: `QiangMa's Blog`,
    siteUrl: `https://github.com/mqjd`,
    siteDescription: `QiangMa's Blog`,
    siteLanguage: `en`,
    siteImage: `/banner.png`,
    author: `QiangMa`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.postsPath,
        path: options.postsPath,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.pagesPath,
        path: options.pagesPath,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins,
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-drawio`,
            options: {
              src: "https://viewer.diagrams.net/js/viewer.min.js",
              highlight: "#00afff", 
              lightbox: false,
              nav: true,
              resize: true,
              toolbar: "pages zoom layers lightbox",
              baseUrl: "https://cdn.jsdelivr.net/gh/mqjd/assets@latest/",
            },
          },
          `gatsby-remark-import-code`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: ["@mdx-deck/themes", "gatsby-theme-mdx-deck"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `QiangMa's Blog`,
        short_name: `QiangMa's Blog`,
        description: `QiangMa's Blog.`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ],
}
