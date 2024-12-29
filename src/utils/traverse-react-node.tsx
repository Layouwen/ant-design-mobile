import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { isFragment } from 'react-is'

export function traverseReactNode(
  children: ReactNode,
  fn: (child: ReactNode, index: number) => void
) {
  let i = 0
  function handle(target: ReactNode) {
    React.Children.forEach(target, child => {
      if (!isFragment(child)) {
        fn(child, i)
        i += 1
      } else {
        const fragmentChild = child as ReactElement<{ children: ReactNode }>
        handle(fragmentChild.props.children)
      }
    })
  }
  handle(children)
}
