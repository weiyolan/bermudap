import { useEffect, useRef, useState } from 'react';

import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { gsap } from 'gsap/dist/gsap';
// import { scrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import useGsap from '@/utils/useGsap';
import { useLenis } from '@studio-freight/react-lenis';
gsap.registerPlugin(MotionPathPlugin);

export default function LogoAnimMain({ className, hovering: parentHovering, clicking: parentClicking, color }) {
  let [hovering, setHovering] = useState(parentHovering === undefined ? false : parentHovering);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  const myBladRef0 = useRef();
  const myBladRef1 = useRef();
  const myBladRef2 = useRef();
  let ctx = useGsap();
  const lenis = useLenis();


  function animateLeaf(leafRef, leafPathId, alongPathVectorId, degrees, transformPath1, transformPath2) {
    let tl = gsap.timeline({ overwrite: true })
      .to(leafRef.current, {
        motionPath: {
          path: alongPathVectorId,
          align: alongPathVectorId,
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: degrees,
        },
        ease: 'power1.inOut',
        duration: 1,
        transformOrigin: "50% 50%",
      }, 0)

      .to(leafRef.current, {
        ease: 'power1.in',
        scale: 1.5,
        duration: 0.35,
        transformOrigin: "50% 50%",
      }, 0)
      .to(leafRef.current, {
        ease: 'power2.out',
        scale: 1,
        duration: 0.65,
        transformOrigin: "50% 50%",
      }, 0.35)
      .to(leafPathId, {
        ease: 'none',
        attr: { d: transformPath1 },
        duration: 0.6,
        transformOrigin: "50% 50%",
      }, 0)
      .to(leafPathId, {
        ease: 'power3.out',
        attr: { d: transformPath2 },
        duration: 0.4,
        transformOrigin: "50% 50%",
      }, 0.6)
      .to(leafPathId, {
        autoAlpha: 0,
        duration: 0.4,
      }, 1)
    return tl
  }

  function animateLogo() {
    let tl = gsap.timeline({ onComplete: function () { this.time(0).kill(); } })
      .add(animateLeaf(myBladRef0, '#myBladRef0Vector', '#vectorTop', 120,
        document.getElementById('myBladRef0Vector2').attributes.d.value,
        document.getElementById('myBladRef0Vector3').attributes.d.value,
      ).duration(2), 0)

      .add(animateLeaf(myBladRef1, '#myBladRef1Vector', '#vectorLeft', -120,
        document.getElementById('myBladRef1Vector2').attributes.d.value,
        document.getElementById('myBladRef1Vector3').attributes.d.value,
      ).duration(2), 0)

      .add(animateLeaf(myBladRef2, '#myBladRef2Vector', '#vectorBottom', 0,
        document.getElementById('myBladRef2Vector2').attributes.d.value,
        document.getElementById('myBladRef2Vector3').attributes.d.value,
      ).duration(2), 0)
    return tl
  }

  // useEffect(() => {
  // myRef?.current !== undefined &&
  //   ctx.add(() => {
  //     let animation = animateLogo().paused(false)
  //   });
  // }, [hovering, parentHovering, parentClicking, clicking, active]);


  return (
    <div className={` ${className}`}>

      <svg className={'absolute  invisible '} style={{ right: '50%', top: '50%' }} width="538" height="838" viewBox="0 0 538 838" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id={'vectorLeft'} d="M485.5 0.5C403 111 0.999957 123.5 1 78C1.00004 32.5 339.5 -22 457.5 362C546.378 651.23 542.333 799.833 532.5 837" stroke="black" />
      </svg>

      <svg className={'absolute invisible w-[52vw] '} style={{ left: '20%', top: '50%' }} width="787" height="862" viewBox="0 0 787 862" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorBottom" d="M423.5 1C877.536 -3.16547 881.621 255.077 567 548C349.5 750.5 109 832.5 0.5 861" stroke="black" />
      </svg>

      {/* <svg className={'absolute  invisible w-[36vw] h-auto'} style={{ left: '40%', top: '17%' }} viewBox="0 0 746 1136" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorTop" d="M345.5 275.5C269.5 150 224.5 -5.00002 271.5 0.999979C318.5 6.99998 348.5 129.271 244.5 235.5C174.5 307 -34.0001 513.5 6 732.5C46.0001 951.5 235.5 997.5 393 1032C550.5 1066.5 745.5 1064.5 745.5 1135.5" stroke="black" />
      </svg> */}

      <svg className={'absolute  invisible w-[36vw] h-auto'} style={{ left: '40%', top: '17%' }} viewBox="0 0 614 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorTop" d="M 45.9996 222.5 C -217.5 -172 798.322 -3.02478 580.5 462.5 C 486 665 458 799.5 458 974.5 " stroke="#FF0000" strokeWidth="4" />
      </svg>

      <div style={{ width: 145, height: 126 }} className={`relative cursor-pointer border-debug `}
        ref={myRef}
        onMouseEnter={parentHovering === undefined ? () => setHovering(true) : undefined}
        onMouseLeave={parentHovering === undefined ? () => { setHovering(false); setClicking(false); } : undefined}
        onMouseDown={parentClicking === undefined ? () => setClicking(true) : undefined}
        onMouseUp={parentClicking === undefined ? () => setClicking(false) : undefined}
        alt="The Bermuda Events Triangular Company Logo"
        onClick={() => {
          // lenis.scrollTo('#features', { offset: -80, duration: 1 })

          ctx.add(() => {
            gsap.to(window, { scrollTo: { y: '#features', offsetY: 80 }, delay: 0.4, duration: 1, ease: 'power4.Out' })
            animateLogo().paused(false)
          });
        }}
      >

        <svg ref={myBladRef0} style={{ left: (65 / 145 * 100).toPrecision(2) + `%`, top: 0 }} className={'z-10 absolute'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="myBladRef0Vector" d="M29.6725 69.5155C25.2278 61.8146 23.074 53.4177 23.0019 45.1166C22.9208 35.7877 25.4688 26.5797 30.3491 18.6166C34.633 26.0365 37.0349 30.1966 41.3188 37.6166C43.7989 41.9123 45.1894 44.3208 47.6696 48.6166C51.2771 54.865 53.2997 58.3682 56.9072 64.6166C60.5147 70.865 62.5373 74.3682 66.1448 80.6166C69.2471 85.9901 70.9865 89.0027 74.0889 94.3762C65.4819 94.604 56.949 92.5847 49.3696 88.5573C45.4023 86.4492 41.6963 83.7908 38.3776 80.6166C35.0418 77.4259 32.0974 73.7139 29.6725 69.5155Z" fill="#BD9159" />
          <path id="myBladRef0Vector2" className='hidden' d="M29 19C36.4754 15.0623 43.3156 16.0417 47.6244 20.7034C50.6999 24.0309 53.173 29.039 55.3355 35C57.0898 39.8358 58.6397 45.2986 60.1409 51C61.1754 54.9291 62.1867 58.9715 63.226 63C66.2134 74.5807 69.4307 86.0465 74.0889 94.3762C70.0348 89.1244 64.2498 83.6103 57.9419 78C54.59 75.0188 51.0904 72.0105 47.6244 69C44.5496 66.3293 41.5012 63.6568 38.6058 61C32.8584 55.7263 27.7136 50.5143 24.1608 45.5C16.9715 35.3533 20.6509 23.3979 29 19Z" fill="#BD9159" />
          <path id="myBladRef0Vector3" className='hidden' d="M56.3226 56.5889C61.273 57.921 64.2148 63.0164 62.8933 67.9696C62.253 70.3695 60.7295 72.2956 58.7659 73.4923C56.6765 74.7656 54.0889 75.213 51.5369 74.5263C46.5865 73.1941 43.6447 68.0988 44.9662 63.1455C45.2588 62.0489 45.7358 61.0511 46.355 60.1767C41.0475 58.6806 33.7907 52.3211 30.0713 45.8789C30.0713 45.8789 35.7383 42.6071 39.3694 40.5106C43.0006 38.4142 48.6675 35.1424 48.6675 35.1424C52.2167 41.2897 54.4412 50.838 53.0331 56.3095C54.1074 56.2069 55.2184 56.2917 56.3226 56.5889Z" fill="#BD9159" />
        </svg>

        <svg ref={myBladRef1} style={{ left: 0, bottom: 0 }} className={'z-10 absolute'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="myBladRef1Vector" d="M67.2879 69.908C72.4928 60.8996 74.5579 50.9403 73.822 41.2952C73.2219 33.4284 70.7585 25.7707 66.6156 19.0085C66.6156 19.0085 59.9501 30.5524 55.6792 37.9492C51.4082 45.346 49.0137 49.4931 44.7427 56.89C42.6073 60.5884 41.41 62.6619 39.2745 66.3603C37.1391 70.0587 35.9418 72.1323 33.8063 75.8307C29.5354 83.2275 22.8699 94.7714 22.8699 94.7714C31.3848 94.9948 39.8272 93.0218 47.3451 89.0818C51.4748 86.9175 55.3256 84.1596 58.7561 80.8462C62.0213 77.6925 64.9059 74.0355 67.2879 69.908Z" fill="#A8947F" />
          <path id="myBladRef1Vector2" className='hidden' d="M57 52.5C59 44.5 60.5432 42.9875 62.5 34C64.4568 25.0125 69 14 69 14C69 14 62.2012 25.3426 57 32C52.3178 37.993 49.1659 40.9186 44 46.5C40.7161 50.048 39.175 51.9374 35.5 55.5C31.5528 59.3264 29 62 24.5 67.5C20 73 11.5 85.5259 23 94.7629C34.5 104 45.5 94.7629 48.5 88C51.4999 81.2371 53.1332 73.5531 54.5 67.5C55.8668 61.4469 55.8245 57.2019 57 52.5Z" fill="#A8947F" />
          <path id="myBladRef1Vector3" className='hidden' d="M31.8577 87.368L31.4762 68.5774L31.0947 49.7869C35.3882 52.2002 38.8013 56.1463 40.6461 60.9177L55.0911 35.3051L59.6587 37.8811L64.2262 40.4571L49.7231 66.1726C54.8354 65.2115 60.0559 66.1123 64.4132 68.5779L48.1354 77.973L31.8577 87.368Z" fill="#A8947F" />
        </svg>

        <svg ref={myBladRef2} style={{ right: 0, bottom: 0 }} className={'z-10 absolute'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="myBladRef2Vector" d="M48.7398 43C66.857 43 83.8553 53.1418 92.4795 69.0314C92.4795 69.0314 79.1504 69.0314 70.6096 69.0314C66.3393 69.0314 63.9451 69.0314 59.6747 69.0314C55.4043 69.0314 53.0101 69.0314 48.7398 69.0314C40.199 69.0314 35.4106 69.0314 26.8699 69.0314C18.3292 69.0314 5 69.0314 5 69.0314C7.61655 64.2144 11.0053 59.8785 15 56.1895C17.7339 53.6648 20.7517 51.4431 24 49.5776C26.4183 48.1887 28.9644 46.9972 31.6163 46.0251C36.9552 44.068 42.7228 43 48.7398 43Z" fill="#6E4221" />
          <path id="myBladRef2Vector2" className='hidden' d="M90.8221 57.5393C90.4946 65.9821 86.2263 71.4161 80.0347 72.8168C75.6153 73.8165 70.0416 73.4543 63.798 72.3465C58.7329 71.4479 53.227 70.0587 47.5389 68.5081C43.6189 67.4394 39.6124 66.2941 35.604 65.1798C24.0812 61.9767 12.5428 59.0301 3 58.8993C9.57524 58.0143 17.2431 55.7614 25.2557 53.1037C29.5134 51.6914 33.8685 50.1649 38.2087 48.6685C42.059 47.341 45.8976 46.0373 49.6462 44.8582C57.087 42.5176 64.1732 40.6681 70.2921 40.0984C82.674 38.9457 91.188 48.1098 90.8221 57.5393Z" fill="#6E4221" />
          <path id="myBladRef2Vector3" className='hidden' d="M67 56.5C67 61.825 64.7502 66.6246 61.1492 70C57.8409 73.101 53.3922 75 48.5 75C45.6345 75 42.9211 74.3485 40.5 73.1856C38.7876 72.363 37.2213 71.2847 35.8508 70C32.2498 66.6246 30 61.825 30 56.5C30 51.175 32.2498 46.3754 35.8508 43C39.1591 39.899 43.6078 38 48.5 38C51.1698 38 53.7076 38.5656 56 39.5834C58.5105 40.6981 60.7268 42.3553 62.5 44.4062C65.3039 47.6491 67 51.8765 67 56.5Z" fill="#6E4221" />
        </svg>

      </div>
    </div>
  );
}
