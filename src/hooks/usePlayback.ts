import React from "react";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Event, Key, Timeline } from "../types";
import { useGetTimeElapsed } from "./useGetTimeElapsed";

interface UsePlaybackParams {
  handleKeyDown: (k: Key) => void
  handleKeyUp: (k: Key) => void
}

type State = {
  recording: boolean,
  startRecordTime: number
  playing: boolean,
  timeline: Timeline
}

const initialState: State = {
  recording: false,
  playing: false,
  timeline: [],
  startRecordTime: 0
}

const START_RECORDING = 'START_RECORDING'
const STOP_RECORDING = 'STOP_RECORDING'
const TOGGLE_REC = 'TOGGLE_REC'
const START_PLAYING = 'START_PLAYING'
const TOGGLE_PLAY = 'TOGGLE_PLAY'

const STOP_PLAYING = 'STOP_PLAYING'
const ADD_NOTE = 'ADD_NO'
const CLEAR_TIMELINE = 'clear'

const actionCreator = actionCreatorFactory();
export const startRecording = actionCreator(START_RECORDING)
export const stopRecording = actionCreator(STOP_RECORDING)
export const startPlaying = actionCreator(START_PLAYING)
export const stopPlaying = actionCreator(STOP_PLAYING)
export const togglePlaying = actionCreator(TOGGLE_PLAY)
export const toggleRec = actionCreator(TOGGLE_REC)
export const addNote = actionCreator<{
  key: Key, e: Event
}>(ADD_NOTE)
export const clearTimeLine = actionCreator(CLEAR_TIMELINE)

const reducer = reducerWithInitialState(initialState)
  .case(startRecording, s => ({ ...s, recording: true, playing: false, startRecordTime: performance.now() }))
  .case(stopRecording, s => ({ ...s, recording: false, playing: false }))
  .case(toggleRec, s => {
    if (!s.recording) {
      return ({ ...s, recording: true, playing: false, startRecordTime: performance.now() });
    }
    return { ...s, playing: false, recording: false }
  })
  .case(startPlaying, s => ({ ...s, playing: true, recording: false }))
  .case(stopPlaying, s => ({ ...s, playing: false, recording: false }))
  .case(togglePlaying, s => {
    return ({ ...s, recording: false, playing: !s.playing });
  })
  .case(addNote, (s, { key, e }) => (s.recording && key.length === 1 ? { ...s, playing: false, timeline: [...s.timeline, [performance.now() - s.startRecordTime, key, e]] } : s))
  .case(clearTimeLine, (s) => ({...s, timeline: []}))

export const usePlayback = ({ handleKeyDown, handleKeyUp }: UsePlaybackParams) => {
  const [s, d] = React.useReducer(reducer, initialState)

  if (s.playing && s.timeline.length) {
    d(startPlaying)
    s.timeline.forEach(([t, k, e], i) => {
      setTimeout(() => {
        switch (e) {
          case Event.KeyDown:
            console.log('pressing ', k)
            handleKeyDown(k);
            break;
          case Event.KeyUp:
            console.log('releaseing ', k)
            handleKeyUp(k);
        }
      }, t);
      d(stopPlaying)
      // if (i === s.timeline.length - 1 && repeat) {
      //   play()
      // }
    })
  }
  return {
    timline: s.timeline, dispatch: d
  }
}