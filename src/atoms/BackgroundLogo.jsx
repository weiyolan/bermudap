import Logo from "./Logo";
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useGsap from "@/utils/useGsap";
gsap.registerPlugin(ScrollTrigger);

export default function BackgroundLogo() {
  const myRef = useRef();
  let ctx = useGsap();

  useEffect(() => {

    function scrubLogo() {
      let tl = gsap.timeline()
        .to(myRef.current, {
          yPercent: -40,
          duration: 100,
        }, 0)
      return tl
    }

    myRef?.current !== undefined &&
      ctx.add(() => {
        // let animation = scrubIntro().add(scrubScreen1(), 0).paused(true).progress(0);
        let animation = scrubLogo().paused(true).progress(0);
        gsap.to(animation,
          {
            progress: 1,
            ease: 'none',
            scrollTrigger: {
              id: 'backgroundLogo',
              // start: () => 'bottom +=100vh',
              // end: 'end',
              // end: () => `+=${0.79 * screenHeight}px`,
              scrub: 5,
              markers: false,
              // overwrite: true,
              // preventOverlaps: true,
            },
            // onStart: () => { gsap.getById('scrollDown')?.pause() }
          });
      });
  }, []);

  return (
    <div ref={myRef}
      className="z-0 fixed w-[60vw] h-[60vw] top-[5%] right-0" >
      <Logo id={'backgroundLogo'} className={`w-full h-fit relative opacity-5`} color />
    </div>
  )
}