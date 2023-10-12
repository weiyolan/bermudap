import { gsap } from "gsap/dist/gsap";
import { useEffect, useRef } from "react";

export default function useGsap(context, options) {
  let ctx = useRef(gsap.context(() => {}, context));

  // useEffect(() => {
  //   options?.print && console.log(ctx);
  // }, [context]);

  useEffect(() => {
    return ctx.current.revert()
  }, [context])

  return ctx.current;
}
