import { Navigate, Route, Routes } from "react-router-dom";
import DashboardHome from "./dashboardHome/dashboardHome";
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
            <div className="md:flex md:px-[9%] px-[3%]">
                <LeftBar />
                <div className="xl:w-[80%] lg:w-[75%] md:w-[60%] ">
                    <Routes>
                        <Route path="/" element={<Navigate to={"/dashboard/home"} />} />
                        <Route path="/home" element={<DashboardHome />} />
                        <Route path="/create" element={<Create />} />
                    </Routes>
                </div>
            </div>
        </>
        )
    }
    
}

export default Dashboard