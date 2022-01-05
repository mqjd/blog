const withDefaults = require(`./utils/default-options`)
const remarkPlugins = [require("remark-unwrap-images"), require("remark-emoji")]

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)
  return {
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
      options.mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          lessBabel: true,
          extensions: [`.mdx`, `.md`],
          remarkPlugins,
          gatsbyRemarkPlugins: [
            `gatsby-remark-import-code`,
            {
              resolve: `gatsby-remark-imgs`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false,
                backgroundColor: `transparent`,
              },
            },
            {
              resolve: `gatsby-remark-drawio`,
              options: {
                src: "/lib/viewer.min.js",
                highlight: "#00afff",
                lightbox: false,
                nav: true,
                resize: true,
                toolbar: "pages zoom layers lightbox",
                baseUrl:
                  "https://cdn.jsdelivr.net/gh/mqjd/assets@latest/",
              },
            }
          ],
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-catch-links`,
      "gatsby-plugin-emotion",
      `gatsby-plugin-theme-ui`,
      {
        resolve: "gatsby-plugin-compile-es6-packages",
        options: {
          modules: ["mdx-deck", "@mdx-deck/themes"],
        },
      },
    ].filter(Boolean),
  }
}
