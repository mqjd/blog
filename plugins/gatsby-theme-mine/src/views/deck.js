import React from "react"
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { ThemeProvider, merge } from 'theme-ui'
import wrapper from "../components/deck"
import * as mdxComponents from "@mdx-deck/gatsby-plugin/src/components"
import baseTheme from '@mdx-deck/gatsby-plugin/src/theme'
import DrawioViewer from "../components/drawio-viewer"
const components = {
  wrapper,
  ...mdxComponents,
  DrawioViewer
}

const Page = props =>
  <MDXProvider components={components}>
    {props.children}
  </MDXProvider>

const DeckTemplate = (data) => {
  const {
    data: {
      post: { body },
    },
    ...props
  } = data
  const theme = merge(baseTheme, props.theme || {})
  const MyElement = props => <MDXRenderer {...props}>{body}</MDXRenderer>
  return (
    <ThemeProvider theme={theme} components={components}>
      <MyElement {...props}/>
    </ThemeProvider>
  )
}

export default DeckTemplate