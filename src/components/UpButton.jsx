import useGsap from "@/utils/useGsap";
import { gsap } from "gsap/dist/gsap";
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from "gsap/dist/Observer";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useEffect, useState } from "react";

gsap.registerPlugin(Observer, ScrollToPlugin);

export default function UpButton() {
  let ctx = useGsap();
  let [hiding, setHiding] = useState(true); //removed arrow onLoad and then animate after scroll.
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);


  function hideArrow() {
    if (!hiding) {
      setHiding(true);
    }
  }

  function showArrow() {
    if (hiding) {
      setHiding(false);
    }
  }

  // useEffect(() => {
  //   let observer = Observer.create({
  //     target: window,         // can be any element (selector text is fine)
  //     type: "scroll",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
  //     preventDefault: false,
  //     onStopDelay: 1.5,
  //     tolerance: 70,
  //     onStop: () => {
  //       window.scrollY>window.innerHeight && showArrow()
  //     },
  //     onDown: () => {
  //       hideArrow()
  //     },
  //     onUp: () => {
  //       hideArrow()
  //     },
  //     lockAxis: true,
  //   })
  //   return () => { observer.disable() }
  // }, [hiding])

  function handleScroll() {
    if (window.scrollY > window.innerHeight * 0.9) {
      // console.log(e.y)
      showArrow();
    } else {
      hideArrow();
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hiding]);

  useEffect(() => {
    ctx.add(() => {
      gsap.to(".upButton", {
        autoAlpha: hiding ? 0 : 1,
        x: hiding ? "0" : "0",
        xPercent: hiding ? 150 : -50,
        yPercent: hovering ? -5 : 0,
        duration: 1,
        scale: hovering ? (clicking ? 0.95 : 1.1) : 1,

        transformOrigin: "50% 50%",
        // ease: 'back.out(2)',
        ease: "elastic.out(1, 0.5)",
        // ease: "power3.out",
        // ease: "expo.out",
      });

      gsap.to("#UR", {
        attr: {
          d: hovering
            ? "M56.2283 39.0188C49.2672 26.1851 50.1043 11.4621 57.1539 0.484616L89.4091 59.9121C76.1458 59.4479 63.1989 51.8529 56.2283 39.0188Z"
            : "M57.9991 38.6646C50.5515 26.0531 50.8528 11.2626 57.519 0L92.0265 58.3978C78.7131 58.4171 65.4562 51.2761 57.9991 38.6646Z",
        },
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to("#BL", {
        attr: {
          d: hovering
            ? "M58.5235 38.9318C51.6392 51.807 38.7379 59.4789 25.4683 60.0232L57.3675 0.403869C64.492 11.3387 65.4172 26.0563 58.5235 38.9318Z"
            : "M34.0273 77.5745C26.5798 90.186 13.3228 97.3266 0 97.3077L34.5075 38.9099C41.1831 50.1726 41.4844 64.963 34.0273 77.5745Z",
        },
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to("#BR", {
        attr: {
          d: hovering
            ? "M66.7828 68.7131C66.7828 107.315 68.9206 103.112 47.9207 103.112L47.9207 34.3147C70.4206 34.3147 66.7828 28.3146 66.7828 68.7131Z"
            : "M80.4925 78.3856C95.3971 78.3856 108.362 86.0355 115 97.3076H45.985C52.6323 86.0355 65.5973 78.3856 80.4925 78.3856Z",
        },
        duration: 0.5,
        ease: "power3.out",
      });
    });
  }, [hiding, hovering, clicking]);

  return (
    <div
      title="To the top of the page."
      tabIndex={0}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setClicking(false);
      }}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      onClick={() =>
        ctx.add(() => {
          gsap.to(window, { scrollTo: 0, ease: "ease.out" });
        })
      }
      className="upButton active::drop-shadow-sm fixed bottom-[15%] md:bottom-1/4 right-0 flex w-10 h-10 md:h-12 md:w-12 translate-x-full cursor-pointer items-center justify-center drop-shadow-lg transition-shadow"
    >
      <div className="absolute h-full w-full rounded-full bg-green" />
      <svg
        alt="The Bermuda Events Triangular Company Logo"
        className={`relative h-fit w-3/5 -translate-y-0.5 `}
        viewBox="0 0 115 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="UR"
          d="M57.9991 38.6646C50.5515 26.0531 50.8528 11.2626 57.519 0L92.0265 58.3978C78.7131 58.4171 65.4562 51.2761 57.9991 38.6646Z"
          fill="white"
        />
        <path
          id="BL"
          d="M34.0273 77.5745C26.5798 90.186 13.3228 97.3266 0 97.3077L34.5075 38.9099C41.1831 50.1726 41.4844 64.963 34.0273 77.5745Z"
          fill="white"
        />
        <path
          id="BR"
          d="M80.4925 78.3856C95.3971 78.3856 108.362 86.0355 115 97.3076H45.985C52.6323 86.0355 65.5973 78.3856 80.4925 78.3856Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// {/* <svg width="115" height="104" viewBox="0 0 115 104" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g id="Frame 119">
// <path id="BL" d="M58.5235 38.9318C51.6392 51.807 38.7379 59.4789 25.4683 60.0232L57.3675 0.403869C64.492 11.3387 65.4172 26.0563 58.5235 38.9318Z" fill="white"/>
// <path id="UR" d="M56.2283 39.0188C49.2672 26.1851 50.1043 11.4621 57.1539 0.484616L89.4091 59.9121C76.1458 59.4479 63.1989 51.8529 56.2283 39.0188Z" fill="white"/>
// <path id="BR" d="M66.7828 68.7131C66.7828 107.315 68.9206 103.112 47.9207 103.112L47.9207 34.3147C70.4206 34.3147 66.7828 28.3146 66.7828 68.7131Z" fill="white"/>
// </g>
// </svg> */}
