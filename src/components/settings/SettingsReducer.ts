import { Settings } from "http2";
import React from "react";
import { WrappedAtom } from "../../shapes/Atom";
import { Circle } from "../../shapes/Circle";
import { ComponentNames, COMPONENT_ATOM, COMPONENT_CIRCLE, Key, KEY_A, KEY_B, KEY_C, SettingsState } from "../../types";

const ADD_MAPPING = 'add_mapping'

const addKeyMapping = (key: Key, component: ComponentNames): Action => ({ type: ADD_MAPPING, payload: { key, component } })

type ActionType = typeof ADD_MAPPING
type Action = { type: ActionType, payload: any }

export const reducer: React.Reducer<SettingsState, Action> = (state, action) => {
  switch (action.type) {
    case ADD_MAPPING:
      return {
        ...state,
        mappings: {
          ...state.mappings,
          [action.payload.key]:
            action.payload.component
        }
      }
    default:
      return state
  }
}

const initialState: SettingsState = {
  mappings: {
    [KEY_A]: COMPONENT_ATOM,
    [KEY_C]: COMPONENT_CIRCLE,
    [KEY_B]: COMPONENT_CIRCLE,
  },
  componentsAvailable: {
    Atom: WrappedAtom,
    Circle
  }
}

export const useSettings = () => React.useReducer(reducer, initialState);