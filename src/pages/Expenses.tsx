import { useTranslation } from "react-i18next";

const Expenses = () => {
  const {t} = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t("expenses.title")}
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t("expenses.description")}
      </p>
    </div>
  );
};

export default Expenses;