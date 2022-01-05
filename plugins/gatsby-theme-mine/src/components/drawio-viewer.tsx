import React from 'react'
import { useDeck } from 'mdx-deck'

type Props = {
    highlight: string,
    lightbox: boolean,
    nav: boolean,
    resize: boolean,
    toolbar: string,
    url: string,
    param: string,
}

const resolveParams = (text: string) => {
    if (!text) {
        return {};
    }
    return text.split(";").map(v => {
        let result = {};
        if (v.indexOf("=") !== -1) {
            result[v.substring(0, v.indexOf("="))] = resoveValue(v.substring(v.indexOf("=") + 1));
        } else {
            result[v] = true;
        }
        return result;
    }).reduce((prev, cur) => {return {...prev, ...cur}})
}

const resoveValue = (value: any) => {
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
        "auto-fit": true
    }
    let params = resolveParams(prop.param);
    React.useEffect(() => {
        let win: any = window;
        const element = container.current
        win.GraphViewer.getUrl(prop.url, function (e) {
            graphView = new win.GraphViewer(element, win.mxUtils.parseXml(e).documentElement, {...prop, ...defaultProps, ...params});
        });
    }, [])
    return <div style={style}><div style={{height: "100%"}} ref={container}></div></div>
}

export default DrawioViewer
