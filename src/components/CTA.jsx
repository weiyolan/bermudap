import Button from "@/atoms/Button";
import Section from "@/atoms/Section";
import Line from "@/atoms/Line";
import { useEffect, useRef, useState } from "react";
import useGsap from "@/utils/useGsap";
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function CTA({ text }) {
  // let [hovering, setHovering] = useState(false);
  // let [clicking, setClicking] = useState(false);
  // let [active, setActive] = useState(false);
  const myRef = useRef();
  let ctx = useGsap();
  // let ctx = useGsap();

  useEffect(() => {
    // myRef?.current !== undefined &&
    ctx.add(() => {
      // let animation = gsap.timeline()
      // gsap.to([".ctaLines"], {
      //   // borderColor: hovering ? "#667D61FF" : "#667D6100",
      //   duration: 0.1,
      //   id: 'lineOpacity',
      //   ease: "none",
      //   delay: hovering ? 0 : 0.8,
      //   overwrite: true,
      // });
      gsap.to([".ctaLines"], {
        duration: 1,
        id: 'lineWidth',
        width: "99vw",
        // ease: "none",
        ease: "expo.out",
        scrollTrigger: {
          trigger: '.ctaLines',
          start: "top 65%",
          // markers: true,
          toggleActions: 'play none none reverse'
        }
        // borderColor:hovering ? "#667D61FF" : "#667D6100",
        // borderWidth: hovering?2:1,
      });
    });
  }, []);


  // useEffect(() => {
  //   function makeHover(e) {
  //     // console.log(e.y, myRef?.current.getBoundingClientRect().top)
  //     if (e.y > myRef?.current?.getBoundingClientRect().top) {
  //       !hovering && setHovering(true)
  //     } else {
  //       hovering && setHovering(false)
  //     }
  //   }

  //   //  REQUEST ANIMATION FRAME EXAMPLE !!!
  //   // let lastKnownScrollPosition = 0;
  //   // let ticking = false;

  //   // function doSomething(scrollPos) {
  //   //   // Do something with the scroll position
  //   // }

  //   // document.addEventListener("scroll", (event) => {
  //   //   lastKnownScrollPosition = window.scrollY;

  //   //   if (!ticking) {
  //   //     window.requestAnimationFrame(() => {
  //   //       doSomething(lastKnownScrollPosition);
  //   //       ticking = false;
  //   //     });

  //   //     ticking = true;
  //   //   }
  //   // });

  //   window.addEventListener('mousemove', makeHover)
  //   return () => window.removeEventListener('mousemove', makeHover)

  // }, [hovering])

  return (

    <Section
      ref={myRef}
      // onMouseEnter={() => setHovering(true)}
      // onMouseLeave={() => {
        // setHovering(false);
      // setClicking(false);
      // }}
      // onMouseDown={() => setClicking(true)}
      // onMouseUp={() => setClicking(false)}
      // onFocus={() => setActive(true)}
      // onBlur={() => setActive(false)}
      // tabIndex="0"
      className={"flex flex-col items-center gap-5 md:gap-10 h-fit py-1  "}
    >
      <Line className={"ctaLines w-0 bg-gradient-to-r h-1 from-browndark via-brown to-green"} />
      <Button className={`text-xl md:text-2xl`} text={text} to={"/contact#form"} />
      <Line className={"ctaLines w-0 bg-gradient-to-r h-1  from-browndark via-brown to-green"} />
      {/* <Line /> */}
    </Section>
  );
}
