import React from "react"
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"

import wrapper from "../components/deck/deck"
import * as mdxComponents from "../components/deck/components"

const components = {
  wrapper,
  ...mdxComponents,
}

const DeckTemplate = ({
  data: {
    post: { body },
  },
  ...props
}) => {
  return (
    <MDXProvider {...props} components={components}>
      <MDXRenderer {...props}>{body}</MDXRenderer>
    </MDXProvider>
  )
}

export default DeckTemplate