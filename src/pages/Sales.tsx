import { useTranslation } from "react-i18next";

const Sales = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        {t("sales.title")}
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t("sales.description")}
      </p>

      <button className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-white">
        {t("sales.newSale")}
      </button>
    </div>
  );
};

export default Sales;