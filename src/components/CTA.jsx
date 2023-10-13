import Button from "@/atoms/Button";
import Section from "@/atoms/Section";
import Line from "@/atoms/Line";
import { gsap } from "gsap/dist/gsap";
import { useEffect, useRef, useState } from "react";
import useGsap from "@/utils/useGsap";

export default function CTA({ text }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
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
        width: hovering ? "99vw" : 0,
        // ease: "none",
        ease: "expo.out",
        // borderColor:hovering ? "#667D61FF" : "#667D6100",
        // borderWidth: hovering?2:1,
      });
    });
  }, [hovering, clicking, active]);


  useEffect(() => {
    function makeHover(e) {
      // console.log(e.y, myRef?.current.getBoundingClientRect().top)
      if (e.y > myRef?.current?.getBoundingClientRect().top) {
        !hovering && setHovering(true)
      } else {
        hovering && setHovering(false)
      }
    }

    window.addEventListener('mousemove', makeHover)
    return () => window.removeEventListener('mousemove', makeHover)

  }, [hovering])

  return (

    <Section
      ref={myRef}
      // onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        // setHovering(false);
        setClicking(false);
      }}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
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
