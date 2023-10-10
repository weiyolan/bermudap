import Head from "next/head";
import Image from "next/image";

import Navigation from "@/components/Navigation";
import useLocale from "@/utils/useLocale";
import Footer from "@/components/Footer";
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
} from "@/sanity/sanity-utils";
import UpButton from "@/components/UpButton";
import BackgroundLogo from "@/atoms/BackgroundLogo";
import ContactDetails from "@/components/ContactDetails";
import TrustedBy from "@/components/TrustedBy";
import Form from "@/components/Form";
import Numbers from "@/components/Numbers";

export default function Home({
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
}) {
  let locale = useLocale();
  return (
    <>
      <Head>
        <title>
          Bermuda-Events | The most personal event experience you can get
        </title>
        <meta
          name="description"
          content="Dynamic & Meaningful Experiences For Your Colleagues
          and Family."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navigation links={links} cta={cta?.[locale]} />
      </header>
      <main>
        <BackgroundLogo />
        <ContactDetails
          {...{ companyName, address1, address2, country, email, vat, phone }}
          title={detailsTitle?.[locale]}
          text={detailsText?.[locale]}
          alt={alt}
          imgUrl={imgUrl}
        />
        {enabled && (
          <TrustedBy title={trustedTitle?.[locale]} partners={partners} />
        )}
        <Form title={formTitle?.[locale]} />
        <Numbers title={numberTitle?.[locale]} facts={[fact1, fact2, fact3]} />
      </main>
      <footer>
        <Footer title={title?.[locale]} lists={[list1, list2, list3, list4]} />
      </footer>
      <UpButton />
    </>
  );
}

export async function getStaticProps() {
  const { links, cta } = await getNav();
  const { title, list1, list2, list3, list4 } = await getFooter();

  const { title: numberTitle, fact1, fact2, fact3 } = await getNumbers();
  const { title: formTitle } = await getFormContent();
  const { enabled, title: trustedTitle, partners } = await getTrusted();
  const {
    title: detailsTitle,
    text: detailsText,
    alt,
    imgUrl,
  } = await getDetails();
  const { companyName, address1, address2, country, email, vat, phone } =
    await getContactDetails();

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
  };
}
