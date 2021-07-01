export type Seconds = number;
export type Key = string;
export type Note = [Seconds, Key, Event];
export type Timeline = Note[];
export enum Event {
  KeyUp,
  KeyDown,
}