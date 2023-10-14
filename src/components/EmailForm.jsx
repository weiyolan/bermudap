import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Section from "@/atoms/Section";
import H2 from "@/atoms/H2";
import LayoutSplit from "@/atoms/LayoutSplit";
import useGsap from "@/utils/useGsap";
import { useAppContext } from "@/utils/appContext";
import Button from "@/atoms/Button";
// import Button from "@/atoms/Button";

gsap.registerPlugin(ScrollTrigger);

const emailTitle = {
  en: "Subscribe to our newsletter.",
  fr: "Abonne-toi à la newsletter.",
  nl: "Abonneer je op onze nieuwsbrief.",
}

const emailPlaceholder = {
  en: "example@ywdesign.co",
  fr: "example@ywdesign.co",
  nl: "voorbeeld@ywdesign.co"
}
const hiddenTitle = {
  en: "Hidden",
  fr: "Caché",
  nl: "Verborgen",
}
const hiddenPlaceholder = {
  en: "Leave empty if you're human",
  fr: "Ne pas remplir si vous êtes humain",
  nl: "Niet invullen als je een mens bent."
}

const sendButtonTitle = {
  en: "Send",
  fr: "Envoyer",
  nl: "Stuur",
}

const successMessage = {
  en: "Thank you! We'll reach out to you with some great news soon.",
  fr: "Merci! Nous revenons rapidement vers vous avec du super news.",
  nl: "Bedankt! We houden je snel op de hoogte met super nieuws.",
}
export default function EmailForm() {
  let { locale } = useAppContext();
  let [success, setSuccess] = useState(false);
  // const { locale } = useAppContext();
  let darkMode = false;
  let [email, setEmail] = useState("");
  let [honey, setHoney] = useState("");


  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const upload = fetch("/en", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": e.target.getAttribute("name"),
        email: email,
        "bot-field": honey,
      }),
    })
      .then(() => {
        setSuccess(true);
        setEmail("");
        setHoney("");
      })
      .catch((error) => alert(error));

    toast.promise(
      upload,
      {
        loading: "Loading..",
        success: successMessage[locale],
        error: (err) => {
          console.log('teeeest')
            // return `There was an error registering your request:\n${err.toString()}`
            `There was an error registering your request:\nAIAIAIAI`
        },
      },
      {
        style: {
          minWidth: "250px",
          borderRadius: "10px",
          background: "#FFF5EA",
          color: "#333",
        },
        success: {
          duration: 6000,
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="EmailForm"
      id="EmailForm"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="form-container font-bel flex flex-col mb-2 md:mb-0 relative gap-1 md:gap-4  w-full md:w-4/5 text-browndark placeholder:text-browndark text-sm"
    >
      <input type="hidden" name="form-name" value="ContactForm" />
      <p className="hidden">
        <label>
          {hiddenPlaceholder[locale]}
          <input
            name="bot-field"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />
        </label>
      </p>

      {/* EMAIL */}
        <label
        className=" cursor-pointer whitespace-nowrap text-white  font-extralight text-base inline-flex max-w-fit  mx-auto md:w-fit md:text-left md:ml-0 md:mr-auto"
          htmlFor="email2" >
          {emailTitle[locale]}
        </label>
      <div className="relative flex gap-2 justify-center">
        <input
          required
          name="email2"
          className={` block bg-white2 font-raj font-medium
              rounded-md  autofill:bg-white2 valid:scale-[0.99]  
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-fit md:w-full `}
          id="email2"
          type="email"
          placeholder={emailPlaceholder[locale]}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      <Button myKey="submit" type={success ? "reset" : "submit"} form="EmailForm"
        onClick={(e) => { if (success) { e.preventDefault(); setSuccess(false); } }}
        text={success ? (<BsCheckLg className={`text-base h-[1rem] w-[1rem] `} />) : (`${sendButtonTitle[locale]}`)}
          className={`min-w-[80px] px-2 lg:min-w-[100px] xs:px-4 text-center py-2 uppercase bg-white2 font-semibold text-sm text-browndark min-[400px]:w-50% min-[430px]:w-fit h-fit outline-none `} />
      </div>
    </form>
  );
}
