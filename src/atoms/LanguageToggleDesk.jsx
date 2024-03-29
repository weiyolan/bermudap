import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { TfiWorld } from 'react-icons/tfi'
import { gsap } from 'gsap/dist/gsap'
// import { useAppContext } from '@/utils/appContext'

export default function LanguageToggleDesk({ }) {
  const router = useRouter()
  const { locales, locale: activeLocale } = router

  // let { darkMode } = usePageContext()
  let darkMode = true;
  let ctx = useRef(gsap.context(() => { }))

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  )

  useEffect(() => {
    return () => ctx.current.revert()
  }, [])

  // useEffect(() => {
  // if (mobile) { return }
  // ctx.current.add(() => {
  // gsap.to('.languageLine', {
  //   width: hovering ? '100%' : 0,
  //   borderColor: hovering ? 'black' : 'transparent',
  //   duration: 0.3,
  //   ease: 'expo.out'
  // })
  // gsap.to('.languageText', {
  //   opacity: mobile ? 1 : (hovering ? 1 : 0),
  //   duration: 0.5,
  //   delay: hovering ? 0.2 : 0,
  //   ease: 'expo.out'
  // })
  // gsap.to('.languageIcon', {
  //   opacity: hovering ? 0 : 1,
  //   duration: 0.5,
  //   delay: hovering ? 0 : 0.2,
  //   ease: 'expo.out'
  // })
  // })
  // }, [hovering, mobile])


  return (
    <div
      className={` navButton  text-white text-xl xs:text-xl sm:text-base text-center flex justify-center items-center font-lora  
    font-black border border-transparent 
    focus-within:outline-darkGrey cursor-pointer select-none  `}>

      <div className='font-bel font-normal languageText'>
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            <Link
              href={{ pathname, query }}
              title={"Change language"}
              as={asPath}
              locale={locale}
              key={locale}
              className='focus:outline-none flex gap-1 justify-end'
            >
              {locale.toUpperCase()}
              <TfiWorld className={`font-bold my-auto w-5 h-5 languageIcon ${darkMode ? 'text-primary' : 'text-darkPrimary'}`} />
            </Link>
          )
        })}

      </div>

    </div>
  )
}
