import { Navigate, Route, Routes } from "react-router-dom";
import DashboardHome from "./dashboardHome/dashboardHome";
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
            <div className="md:px-[9%] px-[3%]">
                <Routes>
                    <Route path="/" element={<Navigate to={"/dashboard/home"} />} />
                    <Route path="/home" element={<DashboardHome />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </div>
        </>
        )
    }
    
}

export default Dashboard