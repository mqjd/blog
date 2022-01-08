import { graphql } from "gatsby"
import BlogComponent from "../views/blog"

export default BlogComponent

export const query = graphql`
  query ($formatString: String!) {
    allPost(sort: { fields: date, order: DESC }) {
      nodes {
        slug
        title
        deck
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`
