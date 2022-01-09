/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from '@reach/router'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'
import SlideList from './slide-list'

const Grid = ({ slides }) => {
  const { slug, setState, maximize } = useDeck()
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
            if (maximize) {
              navigate([slug, i].join('/'))
              setState({ mode: modes.normal })
            }
          }}
          zoom={ maximize ? 1/4 : 3/5 }
          sx={{
            width: maximize ? '25%' : '100%',
            m: 0,
            mb: maximize ? 0 : 10
          }}
        />
      </div>
    </div>
  )
}

export default Grid
