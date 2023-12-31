import React, { useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Section from "@/atoms/Section";
import H2 from "@/atoms/H2";
import LayoutSplit from "@/atoms/LayoutSplit";
import useGsap from "@/utils/useGsap";
import { useAppContext } from "@/utils/appContext";
import { twMerge } from "tailwind-merge";
// import Button from "@/atoms/Button";

gsap.registerPlugin(ScrollTrigger);

const messageTitle = {
  en: "Message",
  fr: "Message",
  nl: "Bericht",
}


const messagePlaceholder = {
  en: "To begin, just start typing. For example: \nHi there, \nI need a really good event organizer for my project. \nCould we meet up to talk about it? \nKind regards",
  fr: "Pour commencer, il suffit de taper. Par exemple: \nSalut, \nJ'aurais besoin un organisateur talentueux pour un project que j'ai en tête. \nPouvons-nous en parler ? \nA bientôt !",
  nl: "Start hier met je bericht door gewoon te typen. Bijvoorbeeld: \nHallo, \nIk ben op zoek naar een getalenteerd team voor een event dat ik in gedachte heb. \nZouden we hier binnenkort over kunnen spreken? \nTot snel!",
}

const nameTitle = {
  en: "Name",
  fr: "Prénom",
  nl: "Voornaam",
}

const namePlaceholder = {
  en: "Bobby",
  fr: "Arno",
  nl: "Peter"
}
const lastNameTitle = {
  en: "Last Name",
  fr: "Nom",
  nl: "Achternaam",
}

const lastNamePlaceholder = {
  en: "McGoozy",
  fr: "Du Chateau",
  nl: "Selie"
}
const emailTitle = {
  en: "Email",
  fr: "Courriel",
  nl: "Email",
}

const emailPlaceholder = {
  en: "example@ywdesign.co",
  fr: "example@ywdesign.co",
  nl: "voorbeeld@ywdesign.co"
}
const subjectTitle = {
  en: "Subject",
  fr: "Sujet",
  nl: "Onderwerp",
}
const subjectPlaceholder = {
  en: "Project Name",
  fr: "Nom du projet",
  nl: "Projectnaam"
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
  nl: "Verzenden",
}

const successMessage = {
  en: "Thank you for your message! We'll be in touch with you soon.",
  fr: "Merci de nous avoir contacté! Nous revenons rapidement vers vous.",
  nl: "Bedankt voor uw bericht! Wees gerust, we komen er snel op terug.",
}

export default function Form({ title }) {
  let { locale } = useAppContext();
  let [success, setSuccess] = useState(false);
  // const { locale } = useAppContext();
  let darkMode = false;
  // const { darkMode } = usePageContext();
  let [name, setName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [subject, setSubject] = useState("");
  let [message, setMessage] = useState("");
  let [honey, setHoney] = useState("");
  // const { width } = useAppContext()
  // let width = window.innerWidth;

  let mm = gsap.matchMedia()

  useEffect(() => {
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (ctx) => {
      let { isDesktop, isMobile, reduceMotion } = ctx.conditions
      isDesktop && ctx.add(() => {
        gsap.to(['.formAnimation'], {
          y: 0,
          autoAlpha: 1,
          stagger: { each: 0.1 },
          // ease: 'back',
          ease: 'expo.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: '.formAnimationTitle',
            start: 'top 70%',
            // invalidateOnRefresh: true,
            // markers: true,
            // toggleActions: 'play none none reverse',
          }
        })
      });

      isMobile && ctx.add(() => {
        gsap.utils.toArray(".formAnimation").forEach(card => {
          gsap.to(card, {
            y: 0,
            autoAlpha: 1,
            ease: 'expo.out',
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          })
        })
      })

    })
    return () => mm.revert()
  }, [])

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
        name: name,
        lastName: lastName,
        email: email,
        message: message,
        subject: subject,
        "bot-field": honey,
      }),
    })
      .then(() => {
        setSuccess(true);
        setName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setHoney("");
        setMessage("");
      })
      .catch((error) => alert(error));

    toast.promise(
      upload,
      {
        loading: "Loading...",
        success: successMessage[locale],
        error: (err) => {
          return `There was an error registering your request:\n${err.toString()}`;
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
    <Section id='form' className={'scroll-mt-24'}>
      <H2 text={title} className={'formAnimation invisible translate-y-[30px] formAnimationTitle'} />
      <form
        onSubmit={handleSubmit}
        name="ContactForm"
        id="ContactForm"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="form-container font-bel flex relative flex-col items-start w-full  "
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

        <LayoutSplit right className={''} >
          {/* ==============MESSAGE============== */}
          <div className="formAnimation invisible translate-y-[30px] inline-flex flex-col w-full h-full ">
            <label
              className=" cursor-pointer whitespace-nowrap font-semibold inline-flex max-w-fit mb-2 ml-1"
              htmlFor="message"
            >{messageTitle[locale]}</label>
            <textarea
              required
              data-lenis-prevent
              className={`block bg-brown/50  font-raj font-medium
                autofill:bg-brown/50 valid:scale-[0.99] rounded-md
              outline-none -outline-offset-2 focus:outline-none overflow-y-scroll focus:animate-outlinePulse
              border-none border-transparent overscroll-contain 
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full h-48 md:h-72
              `}
              id="message"
              type="text"
              name="message"
              placeholder={messagePlaceholder[locale]}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </div>
          <div
            className={`grid gap-1 xs:gap-6 grid-cols-3 w-full relative min-w-[30vw] lg:min-w-fit auto-rows-min font-normal ${darkMode
              ? "text-primary placeholder:text-primary"
              : "text-black placeholder:text-black"
              }`}
          >
            <div className="grid col-start-1 col-span-3 min-[500px]:col-span-2 ">
              <div className="formAnimation invisible translate-y-[30px] inline-block relative col-start-1 col-span-1 pr-3">
                <label
                  className="cursor-pointer font-semibold whitespace-nowrap inline-flex  mb-2 ml-1"
                  htmlFor="name"
                >{nameTitle[locale]}</label>
                <input
                  required
                  name="name"
                  className={`block bg-brown/50 font-raj font-medium
              rounded-md  autofill:bg-brown/50 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full `}
                  id="name"
                  autoComplete="name"
                  type="text"
                  placeholder={namePlaceholder[locale]}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="formAnimation invisible translate-y-[30px] inline-block relative col-start-2 col-span-1 pl-3">
                <label
                  className=" cursor-pointer whitespace-nowrap font-semibold inline-flex mb-2 ml-1"
                  htmlFor="lastname"
                >{lastNameTitle[locale]}</label>
                <input
                  required
                  name="lastname"
                  autoComplete="family-name"
                  className={`block bg-brown/50  font-raj font-medium
              rounded-md  autofill:bg-brown/50 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent 
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full `}
                  id="lastname"
                  type="text"
                  placeholder={lastNamePlaceholder[locale]}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* EMAIL */}
            <div className="formAnimation invisible translate-y-[30px]  inline-block relative col-start-1 col-span-3 min-[400px]:col-span-2 min-[400px]:pr-4 min-[500px]:pr-0">
              <label
                className=" cursor-pointer whitespace-nowrap font-semibold inline-flex max-w-fit mb-2 ml-1"
                htmlFor="email"
              >{emailTitle[locale]}</label>
              <input
                required
                name="email"
                autoComplete="email"
                className={`block bg-brown/50 font-raj font-medium
              rounded-md  autofill:bg-brown/50 valid:scale-[0.99]  
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent invalid:text-red-700
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full `}
                id="email"
                type="email"
                placeholder={emailPlaceholder[locale]}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            {/* SUBJECT */}
            <div className="formAnimation invisible translate-y-[30px] flex flex-col relative w-full col-start-1 col-span-2 min-[400px]:col-span-1 xs:pr-0 row-start-4 min-[400px]:col-start-3 min-[400px]:row-start-2 min-h-[50px] justify-start items-start min-[400px]:justify-end">
              <label
                className=" cursor-pointer whitespace-nowrap font-semibold inline-flex max-w-fit mb-2 ml-1"
                htmlFor="subject"
              >{subjectTitle[locale]}</label>
              <input
                name="subject"
                className={`block bg-brown/50 font-raj font-medium
              rounded-md  autofill:bg-brown/50 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent 
              placeholder:text-black/50  hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full `}
                id="subject"
                type="text"
                placeholder={subjectPlaceholder[locale]}
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>

            {/* BUTTON */}
            <div className="formAnimation invisible translate-y-[30px] w-full flex items-end justify-end  col-start-3 row-start-4 min-[500px]:col-start-3 min-[500px]:row-start-1 relative ">
              {/* <button
                key="submit"
                tabIndex={0}
                type={success ? "reset" : "submit"}
                // form="ContactForm"
                onClick={(e) => { if (success) { e.preventDefault(); setSuccess(false) } }}
                className={`inline-flex shadow-sm left-0 bottom-0 text-white
          border-2 border-solid rounded-md min-w-[80px] lg:min-w-[100px] px-2 justify-center xs:px-4 py-2
         font-semibold whitespace-nowrap
          cursor-pointer w-fit min-[400px]:w-50% min-[430px]:w-fit h-fit duration-300
          outline-none focus-visible:outline-black/30 border-transparent bg-green
          active:bg-black/30 hover:border-black/90 uppercase`}
              >
                {success ? (
                  <BsCheckLg className={`text-base`} />
                ) : (
                  `${sendButtonTitle[locale]}`
                )}
              </button> */}

              <MyButton tabIndex={0} type={success ? "reset" : "submit"} form="ContactForm"
                handleClick={(e) => { if (success) { e.preventDefault(); setSuccess(false); } }}
                className={`min-w-[80px] px-2 lg:min-w-[100px]  xs:px-4 text-center py-2 uppercase text-white min-[400px]:w-50% min-[430px]:w-fit h-fit outline-none `}>
                {success ? (<BsCheckLg className={`h-[1.5rem] w-[1.5rem] mx-auto`} />) : (`${sendButtonTitle[locale]}`)}
              </MyButton>

            </div>
          </div>
        </LayoutSplit>
      </form>
    </Section>
  );
}


function MyButton({ handleClick, className, children, ...props }) {
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  const buttonRef = useRef();
  let ctx = useGsap();

  useEffect(() => {
    buttonRef?.current !== undefined &&
      ctx.add(() => {
        gsap.to(buttonRef.current, {
          duration: 0.5,
          scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
          transformOrigin: "50% 50%",
          ease: "elastic.out(1, 0.5)",
        });
      });
  }, [hovering, clicking]);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setClicking(false);
      }}
      key="submit"
      onClick={handleClick}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      className={twMerge(`group relative max-w-fit cursor-pointer rounded-md bg-green fill-white px-4 py-2 font-bel text-white shadow-lg transition-shadow duration-200`, className)}
      {...props}
    >
      {children}
    </button>
  );
}


