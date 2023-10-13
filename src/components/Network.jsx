import H2 from "@/atoms/H2";
import Section from "@/atoms/Section";
// import picture1 from "../../public/memberDefault1.jpg";
// import picture2 from "../../public/memberDefault2.jpg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useGsap from "@/utils/useGsap";
import FadeDiv from "@/atoms/FadeDiv";
import { useAppContext } from "@/utils/appContext";
import Member from "./Member";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
// let content = {};
import { gsap } from 'gsap/dist/gsap';
import { Observer } from 'gsap/dist/Observer';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PictureIndicator from "./PictureIndicator";
import { twMerge } from "tailwind-merge";
gsap.registerPlugin(Observer, ScrollTrigger);

export default function Network({ title, members }) {
  let ctx = useGsap()
  let { locale } = useAppContext();
  let [animating, setAnimating] = useState(false)
  let [visibleItem, setVisibleItem] = useState(initiateVisibility())


  useEffect(() => {
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    // FIRST LOAD
    if (visibleItem !== null) {
      let activeIndex = visibleItem.indexOf(true)
      let inFrontIndex = activeIndex === visibleItem.length - 1 ? 0 : activeIndex + 1
      let behindIndex = activeIndex === 0 ? visibleItem.length - 1 : activeIndex - 1
      // console.log(behindIndex)
      // console.log(activeIndex)
      ctx.add(() => {
        gsap.to(`.mainPicture-${activeIndex}`, {
          autoAlpha: 1,
          x: 0,
          xPercent: -50,

        })
        gsap.to(`.mainPicture-${inFrontIndex}`, {
          autoAlpha: 1,
          x: 0,
          xPercent: 70,
        })
        gsap.to(`.mainPicture-${behindIndex}`, {
          autoAlpha: 1,
          x: 0,
          xPercent: -170,
        })
      })
    }
  }, [])

  useEffect(() => {
    let observer = Observer.create({
      target: window,         // can be any element (selector text is fine)
      ignore: ".project-pictures, .project-grid, .imageFill",
      type: "touch, scroll, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onRight: () => {
        prevVisibility()
      },
      onLeft: () => {
        nextVisibility()
      },
      lockAxis: true,
    })
    return () => { observer.disable() }
  }, [visibleItem, animating])

  function initiateVisibility() {
    let visibility = new Array(members.length).fill(false)
    visibility[0] = true
    return visibility
  }


  function handleLinearVisibility(direction) {
    let xAmount = 30;
    let scaleAmount = 0.95;

    let currentIndex = visibleItem.indexOf(true);
    let inFrontIndex = currentIndex === visibleItem.length - 1 ? 0 : currentIndex + 1
    let behindIndex = currentIndex === 0 ? visibleItem.length - 1 : currentIndex - 1
    let nextIndex = direction === "next"
      ? currentIndex === visibleItem.length - 2 ? 0
        : currentIndex === visibleItem.length - 1 ? 1
          : currentIndex + 2
      : currentIndex === 0 ? visibleItem.length - 2
        : currentIndex === 1 ? visibleItem.length - 1
          : currentIndex - 2;

    let newVisibility = new Array(visibleItem.length).fill(false);
    newVisibility[direction === "next" ? inFrontIndex : behindIndex] = true;
    setVisibleItem(newVisibility)

    // if (nextIndex !== currentIndex) {

    ctx.add(() => {
      let tl = gsap.timeline({ autoRemoveChildren: true, onComplete: () => setAnimating(false) })
        .set(`.mainPicture-${nextIndex}`, {
          x: () => direction === 'next' ? `${xAmount}` : `-${xAmount}`,
          xPercent: () => direction === 'next' ? 70 : -170,
          scale: scaleAmount,
          // overwrite: true,
          // autoAlpha: 0,
        })
        .to(`.mainPicture-${nextIndex}`, {
          x: 0,
          xPercent: () => direction === 'next' ? 70 : -170,
          scale: 1,
          autoAlpha: 1,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
          // overwrite: true,
        }, 0.1)
        .to(`.mainPicture-${behindIndex}`,
          {
            x: () => direction === 'next' ? `-=${xAmount}` : 0,
            xPercent: () => direction === 'next' ? -170 : -50,
            scale: () => direction === 'next' ? scaleAmount : 1,
            autoAlpha: () => direction === 'next' ? 0 : 1,
            ease: 'expo.out',
            // ease:'power4.out',
            duration: 0.7,
            // overwrite: true,
          }, '<')
        .to(`.mainPicture-${inFrontIndex}`, {
          x: () => direction === 'prev' ? `+=${xAmount}` : 0,
          xPercent: () => direction === 'prev' ? 70 : -50,
          scale: () => direction === 'prev' ? scaleAmount : 1,
          autoAlpha: () => direction === 'prev' ? 0 : 1,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
          // overwrite: true,
        }, '<')
        .to(`.mainPicture-${currentIndex}`, {
          x: 0,
          xPercent: () => direction === 'next' ? -170 : 70,
          scale: 1,
          autoAlpha: 1,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
          // overwrite: true,
        }, '<')
    })
  }

  function handleVisibilityJump(newIndex) {
    let xAmount = 30;
    let scaleAmount = 0.95;

    let currentIndex = visibleItem.indexOf(true);
    let inFrontIndex = currentIndex === visibleItem.length - 1 ? 0 : currentIndex + 1
    let behindIndex = currentIndex === 0 ? visibleItem.length - 1 : currentIndex - 1
    let nextIndex = newIndex

    let jump = newIndex - currentIndex
    let direction;

    let newVisibility = new Array(visibleItem.length).fill(false);
    newVisibility[nextIndex] = true;
    setVisibleItem(newVisibility)

    switch (jump) {
      case 1:
        direction = 'next';
        break;
      case -1:
        direction = "prev";
        break;
      case 2:
        direction
    }

    ctx.add(() => {
      let tl = gsap.timeline({ autoRemoveChildren: true, onComplete: () => setAnimating(false) })
        .set(`.mainPicture-${nextIndex}`, {
          x: () => direction === 'next' ? `${xAmount}` : `-${xAmount}`,
          xPercent: () => direction === 'next' ? 70 : -170,
          scale: scaleAmount,
          // overwrite: true,
          // autoAlpha: 0,
        })
        .to(`.mainPicture-${behindIndex}`,
          {
            x: () => direction === 'next' ? `-=${xAmount}` : 0,
            xPercent: () => direction === 'next' ? -170 : -50,
            scale: () => direction === 'next' ? scaleAmount : 1,
            autoAlpha: () => direction === 'next' ? 0 : 1,
            ease: 'expo.out',
            // ease:'power4.out',
            duration: 0.7,
            // overwrite: true,
          }, '>+=0.1')
        .to(`.mainPicture-${currentIndex}`, {
          x: 0,
          xPercent: () => direction === 'next' ? -170 : 70,
          scale: 1,
          autoAlpha: 1,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
          // overwrite: true,
        }, '<')
        .to(`.mainPicture-${inFrontIndex}`, {
          x: () => direction === 'prev' ? `+=${xAmount}` : 0,
          xPercent: () => direction === 'prev' ? 70 : -50,
          scale: () => direction === 'prev' ? scaleAmount : 1,
          autoAlpha: () => direction === 'prev' ? 0 : 1,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
          // overwrite: true,
        }, '<')
        .to(`.mainPicture-${nextIndex}`, {
          x: 0,
          xPercent: () => direction === 'next' ? 70 : -170,
          scale: 1,
          autoAlpha: 1,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
          // overwrite: true,
        }, '<')
    })


  }

  function handleVisibility(direction) {
    if (typeof direction === 'string') {
      handleLinearVisibility(direction)
    } else if (typeof direction === 'number') {
      // handleJumpVisibility(direction)
      handleLinearVisibility('next')

    }
  }

  function nextVisibility() {
    if (animating && width < 1024) return;

    let currentIndex = visibleItem.indexOf(true);

    if (currentIndex === -1) {
    } else {
      // let nextIndex = currentIndex === visibleItem.length - 1 ? 0 : currentIndex + 1;
      handleVisibility('next')
    }
  }

  function prevVisibility() {
    if (animating && width < 1024) return;
    let currentIndex = visibleItem.indexOf(true);
    if (currentIndex === -1) {
    } else {
      // let nextIndex = currentIndex === 0 ? visibleItem.length - 1 : currentIndex - 1;
      handleVisibility('prev')
    }
  }

  // useEffect(() => {
  //   ctx.add(() => {
  //     gsap.from(['.networkAnimation'], {
  //       y: 30,
  //       autoAlpha: 0,
  //       stagger: { each: 0.10 },
  //       ease: 'expo.out',
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: '.networkAnimation',
  //         start: 'top 70%',
  //         // markers: true,
  //         // toggleActions: 'play none none reverse',
  //       }
  //     })
  //   })
  // }, [])

  return (
    <Section id='network' className='h-[25rem]'>
      <H2 className="text-center networkAnimation" text={title[locale]} />
      {/* <FadeDiv type="leftRight" className='max-w-full' amount={10} > */}
      <div className={`project-picture-container relative flex justify-between w-full h-[17rem] flex-1 select-none  `}>
        {members.length > 3 && <MyButton left className='' handleClick={prevVisibility} />}
        {members?.map((member, i) => (
          <Member
            index={i}
            name={member.name}
            key={member.name + i}
            alt={member.alt[locale]}
            // func={i}
            func={member.func[locale]}
            text={member.text[locale]}
            url={member.img}
            className={`mainPicture-${i} opacity-0 invisible `}
            visible={visibleItem[i]}
          />
        ))}

        {members.length > 3 && < MyButton className='' handleClick={nextVisibility} />
        }      </div>
      {members.length > 3 && <PictureIndicator handleVisibility={handleVisibility} visibleItem={visibleItem} />}

    </Section>
  );
}

