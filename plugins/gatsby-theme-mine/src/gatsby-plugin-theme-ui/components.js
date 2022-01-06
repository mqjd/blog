/* eslint react/prop-types: 0 */
import * as React from "react"
import { preToCodeBlock } from "mdx-utils"
import { Text } from "theme-ui"
import Code from "../components/code"
import Title from "../components/title"
import DrawioViewer from "../components/drawio-viewer"
import Deck from "../components/deck"
import * as mdxComponents from "@mdx-deck/gatsby-plugin/src/components"

const components = {
  Text: ({ children, ...props }) => <Text {...props}>{children}</Text>,
  Title: ({ children, text, ...props }) => (
    <Title text={text} {...props}>
      {children}
    </Title>
  ),
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  ...mdxComponents,
  DrawioViewer,
  wrapper: props => {
    if ( props.data && props.data.post.deck) {
      return <Deck {...props}></Deck>
    } else {
      return <>{props.children}</>
    }
  },
}

export default components
