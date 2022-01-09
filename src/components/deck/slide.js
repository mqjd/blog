/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment } from 'react'
import Context from 'gatsby-theme-mdx-deck/src/context'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import useSwipe from 'gatsby-theme-mdx-deck/src/hooks/use-swipe'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

export const Slide = ({ slide, index, preview, ...props }) => {
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
          width: '100%',
          height: context.mode === modes.print ? '100vh' : '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          color: 'text',
          bg: 'background',
          variant: 'styles.Slide'
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
