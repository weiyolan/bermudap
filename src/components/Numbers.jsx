import Section from "@/atoms/Section";
import H2 from "@/atoms/H2";
import Number from "./Number";
// import { currentLocale } from "next-i18n-router";
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import useGsap from "@/utils/useGsap";
import { useAppContext } from "@/utils/appContext";

export default function Numbers({ title, facts }) {
  // const locale = currentLocale();

  const ctx = useGsap()
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


  useEffect(() => {
    ctx.add(() => {
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
    })
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
