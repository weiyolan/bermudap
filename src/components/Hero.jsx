import Image from "next/image";
// import picture from "../../public/eventHero.jpg";
// import Logo from "../atoms/Logo";
import LogoText from "@/atoms/LogoText";
import { gsap } from 'gsap/dist/gsap';
import { useEffect, useRef, useState } from 'react';
import useGsap from '@/utils/useGsap';
// import LogoTextAnim from "@/atoms/LogoTextAnim";
// import LogoAnim from "@/atoms/LogoAnim";
import LogoAnimMain from "@/atoms/LogoAnimMain";
import Logo from "@/atoms/Logo";
// import { useLenis } from "@studio-freight/react-lenis";

export default function Hero({ alt, imgUrl }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const myRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    myRef?.current !== undefined &&
      ctx.add(() => {
        // gsap.to(myRef.current, {
        //   duration: 0.5,
        //   scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
        //   transformOrigin: '50% 50%',
        //   ease: 'elastic.out(1, 0.5)',
        //   // ease: 'expo.out',
        // });
        loaded && gsap.to(['.bermudaLogoTextLetter'], {
          duration: 1,
          autoAlpha: 1,
          stagger: 0.05,
          ease: 'ease.out',
        });
      });
  }, [hovering, clicking, active, loaded]);

  return (
    <div className="relative w-full overflow-hidden select-none h-screen flex flex-col justify-center items-center">
      <div className="w-full h-screen absolute bg-lightbrown">
        <Image
          src={imgUrl}
          priority
          className="object-cover object-top"
          fill
          alt={alt}
          onLoadingComplete={() => { setLoaded(true) }}
        />
      </div>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setClicking(false);
        }}
        onMouseDown={() => setClicking(true)}
        onMouseUp={() => setClicking(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        tabIndex='0'
        className="w-2/3 h-1/4  md:w-[20%] md:h-[20%] blur-[50px] md:blur-[100px] absolute border-debug bg-white/80 center-center -translate-y-[40%]" />
      <div ref={myRef}>
        {/* <Logo className={`w-36 h-36 fill-white absolute `} /> */}
        <LogoAnimMain loaded={loaded} color className={`w-36 h-36`} />
      </div>
      <LogoText color className={`relative mt-2 w-4/5 md:w-1/4 cursor-pointer`} textClassName={'bermudaLogoTextLetter opacity-0 '} />
    </div>
  );
}
