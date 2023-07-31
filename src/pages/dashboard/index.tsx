import { Navigate, Route, Routes } from "react-router-dom";
import DashboardHome from "./dashboardHome/dashboardHome";
import DashboardTopbar from "../../components/dashboardTopbar/dashboardTopbar";
import Projects from "./projects/projects";
import LeftBar from "../../components/leftbar/leftbar";

function Dashboard() {
    return (
        <>
            <DashboardTopbar />
            <div className="flex">
                <LeftBar />
                <div className="flex-1">   
                    <Routes>
                        <Route path="/dashboard/" element={<Navigate to={"/dashboard/home"} />} />
                        <Route path="/dashboard/home" element={<DashboardHome />} />
                        <Route path="/dashboard/projects" element={<Projects />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Dashboard