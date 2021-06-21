import { random } from 'lodash'

const height = document.documentElement.clientHeight
const width = document.documentElement.clientWidth

export const randomPos = () => (
  {
    top: random(0, height - 100),
    left: random(0, width - 100)
  }
)

