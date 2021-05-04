import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

import translationEng from "./data/locales/eng/translation.json"
// import translationGer from "../locales/ger/translation.json";
// import translationFre from "../locales/fre/translation.json";
import translationHin from "./data/locales/hin/translation.json";
// import translationJap from "../locales/jap/translation.json";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    lng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
      en: {
        translation: translationEng
      },
      hin: {
        translation: translationHin
      },
    }
  });


// i18n
//   .use(XHR)
//   .use(LanguageDetector)
//   .init({
//     debug: true,
//     lng: "en",
//     fallbackLng: "en", // use en if detected lng is not available

//     keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false // react already safes from xss
//     },

//     resources: {
//       en: {
//         translations: translationEng
//       },
//     //   ger: {
//     //     translations: translationGer
//     //   },
//     //   fre: {
//     //     translations: translationFre
//     //   },
//       hin: {
//         translations: translationHin
//       },
//     //   jap: {
//     //     translations: translationJap
//     //   }
//     },
//     // have a common namespace used around the full app
//     ns: ["translations"],
//     defaultNS: "translations"
//   });

export default i18n;