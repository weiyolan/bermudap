import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Section from "@/atoms/Section";
import H2 from "@/atoms/H2";
import LayoutSplit from "@/atoms/LayoutSplit";
import useGsap from "@/utils/useGsap";
import useLocale from "@/utils/useLocale";
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

export default function Form({ title }) {
  const locale = useLocale();
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

  // let ctx = useRef();

  // useEffect(() => {
  //   ctx.current = gsap.context(() => {
  //     gsap.from(".formAnimation", {
  //       translateX: -50,
  //       translateY: 80,
  //       opacity: 0,
  //       ease: "back",
  //       duration: 0.5,
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: ".form-container",
  //         start: `top bottom`,
  //         // start: `top ${width < 648 ? '85%' : '60%'}`,
  //         end: "top 50%",
  //         // toggleActions:'restart none none reverse',
  //         scrub: 1,
  //         markers: false,
  //       },
  //     });
  //   });
  //   return () => ctx.current.revert();
  // }, [ctx]);


  let ctx = useGsap()

  useEffect(() => {
    ctx.add(() => {

      gsap.from(['.formAnimation'], {
        y: 30,
        autoAlpha: 0,
        stagger: { each: 0.1 },
        // ease: 'back',
        ease: 'expo.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: '.formAnimation',
          start: 'top 70%',
          // invalidateOnRefresh: true,
          // markers: true,
          // toggleActions: 'play none none reverse',
        }
      })
    })
  }, [])

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const upload = fetch("/favicon.ico", {
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
        loading: "Loading..",
        success: "Email submitted",
        error: (err) => {
          return `There was an error registering your request:\n${err.toString()}`;
        },
      },
      {
        style: {
          minWidth: "250px",
          borderRadius: "10px",
          background: "#333",
          color: "#FFFAEA",
        },
      },
    );
  }

  return (
    <Section id='form' className={'scroll-mt-24'}>
      <H2 text={title} className={'formAnimation'} />
      <form
        onSubmit={handleSubmit}
        name="ContactForm"
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

        <LayoutSplit right className={'min-h-[300px]'} >
          <div
            data-lenis-prevent
            className="formAnimation inline-flex flex-col w-full h-full "
          >
            <label
              className=" cursor-pointer whitespace-nowrap font-semibold inline-flex max-w-fit mb-2 ml-1"
              htmlFor="message"
            >{messageTitle[locale]}</label>
            <textarea
              required
              data-lenis-prevent
              className={`block bg-brown/50  font-raj font-medium
                autofill:bg-brown/50 valid:scale-[0.99] 
              outline-none -outline-offset-2 focus:outline-none focus:animate-outlinePulse
              border-none border-transparent overscroll-contain 
              placeholder:text-black/50 hover:border-black/40
              focus:-outline-offset-2 focus:outline-black/20 p-2 w-full h-full rounded-md`}
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
              <div className="formAnimation inline-block relative col-start-1 col-span-1 pr-3">
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
                  type="text"
                  placeholder={namePlaceholder[locale]}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="formAnimation inline-block relative col-start-2 col-span-1 pl-3">
                <label
                  className=" cursor-pointer whitespace-nowrap font-semibold inline-flex mb-2 ml-1"
                  htmlFor="lastname"
                >{lastNameTitle[locale]}</label>
                <input
                  required
                  name="lastname"
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
            <div className="formAnimation  inline-block relative col-start-1 col-span-3 min-[400px]:col-span-2 min-[400px]:pr-4 min-[500px]:pr-0">
              <label
                className=" cursor-pointer whitespace-nowrap font-semibold inline-flex max-w-fit mb-2 ml-1"
                htmlFor="email"
              >{emailTitle[locale]}</label>
              <input
                required
                name="email"
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
            <div className="formAnimation flex flex-col relative w-full col-start-1 col-span-2 min-[400px]:col-span-1 xs:pr-0 row-start-4 min-[400px]:col-start-3 min-[400px]:row-start-2 min-h-[50px] justify-start items-start min-[400px]:justify-end">
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
            <div className="formAnimation w-full flex items-end justify-end  col-start-3 row-start-4 min-[500px]:col-start-3 min-[500px]:row-start-1 relative ">
              <button
                key="submit"
                type={success ? "reset" : "submit"}
                onClick={() => {
                  if (success) {
                    setSuccess(false);
                  }
                }}
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
              </button>
              {/* <Button myKey="submit" type={success ? "reset" : "submit"} 
              // onClick={() => { if (success) { setSuccess(false); } }}
              // text={success ? (<BsCheckLg className={`h-[1rem] w-[1rem] `} />) : (`${sendButtonTitle[locale]}`)}
              // className={`min-w-[80px] lg:min-w-[100px] xs:px-4 text-center py-2 uppercase text-white min-[400px]:w-50% min-[430px]:w-fit h-fit outline-none `} />*/}
            </div>
          </div>

          {/* MESSAGE */}

        </LayoutSplit>
      </form>
    </Section>
  );
}
