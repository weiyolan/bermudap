import Button from "@/atoms/Button";
import H2 from "@/atoms/H2";
import LayoutSplit from "@/atoms/LayoutSplit";
import Section from "@/atoms/Section";
import Image from "next/image";
// import picture from "../../public/eventAbout.jpg";
import useGsap from "@/utils/useGsap";
// import { currentLocale } from "next-i18n-router";

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";
import { useAppContext } from "@/utils/appContext";
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ alt, imgUrl, text, title, button }) {
  let ctx = useGsap()

  let { locale } = useAppContext();

  useEffect(() => {
    ctx.add(() => {

      gsap.from(['.aboutAnimation'], {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.1 },
        ease: 'expo.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.aboutAnimation',
          start: 'top 70%',
          // markers: true,
          // toggleActions: 'play none none reverse',
        }
      })
    })
  }, [])

  return (
    <Section id={"about"} className="scroll-m-24">
      <H2 text={title} className={'text-left aboutAnimation'} />
      <LayoutSplit right className={""}>
        <div className="h-96  w-full rounded-xl select-none overflow-hidden relative shadow-lg aboutAnimation">
          <Image alt={alt} className="object-cover" src={imgUrl} fill sizes='50vw' />
        </div>
        <div className="flex h-full w-fit flex-col justify-center gap-4 sm:gap-8">
          {/* <H2 text={title} className={"mb-0 sm:mb-0 text-left "} /> */}
          <p className="max-w-prose font-raj font-medium text first-letter:text-3xl aboutAnimation">
            {text}
          </p>
          <Button
            text={button.text[locale]}
            to={button.url}
            className={"aboutAnimation"}
          ></Button>
        </div>
      </LayoutSplit>
    </Section>
  );
}
