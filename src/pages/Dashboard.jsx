import { DashboardNavbar } from "@/pages/dashboard/DashboardNavbar";

export const Dashboard = () => {
    return (

        <div className="flex flex-col md:flex-row items-center min-h-screen">
            <div className="w-full md:w-64">
                <DashboardNavbar />
            </div>
            <div className="flex-1 bg-amber-300 min-h-screen w-full">
                MAIN PAGE
            </div>
        </div>

    )
}

export default Dashboard;