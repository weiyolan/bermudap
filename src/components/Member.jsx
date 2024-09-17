import useGsap from "@/utils/useGsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap/dist/gsap';

export default function Member({ url, name, func, text, alt, print, className, index, }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  const myImgContainer = useRef();
  const myImg = useRef();
  const myText = useRef();
  // const myRef = useRef();
  // let options ={print:print}
  let ctx = useGsap();

  useEffect(() => {
    myImg?.current !== undefined &&
      ctx.add(() => {
        gsap.to(myRef.current, {
          duration: 1,
          scale: hovering ? (clicking ? 1.02 : 1.05) : 1,
          transformOrigin: "50% 50%",
          ease: "elastic.out(1, 0.5)",
        });
      });

    ctx.add(() => {
      gsap.to(myImgContainer.current, {
        duration: 0.5,
        opacity: active ? 0 : 1,
        // delay: active ? 0 : 0.2,
        ease: "power3.out",
      });
    });

    ctx.add(() => {
      gsap.to(myText.current, {
        duration: 0.5,
        opacity: active ? 1 : 0,
        // delay: active ? 0.2 : 0,
        ease: "power3.out",
      });
    });
  }, [hovering, clicking, active]);

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
      onBlur={() => setActive(false)}
      onClick={() => {
        setActive(!active);
      }}
      onKeyDown={(e) => e.key === 'Enter' && setActive(!active)}
      tabIndex="0"
      className={` flex flex-1  relative md:absolute cursor-pointer flex-col  w-32  md:w-48 items-center mt-2 select-none md:left-1/2 md:top-0 md:-translate-x-1/2 ${className}`}
    >

      <div ref={myImgContainer} className="relative mb-2 select-none h-32 md:h-48 w-32  md:w-48  overflow-hidden bg-brown rounded-full ">
        <Image
          ref={myImg}
          alt={alt}
          src={url}
          fill
          className="memberImage object-cover select-none"
          // width={200}
          // height={200}
          sizes="25vw"
        />
      </div>
      <p ref={myText} className="absolute italic opacity-0 top-1/3 select-text -translate-y-1/2 text-sm w-full text-center font-raj font-light" >
        {'"'}{text}{'"'}
      </p>

      <h3 className="font-bel text-xl font-semibold">{name}</h3>
      <h4 className="font-raj text-base font-normal text-center">{func}</h4>
    </div>
  );
}
