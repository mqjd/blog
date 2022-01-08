/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment } from 'react'
import Context from 'gatsby-theme-mdx-deck/src/context'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import useSwipe from 'gatsby-theme-mdx-deck/src/hooks/use-swipe'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

export const Slide = ({ slide, index, preview, styles, ...props }) => {
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  return (
    <Context.Provider value={context}>
      <div
        {...(!preview ? swipeProps : {})}
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          color: 'text',
          bg: 'background',
          variant: 'styles.Slide',
          ...styles
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
