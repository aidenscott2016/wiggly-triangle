import { useEffect, useState } from "react";
import { randomPos } from "../util";

export const useRandomPosition = (elWidth, elHeight) => {
    const [position, updatePosition] = useState({});
    useEffect(() => updatePosition(randomPos(elWidth, elHeight)), []);
    return position
}