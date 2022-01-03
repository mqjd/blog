module.exports = themeOptions => {
  const basePath = themeOptions.basePath || `/`
  const blogPath = themeOptions.blogPath || `/blog`
  const postsPath = themeOptions.postsPath || `docs/posts`
  const postsPrefix = themeOptions.postsPrefix || `/`
  const pagesPath = themeOptions.pagesPath || `docs/pages`
  const tagsPath = themeOptions.tagsPath || `/tags`
  const externalLinks = themeOptions.externalLinks || []
  const navigation = themeOptions.navigation || []
  const showLineNumbers = themeOptions.showLineNumbers !== false
  const showCopyButton = themeOptions.showCopyButton !== false
  const formatString = themeOptions.formatString || `YYYY-MM-DD`
  const mdx = typeof themeOptions.mdx === `undefined` ? true : themeOptions.mdx
  const sharp =
    typeof themeOptions.sharp === `undefined` ? true : themeOptions.sharp

  return {
    basePath,
    blogPath,
    postsPath,
    postsPrefix,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    formatString,
    mdx,
    sharp,
  }
}
