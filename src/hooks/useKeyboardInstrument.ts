import React from "react";
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { settings } from "../App";
import { Key } from "../types";
import { zones } from "../utils/zones";

const actionCreator = actionCreatorFactory();

const KEY_PRESSED = 'key_pressed'
const keyDepressed = actionCreator<Key>(KEY_PRESSED);
const KEY_RELEASED = 'key_released'
const keyReleased = actionCreator<Key>(KEY_RELEASED);
const CYCLE_LOC_BACK = 'cycle_loc_back';
export const cycleLocationBack = actionCreator<Key>(CYCLE_LOC_BACK);
const CYCLE_LOC_FORE = 'cycle_loc_fore';
export const cycleLocationFore = actionCreator<Key>(CYCLE_LOC_FORE);
const ADD_shape_META = 'add_shape_meta'
export const addShapeMeta = actionCreator<{ key: Key, meta?: ShapeMeta }>(ADD_shape_META)

export type ShapeMeta = {
  zoneIndex: number
  coords: Partial<React.CSSProperties>

}

type State = {
  activeKeys: Record<Key, boolean>
  currentKey: Key
  shapes: Record<Key, ShapeMeta >
}

const INITIAL_STATE: State = { activeKeys: {}, shapes: {}, currentKey: '' }

const setKeyStatus = (s: State, key: Key, pressed: boolean) => ({ ...s, activeKeys: { ...s.activeKeys, [key.toLowerCase()]: pressed } })
const decrementKeyIndex = (i: number) => ((i - 1) + zones.length) % zones.length
const incrementKeyIndex = (i: number) => (i + 1) % zones.length
const setNewPos = (s: State, fn: (i: number) => number): State => {
  console.log(s.currentKey)
  const currentShape: ShapeMeta = s.shapes[s.currentKey] ? s.shapes[s.currentKey] : { zoneIndex: 10, coords: {} }
  const zoneIndex = fn(currentShape.zoneIndex)
  const newShape: ShapeMeta = { ...currentShape, zoneIndex, coords: zones[zoneIndex] }
  return { ...s, shapes: { ...s.shapes, [s.currentKey]: newShape } }
}

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(keyDepressed, (s, key) => ({ ...setKeyStatus(s, key, true), currentKey: key }))
  .case(keyReleased, (s, key) => (setKeyStatus(s, key, false)))
  .case(cycleLocationBack, (s, _) => setNewPos(s, decrementKeyIndex))
  .case(cycleLocationFore, (s, _) => setNewPos(s, incrementKeyIndex))
  .case(addShapeMeta, (s, { key, meta }) => {
    if (meta === undefined) {
      return s
    }
    return {
      ...s, shapes: {
        ...s.shapes,
        [key]: meta
      }
    }
  })




export const useKeyboardInstrument = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  const checkActionKey = (k: Key) => Object.keys(settings.actions).find((v) => v === k)
  const addKeyDown = (k: Key) => {
    if (!checkActionKey(k)) {
      dispatch(keyDepressed(k));

    }
  }
  const addKeyUp = (k: Key) => dispatch(keyReleased(k))

  return { dispatch, state, addKeyDown, addKeyUp, cycleLocationBack, pressedKeys: state.activeKeys }

}
