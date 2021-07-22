/* eslint-disable use-isnan */
import { random } from 'lodash'

const height = document.documentElement.clientHeight
const width = document.documentElement.clientWidth
console.log("page", {height,width})

export const randomPos = (elWidth, elHeight) => (
  {
    top: `${random(0, height - elWidth)}px` ,
    left: random(0, width - elHeight)
  }
)


export const isUpperCase = (s: string) => {

  return Number.parseInt(s) === NaN &&  s === s.toUpperCase()
}
