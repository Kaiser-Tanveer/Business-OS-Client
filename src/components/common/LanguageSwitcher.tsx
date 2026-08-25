import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage =
    i18n.language === "bn" ? "bn" : "en";

  const changeLanguage = (language: "en" | "bn") => {
    i18n.changeLanguage(language);

    localStorage.setItem("language", language);

    document.documentElement.lang = language;
  };

  return (
    <div
      className="
        flex h-10 items-center gap-1
        rounded-lg border
        border-slate-200
        bg-white
        p-1

        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <Languages
        size={17}
        className="
          ml-2
          text-slate-400
          dark:text-slate-400
        "
      />

      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={`
          rounded-md
          px-2.5 py-1.5
          text-xs
          font-semibold
          transition-colors

          ${
            currentLanguage === "en"
              ? `
                bg-slate-200
                text-slate-900

                dark:bg-slate-600
                dark:text-white
              `
              : `
                text-slate-500
                hover:text-slate-900

                dark:text-slate-400
                dark:hover:text-white
              `
          }
        `}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("bn")}
        className={`
          rounded-md
          px-2.5 py-1.5
          text-xs
          font-semibold
          transition-colors

          ${
            currentLanguage === "bn"
              ? `
                bg-slate-200
                text-slate-900

                dark:bg-slate-600
                dark:text-white
              `
              : `
                text-slate-500
                hover:text-slate-900

                dark:text-slate-400
                dark:hover:text-white
              `
          }
        `}
      >
        বাংলা
      </button>
    </div>
  );
};

export default LanguageSwitcher;