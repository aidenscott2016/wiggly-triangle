import { TypeOfTag } from "typescript";

export type Seconds = number;

export const KEY_A = 'a'
export const KEY_B = 'b'
export const KEY_C = 'c'
export type Key = typeof KEY_A | typeof KEY_B | typeof KEY_C | string
export type Note = [Seconds, Key, Event];
export type Timeline = Note[];
export enum Event {
  KeyUp,
  KeyDown,
}