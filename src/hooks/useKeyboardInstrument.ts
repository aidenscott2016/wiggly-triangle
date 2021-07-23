import React from "react";
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { settings } from "../App";
import { Key } from "../types";

const actionCreator = actionCreatorFactory();

const KEY_PRESSED = 'key_pressed'
const keyDepressed = actionCreator<Key>(KEY_PRESSED);
const KEY_RELEASED = 'key_released'
const keyReleased = actionCreator<Key>(KEY_RELEASED);
const CYCLE_LOC_BACK = 'cycle_loc_back';
export const cycleLocationBack = actionCreator<Key>(CYCLE_LOC_BACK);


type State = {
  activeKeys: Record<Key, boolean>
  currentKey: Key
  shapes: Record<Key, {
    coords: {
      top: string,
      left: string
    }
  }>
}



const INITIAL_STATE: State = { activeKeys: {}, shapes: {}, currentKey: '' }

const setKeyStatus = (s: State, key: Key, pressed: boolean) => ({ ...s, activeKeys: { ...s.activeKeys, [key.toLowerCase()]: pressed } })

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(keyDepressed, (s, key) => ({ ...setKeyStatus(s, key, true), currentKey: key}))
  .case(keyReleased, (s, key) => (setKeyStatus(s, key, false)))
  .case(cycleLocationBack, (s, key) => {
    let newState = { ...s }
    newState.shapes[s.currentKey] = { coords: { top: '250px', left: '20px' } }
    console.log(newState)
    return newState
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
