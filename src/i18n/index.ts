import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/translation";
import bn from "../locales/bn/translation";

const savedLanguage = localStorage.getItem("language");

const initialLanguage =
  savedLanguage === "bn" ? "bn" : "en";

i18n.use(initReactI18next).init({
  resources: {
    en,
    bn,
  },

  lng: initialLanguage,

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = initialLanguage;

export default i18n;