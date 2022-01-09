module.exports = {
  basePath: `/`,
  blogPath: `/blog`,
  postsPath: `${__dirname}/docs/posts`,
  postsPrefix: `/`,
  pagesPath: `${__dirname}/docs/pages`,
  tagsPath: `/tags`,
  navigation: [
    {
      title: `Blog`,
      slug: `/blog`,
    },
    {
      title: `BookMark`,
      slug: `/bookmark`,
    },
    {
      title: `About`,
      slug: `/about`,
    },
  ],
  externalLinks: [
    {
      name: `Github`,
      url: `https://github.com/mqjd`,
    },
  ],
  showLineNumbers: false,
  showCopyButton: false,
  formatString: `YYYY-MM-DD`,
  sharp: true,
}
