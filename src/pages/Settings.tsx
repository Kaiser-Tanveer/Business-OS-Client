import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t("settings.title")}
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t("settings.description")}
      </p>
    </div>
  );
};

export default Settings;