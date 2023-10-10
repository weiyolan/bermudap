import { useEffect, useRef, useState } from 'react';

import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { gsap } from 'gsap/dist/gsap';
import { scrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import useGsap from '@/utils/useGsap';
gsap.registerPlugin(MotionPathPlugin, scrollToPlugin);

export default function LogoAnimMain({ className, hovering: parentHovering, clicking: parentClicking, color }) {
  let [hovering, setHovering] = useState(parentHovering === undefined ? false : parentHovering);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  const myBladRef0 = useRef();
  const myBladRef1 = useRef();
  const myBladRef2 = useRef();
  let ctx = useGsap();

  let amount = 5;
  function animateLogo() {
    let tl = gsap.timeline({ onComplete: function () { this.time(0).kill(); } })
      .to(myBladRef0.current, {
        motionPath: {
          path: '#vectorTop',
          align: '#vectorTop',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 120,
        },
        ease: 'power1.inOut',
        duration: 1,
        transformOrigin: "50% 50%",
      }, 0)
      .to('#myBladRef0Vector', {
        ease: 'none',
        attr: { d: "M29 19C36.4754 15.0623 43.3156 16.0417 47.6244 20.7034C50.6999 24.0309 53.173 29.039 55.3355 35C57.0898 39.8358 58.6397 45.2986 60.1409 51C61.1754 54.9291 62.1867 58.9715 63.226 63C66.2134 74.5807 69.4307 86.0465 74.0889 94.3762C70.0348 89.1244 64.2498 83.6103 57.9419 78C54.59 75.0188 51.0904 72.0105 47.6244 69C44.5496 66.3293 41.5012 63.6568 38.6058 61C32.8584 55.7263 27.7136 50.5143 24.1608 45.5C16.9715 35.3533 20.6509 23.3979 29 19Z" },
        duration: 0.6,
        transformOrigin: "50% 50%",
      }, 0.2)
      // .to('#myBladRef0Vector', {
      //   ease: 'none',
      //   attr:{d:"M16 43.3116C19 38.8116 19 45.3116 23.5 38.8116C28 32.3116 24.8592 30.9774 35.5001 32.4281C43.9894 33.5855 43.0001 26.3115 49 26.8115C55 27.3115 58.5001 23.195 60.0001 29.8116C61.5 36.4281 65.0001 35.8116 61.0001 38.8116C53.3713 44.5331 56.0001 38.3116 52.0001 43.3116C47.5216 48.9097 41.107 52.0838 32.5 52.3116C23.893 52.5394 26.5794 60.339 19 56.3116C15.0327 54.2035 10 56.8116 10 52.3116C9.99998 47.8116 13.0001 47.8116 16 43.3116Z"},
      //   duration: 0.2,
      //   transformOrigin: "50% 50%",
      // }, 0.7)
      .to('#myBladRef0Vector', {
        ease: 'power3.out',
        attr: { d: "M56.3226 56.5889C61.273 57.921 64.2148 63.0164 62.8933 67.9696C62.253 70.3695 60.7295 72.2956 58.7659 73.4923C56.6765 74.7656 54.0889 75.213 51.5369 74.5263C46.5865 73.1941 43.6447 68.0988 44.9662 63.1455C45.2588 62.0489 45.7358 61.0511 46.355 60.1767C41.0475 58.6806 33.7907 52.3211 30.0713 45.8789C30.0713 45.8789 35.7383 42.6071 39.3694 40.5106C43.0006 38.4142 48.6675 35.1424 48.6675 35.1424C52.2167 41.2897 54.4412 50.838 53.0331 56.3095C54.1074 56.2069 55.2184 56.2917 56.3226 56.5889Z" },
        duration: 1,
        transformOrigin: "50% 50%",
      }, 0.8)
      .to('#myBladRef0Vector', {
        autoAlpha: 0,
        duration: 0.4,
      }, 1.6)
      .to(myBladRef1.current, {
        motionPath: {
          path: '#vectorLeft',
          align: '#vectorLeft',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: -120,
        },
        ease: 'power1.inOut',
        duration: 1,
        transformOrigin: "50% 50%",
      }, 0)
      .to(myBladRef2.current, {
        motionPath: {
          path: '#vectorBottom',
          align: '#vectorBottom',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 0,
        },
        ease: 'power1.inOut',
        duration: 1,
        transformOrigin: "50% 50%",
      }, 0)
    return tl
  }
  useEffect(() => {
    // myRef?.current !== undefined &&
    //   ctx.add(() => {
    //     let animation = animateLogo().paused(false)
    //   });
  }, [hovering, parentHovering, parentClicking, clicking, active]);


  return (
    <div className={` ${className}`}>
      <svg className={'absolute  invisible '} style={{ right: '50%', top: '50%' }} width="234" height="707" viewBox="0 0 234 707" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id={'vectorLeft'} d="M182 2.32758C139 77.5 55.9998 92.5 20.4999 77.5C-6.97186 65.8922 -6.49998 2.32758 41 2.32758C88.5 2.32758 86.9998 75 71.9998 141C49.6135 239.5 113.116 328.5 155.5 379C197.884 429.5 231.5 553.5 231.5 706.5" stroke="#FF0000" strokeWidth="4" />
      </svg>
      {/* 0 auto rotation */}
      <svg className={'absolute invisible w-[52vw] '} style={{ left: '20%', top: '50%' }} viewBox="0 0 700 693" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorBottom" d="M447 2C630 2 757.5 108.5 669 197C580.5 285.5 462.5 222 526.5 175.5C590.5 129 664 298 555.5 343.5C428.952 396.569 134.11 190.876 43 435.5C6.5 533.5 4 642 2.5 692.5" stroke="#FF0000" strokeWidth="4" />
      </svg>
      <svg className={'absolute  invisible w-[36vw] h-auto'} style={{ left: '50%', top: '17%' }} width="591" height="946" viewBox="0 0 591 946" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorTop" d="M24 153.5C-41.6995 53.1426 49.9999 -6.50003 188.5 2.99999C327 12.5 396 86.9998 426.5 132C457 177 468 252 419 261C370 270 332.64 237.891 348.5 191.5C389.816 70.6497 667.393 160.158 558.5 393.5C464 596 431.5 779 436 905.5" stroke="#FF0000" strokeWidth="4" />
      </svg>

      <div style={{ width: 145, height: 126 }} className={`relative cursor-pointer border-debug `}
        ref={myRef}
        onMouseEnter={parentHovering === undefined ? () => setHovering(true) : undefined}
        onMouseLeave={parentHovering === undefined ? () => { setHovering(false); setClicking(false); } : undefined}
        onMouseDown={parentClicking === undefined ? () => setClicking(true) : undefined}
        onMouseUp={parentClicking === undefined ? () => setClicking(false) : undefined}
        alt="The Bermuda Events Triangular Company Logo"
        onClick={() => {
          ctx.add(() => {
            gsap.to(window, { scrollTo: { y: '#features', offsetY: 80 }, delay: 0.4, duration: 1, ease: 'power4.Out' })
            animateLogo().paused(false)
          });
        }}
      >

        {/* <svg ref={myBladRef0} style={{ left: (65 / 145 * 100).toPrecision(2) + `%`, top: 0 }} className={'z-10 absolute'} width="52" height="76" viewBox="0 0 52 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="top" d="M6.80283 50.8989C2.35821 43.1981 0.204375 34.8012 0.132247 26.5C0.0511889 17.1711 2.59919 7.96317 7.4795 0L18.4491 19L24.8 30L34.0376 46L43.2751 62L51.2193 75.7596C42.6123 75.9874 34.0794 73.9682 26.5 69.9407C22.5327 67.8326 18.8267 65.1743 15.508 62C12.1722 58.8093 9.22776 55.0974 6.80283 50.8989Z" fill="#BD9159" />
        </svg> */}
        <svg ref={myBladRef0} style={{ left: (65 / 145 * 100).toPrecision(2) + `%`, top: 0 }} className={'z-10 absolute'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="top1">
            <path id="myBladRef0Vector" d="M29.6725 69.5155C25.2278 61.8146 23.074 53.4177 23.0019 45.1166C22.9208 35.7877 25.4688 26.5797 30.3491 18.6166C34.633 26.0365 37.0349 30.1966 41.3188 37.6166C43.7989 41.9123 45.1894 44.3208 47.6696 48.6166C51.2771 54.865 53.2997 58.3682 56.9072 64.6166C60.5147 70.865 62.5373 74.3682 66.1448 80.6166C69.2471 85.9901 70.9865 89.0027 74.0889 94.3762C65.4819 94.604 56.949 92.5847 49.3696 88.5573C45.4023 86.4492 41.6963 83.7908 38.3776 80.6166C35.0418 77.4259 32.0974 73.7139 29.6725 69.5155Z" fill="#BD9159" />          </g>
        </svg>

        <svg ref={myBladRef1} style={{ left: 0, bottom: 0 }} className={'z-10 absolute'} width="52" height="77" viewBox="0 0 52 77" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="left" d="M45.0124 51.3579C35.5729 67.7197 18.2434 76.6855 0.595947 76.2254L44.3357 0.459003C53.5587 15.5081 54.4587 35.0029 45.0124 51.3579Z" fill="#A8947F" />
        </svg>
        <svg ref={myBladRef2} style={{ right: 0, bottom: 0 }} className={'z-10 absolute'} width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="bottom" d="M44.6234 0.207497C63.516 0.207497 79.9454 10.7297 88.3632 26.2389H0.883667C9.30817 10.7297 25.7376 0.207497 44.6234 0.207497Z" fill="#6E4221" />
        </svg>
      </div>


      {/* -90 auto rotation */}



    </div>
  );
}

// <svg ref={myBladRef0} width="186" height="162" viewBox="0 0 186 162" className={`absolute ${className}`}>
//         <path d="M92.2069 68.8989C82.7674 52.5439 83.6606 33.0491 92.8836 18L136.623 93.7596C118.983 94.2265 101.653 85.2539 92.2069 68.8989Z" transformOrigin={'14% 0%'} className={`${color ? "fill-brown" : "fill-white"}`} />
//         {/* <path ref={myBladRef1} d="M64.4164 119.358C54.9769 135.72 37.6475 144.686 20 144.225L63.7398 68.459C72.9627 83.5081 73.8627 103.003 64.4164 119.358Z" transformOrigin={'0% 100%'} className={`${color ? "fill-brownlight" : "fill-white"}`} /> */}
//         {/* <path ref={myBladRef2} d="M122.027 118.208C140.92 118.208 157.35 128.73 165.767 144.239H78.2877C86.7122 128.73 103.142 118.208 122.027 118.208Z" transformOrigin={'100% 100%'} className={`${color ? "fill-browndark" : "fill-white"}`} /> */}
//       </svg>
//       <svg ref={myBladRef1} width="186" height="162" viewBox="0 0 186 162" className={`absolute ${className}`}>
//         {/* <path ref={myBladRef0} d="M92.2069 68.8989C82.7674 52.5439 83.6606 33.0491 92.8836 18L136.623 93.7596C118.983 94.2265 101.653 85.2539 92.2069 68.8989Z" transformOrigin={'14% 0%'} className={`${color ? "fill-brown" : "fill-white"}`} /> */}
//         <path d="M64.4164 119.358C54.9769 135.72 37.6475 144.686 20 144.225L63.7398 68.459C72.9627 83.5081 73.8627 103.003 64.4164 119.358Z" transformOrigin={'0% 100%'} className={`${color ? "fill-brownlight" : "fill-white"}`} />
//         {/* <path ref={myBladRef2} d="M122.027 118.208C140.92 118.208 157.35 128.73 165.767 144.239H78.2877C86.7122 128.73 103.142 118.208 122.027 118.208Z" transformOrigin={'100% 100%'} className={`${color ? "fill-browndark" : "fill-white"}`} /> */}
//       </svg>
//       <svg ref={myBladRef2} width="186" height="162" viewBox="0 0 186 162" className={`absolute ${className}`}>
//         {/* <path ref={myBladRef0} d="M92.2069 68.8989C82.7674 52.5439 83.6606 33.0491 92.8836 18L136.623 93.7596C118.983 94.2265 101.653 85.2539 92.2069 68.8989Z" transformOrigin={'14% 0%'} className={`${color ? "fill-brown" : "fill-white"}`} /> */}
//         {/* <path ref={myBladRef1} d="M64.4164 119.358C54.9769 135.72 37.6475 144.686 20 144.225L63.7398 68.459C72.9627 83.5081 73.8627 103.003 64.4164 119.358Z" transformOrigin={'0% 100%'} className={`${color ? "fill-brownlight" : "fill-white"}`} /> */}
//         <path d="M122.027 118.208C140.92 118.208 157.35 128.73 165.767 144.239H78.2877C86.7122 128.73 103.142 118.208 122.027 118.208Z" transformOrigin={'100% 100%'} className={`${color ? "fill-browndark" : "fill-white"}`} />
//       </svg>