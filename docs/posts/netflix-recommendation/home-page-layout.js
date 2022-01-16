import React from 'react'

export default ({ children }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
    {children}
  </div>
)