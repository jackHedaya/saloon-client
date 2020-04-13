import React from 'react'

function ClearClasses({ children, nClassName }) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) return

    return React.cloneElement(child, {
      className: nClassName,
    })
  })
}

export default ClearClasses
