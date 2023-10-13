import { usePageContext } from "@/utils/pageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { Observer } from "gsap/dist/Observer";
// import FadeDiv from "../atoms/FadeDiv";
import NavToggle from "./NavToggle";
import Button from "@/atoms/Button";
import Line from "@/atoms/Line";
import LanguageToggle from "@/atoms/LanguageToggle";
import { useAppContext } from "@/utils/appContext";
import Logo from "@/atoms/Logo";
import LogoText from "@/atoms/LogoText";

gsap.registerPlugin(Observer);

export default function NavigationMobile({ links, cta }) {
  let { locale } = useAppContext();
  // let { darkMode } = usePageContext();
  // let { darkMode } = usePageContext();
  let [hiding, setHiding] = useState(true); //removed bar onLoad and then animate in.
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    // setHiding(false)
    return () => {
      ctx.current.revert();
    };
  }, []);

  // =================================OPEN/CLOSE=================================
  useEffect(() => {
    let observer1 = Observer.create({
      target: ".navToggle", // can be any element (selector text is fine)
      ignore: [window],
      type: "touch", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding);
      },
    });
    let observer2 = Observer.create({
      target: ".navButtons", // can be any element (selector text is fine)
      ignore: [window],
      type: "touch", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding);
      },
    });
    let observer3 = Observer.create({
      target: ".navBackground", // can be any element (selector text is fine)
      ignore: [window],
      type: "touch", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding);
      },
    });
    return () => {
      observer1.disable();
      observer2.disable();
      observer3.disable();
    };
  }, [hiding]);

  useEffect(() => {
    // console.log(visible)
    ctx.current.add(() => {
      gsap.to([".navButton"], {
        autoAlpha: () => (hiding ? 0 : 1),
        y: () => (hiding ? -20 : 0),
        x: () => (hiding ? 10 : 0),
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
      });
      gsap.to([".navButtons"], {
        autoAlpha: () => (hiding ? 0 : 1),
        duration: 0.5,
        ease: "power2.out",
        delay: () => (hiding ? 0.2 : 0),
      });
      gsap.to(".navBackground", {
        y: () => (hiding ? +50 : 0),
        yPercent: () => (hiding ? -100 : 0),
        x: () => (hiding ? -50 : 0),
        xPercent: () => (hiding ? 100 : 0),
        duration: 1,
        ease: "expo.out",
        backgroundColor: () => (hiding ? "#BD915966" : "#BD9159FF"),
        borderBottomLeftRadius: () => (hiding ? 30 : 0),
        delay: () => (hiding ? 0.20 : 0),
      });
    });
  }, [hiding]);

  return (
    <div id='navigationBar' key='navigationBar'
      className={`uppercase navBar fixed w-full h-0 top-0 z-[100] text-white font-bel`}>
      <div
        className={`navBackground bg-[#BD915966] 
          backdrop-blur-sm rounded-bl-[30px] w-screen h-screen top-0 translate-x-[calc(100%-50px)] -translate-y-[calc(100%-50px)] absolute `}
      />


      <ul
        className={`navButtons flex flex-col w-[screen] h-[calc(100vh-50px)] relative items-end gap-5 mt-[50px] px-6 sm:px-4 py-2  `}
      >
        {links.map((button, i) => (
          <MyButton
            key={i}
            text={button.text?.[locale]}
            to={button.url}
            ext={button.ext}
          />
        ))}
        <li className="list-none">
          <Button
            text={cta}
            to="contact/#form"
            className={
              "relative navButton rounded-md bg-white fill-brown  px-4 py-2 font-bold text-brown text-xl   shadow-sm hover:shadow-md"
            }
          />
        </li>

        <li
          className={`relative w-fit h-fit  text-3xl md:text-xl lg:text-2xl  text-center `}
        >
          <LanguageToggle />
        </li>
        <li>
          <Link href="/"
            tabIndex='0'
            className="navButton absolute left-0 bottom-0 navLogoLink m-4 w-4/5  gap-4 flex h-fit">
            <Logo className={"fill-white relative navLogo w-12 h-fit mr-0"} />
            <LogoText className={"relative navLogoText w-36"} />

          </Link>
        </li>
      </ul>



      <NavToggle className={`navToggle `} open={!hiding} />
    </div>
  );
}

function MyButton({ text, to }) {
  // let { darkMode } = usePageContext();
  let darkMode = true
  const pathname = usePathname();
  let [hover, setHover] = useState(false);
  let [selected, setSelected] = useState(false);
  const ctx = useRef(gsap.context(() => { }));
  const myRef = useRef();

  useEffect(() => {
    // setLoaded(true)
    return () => {
      ctx.current.revert();
    };
  }, []);

  useEffect(() => {
    setSelected(pathname === to);
  }, [pathname]);

  useEffect(() => {
    myRef.current !== undefined && ctx.current.add(() => {
      gsap.to(`.navButton${text.slice(0, 3,)}`, {
        scale: hover ? 1.1 : 1,
        duration: 0.2,
      });
      gsap.to(`.navLine${text.slice(0, 3,)}`, {
        width: hover || selected ? "100%" : 0,
        borderColor:
          hover || selected
            ? "#FFF5EA"
            : "#FFF5EA00",
        duration: 0.2,
      });
    });
  }, [hover, selected]);

  return (
    <li className="navButton navButton${text.slice(0, 3,)} relative opacity-0 visible text-xl   text-center"><Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
      }}
      ref={myRef}

      href={`${to}`}
    // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      <div className={`w-fit ml-auto`}>
        {text}
        <Line
          className={`mx-auto navLine${text.slice(0, 3,)} ${darkMode ? "border-primary" : "border-darkPrimary"
            } w-0`}
        />
      </div>
    </Link></li>
  );
}
