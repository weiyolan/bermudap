import Head from "next/head"
import Image from "next/image"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
// import Footer from "@/components/Footer";
// import UpButton from "@/components/UpButton";

import {getFooter, getNav, getAboutContent, getCTA, getHero, getMembers, getNetwork, getValues} from "@/sanity/sanity-utils"
import UpButton from "@/components/UpButton"
import BackgroundLogo from "@/atoms/BackgroundLogo"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import CTA from "@/components/CTA"
import AboutSection from "@/components/AboutSection"
import Network from "@/components/Network"
import {useAppContext} from "@/utils/appContext"
import {ReactLenis} from "@studio-freight/react-lenis"
import {gsap} from "gsap/dist/gsap"
import {useEffect, useRef} from "react"
import NavigationMobile from "@/components/NavigationMobile"

export default function Home({
  links,
  cta,
  title,
  list1,
  list2,
  list3,
  list4,
  networkTitle,
  members,
  aboutImage,
  aboutAlt,
  aboutButton,
  aboutText,
  aboutTitle,
  heroImage,
  heroAlt,
  CTAText,
  valueTitle,
  val1,
  val2,
  val3,
}) {
  let {locale, width} = useAppContext()
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  })

  return (
    <>
      <Head>
        <title>Bermuda Events | Get Lost In The Experience</title>
        <meta
          name="description"
          content="Dynamic & Meaningful Experiences For Your Colleagues
          and Family."
        />
      </Head>
      <ReactLenis ref={lenisRef} autoRaf={false} root options={{wheelMultiplier: 0.9, print: false}}>
        <header>{width < 768 ? <NavigationMobile links={links} cta={cta?.[locale]} /> : <Navigation links={links} cta={cta?.[locale]} />}</header>
        <main className="">
          <BackgroundLogo />
          <Hero alt={heroAlt?.[locale]} imgUrl={heroImage} />
          <Features title={valueTitle?.[locale]} values={[val1, val2, val3]} />
          <CTA text={CTAText?.[locale]} />
          <AboutSection alt={aboutAlt?.[locale]} imgUrl={aboutImage} title={aboutTitle?.[locale]} text={aboutText?.[locale]} button={aboutButton} />
          <Network title={networkTitle} members={members} />
        </main>
        <footer>
          <Footer title={title?.[locale]} lists={[list1, list2, list3, list4]} />
        </footer>
        <UpButton />
      </ReactLenis>
    </>
  )
}

export async function getStaticProps() {
  const {links, cta} = await getNav()
  const {title, list1, list2, list3, list4} = await getFooter()
  const members = await getMembers()
  const {title: networkTitle} = await getNetwork()
  const {imgUrl: aboutImage, alt: aboutAlt, button: aboutButton, text: aboutText, title: aboutTitle} = await getAboutContent()
  const {imgUrl: heroImage, alt: heroAlt} = await getHero()
  const {title: CTAText} = await getCTA()
  const {title: valueTitle, val1, val2, val3} = await getValues()

  // const projects = await client.fetch(`*[_type == "project"][cat == "bts" || cat == "docu" || cat == "art"]|order(date desc){title, cat, otherImages[]{_key,_type, asset->{url,metadata{dimensions}}, ...asset{_ref}}, mainImage{alt,image{asset->{url}, ...asset{_ref}}}, slug}`);
  // const sectionInfo = await client.fetch(`*[_type == "mainPageXXX" || _type == "mainPageYYY"]`);
  // const sectionInfoMilo = await client.fetch(`*[]`)
  return {
    props: {
      links,
      cta,
      title,
      list1,
      list2,
      list3,
      list4,
      networkTitle,
      members,
      aboutImage,
      aboutAlt,
      aboutButton,
      aboutText,
      aboutTitle,
      heroImage,
      heroAlt,
      CTAText,
      valueTitle,
      val1,
      val2,
      val3,
    },
  }
}
