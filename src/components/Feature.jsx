import { gsap } from 'gsap/dist/gsap';
import { useEffect, useRef, useState } from 'react';
import useGsap from '@/utils/useGsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useAppContext } from '@/utils/appContext';
import PortableText from './PortableText';
gsap.registerPlugin(ScrollTrigger);

export default function Feature({ className, locale, title, subTitle, text, myKey }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myTitleRef = useRef();
  const mySubTitle = useRef();
  const myText = useRef();
  const myRef = useRef();
  const myLogoContainer = useRef();
  let ctx = useGsap();
  const { mobile } = useAppContext();

  useEffect(() => {
    myTitleRef?.current !== undefined &&
      ctx.add(() => {
        let tl1 = gsap.timeline({})
          .to([myTitleRef.current], {
            duration: 0.5,
            scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
            transformOrigin: '50% 50%',
            ease: 'elastic.out(1, 0.5)',
            // ease: 'expo.out',
          }, 0)
          .to([myLogoContainer.current], {
            duration: 0.5,
            scale: active ? mobile ? 0.3 : 0.25 : clicking ? 0.95 : 1,
            // opacity: () => mobile && active ? 0 : 1,
            yPercent: () => active ? mobile ? -80 : -45 : 0,
            xPercent: () => mobile ? active ? 75 : 0 : 0,
            // width:active?'20%':'100%',
            transformOrigin: '50% 50%',
            // ease: 'elastic.out(1, 0.5)',
            ease: 'expo.out',
          }, 0)
          // 
          .to(myRef.current, {
            borderColor: active ? '#6E422166' : '#6E422111',
            backgroundColor: hovering ? '#BD915919' : active ? '#BD915909' : '#BD915900',
            boxShadow: active ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            y: active ? -4 : 0,
            duration: 0.5,
            ease: 'expo.out',
          }, 0)
          .to(mySubTitle.current, {
            autoAlpha: active ? 0 : 1,
            duration: 0.5,
            ease: 'expo.out',
          }, 0)
          // let tl2 = gsap.timeline()
          .to(myText.current, {
            autoAlpha: active ? 1 : 0,
            ease: 'expo.out',
          }, 0)
        // if (active) { gsap.timeline().add(tl1, 0).add(tl2, 1).play(true) }
        // else { gsap.timeline().add(tl2, 0).add(tl1, 1).play(true) }
        // gsap.to(myRef.current,{
        // backgroundColor
        // })
      });
  }, [hovering, clicking, active, mobile]);

  return (
    <div
      ref={myRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setClicking(false);
      }}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      // onFocus={() => setActive(true)}
      onClick={() => setActive(!active)}
      onBlur={() => setActive(false)}
      tabIndex='0'
      onKeyDown={(e) => { e.key === 'Enter' && setActive(!active) }}
      className={`relative noSelect featureCard font-raj  flex flex-1 flex-col shadow-black/10 backdrop-blur-sm border shadow-md md:focus-within:backdrop-blur-md md:hover:backdrop-blur-md border-[#6E422100] items-center rounded-xl pt-4 pb-2 cursor-pointer gap-4 ${className}`}>
      <div className="relative">
        <p className="text-center relative text-xs font-medium uppercase ">
          Get Lost In
        </p>
        <h3 ref={myTitleRef} className="relative font-bel text-3xl  ">{title}</h3>
      </div>
      <div className={'w-36 py-2 md:w-48 relative'} ref={myLogoContainer} >
        {myKey === 0 ? <Creativity hovering={hovering} active={active} clicking={clicking} className={`w-[90%]  mx-auto cursor-pointer  `} /> : null}
        {myKey === 1 ? <Detail hovering={hovering} active={active} clicking={clicking} className={`w-[90%] mx-auto cursor-pointer  `} /> : null}
        {myKey === 2 ? <Personality hovering={hovering} active={active} clicking={clicking} className={`w-[90%] mx-auto cursor-pointer `} /> : null}
      </div>
      <p ref={mySubTitle} className="text-center px-8 ">{subTitle}</p>
      {/* <p ref={myText} className="absolute bottom-[40%] md:bottom-[34%] translate-y-1/2 w-full px-4 text-center opacity-0 invisible whitespace-pre-wrap ">
        {`${text}`}
      </p> */}
      <div ref={myText} className="absolute bottom-[40%] md:bottom-[34%] translate-y-1/2 w-full px-4 text-center opacity-0 invisible whitespace-pre-wrap ">
        <PortableText value={text} locale={locale} />
      </div>
    </div>
  );
}

