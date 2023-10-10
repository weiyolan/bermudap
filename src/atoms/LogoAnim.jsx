import { gsap } from 'gsap/dist/gsap';
import { useEffect, useRef, useState } from 'react';
import useGsap from '@/utils/useGsap';

export default function LogoAnim({ className, hovering: parentHovering, clicking: parentClicking, color }) {
  let [hovering, setHovering] = useState(parentHovering === undefined ? false : parentHovering);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  const myBladRef0 = useRef();
  const myBladRef1 = useRef();
  const myBladRef2 = useRef();
  let ctx = useGsap();

  let amount = 5;

  useEffect(() => {
    myRef?.current !== undefined &&
      ctx.add(() => {

        // gsap.to(myRef.current, {
        //   transformOrigin: '50% 50%',
        //   scale: hovering || parentHovering ? clicking || parentClicking ? 0.95 : 1.1 : 1,
        //   duration: 0.5,
        //   ease: 'expo.out',
        //   // ease: 'elastic.out(1,0.5)',
        // })

        gsap.to(myBladRef0.current, {
          // rotate: hovering || parentHovering ? '5deg' : 0,
          x: hovering || parentHovering ? clicking || parentClicking ? -amount * 0 * (-1) : amount * (-1) : 0,
          y: hovering || parentHovering ? clicking || parentClicking ? -amount * 0 * (-1.732) : amount * (-1.732) : 0,
          transformOrigin: '14% 0%',
          duration: 0.5,
          ease: 'expo.out',
        })
        gsap.to(myBladRef1.current, {
          // rotate: hovering || parentHovering ? '5deg' : 0,
          x: hovering || parentHovering ? clicking || parentClicking ? -amount * 0 * (-1) : amount * (-1) : 0,
          y: hovering || parentHovering ? clicking || parentClicking ? -amount * 0 * (+1.732) : amount * (+1.732) : 0,
          transformOrigin: '0% 100%',
          duration: 0.5,
          ease: 'expo.out',
        })
        gsap.to(myBladRef2.current, {
          transformOrigin: '100% 100%',
          // rotate: hovering || parentHovering ? '5deg' : 0,
          x: hovering || parentHovering ? clicking || parentClicking ? -amount * 0 * (+2) : amount * (+2) : 0,
          y: hovering || parentHovering ? clicking || parentClicking ? -amount * 0 * (0) : amount * (0) : 0,
          duration: 0.5,
          ease: 'expo.out',
        })

      });
  }, [hovering, parentHovering, parentClicking, clicking, active]);


  return (
    <svg
      ref={myRef}
      onMouseEnter={parentHovering === undefined ? () => setHovering(true) : undefined}
      onMouseLeave={parentHovering === undefined ? () => {
        setHovering(false);
        setClicking(false);
      } : undefined}
      onMouseDown={parentClicking === undefined ? () => setClicking(true) : undefined}
      onMouseUp={parentClicking === undefined ? () => setClicking(false) : undefined}
      // onFocus={() => setActive(true)}
      // onBlur={() => setActive(false)}
      // tabIndex='0'
      alt="The Bermuda Events Triangular Company Logo"
      className={`cursor-pointer ${className}`}
      width="186" height="162"
      viewBox="0 0 186 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >



      <path
        ref={myBladRef0}
        d="M92.2069 68.8989C82.7674 52.5439 83.6606 33.0491 92.8836 18L136.623 93.7596C118.983 94.2265 101.653 85.2539 92.2069 68.8989Z"
        transformOrigin={'14% 0%'}
        className={`${color ? "fill-brown" : "fill-white"}`}
      />
      <path
        ref={myBladRef1}
        d="M64.4164 119.358C54.9769 135.72 37.6475 144.686 20 144.225L63.7398 68.459C72.9627 83.5081 73.8627 103.003 64.4164 119.358Z"
        transformOrigin={'0% 100%'}
        className={`${color ? "fill-brownlight" : "fill-white"}`}
      />
      <path
        ref={myBladRef2}
        d="M122.027 118.208C140.92 118.208 157.35 128.73 165.767 144.239H78.2877C86.7122 128.73 103.142 118.208 122.027 118.208Z"
        transformOrigin={'100% 100%'}
        className={`${color ? "fill-browndark" : "fill-white"}`}
      />
    </svg>
  );
}
