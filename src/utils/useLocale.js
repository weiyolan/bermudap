// import { useCurrentLocale } from "next-i18n-router/client";
// import i18nConfig from "@/i18nConfig";
import { useRouter } from "next/router";

export default function useLocale() {
  const { locale } = useRouter();
  return locale;
}

// export function useLocale() {
//   const locale = useCurrentLocale(i18nConfig);
//   return locale;
// }
