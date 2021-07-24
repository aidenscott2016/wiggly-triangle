import { ShapeMeta } from "./hooks/useKeyboardInstrument";

export type Seconds = number;

export const KEY_A = 'a'
export const KEY_B = 'b'
export const KEY_C = 'c'
export type Key = typeof KEY_A | typeof KEY_B | typeof KEY_C | string
export type Note = [Seconds, Key, Event, ShapeMeta ];
export type Timeline = Note[];
export enum Event {
  KeyUp,
  KeyDown,
}



export const COMPONENT_ATOM = "Atom";
export const COMPONENT_CIRCLE = "Circle";
export type ComponentNames = typeof COMPONENT_ATOM | typeof COMPONENT_CIRCLE;
type Components = Record<ComponentNames, () => JSX.Element>;

type Mapping2 = Record<Key, keyof Components>;


export type SettingsState = {
  mappings: Mapping2,
  componentsAvailable: Components
}