function Personality({ className, hovering, clicking, active }) {
  const myTitleRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    // myTitleRef?.current !== undefined &&
    ctx.add(() => {

      gsap.to('#PersonalityBody', {
        fill: hovering || active ? "#687D61" : "#BD9159",
        attr: { d: hovering || active ? "M93.4731 109.552C93.4731 99.7705 88.1048 87.0547 82.7365 87.0547C76.8802 87.0547 72 100.26 72 109.552H93.4731Z" : 'M21.4731 109.552C21.4731 99.7705 16.1048 87.0546 10.7365 87.0546C4.88024 87.0546 0 100.26 0 109.552H21.4731Z' },
        duration: 0.5,
        ease: 'expo.out',
      });
      gsap.to('#PersonalityHead', {
        fill: hovering || active ? "#687D61" : "#BD9159",
        attr: { d: hovering || active ? "M82.9991 57.0008C83.9737 57.0809 87.6154 63.1036 91.0728 69.3978C94.3933 75.4428 97.5437 81.7383 97.9983 83.2605C98.2626 84.1458 67.9963 84.3423 68 83.2605C68.0067 81.3327 81.0886 56.8436 82.9991 57.0008Z" : "M1.83147 81.0815C1.83147 75.9729 5.97284 71.8315 11.0815 71.8315C16.1901 71.8315 20.3315 75.9728 20.3315 81.0815C20.3315 86.1901 16.1901 90.3315 11.0815 90.3315C5.97284 90.3315 1.83147 86.1901 1.83147 81.0815Z" },
        duration: 0.5,
        ease: 'expo.out',
      });
      gsap.to('#PersonalityHeadSecret', {
        // fill: hovering ||active? "#687D61" : "#BD9159",
        attr: { d: hovering || active ? "M73.8315 81.0815C73.8315 75.9729 77.9728 71.8315 83.0815 71.8315C88.1901 71.8315 92.3315 75.9728 92.3315 81.0815C92.3315 86.1901 88.1901 90.3315 83.0815 90.3315C77.9728 90.3315 73.8315 86.1901 73.8315 81.0815Z" : "M1.83147 81.0815C1.83147 75.9729 5.97284 71.8315 11.0815 71.8315C16.1901 71.8315 20.3315 75.9728 20.3315 81.0815C20.3315 86.1901 16.1901 90.3315 11.0815 90.3315C5.97284 90.3315 1.83147 86.1901 1.83147 81.0815Z" },
        duration: 0.5,
        ease: 'expo.out',
      });
    });
  }, [hovering, clicking, active]);



  return (
    <svg ref={myTitleRef}
      alt='Personality logo'
      className={className} viewBox="0 0 163 179" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M90.7725 9.29235C90.7725 14.4244 86.6211 18.5847 81.5 18.5847C76.379 18.5847 72.2276 14.4244 72.2276 9.29235C72.2276 4.16033 76.379 0 81.5 0C86.6211 0 90.7725 4.16033 90.7725 9.29235Z" fill="#BD9159" />
      <path d="M92.2365 39.1257C92.2365 29.3443 86.8683 16.6284 81.5 16.6284C75.6437 16.6284 70.7635 29.8333 70.7635 39.1257H92.2365Z" fill="#BD9159" />
      <path d="M138.237 36.2878C134.616 39.9167 128.745 39.9167 125.124 36.2878C121.503 32.6589 121.503 26.7753 125.124 23.1464C128.745 19.5175 134.616 19.5175 138.237 23.1464C141.858 26.7753 141.858 32.6589 138.237 36.2878Z" fill="#BD9159" />
      <path d="M142.503 58.6885C142.503 48.9071 137.135 36.1913 131.766 36.1913C125.91 36.1913 121.03 49.3962 121.03 58.6885H142.503Z" fill="#BD9159" />
      <path d="M162.024 79.7186C162.024 84.8506 157.873 89.0109 152.751 89.0109C147.63 89.0109 143.479 84.8506 143.479 79.7186C143.479 74.5866 147.63 70.4262 152.751 70.4262C157.873 70.4262 162.024 74.5866 162.024 79.7186Z" fill="#BD9159" />
      <path d="M163 109.552C163 99.7705 157.632 87.0547 152.263 87.0547C146.407 87.0547 141.527 100.26 141.527 109.552H163Z" fill="#BD9159" />
      <path d="M138.927 136.577C135.306 140.206 129.435 140.206 125.814 136.577C122.193 132.948 122.193 127.065 125.814 123.436C129.435 119.807 135.306 119.807 138.927 123.436C142.548 127.065 142.548 132.948 138.927 136.577Z" fill="#BD9159" />
      <path d="M143.479 158.459C143.479 148.678 138.111 135.962 132.743 135.962C126.886 135.962 122.006 149.167 122.006 158.459H143.479Z" fill="#BD9159" />
      <path d="M90.7725 151.123C90.7725 156.255 86.621 160.415 81.5 160.415C76.379 160.415 72.2275 156.255 72.2275 151.123C72.2275 145.991 76.379 141.831 81.5 141.831C86.621 141.831 90.7725 145.991 90.7725 151.123Z" fill="#BD9159" />
      <path d="M91.7485 179C91.7485 169.219 86.3802 156.503 81.012 156.503C75.1557 156.503 70.2755 169.708 70.2755 179H91.7485Z" fill="#BD9159" />
      <path d="M38.1622 136.577C34.5411 140.206 28.6701 140.206 25.049 136.577C21.4279 132.948 21.4279 127.065 25.049 123.436C28.6701 119.807 34.5411 119.807 38.1622 123.436C41.7834 127.065 41.7834 132.948 38.1622 136.577Z" fill="#BD9159" />
      <path d="M42.9461 158.459C42.9461 148.678 37.5778 135.962 32.2096 135.962C26.3533 135.962 21.4731 149.167 21.4731 158.459H42.9461Z" fill="#BD9159" />
      <path d="M38.8525 36.2877C35.2313 39.9166 29.3603 39.9166 25.7392 36.2877C22.1181 32.6588 22.1181 26.7752 25.7392 23.1463C29.3603 19.5175 35.2313 19.5175 38.8525 23.1463C42.4736 26.7752 42.4736 32.6588 38.8525 36.2877Z" fill="#BD9159" />
      <path d="M42.9461 58.6885C42.9461 48.9071 37.5778 36.1913 32.2096 36.1913C26.3533 36.1913 21.4731 49.3962 21.4731 58.6885H42.9461Z" fill="#BD9159" />

      <path id="PersonalityBody" d="M21.4731 109.552C21.4731 99.7705 16.1048 87.0546 10.7365 87.0546C4.88024 87.0546 0 100.26 0 109.552H21.4731Z" fill="#BD9159" />
      <path id="PersonalityHeadSecret" d="M1.83147 81.0815C1.83147 75.9729 5.97284 71.8315 11.0815 71.8315C16.1901 71.8315 20.3315 75.9728 20.3315 81.0815C20.3315 86.1901 16.1901 90.3315 11.0815 90.3315C5.97284 90.3315 1.83147 86.1901 1.83147 81.0815Z" fill="#BD9159" />
      <path id="PersonalityHead" d="M1.83147 81.0815C1.83147 75.9729 5.97284 71.8315 11.0815 71.8315C16.1901 71.8315 20.3315 75.9728 20.3315 81.0815C20.3315 86.1901 16.1901 90.3315 11.0815 90.3315C5.97284 90.3315 1.83147 86.1901 1.83147 81.0815Z" fill="#BD9159" />

      {/* <path id="personalityBody2" d="M93.4731 109.552C93.4731 99.7705 88.1048 87.0547 82.7365 87.0547C76.8802 87.0547 72 100.26 72 109.552H93.4731Z" fill="#687D61" /> */}
      {/* <path id="PersonalityHeadSecret2" d="M73.8315 81.0815C73.8315 75.9729 77.9728 71.8315 83.0815 71.8315C88.1901 71.8315 92.3315 75.9728 92.3315 81.0815C92.3315 86.1901 88.1901 90.3315 83.0815 90.3315C77.9728 90.3315 73.8315 86.1901 73.8315 81.0815Z" fill="#BD9159" /> */}
      {/* <path id="PersonalityHead2" d="M82.9991 57.0008C83.9737 57.0809 87.6154 63.1036 91.0728 69.3978C94.3933 75.4428 97.5437 81.7383 97.9983 83.2605C98.2626 84.1458 67.9963 84.3423 68 83.2605C68.0067 81.3327 81.0886 56.8436 82.9991 57.0008Z" fill="#687D61" /> */}


    </svg>

  )
}

