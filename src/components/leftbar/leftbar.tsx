import { FiLogOut, FiPenTool } from "react-icons/fi";
import { TbDashboard } from "react-icons/tb";
import { FaBars, FaTimes } from "react-icons/fa"
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase";

interface Link {
    id: number; label: string; icon: any, link: string, msg: string
}

interface Links extends Array<Link>{}

function LeftBar() {
    const [open, setOpen] = useState(false)
    const pathname = useLocation().pathname;
    const { user } = useContext(AuthContext);

    const auth = getAuth(app)

    const generalLinks: Links = [
        { id: 0, label: "Dashboard", icon: <TbDashboard />, link: "/dashboard/home", msg: "" },
        { id: 1, label: "Create", icon: <FiPenTool />, link: "/dashboard/create", msg: "" },
        { id: 2, label: "Logout", icon: <FiLogOut />, link: "#", msg: "" }
    ]

    return (
        <>
        <button className="md:hidden fixed z-30 top-0 left-0 p-4 text-lg opacity-[0.6] " onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars /> }</button>
        <div className={`xl:w-[20%] lg:w-[25%] md:w-[30%] pb-[10px] h-screen md:sticky fixed top-[60px] left-0 md:p-2 bg-white dark:bg-black border border-transparent border-r-gray-200 dark:border-r-slate-100/[0.09] overflow-hidden z-10 transition-all duration-700 ${open ? " w-[240px] p-2": "w-0"}`}>
            <div className="flex items-center mb-4 gap-4">
                <div className="flex justify-center items-center text-[18px] py-1 px-3 rounded-full bg-slate-200 dark:bg-slate-200/[0.04]">
                    {user?.email.charAt(0).toUpperCase()}
                </div>
                <div className="text-[10px] leading-[20px]">
                    <h3 className="font-semibold text-[12px]">{user?.displayName}</h3>
                    <p>{user?.email}</p>
                </div>                    
            </div>
            {
                generalLinks.map(link => {return (
                    <a key={link.id} href={link.link} onClick={() => link.label === "Logout" ? signOut(auth) : ""}  className={`flex items-center justify-between w-full p-1 my-[2px] px-4 rounded hover:bg-[#5938DD] hover:text-white ${pathname === link.link ? "bg-[#5938DD] text-white" : ""}`}>
                        <span className="w-[30px] text-[18px]">{link.icon}</span>
                        <span className="flex-1 p-2 break-normal">{link.label}</span>
                        <span className="p-[0px] px-2 rounded text-[10px] bg-purple/[0.1]">{link.msg}</span>
                    </a>
                )})
            }
        </div>
        </>
    )
}

export default LeftBar;