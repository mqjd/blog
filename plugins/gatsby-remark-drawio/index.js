const visit = require("unist-util-visit")

module.exports = ({ markdownAST }, options) => {
  visit(markdownAST, "code", node => {
    let lang = (node.lang || "").toLowerCase()
    if (lang === "drawio") {
      var url = node.value
      if (url.indexOf("/") !== 0 && url.indexOf("http") !== 0) {
        url = options.baseUrl + url
      }
      node.type = "jsx"
      node.value = `<DrawioViewer
                      highlight="${options.highlight}"
                      lightbox="${options.lightbox}"
                      nav="${options.nav}"
                      resize="${options.resize}"
                      toolbar="${options.toolbar}"
                      url="${url}"/>`
    }
  })
}
