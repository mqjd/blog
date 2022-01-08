/** @jsx jsx */
import { jsx } from 'theme-ui'
import { MDXRenderer } from "gatsby-plugin-mdx"
import App from './app'
import Deck from './deck'
import splitSlides from 'gatsby-theme-mdx-deck/src/split-slides'

const wrapper = props => {
  const slides = splitSlides(props)
  return <Deck {...props} slides={slides} />
}

const components = {
  wrapper,
}

const Page = ({ ...props }) =>{
  return (
    <App >
      <MDXRenderer {...props} components={components} children={props.data.post.body} />
    </App>
  )
}

export default Page