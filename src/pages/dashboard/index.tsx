import { Navigate, Route, Routes } from "react-router-dom";
import DashboardHome from "./dashboardHome/dashboardHome";
import DashboardTopbar from "../../components/dashboardTopbar/dashboardTopbar";
import Projects from "./projects/projects";

function Dashboard() {
    return (
        <>
            <DashboardTopbar />
            <Routes>
                <Route path="/dashboard/" element={<Navigate to={"/dashboard/home"} />} />
                <Route path="/dashboard/home" element={<DashboardHome />} />
                <Route path="/dashboard/projects" element={<Projects />} />
            </Routes>
        </>
    )
}

export default Dashboard