import React from "react";
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Key } from "../types";

const actionCreator = actionCreatorFactory();

const KEY_PRESSED = 'key_pressed'
const KEY_RELEASED = 'key_released'
const keyDepressed = actionCreator<Key>(KEY_PRESSED);
const keyReleased = actionCreator<Key>(KEY_RELEASED);

type State = {
  activeKeys: Record<Key, boolean>
}

const INITIAL_STATE: State = { activeKeys: {} }

const setKeyStatus = (s: State, key: Key, pressed: boolean) => ({ ...s, activeKeys: { ...s.activeKeys, [key.toLowerCase()]: pressed } })

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(keyDepressed, (s, key) => (setKeyStatus(s, key, true)))
  .case(keyReleased, (s, key) => (setKeyStatus(s, key, false)))


export const useKeyboardInstrument = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  const addKeyDown = (k: Key) => dispatch(keyDepressed(k))
  const addKeyUp = (k: Key) => dispatch(keyReleased(k))

  return { addKeyDown, addKeyUp, pressedKeys: state.activeKeys}
}
