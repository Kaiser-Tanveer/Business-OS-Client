import { useTranslation } from "react-i18next";

const Reports = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t("reports.title")}
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t("reports.description")}
      </p>
    </div>
  );
};

export default Reports;