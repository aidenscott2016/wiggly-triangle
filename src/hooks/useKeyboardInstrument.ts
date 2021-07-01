import React from "react";
import { Key } from "../types";

export const useKeyboardInstrument = () => {
  const [pressedKeys, updatePressedKeys] = React.useState({});

  const addKeyDown = (k: Key) =>
    updatePressedKeys({ ...pressedKeys, [k.toLowerCase()]: true });
  const addKeyUp = (k: Key) =>
    updatePressedKeys({ ...pressedKeys, [k.toLowerCase()]: false });

  return { addKeyDown, addKeyUp, pressedKeys }
}