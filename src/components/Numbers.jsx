import Section from "@/atoms/Section";
import H2 from "@/atoms/H2";
import Number from "./Number";
// import { currentLocale } from "next-i18n-router";
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useAppContext } from "@/utils/appContext";

export default function Numbers({ title, facts }) {
  // const locale = currentLocale();

  let { locale } = useAppContext();

  // useEffect(() => {
  //   ctx.add(() => {
  //     gsap.from(['.factNumber'], {
  //       innerHTML: '0',
  //       duration: 1,
  //       stagger:0.2,
  //       onUpdate: function () {
  //         this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
  //       },
  //     })
  //   })
  // }, [])



  let mm = gsap.matchMedia()

  useEffect(() => {
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (ctx) => {
      let { isDesktop, isMobile, reduceMotion } = ctx.conditions
      isDesktop && ctx.add(() => {
        gsap.from(['.factAnimation'], {
          y: 30,
          autoAlpha: 0,
          stagger: { each: 0.1 },
          ease: 'expo.out',
          // ease: 'back',
          duration: 0.8,
          scrollTrigger: {
            trigger: '.factAnimation',
            start: 'top 70%',
            // markers: true,
            // invalidateOnRefresh: true,
            // toggleActions: 'play none none reverse',
          }
        })
      });

      isMobile && ctx.add(() => {
        gsap.utils.toArray(".factAnimation").forEach(card => {
          gsap.from(card, {
            y: 30,
            autoAlpha: 0,
            ease: 'expo.out',
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          })
        })
      })

    })
    return () => mm.revert()
  }, [])

  return (
    <Section id='facts' className={""}>
      <H2 text={title} className={"text-center factAnimation"}></H2>
      <div className="flex flex-col md:flex-row w-full gap-5 px-2 md:gap-10 md:px-5">
        {facts?.map((fact, i) => {
          return (
            <Number className={`factAnimation`} key={i} n={fact?.number} unit={fact?.unit} link={fact?.url} title={fact?.title?.[locale]} text={fact?.text?.[locale]}
            />
          );
        })}
      </div>
    </Section>
  );
}
