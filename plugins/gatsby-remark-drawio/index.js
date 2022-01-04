const visit = require("unist-util-visit")
const prefix = "drawio";
const prefixLength = prefix.length + 1;

module.exports = ({ markdownAST }, options) => {
  visit(markdownAST, "code", node => {
    let lang = (node.lang || "").toLowerCase()
    if (lang.indexOf(prefix) === 0) {
      var url = node.value
      if (url.indexOf("/") !== 0 && url.indexOf("http") !== 0) {
        url = options.baseUrl + url
      }
      let param = lang.length <= prefixLength ? "" : lang.substr(prefixLength);
      node.type = "jsx"
      node.value = `<DrawioViewer
                      highlight="${options.highlight}"
                      lightbox={${options.lightbox}}
                      nav={${options.lightbox}}
                      resize={${options.lightbox}}
                      toolbar="${options.toolbar}"
                      param="${param}"
                      url="${url}"/>`
    }
  })
}
