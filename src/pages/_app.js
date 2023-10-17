import "../styles/globals.css"
import "../styles/lenis.css"
import "../styles/scrollbar.css"
import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"
import Head from "next/head"
import {AppWrapper} from "@utils/appContext"
// import Script from 'next/script';
import {Toaster} from "react-hot-toast"

import {Belleza, Rajdhani} from "next/font/google"

import {gsap} from "gsap/dist/gsap"
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"
import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin"
import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin"

import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import UpButton from "@/components/UpButton"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin)

const belleza = Belleza({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bel",
  display: "auto",
})
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-raj",
  display: "swap",
})

export default function App({Component, pageProps}) {
  return (
    <>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"/> */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#bd8f57" />
        <meta name="msapplication-TileColor" content="#e3e1d9" />
        <meta name="theme-color" content="#e3e1d9" />
      </Head>
      {/* ${poppins.variable} */}
      <AppWrapper
        // scrolled={scrolled}
        className={`${belleza.variable} ${rajdhani.variable} font-pop relative h-[100dvh] w-full overflow-x-clip`}
      >
        <Component {...pageProps} />
        <Toaster />
      </AppWrapper>
    </>
  )
}
