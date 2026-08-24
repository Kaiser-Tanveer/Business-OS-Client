import SideMenu from "../../components/dashboard/SideMenu";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - 30% */}
      <aside className="w-[30%]">
        <SideMenu />
      </aside>

      {/* Main Content - 70% */}
      <main className="w-[70%] bg-gray-100 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Welcome to your business dashboard.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;