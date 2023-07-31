import { Navigate, Route, Routes } from "react-router-dom";
import DashboardHome from "./dashboardHome/dashboardHome";
import DashboardTopbar from "../../components/dashboardTopbar/dashboardTopbar";
import Projects from "./projects/projects";
import LeftBar from "../../components/leftbar/leftbar";

function Dashboard() {
    return (
        <>
            <DashboardTopbar />
            <div className="md:flex">
                <LeftBar />
                <div className="xl:w-[82%] lg:w-[78%] md:w-[73%] ">
                    <Routes>
                        <Route path="/" element={<Navigate to={"/dashboard/home"} />} />
                        <Route path="/home" element={<DashboardHome />} />
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Dashboard