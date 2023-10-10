import { useEffect, useState } from "react";

export default function useAbsPosition({ originalX, originalY }) {
  let [myPosition, setMyPosition] = useState({ x: originalX, y: originalY });
  //  WIDTH HEIGHT OF FRAME IN WHICH WE NEED POSITION
  let width = "";
  let height = "100vh";

  // Original X and original Y in % of original frame.

  //==============X FROM CENTER, Y FROM BOTTOM============
  // let originalY = width < 800 ? 0.62 : 0.61
  // originalY = originalY
  // let originalX = 0.4896694
  let r2 = 2420 / 3006;
  let r1 = width / (height * 2);

  //==============X FROM CENTER, Y FROM TOP============
  originalY = 1 - originalY;
  // originalY = mobile ? 1 - 0.1 : 1 - 0.38
  // originalX = mobile ? 0.65 : 0.74
  // let originalX = mobile ? 0.65 : 0.7362
  r2 = mobile ? 434 / 816 : 618 / 816;
  r1 = mobile ? width / height : width / (height * 2);

  function getY() {
    if (r2 / r1 < 1) {
      return ((originalY - (1 - r2 / r1) / 2) * r1) / r2;
    } else return originalY;
  }

  function getX() {
    if (r2 / r1 < 1) {
      return originalX;
    } else {
      return ((originalX - (1 - r1 / r2) / 2) * r2) / r1;
      // (0.4896694 - (1-width*3006/2420/height/2)/2) * 2420*height*2/3006/width
      // (0.4896694 - (1-100vw*3006/2420/100lvh/2)/2) * 2420*100lvh*2/3006/100vw
    }
  }

  function getY() {
    if (r2 / r1 < 1) {
      return 1 - ((originalY - (1 - r2 / r1) / 2) * r1) / r2;
    } else return 1 - originalY;
  }

  // ==== Idea: Prevent Repositioning when no big change ======
  // useEffect(() => {
  //   let newX = getX()
  //   let newY = getY()

  //   // console.log('oldPosition:', myPosition)
  //   // console.log(newX, newY)
  //   // console.log(Math.abs(newX - myPosition.x) / myPosition.x)
  //   if (mobile) {
  //     // console.log('oldPosition:',myPosition)
  //     // console.log(newX)
  //     if (Math.abs(newX - myPosition.x) / myPosition.x > 0.05 || Math.abs(newY - myPosition.y) / myPosition.y > 0.05) {
  //       setMyPosition({ x: newX, y: newY })
  //     }
  //     else { return }
  //   } else {
  //     setMyPosition({ x: newX, y: newY })
  //     // console.log(myPosition)
  //     // console.log({ x: getX(), y: getY() })
  //   }
  // }, [width, height, scrubTl])

  useEffect(() => {
    let newX = getX();
    // console.log(Math.abs(newX - myPosition.x) / myPosition.x)
    if (Math.abs(newX - myPosition.x) / myPosition.x > 0.05) {
      // console.log('changed')
      setMyPosition({ x: getX(), y: getY() });
    }
  }, [width, height]);

  return;
}
