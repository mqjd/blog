import * as React from "react"
import Post from "../components/post"
import Deck from "./deck"

type Props = {
  data: {
    post: any
    [key: string]: any
  }
  [key: string]: any
}

export default function MinimalBlogCorePost({ ...props }: Props) {

  if(props.data.post.deck) {
    return <Deck {...props}></Deck>
  } else {
    return <Post {...props} />

  }
}