function MyButton({ left, className, handleClick, ...props }) {

  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    myRef?.current !== undefined &&
      ctx.add(() => {
        let tl1 = gsap.timeline()
          .to([myRef.current], {
            duration: 0.5,
            scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
            transformOrigin: '50% 50%',
            ease: 'elastic.out(1, 0.5)',
            // ease: 'expo.out',
          }, 0)
          .to(myRef.current, {
            borderColor: active ? '#6E422166' : '#6E422111',
            backgroundColor: hovering ? '#BD915919' : active ? '#BD915909' : '#BD915909',
            // boxShadow: active ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            duration: 0.5,
            ease: 'expo.out',
          }, 0)
      });
  }, [hovering, clicking, active]);

  return (
    <button
      ref={myRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setClicking(false);
      }}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      // onFocus={() => setActive(true)}
      onClick={() => { setActive(!active); handleClick() }}
      onBlur={() => setActive(false)}
      tabIndex='0'
      {...props}
      className={twMerge('group flex rounded-md items-center justify-center bg-[#BD915909] my-auto cursor-pointer relative w-24 h-24 lg:pt-1 z-[1]', className)}>
      <AiFillCaretLeft className={`opacity-40 group-hover:opacity-100 fill-brown transition-opacity duration-300 w-10 h-10 ${left ? '' : 'rotate-180'} `} />
    </button>
  )
}