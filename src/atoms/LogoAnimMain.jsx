import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { gsap } from 'gsap/dist/gsap';
// import { scrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import useGsap from '@/utils/useGsap';
import PathGSAPStandalone from './PathGsap';
gsap.registerPlugin(MotionPathPlugin);

export default function LogoAnimMain({ loaded, className, hovering: parentHovering, clicking: parentClicking, color }) {
  let [hovering, setHovering] = useState(parentHovering === undefined ? false : parentHovering);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  const myBladRef0 = useRef();
  const myBladRef1 = useRef();
  const myBladRef2 = useRef();
  let [style, setStyle] = useState();
  let ctx = useGsap();
  let [tl, setTl] = useState();

  // let style=useRef();

  function animateLeaf(leafRef, leafPathId, alongPathVectorId, degrees, transformPathInitial, transformPathTransit, transformPath3) {
    let tl = gsap.timeline({ overwrite: true })
      .set(leafPathId, {
        attr: { d: transformPathTransit },
        opacity: 1,
      }, 0)
      .set(leafRef.current, {
        scale: 1.5,
        transformOrigin: "50% 50%",
      }, 0)
      .to(leafRef.current, {
        motionPath: {
          path: alongPathVectorId,
          align: alongPathVectorId,
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: degrees,
        },
        ease: 'power3.out',
        duration: 1.8,
        transformOrigin: "50% 50%",
      }, 0)
      .to(leafPathId, {
        attr: { d: transformPathInitial },
        duration: 0.7,
        ease: 'power1.out',
      }, 0.3)
      .to(leafRef.current, {
        ease: 'power1.out',
        scale: 1,
        duration: 0.8,
        transformOrigin: "50% 50%",
      }, 0.1)

    return tl
  }

  function animateLogo() {
    let tl = gsap.timeline({
      // onComplete: function () { this.time(0).kill(); } 
    })
      .add(animateLeaf(myBladRef0, '#myBladRef0Vector0', '#vectorTop', 120 + 180,
        document.getElementById('myBladRef0VectorInitial').attributes.d.value,
        document.getElementById('myBladRef0Vector1transit').attributes.d.value,
        document.getElementById('myBladRef0Vector2shape').attributes.d.value,
      ), 0)

      .add(animateLeaf(myBladRef1, '#myBladRef1Vector0', '#vectorLeft', -120 + 180,
        document.getElementById('myBladRef1VectorInitial').attributes.d.value,
        document.getElementById('myBladRef1Vector1transit').attributes.d.value,
        document.getElementById('myBladRef1Vector2shape').attributes.d.value,
      ), 0)

      .add(animateLeaf(myBladRef2, '#myBladRef2Vector0', '#vectorBottom', 0 + 180,
        document.getElementById('myBladRef2VectorInitial').attributes.d.value,
        document.getElementById('myBladRef2Vector1transit').attributes.d.value,
        document.getElementById('myBladRef2Vector2shape').attributes.d.value,
      ), 0)

    return tl
  }

  useEffect(() => {
    ctx.add(() => {

      let newTl = animateLogo().paused(true);
      setTl(newTl)

    })
    // loaded.current=true;
  }, [])



  useEffect(() => {
    tl && ctx.add(() => {
      loaded && tl.paused(false)
    })
  }, [loaded])

  // useEffect(() => {
  // myRef?.current !== undefined &&
  //   ctx.add(() => {
  //     let animation = animateLogo().paused(false)
  //   });
  // }, [hovering, parentHovering, parentClicking, clicking, active]);

  let speedTweensObj =
  {
    timeline: tl,
    ratio: 1,
    attr: {
      duration: 1,
      ease: 'power3.out',
      // onStart:()=>{console.log('start One')} 
    },
    position: 0.2
  }

  useLayoutEffect(() => {
    setStyle({ opacity: 0 })
  }, [])

  return (
    <div className={` ${className}`}>

      <svg className={'absolute w-[400%] md:w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+2%)] md:translate-y-[calc(-50%-50px)]'} style={{}} viewBox="0 0 1578 1904" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='invisible stroke-red-500' id="vectorTop" d="M616.975 94.9073C479.445 323.954 560.035 563.545 789 664C1017.97 764.455 1130 1037 940.5 1150.5C751 1264 566.5 1005 585.5 896C604.5 787 748 809 807.5 927.501" strokeWidth="4" />
        <path className='invisible stroke-red-500' id="vectorBottom" d="M1645.72 1209.7C1503.82 983.333 1253.72 946.642 1060.44 1105.26C867.157 1263.87 573.429 1240.29 558.089 1019.93C542.749 799.573 857.23 752.421 945.796 818.738C1034.36 885.055 949.743 1003.02 817.145 1002.38" strokeWidth="4" />
        <path className='invisible stroke-red-500' id="vectorLeft" d="M104.383 1545.65C371.369 1555.42 542.22 1369.12 519.572 1120.12C496.923 871.114 681.439 641.361 872.359 752.456C1063.28 863.551 925.628 1150.21 821.011 1186.23C716.394 1222.25 666.337 1085.97 741.352 976.632" strokeWidth="4" />
        {/* TOP */}
        <PathGSAPStandalone strokeColor='#BD9159' tweens={[{ id: 'speed11', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed11" d="M851.172 686.533C910.172 712.033 973.661 773.666 1005.67 828.533" strokeWidth="2" />
        <PathGSAPStandalone strokeColor='#BD9159' tweens={[{ id: 'speed12', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed12" d="M852 719C916.828 750.467 948 788.5 984.5 854" strokeWidth="2" />
        <PathGSAPStandalone strokeColor='#BD9159' tweens={[{ id: 'speed13', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed13" d="M944.881 768.533C969.258 795.146 1005.39 849.329 1013.91 873.619" strokeWidth="2" />

        <g id="vectorBottom">
          <PathGSAPStandalone strokeColor='#6E4221' tweens={[{ id: 'speed21', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed21" d="M1011.62 1150.56C962.158 1191.6 878.451 1220.28 815.035 1223.97" strokeWidth="2" />
          <PathGSAPStandalone strokeColor='#6E4221' tweens={[{ id: 'speed22', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed22" d="M982.3 1136.59C924.879 1180.13 876.851 1190.69 801.923 1193.56" strokeWidth="2" />
          <PathGSAPStandalone strokeColor='#6E4221' tweens={[{ id: 'speed23', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed23" d="M896.065 1196.95C861.296 1206.63 796.624 1214.29 771.112 1210.88" strokeWidth="2" />
        </g>

        <g id="vectorLeft">
          <PathGSAPStandalone strokeColor='#A8947F' tweens={[{ id: 'speed31', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed31" d="M509.519 1054.28C503.345 990.306 526.64 904.943 559.218 850.411" strokeWidth="2" />
          <PathGSAPStandalone strokeColor='#A8947F' tweens={[{ id: 'speed32', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed32" d="M537.546 1037.88C533.782 965.912 552.025 920.246 591.744 856.646" strokeWidth="2" />
          <PathGSAPStandalone strokeColor='#A8947F' tweens={[{ id: 'speed33', ...speedTweensObj }]} transitStrokeAnimation transitPortion={0.8} id="speed33" d="M536.049 932.622C547.575 898.422 577.562 840.612 594.717 821.423" strokeWidth="2" />
        </g>

      </svg>



      {/* 
        fill="#BD9159" 
fill="#A8947F" 
fill="#6E4221" */}

      {/* <svg className={'absolute  invisible '} style={{ right: '50%', top: '50%' }} width="538" height="838" viewBox="0 0 538 838" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id={'vectorLeft'} d="M485.5 0.5C403 111 0.999957 123.5 1 78C1.00004 32.5 339.5 -22 457.5 362C546.378 651.23 542.333 799.833 532.5 837" stroke="black" />
      </svg>

      <svg className={'absolute invisible w-[52vw] '} style={{ left: '20%', top: '50%' }} width="787" height="862" viewBox="0 0 787 862" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorBottom" d="M423.5 1C877.536 -3.16547 881.621 255.077 567 548C349.5 750.5 109 832.5 0.5 861" stroke="black" />
      </svg>

      <svg className={'absolute  invisible w-[36vw] h-auto'} style={{ left: '40%', top: '17%' }} viewBox="0 0 614 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="vectorTop" d="M 45.9996 222.5 C -217.5 -172 798.322 -3.02478 580.5 462.5 C 486 665 458 799.5 458 974.5 " strokeWidth="4" />
      </svg> */}

      <div style={{ width: 145, height: 126 }} className={`relative cursor-pointer  `}
        ref={myRef}
        onMouseEnter={parentHovering === undefined ? () => setHovering(true) : undefined}
        onMouseLeave={parentHovering === undefined ? () => { setHovering(false); setClicking(false); } : undefined}
        onMouseDown={parentClicking === undefined ? () => setClicking(true) : undefined}
        onMouseUp={parentClicking === undefined ? () => setClicking(false) : undefined}
        alt="The Bermuda Events Triangular Company Logo"
        onClick={() => {
          tl.restart()

          // ctx.add(() => {
          //   // gsap.to(window, { scrollTo: { y: '#features', offsetY: 80 }, delay: 0.4, duration: 1, ease: 'power4.Out' })
          //   animateLogo().paused(false)
          // });
        }}
      >

        {/* <svg width="146" height="127" viewBox="0 0 146 127" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Frame 114">
            <path id="vectorTop1" d="M72.2069 50.8989C67.7623 43.1981 65.6084 34.8012 65.5363 26.5C65.4552 17.1711 68.0032 7.96317 72.8836 0L83.8532 19L90.204 30L99.4416 46L108.679 62L116.623 75.7596C108.016 75.9874 99.4834 73.9682 91.9041 69.9407C87.9368 67.8326 84.2307 65.1743 80.9121 62C77.5762 58.8093 74.6318 55.0974 72.2069 50.8989Z" fill="#BD9159" />
            <path id="vectorLeft1" d="M44.4164 101.358C39.2174 110.37 31.6249 117.138 22.9041 121.323C15.7912 124.737 7.92767 126.432 0 126.225L10.9349 107.284L16.4024 97.813L21.8699 88.3422L32.8048 69.4006L43.7398 50.459C48.1906 57.7215 50.7032 66.0193 51.05 74.5C51.2405 79.1586 50.7775 83.8724 49.6233 88.5C48.5247 92.9046 46.7999 97.2312 44.4164 101.358Z" fill="#A8947F" />
            <path id="vectorBottom1" d="M102.027 100.207C110.478 100.207 118.436 102.313 125.404 106.028C134.015 110.618 141.115 117.667 145.767 126.239H123.897H112.962H102.027H80.1576H58.2877C61.3674 120.569 65.5167 115.566 70.4648 111.5C74.7399 107.987 79.6113 105.173 84.9041 103.233C90.2429 101.276 96.0105 100.207 102.027 100.207Z" fill="#6E4221" />
          </g>
        </svg> */}

        <svg ref={myBladRef0} style={{ left: (65 / 145 * 100).toPrecision(2) + `%`, top: 0 }} className={'z-1 absolute -translate-x-[25%] -translate-y-[15%]'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="myBladRef0Vector0" style={style} d="M29.6725 69.5155C25.2278 61.8146 23.074 53.4177 23.0019 45.1166C22.9208 35.7877 25.4688 26.5797 30.3491 18.6166C34.633 26.0365 37.0349 30.1966 41.3188 37.6166C43.7989 41.9123 45.1894 44.3208 47.6696 48.6166C51.2771 54.865 53.2997 58.3682 56.9072 64.6166C60.5147 70.865 62.5373 74.3682 66.1448 80.6166C69.2471 85.9901 70.9865 89.0027 74.0889 94.3762C65.4819 94.604 56.949 92.5847 49.3696 88.5573C45.4023 86.4492 41.6963 83.7908 38.3776 80.6166C35.0418 77.4259 32.0974 73.7139 29.6725 69.5155Z" fill="#BD9159" />
          <path id="myBladRef0VectorInitial" className='hidden' d="M29.6725 69.5155C25.2278 61.8146 23.074 53.4177 23.0019 45.1166C22.9208 35.7877 25.4688 26.5797 30.3491 18.6166C34.633 26.0365 37.0349 30.1966 41.3188 37.6166C43.7989 41.9123 45.1894 44.3208 47.6696 48.6166C51.2771 54.865 53.2997 58.3682 56.9072 64.6166C60.5147 70.865 62.5373 74.3682 66.1448 80.6166C69.2471 85.9901 70.9865 89.0027 74.0889 94.3762C65.4819 94.604 56.949 92.5847 49.3696 88.5573C45.4023 86.4492 41.6963 83.7908 38.3776 80.6166C35.0418 77.4259 32.0974 73.7139 29.6725 69.5155Z" fill="#BD9159" />

          <path id="myBladRef0Vector1transit" className='hidden' d="M39 61C37 52.5 35.6509 49.5 33.5 40.5C31.3491 31.5 30.5 29 27.5 20C33.1509 28 36.5 32 41 37C43.97 40.3 48.6699 45.6699 52 49C55.5 52.5 57 54 62 59C66 63 71 67.5 74.5 73.5C78 79.5 80 88.5 72.5 95.5C61.9111 102.74 53.5 97.5 49 92.5C46.0022 89.1691 43.5 83 42.5 79C41.5 75 40.2941 66.5 39 61Z" fill="#BD9159" />
          <path id="myBladRef0Vector2shape" className='hidden' d="M56.3226 56.5889C61.273 57.921 64.2148 63.0164 62.8933 67.9696C62.253 70.3695 60.7295 72.2956 58.7659 73.4923C56.6765 74.7656 54.0889 75.213 51.5369 74.5263C46.5865 73.1941 43.6447 68.0988 44.9662 63.1455C45.2588 62.0489 45.7358 61.0511 46.355 60.1767C41.0475 58.6806 33.7907 52.3211 30.0713 45.8789C30.0713 45.8789 35.7383 42.6071 39.3694 40.5106C43.0006 38.4142 48.6675 35.1424 48.6675 35.1424C52.2167 41.2897 54.4412 50.838 53.0331 56.3095C54.1074 56.2069 55.2184 56.2917 56.3226 56.5889Z" fill="#BD9159" />
        </svg>

        <svg ref={myBladRef1} style={{ left: 0, bottom: 0 }} className={'z-1 absolute -translate-x-[25%] translate-y-[15%]'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="myBladRef1Vector0" style={style} d="M67.4164 69.8989C71.8611 62.1981 74.0149 53.8012 74.087 45.5C74.1681 36.1711 71.6201 26.9632 66.7398 19C62.4559 26.42 60.054 30.58 55.7701 38C53.29 42.2958 51.8994 44.7042 49.4193 49C45.8118 55.2484 43.7892 58.7516 40.1817 65C36.5742 71.2484 34.5516 74.7516 30.9441 81C27.8417 86.3735 26.1024 89.3862 23 94.7596C31.607 94.9874 40.1399 92.9682 47.7193 88.9407C51.6866 86.8326 55.3926 84.1743 58.7113 81C62.0471 77.8093 64.9915 74.0974 67.4164 69.8989Z" fill="#A8947F" />
          <path id="myBladRef1VectorInitial" className='hidden' d="M67.4164 69.8989C71.8611 62.1981 74.0149 53.8012 74.087 45.5C74.1681 36.1711 71.6201 26.9632 66.7398 19C62.4559 26.42 60.054 30.58 55.7701 38C53.29 42.2958 51.8994 44.7042 49.4193 49C45.8118 55.2484 43.7892 58.7516 40.1817 65C36.5742 71.2484 34.5516 74.7516 30.9441 81C27.8417 86.3735 26.1024 89.3862 23 94.7596C31.607 94.9874 40.1399 92.9682 47.7193 88.9407C51.6866 86.8326 55.3926 84.1743 58.7113 81C62.0471 77.8093 64.9915 74.0974 67.4164 69.8989Z" fill="#A8947F" />
          <path id="myBladRef1Vector1transit" className='hidden' d="M62.5 60C68 54.5 76.5 49 77.5 40.5C77.5811 31.1711 74.5 27 67 22.5C60.5 20 54.5 20.5 49.5 25.5C44.5 29.5 42.5 34 40.5 40.5C39 48 36.5 53.5 35 60C33 67 31.5 73 30 79C28.5 85 25.5 93 23.5 99C28 93.5 32.5 88.5 38 83C41.5 79 46.5 75 49.5 72C52.5 69 58.5 63 62.5 60Z" fill="#A8947F" />
          <path id="myBladRef1Vector2shape" className='hidden' d="M31.8577 87.368L31.4762 68.5774L31.0947 49.7869C35.3882 52.2002 38.8013 56.1463 40.6461 60.9177L55.0911 35.3051L59.6587 37.8811L64.2262 40.4571L49.7231 66.1726C54.8354 65.2115 60.0559 66.1123 64.4132 68.5779L48.1354 77.973L31.8577 87.368Z" fill="#A8947F" />
        </svg>

        <svg ref={myBladRef2} style={{ right: 0, bottom: 0 }} className={'z-1 absolute translate-y-[35%]'} width="97" height="113" viewBox="0 0 97 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="myBladRef2Vector0" style={style} d="M48.7398 43C66.857 43 83.8553 53.1418 92.4795 69.0314C92.4795 69.0314 79.1504 69.0314 70.6096 69.0314C66.3393 69.0314 63.9451 69.0314 59.6747 69.0314C55.4043 69.0314 53.0101 69.0314 48.7398 69.0314C40.199 69.0314 35.4106 69.0314 26.8699 69.0314C18.3292 69.0314 5 69.0314 5 69.0314C7.61655 64.2144 11.0053 59.8785 15 56.1895C17.7339 53.6648 20.7517 51.4431 24 49.5776C26.4183 48.1887 28.9644 46.9972 31.6163 46.0251C36.9552 44.068 42.7228 43 48.7398 43Z" fill="#6E4221" />
          <path id="myBladRef2VectorInitial" className='hidden' d="M48.7398 43C66.857 43 83.8553 53.1418 92.4795 69.0314C92.4795 69.0314 79.1504 69.0314 70.6096 69.0314C66.3393 69.0314 63.9451 69.0314 59.6747 69.0314C55.4043 69.0314 53.0101 69.0314 48.7398 69.0314C40.199 69.0314 35.4106 69.0314 26.8699 69.0314C18.3292 69.0314 5 69.0314 5 69.0314C7.61655 64.2144 11.0053 59.8785 15 56.1895C17.7339 53.6648 20.7517 51.4431 24 49.5776C26.4183 48.1887 28.9644 46.9972 31.6163 46.0251C36.9552 44.068 42.7228 43 48.7398 43Z" fill="#6E4221" />
          <path id="myBladRef2Vector1transit" className='hidden' d="M50.1619 48.1336C58.5242 50.6479 61.797 50.9781 70.6678 53.6115C79.5387 56.2449 82.1285 56.7584 91.4236 58.6562C81.6703 59.5543 76.5321 60.457 69.9526 61.857C65.6101 62.781 58.6103 64.1694 54.0618 65.3903C49.2813 66.6734 47.2325 67.2234 40.4032 69.0565C34.9397 70.523 28.5435 72.6059 21.5974 72.6401C14.6512 72.6742 5.85577 69.9101 3.53921 59.9159C2.55773 47.1259 11.2995 42.458 17.879 41.058C22.2621 40.1254 28.8563 41.0401 32.8209 42.1723C36.7855 43.3046 44.751 46.5067 50.1619 48.1336Z" fill="#6E4221" />
          <path id="myBladRef2Vector2shape" className='hidden' d="M67 56.5C67 61.825 64.7502 66.6246 61.1492 70C57.8409 73.101 53.3922 75 48.5 75C45.6345 75 42.9211 74.3485 40.5 73.1856C38.7876 72.363 37.2213 71.2847 35.8508 70C32.2498 66.6246 30 61.825 30 56.5C30 51.175 32.2498 46.3754 35.8508 43C39.1591 39.899 43.6078 38 48.5 38C51.1698 38 53.7076 38.5656 56 39.5834C58.5105 40.6981 60.7268 42.3553 62.5 44.4062C65.3039 47.6491 67 51.8765 67 56.5Z" fill="#6E4221" />
        </svg>

      </div>
    </div >
  );
}
