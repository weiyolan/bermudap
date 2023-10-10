import H2 from "@/atoms/H2";
import Section from "@/atoms/Section";
// import Logo from "../atoms/Logo";
import { gsap } from 'gsap/dist/gsap';
import { useEffect } from 'react';
import useGsap from '@/utils/useGsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Feature from "./Feature";
import { useAppContext } from "@/utils/appContext";

// import useLayoutEffect from "@utils/useIsomorphicLayoutEffect"

// import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
// import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger);

// import { currentLocale } from "next-i18n-router";
let colors = [
  "text-browndark fill-browndark",
  "text-brownlight fill-brownlight",
  "text-brown fill-brown",
];

export default function Features({ title, values }) {
  let { locale } = useAppContext();

  let ctx = useGsap()

  useEffect(() => {
    ctx.add(() => {
      // gsap.set(['.featureCard'], {
      //   autoAlpha: 0,
      //   // stagger:0,
      //   y: 30,
      // })
      gsap.from(['.featureCard'], {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.1 },
        ease: 'expo.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.featureCard',
          start: 'top 70%',
          // markers: true,
          // toggleActions: 'play none none reverse',
        }
      })
    })
  }, [])


  return (
    <Section id={'features'}>
      <div className="">
        <H2 className={`text-center featureCard`} text={title} />
        <div className=" flex justify-center gap-8 px-8 pt-6">
          {values.map((val, i) => (
            <Feature
              title={val.title?.[locale]}
              text={val.text?.[locale]}
              subTitle={val.subTitle?.[locale]}
              key={i}
              myKey={i}
              className={colors[i]}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}


