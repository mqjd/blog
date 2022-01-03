/** @jsx jsx */
import { jsx } from 'theme-ui'

const Header = props =>
  <header
    {...props}
    sx={{
      position: 'absolute',
      zIndex: 1,
      left: 0,
      top: 0,
      right: 0,
      pointerEvents: 'none',
      variant: 'styles.Header',
    }}
  />

export default Header