function Creativity({ className, hovering, clicking, active }) {
  const myTitleRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    myTitleRef?.current !== undefined &&
      ctx.add(() => {
        gsap.to('#CreativeSpecialO', {
          attr: { d: hovering || active ? "M151.999 3.00113C153.428 3.12023 158.769 12.069 163.84 21.4212C168.71 30.4031 173.331 39.7571 173.997 42.0189C174.385 43.3343 129.995 43.6262 130 42.0189C130.01 39.1545 149.197 2.76764 151.999 3.00113Z" : "M120.5 40.5C120.5 32.6217 126.887 26.235 134.765 26.235C142.643 26.235 149.03 32.6217 149.03 40.5C149.03 48.3783 142.643 54.765 134.765 54.765C126.887 54.765 120.5 48.3783 120.5 40.5Z" },
          duration: 0.5,
          fill: hovering || active ? '#687D61' : '#6E4221',
          // x: hovering ? 10 : 0,
          // y: hovering ? -10 : 0,
          ease: 'expo.out',
        })

      });
  }, [hovering, clicking, active]);


  return (

    <svg ref={myTitleRef}
      alt='Creativity logo'
      className={`relative ${className}`} viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path id="Vector" d="M101.807 21.267C101.807 29.1465 95.4193 35.5341 87.5398 35.5341C79.6603 35.5341 73.2727 29.1465 73.2727 21.267C73.2727 13.3876 79.6603 7 87.5398 7C95.4193 7 101.807 13.3876 101.807 21.267Z" fill="#6E4221" />
      <path id="Vector_2" d="M169 87.5398C169 95.4193 162.612 101.807 154.733 101.807C146.853 101.807 140.466 95.4193 140.466 87.5398C140.466 79.6603 146.853 73.2727 154.733 73.2727C162.612 73.2727 169 79.6603 169 87.5398Z" fill="#6E4221" />
      <path id="Vector_3" d="M145.601 144.95C140.029 150.522 130.996 150.522 125.424 144.95C119.853 139.379 119.853 130.345 125.424 124.774C130.996 119.202 140.029 119.202 145.601 124.774C151.173 130.345 151.173 139.379 145.601 144.95Z" fill="#6E4221" />
      <path id="Vector_4" d="M101.807 154.733C101.807 162.612 95.4193 169 87.5398 169C79.6603 169 73.2727 162.612 73.2727 154.733C73.2727 146.853 79.6603 140.466 87.5398 140.466C95.4193 140.466 101.807 146.853 101.807 154.733Z" fill="#6E4221" />
      <path id="Vector_5" d="M50.5756 144.95C45.004 150.522 35.9706 150.522 30.3989 144.95C24.8273 139.379 24.8273 130.345 30.3989 124.774C35.9706 119.202 45.004 119.202 50.5756 124.774C56.1472 130.345 56.1472 139.379 50.5756 144.95Z" fill="#6E4221" />
      <path id="Vector_6" d="M35.5341 87.5398C35.5341 95.4193 29.1465 101.807 21.267 101.807C13.3876 101.807 7 95.4193 7 87.5398C7 79.6603 13.3876 73.2727 21.267 73.2727C29.1465 73.2727 35.5341 79.6603 35.5341 87.5398Z" fill="#6E4221" />
      <path id="Vector_7" d="M51.2265 50.5755C45.6549 56.1471 36.6215 56.1471 31.0498 50.5755C25.4782 45.0038 25.4782 35.9705 31.0498 30.3988C36.6215 24.8272 45.6549 24.8272 51.2265 30.3988C56.7981 35.9705 56.7981 45.0038 51.2265 50.5755Z" fill="#6E4221" />
      <path id="CreativeSpecialO" d="M120.5 40.5C120.5 32.6217 126.887 26.235 134.765 26.235C142.643 26.235 149.03 32.6217 149.03 40.5C149.03 48.3783 142.643 54.765 134.765 54.765C126.887 54.765 120.5 48.3783 120.5 40.5Z" fill="#6E4221" />
      {/* <path id="Triangle" d="M151.999 3.00113C153.428 3.12023 158.769 12.069 163.84 21.4212C168.71 30.4031 173.331 39.7571 173.997 42.0189C174.385 43.3343 129.995 43.6262 130 42.0189C130.01 39.1545 149.197 2.76764 151.999 3.00113Z" fill="#687D61"/> */}

    </svg>


  )
}

