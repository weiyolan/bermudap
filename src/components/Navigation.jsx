import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { Observer } from "gsap/dist/Observer";
import Line from "@/atoms/Line";
import { usePathname } from "next/navigation";
// import Logo from "../atoms/Logo";
import Button from "@/atoms/Button";
import LogoText from "@/atoms/LogoText";
import LogoAnim from "@/atoms/LogoAnim";
import { useAppContext } from "@/utils/appContext";
import LanguageToggleDesk from "@/atoms/LanguageToggleDesk";
import ButtonComp from "@/atoms/ButtonComp";



gsap.registerPlugin(Observer);



export default function Navigation({ links, cta, controlledUnhide }) {
  let { locale } = useAppContext();
  // let { darkMode } = usePageContext()
  let [hiding, setHiding] = useState(false); //removed bar onLoad and then animate in.
  let [big, setBig] = useState(true);
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  const myRef = useRef();


  const ctx = useRef(gsap.context(() => { }));


  useEffect(() => {
    // setHiding(controlledUnhide ? controlledUnhide : false)
    return () => {
      ctx.current.revert();
    };
  }, []);

  useEffect(() => {
    setHiding(controlledUnhide ? controlledUnhide : false)

  }, [controlledUnhide]);

  // useEffect(() => {
  //   setHiding(controlledHide ? controlledHide : false);

  // }, [controlledHide])

  // useEffect(() => {
  //   setHiding(controlledHide);

  // }, [controlledHide]);

  function hideBar() {
    if (!hiding) {
      setHiding(true);
    }
  }

  function showBar() {
    if (hiding) {
      setHiding(false);
    }
  }

  useEffect(() => {
    let observer1 = Observer.create({
      target: window, // can be any element (selector text is fine)
      type: "scroll", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onStopDelay: 1.5,
      tolerance: 30,
      onDown: () => {
        hideBar();
      },
      // onUp: () => {
      //   showBar();
      // },
      lockAxis: true,
    });

    let observer2 = Observer.create({
      target: window, // can be any element (selector text is fine)
      type: "scroll", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onStopDelay: 1.5,
      tolerance: 10,
      // onDown: () => {
      //   hideBar();
      // },
      onUp: () => {
        showBar();
      },
      lockAxis: true,
    });
    return () => {
      observer1.disable();
      observer2.disable();
    };
  }, [hiding]);

  function handleMouseMove(e) {
    if (e.y <= 60) {
      // console.log(e.y)
      showBar();
    }
  }

  function handleScroll() {
    if (window.scrollY < 100) {
      // console.log(e.y)
      !big && setBig(true);
    } else {
      // console.log(e.y)
      big && setBig(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseMove", handleMouseMove);
    };
  }, [big]);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(".navBar", {
        autoAlpha: () => (hiding ? 0 : 1),
        // y: '0%',
        yPercent: () => (hiding ? -100 : 0),
        duration: 0.5,
        padding: big ? '4 16' : "0 16 0 0",
        transformOrigin: "50% 50%",
        ease: "expo.out",
        // backgroundColor: big?'#BD9159':'#BD9159AA',
        delay: () => (hiding ? 0 : 0),
      });
      gsap.to(".navLogo", {
        scale: big ? 1 : 0.7,
        duration: 0.2,
        transformOrigin: "50% 50%",
        // ease: "elastic.out(1, 0.5)",
        ease: "expo.out",
        // delay: () => big ? 0 : 0,
      });
      gsap.to(".navLogoText", {
        autoAlpha: big ? 1 : 0,
        duration: 0.2,
        display: big ? 'block' : 'none',
        // ease: "elastic.out(1, 0.5)",
        ease: "ease.out",
        // delay: () => big ? 0 : 0,
      });
      gsap.to(".navList", {
        gap: big ? 40 : 30,
        fontSize: big ? "1.125rem" : "1rem",
        duration: 0.2,
        // ease: "elastic.out(1, 0.5)",
        ease: "ease.out",
        // delay: () => big ? 0 : 0,
      });
      gsap.to(".navLogoLink", {
        // gap: big ? 60 : 40,
        // fontSize: big ? "1.25rem" : "1.15rem",
        scale: hovering ? 1.05 : 1,
        duration: 0.5,
        // ease: "elastic.out(1, 0.5)",f
        ease: "elastic.out(1, 0.5)",
        // delay: () => big ? 0 : 0,
      });

      gsap.to(myRef.current, {
        duration: 0.5,
        scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
        transformOrigin: '50% 50%',
        // ease: 'elastic.out(1, 0.5)',
        ease: 'expo.out',
      });
    });
  }, [hiding, big, hovering, clicking]);


  return (
    // <FadeDiv className='w-full relative'>
    // <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full top-0 justify-center flex navBar  `} type={'leftRight'} amount={30}>
    <div id='navigationBar' key='navigationBar'
      className={`navBar shadow-lg fixed top-0 z-[100] -translate-y-full md:translate-y-0 px-4 py-1 w-full bg-brown `}
    >
      <div className="max-w-[1600px] flex w-full justify-between items-center text-lg mx-auto">
      <Link href="/"
        ref={myRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setClicking(false);
        }}
        onMouseDown={() => setClicking(true)}
        onMouseUp={() => setClicking(false)}
        // onFocus={() => setActive(true)}
        // onBlur={() => setActive(false)}
        tabIndex='0'
        className="relative navLogoLink cursor-pointer flex w-fit gap-6 h-16">
        <LogoAnim hovering={hovering} className={"fill-white relative my-auto navLogo w-16 h-16"} />
        <LogoText className={"relative navLogoText w-36 h-16 my-auto"} />
      </Link>

      <ul
        className={`navList relative inline-flex  items-center gap-[40px]  `}
      >
        {links.map((button, i) => (
          <MyButton
            key={i}
            text={button.text?.[locale]}
            to={button.url}
            ext={button.ext}
          />
        ))}
        <li
          className={` `}
        >
          <ButtonComp>
            <LanguageToggleDesk />
          </ButtonComp>
        </li>

        <li className="list-none">
          <Button
            text={cta}
            to="contact/#form"
            className={
              "relative rounded-md bg-white fill-brown  px-4 py-1 font-bold text-brown shadow-sm hover:shadow-md"
            }
          />
        </li>
      </ul>
    </div>
    </div>
    // {/* // </FadeDiv> */ }
  );
}

