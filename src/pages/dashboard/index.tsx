import { Navigate, Route, Routes } from "react-router-dom";
import DashboardHome from "./dashboardHome/dashboardHome";
import Projects from "./projects/projects";
import LeftBar from "../../components/leftbar/leftbar";
import { useContext } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import Create from "./create/create";

function Dashboard() {
    const { user } = useContext(AuthContext); 

    if(!user) {
        return <Navigate to={"/login"} />
    }
    else {
        return (
        <>
            <div className="md:flex">
                <LeftBar />
                <div className="xl:w-[82%] lg:w-[78%] md:w-[73%] ">
                    <Routes>
                        <Route path="/" element={<Navigate to={"/dashboard/home"} />} />
                        <Route path="/home" element={<DashboardHome />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/create" element={<Create />} />
                    </Routes>
                </div>
            </div>
        </>
        )
    }
    
}

export default Dashboard