let initialState = [
  "M58.448 58.448L28.9445 50.8648C31.7628 48.0382 35.5861 46.2326 39.7124 45.8309L22.8618 28.9804L28.8718 22.9704L45.7901 39.8887C46.1524 35.6887 47.9917 31.8094 50.8648 28.9445L58.448 58.448Z",
  "M46 88.5L19.7757 104C19.7699 100.008 21.1967 96.0282 23.8303 92.8264L1.05774e-05 92.8265L1.0949e-05 84.3271L23.9261 84.3271C21.2124 81.101 19.77 77.0573 19.7757 73L46 88.5Z",
  "M58.448 118.552L50.8647 148.056C48.0382 145.237 46.2326 141.414 45.8309 137.288L28.9803 154.138L22.9704 148.128L39.8887 131.21C35.6886 130.848 31.8093 129.008 28.9444 126.135L58.448 118.552Z",
  "M88.5 131L104 157.224C100.008 157.23 96.0282 155.803 92.8264 153.17L92.8265 177H84.3271V153.074C81.101 155.788 77.0573 157.23 73 157.224L88.5 131Z",
  "M118.552 118.552L148.056 126.135C145.237 128.962 141.414 130.767 137.288 131.169L154.138 148.02L148.128 154.03L131.21 137.111C130.848 141.311 129.008 145.191 126.135 148.056L118.552 118.552Z",
  "M131 88.5L157.224 73C157.23 76.9915 155.803 80.9718 153.17 84.1736L177 84.1735L177 92.6729L153.074 92.6729C155.788 95.899 157.23 99.9427 157.224 104L131 88.5Z",
  "M118.552 58.4479L126.135 28.9444C128.962 31.7628 130.767 35.5861 131.169 39.7123L148.02 22.8617L154.03 28.8717L137.111 45.79C141.311 46.1523 145.191 47.9917 148.056 50.8647L118.552 58.4479Z",
  "M88.5 46L73 19.7757C76.9915 19.7699 80.9718 21.1967 84.1736 23.8303L84.1735 1.14441e-05H92.6729V23.9261C95.899 21.2124 99.9427 19.77 104 19.7757L88.5 46Z",
]

