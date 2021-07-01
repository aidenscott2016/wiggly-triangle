import React from "react";
import { Event, Key, Timeline } from "../types";
import { useGetTimeElapsed } from "./useGetTimeElapsed";

export const usePlayback = () => {
  const getTimeElapsed = useGetTimeElapsed()
  const [timeline, updateTimeline] = React.useState<Timeline>([]);
  const addToTimeline = (k: Key, e: Event) =>
    updateTimeline([...timeline, [getTimeElapsed(), k, e]])
  const clearTimeline = () => updateTimeline([]);
  return { timeline, addToTimeline, clearTimeline }
  // const addKeyDown = (k: Key) =>
  //     updatePressedKeys({ ...pressedKeys, [k.toLowerCase()]: true });
  // const addKeyUp = (k: Key) =>
  //     updatePressedKeys({ ...pressedKeys, [k.toLowerCase()]: false });
  // s
}