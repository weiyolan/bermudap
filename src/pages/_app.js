import "../styles/globals.css"
import "../styles/lenis.css"
import "../styles/scrollbar.css"
import React, {useEffect, useState} from "react"
import Head from "next/head"
import {AppWrapper} from "@utils/appContext"
// import Script from 'next/script';
import {Toaster} from "react-hot-toast"

import {Belleza, Rajdhani, Inter} from "next/font/google"

import {gsap} from "gsap/dist/gsap"
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"
import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin"
import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin"
import {GoogleTagManager} from "@next/third-parties/google"
// import {useRouter} from "next/router"
import SplashScreen from "@/components/SplashScreen"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin)

const belleza = Belleza({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bel",
  display: "auto",
})

const inter = Inter({subsets: ["latin"], variable: "--font-raj"})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-raj",
  display: "swap",
})

export default function App({Component, pageProps}) {
  const [loaded, setLoaded] = useState(false)
  // const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     setLoaded(false)
  //     console.log(false)
  //   }

  //   const handleRouteChangeComplete = () => {
  //     setLoaded(true)
  //     console.log(true)
  //   }
  //   router.events.on("routeChangeStart", handleRouteChange)
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete)

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange)
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete)
  //   }
  // }, [router])

  return (
    <>
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
      <AppWrapper className={`${belleza.variable} ${inter.variable} font-pop relative h-[100dvh] w-full overflow-x-clip`}>
        {/* {!loaded ? (
          <SplashScreen />
        ) : ( */}
        <Component
          loaded={loaded}
          onLoad={() => {
            setLoaded(true)
          }}
          {...pageProps}
        />
        {/* )} */}

        <Toaster />
      </AppWrapper>
      <GoogleTagManager gtmId="GTM-THKV3L73" />
    </>
  )
}
