/** @jsx jsx */
import { jsx } from 'theme-ui'
import { invert } from '@theme-ui/color'
import { navigate } from '@reach/router'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import Zoom from './zoom'
import SlideList from './slide-list'

const Overview = ({ slides, children }) => {
  const { slug, index, length, maximize } = useDeck()

  return (
    <div
      sx={{
        display: 'flex',
        height: '100%',
        fontFamily: 'ui',
        color: 'white',
        background: invert('background'),
      }}>
      <div
        sx={{
          width: 100 / 6 + '%',
          minWidth: 0,
          flex: 'none',
          height: '100%',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          p: 2,
        }}>
        <SlideList
          slides={slides}
          zoom={1 / 6}
          onClick={i => {
            navigate([slug, i].join('/'))
          }}
        />
      </div>
      <div
        sx={{
          width: 500 / 6 + '%',
          py: 3,
          pr: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        <div
          sx={{
            flex: '1 1 auto',
          }}>
          <Zoom zoom={maximize ? 5/6 : 1/2}>{children}</Zoom>
        </div>
        <div
          sx={{
            py: 3,
          }}>
          {index} / {length - 1}
        </div>
      </div>
    </div>
  )
}

export default Overview