let hoverState = [
  "M64.8119 64.8119L35.3084 57.2287C38.1268 54.4021 41.9501 52.5965 46.0763 52.1948L29.2257 35.3443L35.2357 29.3343L52.154 46.2526C52.5163 42.0526 54.3557 38.1733 57.2287 35.3084L64.8119 64.8119Z",
  "M55 88.5L28.7757 104C28.7699 100.008 30.1967 96.0282 32.8303 92.8264L9.00001 92.8265L9.00001 84.3271L32.9261 84.3271C30.2124 81.101 28.77 77.0573 28.7757 73L55 88.5Z",
  "M64.812 112.188L57.2287 141.692C54.4022 138.873 52.5966 135.05 52.1949 130.924L35.3443 147.774L29.3344 141.764L46.2527 124.846C42.0526 124.484 38.1733 122.644 35.3084 119.771L64.812 112.188Z",
  "M88.5 122L104 148.224C100.008 148.23 96.0282 146.803 92.8264 144.17L92.8265 168H84.3271V144.074C81.101 146.788 77.0573 148.23 73 148.224L88.5 122Z",
  "M112.188 112.188L141.692 119.771C138.873 122.598 135.05 124.403 130.924 124.805L147.774 141.656L141.764 147.666L124.846 130.747C124.484 134.947 122.644 138.827 119.771 141.692L112.188 112.188Z",
  "M122 88.5L148.224 73C148.23 76.9915 146.803 80.9718 144.17 84.1736L168 84.1735L168 92.6729L144.074 92.6729C146.788 95.899 148.23 99.9427 148.224 104L122 88.5Z",
  "M112.188 64.8119L119.771 35.3084C122.598 38.1267 124.403 41.95 124.805 46.0763L141.656 29.2257L147.666 35.2356L130.747 52.154C134.947 52.5163 138.827 54.3556 141.692 57.2287L112.188 64.8119Z",
  "M88.5 55L73 28.7757C76.9915 28.7699 80.9718 30.1967 84.1736 32.8303L84.1735 9.00001H92.6729V32.9261C95.899 30.2124 99.9427 28.77 104 28.7757L88.5 55Z",
]

