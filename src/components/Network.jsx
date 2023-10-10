import H2 from "@/atoms/H2";
import Section from "@/atoms/Section";
// import picture1 from "../../public/memberDefault1.jpg";
// import picture2 from "../../public/memberDefault2.jpg";
import Image from "next/image";
import { gsap } from "gsap/dist/gsap";
import { useEffect, useRef, useState } from "react";
import useGsap from "@/utils/useGsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FadeDiv from "@/atoms/FadeDiv";
import { useAppContext } from "@/utils/appContext";
gsap.registerPlugin(ScrollTrigger);
// let content = {};

export default function Network({ title, members }) {
  let ctx = useGsap()
  let { locale } = useAppContext();

  useEffect(() => {
    ctx.add(() => {

      gsap.from(['.networkAnimation'], {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.10 },
        ease: 'expo.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.networkAnimation',
          start: 'top 70%',
          // markers: true,
          // toggleActions: 'play none none reverse',
        }
      })
    })
  }, [])
  // console.log(members)
  return (
    <Section id='network'>
      <H2 className="text-center networkAnimation" text={title[locale]} />
      <FadeDiv type="leftRight" className='max-w-full' amount={10} >
        <div className="flex w-fit gap-24 py-4 pl-[10%] pr-[20%] max-w-[99vw] overflow-y-hidden no-scrollbar">
          {members?.map((member, i) => (
            <Member
              name={member.name}
              key={member.name + i}
              alt={member.alt[locale]}
              func={member.func[locale]}
              text={member.text[locale]}
              url={member.img}
            // print={i===0}
            />
          ))}
          {members?.map((member, i) => (
            <Member
              name={member.name}
              key={member.name + i}
              alt={member.alt[locale]}
              func={member.func[locale]}
              text={member.text[locale]}
              url={member.img}
            // print={i===0}
            />
          ))}
          {members?.map((member, i) => (
            <Member
              name={member.name}
              key={member.name + i}
              alt={member.alt[locale]}
              func={member.func[locale]}
              text={member.text[locale]}
              url={member.img}
            // print={i===0}
            />
          ))}
          {/* <Member url={undefined} name={"Robin"} func={"Founder"} />
        <Member url={undefined} name={"Robin"} func={"Founder"} />
        <Member url={undefined} name={"Robin"} func={"Founder"} /> */}
        </div>
      </FadeDiv>
    </Section>
  );
}

function Member({ url, name, func, text, alt, print }) {
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
      tabIndex="0"
      className="relative flex cursor-pointer flex-col items-center mt-2 networkAnimation"
    >
      <div
        ref={myImgContainer}
        className="relative mb-2 select-none h-48 w-48 overflow-hidden bg-brown rounded-full "
      >
        <Image
          ref={myImg}
          alt={alt}
          src={url}
          fill
          className="memberImage object-cover"
          // width={200}
          // height={200}
          sizes="25vw"
        />
      </div>
      <p
        ref={myText}
        className="absolute italic opacity-0 top-1/3 -translate-y-1/2  w-full text-center font-raj font-medium"
      >
        {'"'}{text}{'"'}
      </p>

      <h3 className="font-bel text-xl font-semibold">{name}</h3>
      <h4 className="font-raj text-lg font-medium">{func}</h4>
    </div>
  );
}
