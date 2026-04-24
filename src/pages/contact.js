import Head from 'next/head'
import Image from 'next/image'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
// import Footer from "@/components/Footer";
// import UpButton from "@/components/UpButton";

import {
  getNumbers,
  getFormContent,
  getTrusted,
  getDetails,
  getContactDetails,
  getNav,
  getFooter,
} from '@/sanity/sanity-utils'
import UpButton from '@/components/UpButton'
import BackgroundLogo from '@/atoms/BackgroundLogo'
import ContactDetails from '@/components/ContactDetails'
import TrustedBy from '@/components/TrustedBy'
import Form from '@/components/Form'
import Numbers from '@/components/Numbers'
import {useAppContext} from '@/utils/appContext'
import {Lenis as ReactLenis} from '@studio-freight/react-lenis'
import NavigationMobile from "@/components/NavigationMobile"

const SITE_URL = "https://bermuda-events.be"

const contactMeta = {
  en: {
    title: "Bermuda Events | The Most Personal Event Experience You Can Get",
    description: "Creativity, transparency and detail are at the heart of the Bermuda Network and everything we do.",
    h1: "Contact Bermuda Events — Ask for an offer",
  },
  nl: {
    title: "Bermuda Events | De Meest Persoonlijke Event Ervaring",
    description: "Creativiteit, transparantie en oog voor detail staan centraal bij Bermuda Events en alles wat we doen.",
    h1: "Contacteer Bermuda Events — Vraag een offerte",
  },
}

export default function Contact({
  links,
  cta,
  title,
  list1,
  list2,
  list3,
  list4,
  numberTitle,
  fact1,
  fact2,
  fact3,
  formTitle,
  enabled,
  trustedTitle,
  partners,
  detailsTitle,
  detailsText,
  alt,
  imgUrl,
  companyName,
  address1,
  address2,
  country,
  email,
  vat,
  phone,
  loaded,
  onLoad,
}) {
  let {locale, width} = useAppContext()
  const meta = contactMeta[locale] || contactMeta.en
  const ogImage = imgUrl ? `${imgUrl}?w=1200&h=630&fit=crop&auto=format` : `${SITE_URL}/apple-touch-icon.png`
  const pageUrl = `${SITE_URL}${locale === "nl" ? "/nl" : ""}/contact`

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <ReactLenis root options={{wheelMultiplier: 0.9, print: false}}>
        <header>{width < 768 ? <NavigationMobile links={links} cta={cta?.[locale]} /> : <Navigation links={links} cta={cta?.[locale]} />}</header>
        <main>
          <h1 className="sr-only">{meta.h1}</h1>
          <BackgroundLogo />
          <ContactDetails
            {...{companyName, address1, address2, country, email, vat, phone}}
            title={detailsTitle?.[locale]}
            text={detailsText?.[locale]}
            alt={alt}
            imgUrl={imgUrl}
          />
          {enabled && <TrustedBy title={trustedTitle?.[locale]} partners={partners} />}
          <Form title={formTitle?.[locale]} />
          <Numbers title={numberTitle?.[locale]} facts={[fact1, fact2, fact3]} />
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

  const {title: numberTitle, fact1, fact2, fact3} = await getNumbers()
  const {title: formTitle} = await getFormContent()
  const {enabled, title: trustedTitle, partners} = await getTrusted()
  const {title: detailsTitle, text: detailsText, alt, imgUrl} = await getDetails()
  const {companyName, address1, address2, country, email, vat, phone} = await getContactDetails()

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
      numberTitle,
      fact1,
      fact2,
      fact3,
      formTitle,
      enabled,
      trustedTitle,
      partners,
      detailsTitle,
      detailsText,
      alt,
      imgUrl,
      companyName,
      address1,
      address2,
      country,
      email,
      vat,
      phone,
    },
  }
}
