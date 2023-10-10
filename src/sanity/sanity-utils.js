import { groq } from "next-sanity";
import client from "./client";
import { supportedLanguages } from "./supportedLanguages";
// import { createClient } from "next-sanity";

// const options = {
//   dataset: "production",
//   projectId: "erjr84ua",
//   apiVersion: "2023-02-06", // or today's date for latest
// }

export async function getMembers() {
  // const client = createClient(options)

  return client.fetch(
    groq`*[_type == "member"][]|order(_createdAt desc){
    name,
    text,
    func,
    "alt":altImage.alt,
    "img":altImage.image.asset->url
  }`,
  );
}
// "slug":slug.current

export async function getNetwork() {
  return client.fetch(
    groq`*[_type == "hpNetwork"][0]{
    title,
  }`,
  );
}

export async function getAboutContent() {
  return client.fetch(
    groq`*[_type == "hpAbout"][0]{
    "alt":altImage.alt,
    "imgUrl":altImage.image.asset->url, 
    button, 
    title, 
    text}`,
  );
}

export async function getHero() {
  return client.fetch(
    groq`*[_type == "hpHero"][0]{
    "alt":altImage.alt,
    "imgUrl":altImage.image.asset->url, 
  }`,
  );
}

export async function getValues() {
  return client.fetch(
    groq`*[_type == "hpValues"][0]{
    title,
    val1,
    val2,
    val3,
  }`,
  );
}

export async function getCTA() {
  return client.fetch(
    groq`*[_type == "hpCTA"][0]{
    title, 
  }`,
  );
}

{
  /* <ContactDetails />
<TrustedBy /> */
}

export async function getFormContent() {
  return client.fetch(
    groq`*[_type == "cpForm"][0]{
    title, 
  }`,
  );
}

export async function getNumbers() {
  return client.fetch(
    groq`*[_type == "cpNumbers"][0]{
    title, 
    fact1,
    fact2,
    fact3,
  }`,
  );
}

export async function getDetails() {
  return client.fetch(
    groq`*[_type == "cpDetails"][0]{
      "alt":altImage.alt,
      "imgUrl":altImage.image.asset->url, 
      text,
      title,
  }`,
  );
}

export async function getContactDetails() {
  return client.fetch(
    groq`*[_type == "cpDetails"][0]{
      companyName,
      address1,
      address2,
      country,
      email,
      phone,
      vat,
    }`
  )
}

export async function getTrusted() {
  return client.fetch(
    groq`*[_type == "cpTrustedBy"][0]{
    title, 
    enabled,
    partners[]{link, name, 'imgUrl':image.asset->url, 'meta':image.asset->metadata.dimensions},
  }`,
  );
}
export async function getNav() {
  return client.fetch(
    groq`*[_type == "nav"][0]{
    links, 
    cta,
  }`,
  );
}
export async function getFooter() {
  let langObj = "";

  supportedLanguages.forEach((lang) => {
    langObj = langObj + `'${lang.id}':document.${lang.id}.asset->url,`;
  });

  // GROC Structure:
  // items[0]{
  //   'url':url->
  //   {
  //       'en':document.en.asset->url,
  //       'nl':document.nl.asset->url
  //       }
  // }

  return client.fetch(
    groq`*[_type == "footerContent"][0]{
      title,  
      list1,
      list2,
      list3,
      list4{
        title,
        items[]{
          text,
          ext,
          'url':url->
          {
              ${langObj}
              }
        }
      }
    }`
  );
}
  //   groq`*[_type == "footerContent"][0]{
  //   title,
  //   list1,
  //   list2,
  //   list3,
  //   list4{
  //     items[0]{
  //       'url':url->
  //       {
  //             'en':document.en{'url':asset->url},
  //             'nl':document.nl{'url':asset->url}
  //              }
  //     }
  //   }
  // }`,

// *[_type == "footerContent"][0]{list4{items[0]{'url':url->document{'docs':[{'en':en{'url':asset->url}},nl{'url':asset->url}]}}}}

// links[]{text,url,ext},
//
