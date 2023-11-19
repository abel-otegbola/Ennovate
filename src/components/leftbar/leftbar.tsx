import { FiTablet, FiBox, FiLogOut, FiHeadphones, FiSettings, FiPenTool } from "react-icons/fi";
import { FaBars } from "react-icons/fa"
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
        { id: 0, label: "Dashboard", icon: <FiTablet />, link: "/dashboard/home", msg: "" },
        { id: 1, label: "Projects", icon: <FiBox />, link: "/dashboard/projects", msg: "20" },
        { id: 3, label: "Create", icon: <FiPenTool />, link: "/dashboard/create", msg: "" },
        // { id: 4, label: "Collaborate", icon: <FiUsers />, link: "/dashboard/collaborate", msg: "" },
    ]
    const userLinks: Links = [
        { id: 1, label: "Settings", icon: <FiSettings />, link: "/settings", msg: "2" },
        { id: 2, label: "Help", icon: <FiHeadphones />, link: "/dashboard/help", msg: "" },
        { id: 3, label: "Logout", icon: <FiLogOut />, link: "#", msg: "" }
    ]

    return (
        <>
        <button className="md:hidden fixed z-30 top-0 left-0 p-5 text-lg opacity-[0.6] " onClick={() => setOpen(!open)}><FaBars /></button>
        <div className={`xl:w-[18%] lg:w-[22%] md:w-[27%] pb-[10px] h-screen md:sticky fixed top-[60px] left-0 bg-white dark:bg-black border border-transparent border-r-gray-200 dark:border-r-slate-100/[0.09] overflow-hidden z-10 transition-all duration-700 ${open ? " w-[240px]": "w-0"}`}>
            <div className="flex items-center my-2 gap-4 p-4">
                <div className="h-[40px] w-[40px] rounded-full bg-slate-200 dark:bg-slate-200/[0.04]"></div>
                <div className="text-[10px] leading-[20px]">
                    <h3>{user?.email}</h3>
                    <p>{user?.displayName}</p>
                </div>                    
            </div>
            {
                generalLinks.map(link => {return (
                    <a key={link.id} href={link.link} className={`flex items-center justify-between w-full p-1 my-[1px] px-4 hover:bg-slate-100 dark:hover:bg-gray-200/[0.07] ${pathname === link.link ? "bg-gray-100 dark:bg-gray-200/[0.07] border border-transparent border-r-green text-green" : ""}`}>
                        <span className="w-[30px] text-[14px]">{link.icon}</span>
                        <span className="flex-1 p-2 break-normal">{link.label}</span>
                        <span className="p-[0px] px-2 rounded text-[10px] bg-purple/[0.1]">{link.msg}</span>
                    </a>
                )})
            }

            <p className="border border-transparent border-t-gray-100/[0.07] my-5 w-full"></p>
            {
                userLinks.map(link => {return (
                    <a key={link.id} href={link.link} onClick={() => link.label === "Logout" ? signOut(auth) : ""} className={`flex items-center justify-between w-full p-1 my-[1px] px-4 hover:bg-slate-100 dark:hover:bg-gray-200/[0.07] ${pathname === link.link ? "bg-gray-100 dark:bg-gray-200/[0.07] border border-transparent border-r-green text-green" : ""}`}>
                        <span className="w-[30px] text-[14px]">{link.icon}</span>
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