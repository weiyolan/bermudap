import { gsap } from "gsap/dist/gsap";
import { useEffect, useRef, useState } from "react";
import useGsap from "@/utils/useGsap";
import Link from "next/link";
import Image from "next/image";

export default function TrustedLogo({
  dataSpeed,
  dataDirection,
  imgUrl,
  name,
  link,
  ar,
}) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    myRef?.current !== undefined &&
      ctx.add(() => {
        gsap.to(myRef.current, {
          duration: 0.5,
          scale: hovering ? (clicking ? 1.02 : 1.05) : 1,
          transformOrigin: "50% 50%",
          ease: "elastic.out(1, 0.5)",
          // ease: 'expo.out',
        });
      });
  }, [hovering, clicking, active]);

  return (
    <Link
      className="trustedAnimation h-fit w-fit cursor-pointer"
      href={link}
      title={`Go to ${name}'s website`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* //   className={`logo my-auto scale-75 translate-x-0 xs:scale-100 opacity-0`} */}
      <Image
        ref={myRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setClicking(false);
        }}
        onMouseDown={() => setClicking(true)}
        onMouseUp={() => setClicking(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        tabIndex="0"
        data-speed={dataSpeed}
        data-direction={dataDirection}
        style={{
          width: ar > 2.5 ? "120px" : ar > 1 ? "100px" : "80px",
          height: "auto",
        }}
        width={ar > 2.5 ? 120 : ar > 1 ? 100 : 80}
        alt={`${name}'s Logo`}
        height={ar > 2.5 ? 120 * ar : ar > 1 ? 100 * ar : 80 * ar}
        src={imgUrl}
      />
    </Link>
  );
}
