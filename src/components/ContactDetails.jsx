import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// import useLayoutEffect from '@utils/useIsomorphicLayoutEffect'

import { useEffect, useRef } from "react";
import H2 from "@/atoms/H2";
import ArrowLink from "@/atoms/ArrowLink";
import LayoutSplit from "@/atoms/LayoutSplit";
import ContactB from "@/atoms/ContactB";
// import { currentLocale } from 'next-i18n-router';
import AccentTitle from "@/atoms/AccentTitle";
import Section from "@/atoms/Section";
import Image from "next/image";
import useGsap from "@/utils/useGsap";

gsap.registerPlugin(ScrollTrigger);

let mailLinkEnd =
  "?subject=Project%20Idea&body=Hi%2C%0A%0AI%20have%20a%20fun%20project%20in%20mind.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A";



export default function ContactDetails({ title, text, alt, imgUrl, companyName, address1, address2, country, email, vat, phone }) {
  let tl = useRef(null);

  let ctx = useGsap()

  useEffect(() => {
    ctx.add(() => {
      // gsap.set(['.featureCard'], {
      //   autoAlpha: 0,
      //   // stagger:0,
      //   y: 30,
      // })
      gsap.from(['.contactAnimation'], {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.1 },
        ease: 'expo.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.contactAnimationTitle',
          start: 'top 70%',
          // markers: true,
          // toggleActions: 'play none none reverse',
        }
      })
    })
  }, [])

  // const locale = useCurrentLocale(i18nConfig);

  // const locale = currentLocale();
  // useLayoutEffect(() => {
  //   ctx.current = gsap.context(() => {
  //     tl.current = gsap.timeline()
  //       .from('.contactAnimation', { opacity: 0, duration: 1, ease: 'bounce', stagger: 0.1 })
  //   }, '.contact-parent')
  //   return () => ctx.current.revert()
  // }, [])

  // console.log(contactDetails.image)
  return (
    <Section>
      <LayoutSplit right className={`md:mt-36 items-center flex-col-reverse`}>
        {/* <SanityImage move style={{ objectPosition: 'top' }} containerClass='w-[46vw] -mt-6 xs:mt-0 xs:w-2/5 min-h-[40vh] xs:min-h-0 xs:h-56 bottom-0 xs:top-14 right-0 xs:right-4 sm:top-0 sm:right-0 sm:relative sm:h-full sm:w-full contact-image0 opacity-0'
        priority absolute={false} fill image={contactDetails.image.image.asset} alt={contactDetails.image.alt[locale]} /> */}

        <div className="h-48 md:h-96 w-full my-auto overflow-hidden rounded-xl shadow-lg relative contactAnimation">
          <Image priority src={imgUrl} alt={alt} fill sizes="45vw" className="object-cover" />
        </div>
        <div
          id="contactSection"
          className="contact-parent relative flex w-full flex-col md:py-6 lg:py-12"
        >
          <H2 text={title} left className={'contactAnimation contactAnimationTitle'} />
          {/* <H2 child='contact' mainTitle={contactDetails.title[locale]} SubTitle='' left /> */}
          <p className="contactAnimation text-justify font-raj text-sm font-medium first-letter:font-bel first-letter:text-3xl mobm:text-base max-w-prose sm:w-auto">
            {/* {contactDetails.text[locale]} */}
            {text}
          </p>

          <div className="font-pop mt-4 flex flex-col gap-6 xs:flex-row">
            <div className="flex-1 flex-col ">
              <AccentTitle
                text="Address"
                className={"contactAnimation mb-0 mt-0"}
              />
              <p className="contactAnimation whitespace-pre">
                {`${companyName}\n${address1}\n${address2}\n${country}`}
                {/* {`miloweiler.com
                Hof Savelkoul 40
                2640 Mortsel
                Belgium`} */}
              </p>
            </div>
            <div className="flex-1 flex-col ">
              <AccentTitle
                text="Details"
                className={"contactAnimation mb-0 mt-0"}
              />
              <p className="font-pop contactAnimation w-fit">
                {`TVA: ${vat}`}
              </p>
              <ArrowLink
                className={"contactAnimation"}
                inText
                text={email}
                to={`mailto:${email}${mailLinkEnd}`}
                ext
                tabIndex="0"
              />
              <ArrowLink
                className={"contactAnimation"}
                inText
                text={phone}
                to={`tel:${phone}`}
                tabIndex="0"
              />
              <ContactB phone={phone} email={email} className={"contactAnimation mt-4 sm:mt-2"} />
            </div>
          </div>
        </div>
      </LayoutSplit>
    </Section>
  );
}
