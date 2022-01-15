
const getToastContainer = () => {
  let toastContainer = document.querySelector('#toast-container');
  if (toastContainer) {
    return toastContainer;
  }
  let newToastContainer = document.createElement('div');
  newToastContainer.setAttribute('id', 'toast-container');
  newToastContainer.style.position="fixed";
  newToastContainer.style.top="1.5em";
  newToastContainer.style.right="1.5em";
  newToastContainer.style.width="15em";
  document.body.appendChild(newToastContainer)
  return newToastContainer;
}

const toast = (color) => {
  let toastContainer = getToastContainer();
  const toast = document.createElement('div');
  toast.append(color);
  toast.append(document.createElement('br'));
  toast.append("Code copied to clipboard.");
  toast.style.borderRight = "3px solid #ff9800";
  toast.style.borderBottom = "3px solid #ff9800";
  toast.style.marginTop = "0.5em";
  toast.style.padding = "1em";
  toast.style.color = "white";
  toast.style.backgroundColor = "black";
  toastContainer.append(toast);
  setTimeout(() => {
    toastContainer.removeChild(toast);
  }, 1500)
}

const copyToClipboard = (str: string) => {
  const { clipboard } = window.navigator
  /*
   * fallback to older browsers (including Safari)
   * if clipboard API is not supported
   */

  toast(str);

  if (!clipboard || typeof clipboard.writeText !== `function`) {
    const textarea = document.createElement(`textarea`)
    textarea.value = str
    textarea.setAttribute(`readonly`, `true`)
    textarea.setAttribute(`contenteditable`, `true`)
    textarea.style.position = `absolute`
    textarea.style.left = `-9999px`
    document.body.appendChild(textarea)
    textarea.select()
    const range = document.createRange()
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    textarea.setSelectionRange(0, textarea.value.length)
    document.execCommand(`copy`)
    document.body.removeChild(textarea)

    return Promise.resolve(true)
  }

  return clipboard.writeText(str)
}

export default copyToClipboard
