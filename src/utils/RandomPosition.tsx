import { useLayoutEffect } from "react";
import { useRef } from "react";
import { SizeMeProps, withSize } from "react-sizeme";
import { useRandomPosition } from "../hooks/useRandomPosition";
import { randomPos } from "../util";

// export const RandomPosition = ({ children }: React.PropsWithChildren<{}>) => {
//   return (
//     <SizeMe>
//       <RandomPositionContainer>{children}</RandomPositionContainer>
//     </SizeMe>
//   );
// };

export const RandomPositionContainer = ({
  size,
  children,
}: React.PropsWithChildren<SizeMeProps>) => {
    console.log("size", size)
    useLayoutEffect <- ref to the elem
    const random = useRandomPosition(size.height, size.width)
    console.log("location", random)
  return (
    <div
      id="rando"
      style={{
        ...random,
        position: "absolute",
      }}
    >
      {children}
    </div>
  );
};


export const RandomPosition = withSize()(RandomPositionContainer);