function MyButton({ text, to, className, ext }) {
  // let { darkMode } = usePageContext()
  let darkMode = true;
  const pathname = usePathname();
  let [hover, setHover] = useState(false);
  // let [selected, setSelected] = useState(false)
  let selected = to === pathname;

  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    // setLoaded(true)
    return () => {
      ctx.current.revert();
    };
  }, []);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(`.navButton${text.slice(0, 3)}`, {
        scale: hover ? 1.1 : 1,
        duration: 0.2,
        ease: 'expo.out',
      });
      gsap.to(`.navLine${text.slice(0, 3)}`, {
        width: hover || selected ? "100%" : 0,
        borderColor:
          hover || selected
            ? darkMode
              ? "#FFF5EA"
              : "#000000"
            : "transparent",
        duration: 0.2,
        ease: 'expo.out',
      });
    });
  }, [hover, pathname]);

  return (
    <li className={`mx-auto list-none w-fit ${className && className}`}>
      <Link
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); }}
        className={`relative navButton${text.slice(0, 3,)} text-center font-light text-xl font-bel text-white `}
        href={`${to}`}
      // onClick={() => handleClick(to)}
      // title={`Go to the ${text} page`}

      >
        {text}
        <Line className={`mx-auto navLine${text.slice(0, 3,)} w-0 border-transparent`} />
      </Link>
    </li>
  );
}
