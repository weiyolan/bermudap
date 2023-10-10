// import { gsap } from 'gsap/dist/gsap';
// import { useEffect, useRef, useState } from 'react';
// import useGsap from '@/utils/useGsap';
export default function Logo({ className, hovering: parentHovering, color }) {

  // let [hovering, setHovering] = useState(parentHovering===undefined?false:parentHovering);
  // let [clicking, setClicking] = useState(false);
  // let [active, setActive] = useState(false);
  // const myRef = useRef();
  // const myBladRef0 = useRef();
  // const myBladRef1 = useRef();
  // const myBladRef2 = useRef();
  // let ctx = useGsap();
  // let amount = 2;

  // useEffect(() => {
  //   myRef?.current !== undefined &&
  //     ctx.add(() => {
  //       gsap.to(myBladRef0.current, {
  //         x: hovering||parentHovering?clicking?-amount*0*(-1):amount*(-1):0,
  //         y: hovering||parentHovering?clicking?-amount*0*(-1.732):amount*(-1.732):0,
  //         transformOrigin: '14% 0%',
  //         duration: 0.5,
  //         ease: 'expo.out',
  //       })
  //       gsap.to(myBladRef1.current, {
  //         x: hovering||parentHovering?clicking?-amount*0*(-1):amount*(-1):0,
  //         y: hovering||parentHovering?clicking?-amount*0*(+1.732):amount*(+1.732):0,
  //         transformOrigin: '0% 100%',
  //         duration: 0.5,
  //         ease: 'expo.out',
  //       })
  //       gsap.to(myBladRef2.current, {
  //         transformOrigin: '100% 100%',
  //         x: hovering||parentHovering?clicking?-amount*0*(+2):amount*(+2):0,
  //         y: hovering||parentHovering?clicking?-amount*0*(0):amount*(0):0,
  //         duration: 0.5,
  //         ease: 'expo.out',
  //       })

  //     });
  // }, [hovering, parentHovering, clicking, active]);


  return (
    <svg
      // ref={myRef}
      // onMouseEnter={parentHovering===undefined?() => setHovering(true):undefined}
      // onMouseLeave={parentHovering===undefined?() => {
      // setHovering(false);
      // setClicking(false);
      // }:undefined}
      // onMouseDown={() => setClicking(true)}
      // onMouseUp={() => setClicking(false)}
      // onFocus={() => setActive(true)}
      // onBlur={() => setActive(false)}
      // tabIndex='0'
      alt="The Bermuda Events Triangular Company Logo"
      className={`${className}`}
      width="65"
      height="56"
      viewBox="0 0 65 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // ref={myBladRef0}
        d="M32.0304 22.5783C27.8431 15.3233 28.2393 6.67563 32.3306 0L51.7331 33.6063C43.9079 33.8134 36.2207 29.8332 32.0304 22.5783Z"
        transformOrigin={'14% 0%'}
        className={`${color ? "fill-brown" : "fill-inherit"}`}
      />
      <path
        // ref={myBladRef1}
        d="M19.7027 44.9616C15.5154 52.2195 7.82826 56.1967 0 55.9926L19.4026 22.3833C23.4938 29.0589 23.893 37.7066 19.7027 44.9616Z"
        transformOrigin={'0% 100%'}
        className={`${color ? "fill-brownlight" : "fill-inherit"}`}
      />
      <path
        // ref={myBladRef2}
        d="M45.2586 44.4512C53.6392 44.4512 60.9272 49.1187 64.6612 55.9985H25.8561C29.5931 49.1187 36.8811 44.4512 45.2586 44.4512Z"
        transformOrigin={'100% 100%'}
        className={`${color ? "fill-browndark" : "fill-inherit"}`}
      />
    </svg>
  );
}
