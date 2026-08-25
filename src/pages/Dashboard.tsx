import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        {t("dashboard.title")}
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t("dashboard.welcome")}
      </p>
    </div>
  );
};

export default Dashboard;