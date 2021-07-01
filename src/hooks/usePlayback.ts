import { time } from "console";
import React from "react";
import { Event, Key, Timeline } from "../types";
import { useGetTimeElapsed } from "./useGetTimeElapsed";

interface UsePlaybackParams {
  handleKeyDown: (k: Key) => void
  handleKeyUp: (k: Key) => void
}
export const usePlayback = ({ handleKeyDown, handleKeyUp }: UsePlaybackParams) => {
  const [isRecording, setIsRecording] = React.useState(false)
  const getTimeElapsed = useGetTimeElapsed(isRecording)

  const toggleRecording = () => setIsRecording(!isRecording)

  const [timeline, updateTimeline] = React.useState<Timeline>([]);
  const addToTimeline = (k: Key, e: Event) => isRecording &&
    updateTimeline([...timeline, [getTimeElapsed(), k, e]])
  const clearTimeline = () => updateTimeline([]);



  const [repeat, setRepeat] = React.useState(false)
  const toggleRepeat = () => setRepeat(!repeat)

  const [isPlaying, setIsPlaying] = React.useState(false)
  const play = () => {
    // debugger
    if (!isPlaying && timeline.length) {
      setIsPlaying(true)
      timeline.forEach(([t, k, e], i) => {
        setTimeout(() => {
          switch (e) {
            case Event.KeyDown:
              handleKeyDown(k);
              break;
            case Event.KeyUp:
              handleKeyUp(k);
          }
        }, t);
        setIsPlaying(false)
        if (i === timeline.length - 1 && repeat) {
          play()
        }
      })
    }
  };

  return { timeline, addToTimeline, clearTimeline, play, toggleRepeat, repeat, isRecording, toggleRecording, isPlaying}
}