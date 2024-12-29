import type { ReactElement } from 'react'
import {
  UnmountType,
  getReactRender,
} from '../components/config-provider/UnstableContext'

export function renderToBody(element: ReactElement) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  // eslint-disable-next-line prefer-const
  let reactUnmount: UnmountType

  function unmount() {
    reactUnmount().then(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    })
  }
  const reactRender = getReactRender()
  reactUnmount = reactRender(element, container)
  return unmount
}
