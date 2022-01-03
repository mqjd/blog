import React from 'react'

type Props = {
    highlight: string,
    lightbox: boolean,
    nav: boolean,
    resize: boolean,
    toolbar: string,
    url: string
}

const style = {
    width: "auto",
    minWidth: "100px",
    overflow: "auto"
}

const DrawioViewer = ( prop: Props) => {
    const container = React.useRef()
    React.useEffect(() => {
        let win: any = window;
        const element = container.current
        win.GraphViewer.getUrl(prop.url, function (e) {
            e = win.mxUtils.parseXml(e);
            e = new win.GraphViewer(element, e.documentElement, prop);
          });
    }, [])
    return <div style={style}><div  ref={container}></div></div>
}

export default DrawioViewer