function Detail({ className, hovering, clicking, active }) {
  const myTitleRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    myTitleRef?.current !== undefined &&
      ctx.add(() => {

        gsap.to(`#DetailVector_1`, { attr: { d: hovering || active ? hoverState[0] : initialState[0] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_2`, { attr: { d: hovering || active ? hoverState[1] : initialState[1] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_3`, { attr: { d: hovering || active ? hoverState[2] : initialState[2] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_4`, { attr: { d: hovering || active ? hoverState[3] : initialState[3] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_5`, { attr: { d: hovering || active ? hoverState[4] : initialState[4] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_6`, { attr: { d: hovering || active ? hoverState[5] : initialState[5] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_7`, { attr: { d: hovering || active ? hoverState[6] : initialState[6] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailVector_8`, { attr: { d: hovering || active ? hoverState[7] : initialState[7] }, duration: 0.5, ease: 'expo.out', })
        gsap.to(`#DetailSpecialO`, {
          attr: { d: hovering || active ? "M87.999 70.0009C89.1036 70.0929 93.2308 77.0078 97.1492 84.2345C100.912 91.1751 104.483 98.4032 104.998 100.151C105.298 101.167 70.9958 101.393 71 100.151C71.0076 97.9376 85.8337 69.8204 87.999 70.0009Z" : "M79.5147 89C79.5147 84.3137 83.3137 80.5147 88 80.5147C92.6863 80.5147 96.4853 84.3137 96.4853 89C96.4853 93.6863 92.6863 97.4853 88 97.4853C83.3137 97.4853 79.5147 93.6863 79.5147 89Z" },
          fill: hovering || active ? '#687D61' : '#A8947F',
          duration: 0.5, ease: 'expo.out',
        })
      });


  }, [hovering, clicking, active]);

  return (
    <svg ref={myTitleRef}
      alt='Detail logo'
      className={className} viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="DetailVector_1" d="M58.448 58.448L28.9445 50.8648C31.7628 48.0382 35.5861 46.2326 39.7124 45.8309L22.8618 28.9804L28.8718 22.9704L45.7901 39.8887C46.1524 35.6887 47.9917 31.8094 50.8648 28.9445L58.448 58.448Z" fill="#A8947F" />
      <path id="DetailVector_2" d="M46 88.5L19.7757 104C19.7699 100.008 21.1967 96.0282 23.8303 92.8264L1.05774e-05 92.8265L1.0949e-05 84.3271L23.9261 84.3271C21.2124 81.101 19.77 77.0573 19.7757 73L46 88.5Z" fill="#A8947F" />
      <path id="DetailVector_3" d="M58.448 118.552L50.8647 148.056C48.0382 145.237 46.2326 141.414 45.8309 137.288L28.9803 154.138L22.9704 148.128L39.8887 131.21C35.6886 130.848 31.8093 129.008 28.9444 126.135L58.448 118.552Z" fill="#A8947F" />
      <path id="DetailVector_4" d="M88.5 131L104 157.224C100.008 157.23 96.0282 155.803 92.8264 153.17L92.8265 177H84.3271V153.074C81.101 155.788 77.0573 157.23 73 157.224L88.5 131Z" fill="#A8947F" />
      <path id="DetailVector_5" d="M118.552 118.552L148.056 126.135C145.237 128.962 141.414 130.767 137.288 131.169L154.138 148.02L148.128 154.03L131.21 137.111C130.848 141.311 129.008 145.191 126.135 148.056L118.552 118.552Z" fill="#A8947F" />
      <path id="DetailVector_6" d="M131 88.5L157.224 73C157.23 76.9915 155.803 80.9718 153.17 84.1736L177 84.1735L177 92.6729L153.074 92.6729C155.788 95.899 157.23 99.9427 157.224 104L131 88.5Z" fill="#A8947F" />
      <path id="DetailVector_7" d="M118.552 58.4479L126.135 28.9444C128.962 31.7628 130.767 35.5861 131.169 39.7123L148.02 22.8617L154.03 28.8717L137.111 45.79C141.311 46.1523 145.191 47.9917 148.056 50.8647L118.552 58.4479Z" fill="#A8947F" />
      <path id="DetailVector_8" d="M88.5 46L73 19.7757C76.9915 19.7699 80.9718 21.1967 84.1736 23.8303L84.1735 1.14441e-05H92.6729V23.9261C95.899 21.2124 99.9427 19.77 104 19.7757L88.5 46Z" fill="#A8947F" />

      <path id="DetailSpecialO" d="M79.5147 89C79.5147 84.3137 83.3137 80.5147 88 80.5147C92.6863 80.5147 96.4853 84.3137 96.4853 89C96.4853 93.6863 92.6863 97.4853 88 97.4853C83.3137 97.4853 79.5147 93.6863 79.5147 89Z" fill="#A8947F" />
    </svg>

    //     <svg width="177" height="177" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <g id="DetailsB">
    // <path id="Vector"    d="M64.8119 64.8119L35.3084 57.2287C38.1268 54.4021 41.9501 52.5965 46.0763 52.1948L29.2257 35.3443L35.2357 29.3343L52.154 46.2526C52.5163 42.0526 54.3557 38.1733 57.2287 35.3084L64.8119 64.8119Z" fill="#A8947F"/>
    // <path id="Vector_2"  d="M55 88.5L28.7757 104C28.7699 100.008 30.1967 96.0282 32.8303 92.8264L9.00001 92.8265L9.00001 84.3271L32.9261 84.3271C30.2124 81.101 28.77 77.0573 28.7757 73L55 88.5Z" fill="#A8947F"/>
    // <path id="Vector_3"  d="M64.812 112.188L57.2287 141.692C54.4022 138.873 52.5966 135.05 52.1949 130.924L35.3443 147.774L29.3344 141.764L46.2527 124.846C42.0526 124.484 38.1733 122.644 35.3084 119.771L64.812 112.188Z" fill="#A8947F"/>
    // <path id="Vector_4"  d="M88.5 122L104 148.224C100.008 148.23 96.0282 146.803 92.8264 144.17L92.8265 168H84.3271V144.074C81.101 146.788 77.0573 148.23 73 148.224L88.5 122Z" fill="#A8947F"/>
    // <path id="Vector_5"  d="M112.188 112.188L141.692 119.771C138.873 122.598 135.05 124.403 130.924 124.805L147.774 141.656L141.764 147.666L124.846 130.747C124.484 134.947 122.644 138.827 119.771 141.692L112.188 112.188Z" fill="#A8947F"/>
    // <path id="Vector_6"  d="M122 88.5L148.224 73C148.23 76.9915 146.803 80.9718 144.17 84.1736L168 84.1735L168 92.6729L144.074 92.6729C146.788 95.899 148.23 99.9427 148.224 104L122 88.5Z" fill="#A8947F"/>
    // <path id="Vector_7"  d="M112.188 64.8119L119.771 35.3084C122.598 38.1267 124.403 41.95 124.805 46.0763L141.656 29.2257L147.666 35.2356L130.747 52.154C134.947 52.5163 138.827 54.3556 141.692 57.2287L112.188 64.8119Z" fill="#A8947F"/>
    // <path id="VectorN"   d="M88.5 55L73 28.7757C76.9915 28.7699 80.9718 30.1967 84.1736 32.8303L84.1735 9.00001H92.6729V32.9261C95.899 30.2124 99.9427 28.77 104 28.7757L88.5 55Z" fill="#A8947F"/>

    // <path id="Triangle"  d="M87.999 70.0009C89.1036 70.0929 93.2308 77.0078 97.1492 84.2345C100.912 91.1751 104.483 98.4032 104.998 100.151C105.298 101.167 70.9958 101.393 71 100.151C71.0076 97.9376 85.8337 69.8204 87.999 70.0009Z" fill="#687D61"/>
    // </g>
    // </svg>

  )
}