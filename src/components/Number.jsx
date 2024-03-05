import ArrowLink from "@/atoms/ArrowLink";
import { twMerge } from "tailwind-merge";
// import useGsap from "@/utils/useGsap";
// import { gsap } from 'gsap/dist/gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { useEffect, useRef } from "react";
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

export default function Number({ n, title, text, link, unit, className }) {

  return (
    <div className={twMerge("mx-auto flex w-full max-w-prose flex-1 flex-col items-center gap-2 whitespace-pre-wrap text-center",className)}>
      <p className="factNumber text-primary mb-2 flex cursor-default items-end justify-start font-bel text-6xl font-light  sm:mb-4  sm:justify-center sm:text-8xl sm:font-extralight md:text-9xl">
        {n}
        <span className="text-2xl sm:text-3xl ">{unit}</span>
      </p>
      <p className={`font-raj text-lg font-medium uppercase`}>{title}</p>
      <p className={`max-w-[90%] font-raj font-normal `}>{text}</p>
      <ArrowLink className={'font-bel'}
        title={"Visit the fact's source"}
        text="Source"
        to={link}
        ext={true}
      />
    </div>
  );
}
