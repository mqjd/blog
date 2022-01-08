/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from '@reach/router'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'
import SlideList from './slide-list'

const Grid = ({ slides }) => {
  const { slug, setState } = useDeck()
  return (
    <div
      sx={{
        minHeight: '100%',
        color: 'white',
        bg: 'black',
      }}>
      <div
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        <SlideList
          slides={slides}
          onClick={i => {
            navigate([slug, i].join('/'))
            setState({ mode: modes.normal })
          }}
          sx={{
            width: '25%',
            m: 0,
          }}
        />
      </div>
    </div>
  )
}

export default Grid
