const visit = require("unist-util-visit")

const resolveParams = (text) => {
  var prefixLength= "drawio:".length;
  if (text.length<= prefixLength) {
    return;
  }
  return text.substr(prefixLength).split(";").map(v => {
    let result = {};
    if (v.indexOf("=") !== -1){
      result[v.substr(0, v.indexOf("="))] = resoveValue(v.substr(v.indexOf("=") + 1));
    } else {
      result[v] = true;
    }
    return result;
  }).reduce((prev, cur) => {return {...prev, ...cur}})
}

const resoveValue = (value) => {
  if (value.length === 0) {
    return "";
  }

  if("null" === value){
    return null;
  }

  if(!isNaN(value)){
    return +value;
  }

  if("true" === value){
    return true;
  }

  if("false" === value){
    return false;
  }
  return value;
}

module.exports = ({ markdownAST }, options) => {
  visit(markdownAST, "code", node => {
    let lang = (node.lang || "").toLowerCase()
    if (lang.indexOf("drawio") === 0) {
      var url = node.value
      if (url.indexOf("/") !== 0 && url.indexOf("http") !== 0) {
        url = options.baseUrl + url
      }
      let params = resolveParams(lang);
      let props = {...options, ...params};

      node.type = "jsx"
      node.value = `<DrawioViewer
                      highlight="${props.highlight}"
                      lightbox={${props.lightbox}}
                      nav={${props.lightbox}}
                      resize={${props.lightbox}}
                      toolbar="${props.toolbar}"
                      page={${props.page}}
                      url="${url}"/>`
    }
  })
}
