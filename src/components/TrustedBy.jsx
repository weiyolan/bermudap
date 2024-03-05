// import AccentTitle from "@/atoms/AccentTitle";
// import client from 'lib/sanity';
// import { useNextSanityImage } from "next-sanity-image";
// import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { usePageContext } from '@/utils/pageContext';
// import useLayoutEffect from "@utils/useIsomorphicLayoutEffect";
// import { useAppContext } from '@/utils/appContext';
// import Link from "next/link";
import Section from "@/atoms/Section";
import LayoutSplit from "@/atoms/LayoutSplit";
// import Line from "@/atoms/Line";
import H2 from "@/atoms/H2";
import TrustedLogo from "./TrustedLogo";
import useGsap from "@/utils/useGsap";
// import useLocale from "@/utils/useLocale";

gsap.registerPlugin(ScrollTrigger);

export default function TrustedBy({ title, partners, className }) {
  // const { ctx, tl } = usePageContext()
  let tl = useRef(null);
  let trusted = useRef();

  let ctx = useGsap()

  useEffect(() => {
    ctx.add(() => {
      // gsap.set(['.featureCard'], {
      //   autoAlpha: 0,
      //   // stagger:0,
      //   y: 30,
      // })
      gsap.to(['.trustedAnimation'], {
        y: 0,
        autoAlpha: 1,
        stagger: { each: 0.1 },
        ease: 'expo.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.trustedAnimation',
          start: 'top 80%',
          // markers: true,
          // toggleActions: 'play none none reverse',
        }
      })
    })
  }, [])

  // let { width } = useAppContext()
  // let width = window?.innerWidth;

  // useLayoutEffect(() => {
  //   ctx.current = gsap.context(() => {
  //     tl.current = gsap.timeline({ scrollTrigger: { trigger: trusted.current, start: `top ${width < 668 ? '85%' : '50%'}`, invalidateOnRefresh: true, markers: false } })
  //       .to('.artist-title', { opacity: 1, duration: 1 })
  //       .to('.artist-line', { width: 224, duration: 0.8, }, '<')
  //       .to('.logo-artist', {
  //         opacity: 1, duration: 0.7, ease: 'back', stagger: 0.2,
  //       }, '-=1')
  //       .to('.company-title', { opacity: 1, duration: 1 }, '-=1.5')
  //       .to('.company-line', { width: 224, duration: 0.8, }, '<')
  //       .to('.logo-company', {
  //         opacity: 1, duration: 0.7, ease: 'back', stagger: 0.2,
  //       }, '-=1')
  //   }, '.trusted-by')
  //   return () => ctx.current.revert()
  // }, [width])

  // let totalLogoAmount = trustedBy.artists.length + trustedBy.companies.length

  // function getSpeed(i, company) {
  //   if (width < 648) {
  //     return (1 - 0.05 * (totalLogoAmount - i - (company ? trustedBy.artists.length : 0)) / totalLogoAmount)
  //   } else if (width > 648) {
  //     let length = company ? trustedBy.companies.length - 1 : trustedBy.artists.length - 1;
  //     let ratio = (i - length / 2) / (length / 2);
  //     return (1 - 0.1 * ratio)
  //   }
  // }

  // function getDirection(i, company) {
  //   if (width < 648) {
  //     return (i % 2 === 0 ? -1 : 1)
  //   } else if (width > 648) {
  //     return 1
  //   }
  // }

  return (
    <Section className={className}>
      <LayoutSplit center>
        <div
          ref={trusted}
          className="trusted-by trusted-by-div relative w-full text-center"
        >
          <H2 className="trustedAnimation translate-y-[30px] invisible opacity-1 title mx-auto max-w-[70%]" text={title} />
          <div className="artist-container flex flex-wrap justify-center gap-8 md:gap-12 sm:flex-nowrap sm:gap-6 lg:gap-12">
            {partners.map((logo, i) => {
              // console.log(logo.meta);
              return (<TrustedLogo
                className="trustedAnimation translate-y-[30px] invisible"
                key={i}
                link={logo.link}
                name={logo.name}
                imgUrl={logo.imgUrl}
                // width={logo.meta.width}
                // height={logo.meta.height}
                ar={logo.meta.aspectRatio}
              />)
            }
            )}
            {/* {trustedBy.artists.map((logo, i) => { return <Logo dataDirection={getDirection(i)} dataSpeed={`${getSpeed(i)}`} type='artist' logo={logo} key={i} to={logo.link} /> })} */}
          </div>
        </div>
      </LayoutSplit>
    </Section>
  );
}

