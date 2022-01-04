import React from 'react'
import { useDeck } from './deck/context'

type Props = {
    highlight: string,
    lightbox: boolean,
    nav: boolean,
    resize: boolean,
    toolbar: string,
    url: string
}

const style = {
    minWidth: "100px",
    overflow: "hidden"
}

const DrawioViewer = ( prop: Props) => {
    let graphView;
    const container = React.useRef()
    const context: any = useDeck()
    const defaultProps = {
        toolbar: context.deck ? null : prop.toolbar || null,
        "auto-fit": true,
        "auto-origin": true,
        "allow-zoom-in": false,
        "allow-zoom-out": false,
        "toolbar-position": "top",
        center: true,
        responsive: true,
    }
    React.useEffect(() => {
        let win: any = window;
        const element = container.current
        win.GraphViewer.getUrl(prop.url, function (e) {
            graphView = new win.GraphViewer(element, win.mxUtils.parseXml(e).documentElement, {...prop, ...defaultProps});
        });
    }, [])
    return <div style={style}><div style={{height: "100%"}} ref={container}></div></div>
}

export default DrawioViewer
