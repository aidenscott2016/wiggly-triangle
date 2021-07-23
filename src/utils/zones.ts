import React from "react"

const TOP_LEFT: React.CSSProperties= {
  position: 'fixed',
  top: '0px',
  left:'0px',
  right: undefined,
  bottom: undefined,
}

export const BOTTOM_LEFT:React.CSSProperties = {
  position: 'fixed',
  bottom: '0px',
  left:'0px',
  right: undefined,
  top : undefined
}


const BOTTOM_RIGHT: React.CSSProperties = {
  position: 'fixed',
  bottom: '0px',
  right:'0px',
  top: undefined,
  left: undefined

}
const TOP_RIGHT: React.CSSProperties = {
  position: 'fixed',
  top: '0px',
  right:'0px',
  bottom: undefined,
  left: undefined
}
export const CENTRE: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

export const zones = [TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, CENTRE]