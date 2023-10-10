import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import client from "@/sanity/client";

export default function SanityImage({
  image,
  alt,
  fill,
  absolute,
  blur,
  sizes,
  style,
  onLoad,
  containerClass,
  className,
  name,
  move,
  intrinsic,
  ...props
}) {
  let { src, width, height, loader } = useNextSanityImage(client, image._ref);

  let landscape = width / height > 1;

  function getBlurProps() {
    let additionalProps = {};

    if (blur) {
      additionalProps.placeholder = "blur";
      additionalProps.blurDataURL = image.asset.metadata.lqip;
    }
    return additionalProps;
  }

  if (fill) {
    return (
      <div
        data-imagecontainer={move ? "true" : "false"}
        className={`select-none  ${absolute ? "absolute" : "relative"
          } rounded-2xl h-full w-full overflow-hidden ${containerClass && containerClass
          }`}
      >
        <Image
          fill
          style={{ objectFit: "cover", objectPosition: "center", ...style }}
          sizes={sizes ? sizes : "(max-width: 700px) 100vw, 50vw"}
          className={`imageFill${name ? name : ""} ${className ? className : ""
            }`}
          src={src}
          onLoad={onLoad}
          loader={loader}
          alt={alt}
          {...getBlurProps()}
          {...props}
        />
      </div>
    );
  }

  if (intrinsic) {
    return (
      <Image
        style={style}
        {...{ src, width, height, loader }}
        alt={alt}
        className={className}
        {...getBlurProps()}
        {...props}
      />
    );
  }

  return (
    <Image
      style={{
        width: landscape ? "100%" : "auto",
        height: landscape ? "auto" : "100%",
        ...style,
      }}
      sizes={sizes}
      className={className}
      {...{ src, width, height, loader }}
      alt={alt}
      {...getBlurProps()}
      {...props}
    />
  );
}
