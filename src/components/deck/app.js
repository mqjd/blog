import React, { useReducer } from 'react'
import merge from 'lodash.merge'
import Context from 'gatsby-theme-mdx-deck/src/context'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

const reducer = (state, next) =>
  typeof next === 'function'
    ? merge({}, state, next(state))
    : merge({}, state, next)

export default props => {
  const [state, setState] = useReducer(reducer, {
    mode: modes.normal,
    step: 0,
    metadata: {},
  })

  const register = (index, key, value) => {
    if (state.metadata[index] && state.metadata[index][key]) return
    setState({
      metadata: {
        [index]: {
          [key]: value,
        },
      },
    })
  }

  const context = {
    ...state,
    setState,
    register,
  }

  return <Context.Provider value={context}>{props.children}</Context.Provider>
}
