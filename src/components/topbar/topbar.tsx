import Searchbar from "../searchbar/searchbar";
import { FiGlobe, FiPenTool, FiSettings, FiTablet, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg"
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import Button from "../button/button";
import { useLocation } from "react-router-dom";


interface Link {
    id: number; label: string; icon: any, link: string
}

interface Links extends Array<Link>{}

function Topbar() {
    const [open, setOpen] = useState(false)
    const {user} = useContext(AuthContext)
    const pathname = useLocation().pathname;
    const paths = ["/dashboard/home", "/dashboard/projects", "/dashboard/create", "/dashboard/notifications", "/project/"]

    
    const settingsLinks: Links = [
        { id: 0, label: "Appearance", icon: <FiSettings />, link: "#appearance" },
        { id: 1, label: "Preferences", icon: <FiUser />, link: "#preferences" },
        { id: 2, label: "Profile", icon: <FiTablet />, link: user ? "#account" : "/login" }
    ]

    return (
        <div className="flex items-center justify-between sticky top-0 left-0 w-full bg-white dark:bg-black p-[2px] md:px-[9%] px-[3%] border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.09] z-20">

            {/* Brand name and logo */}

            <div className="flex gap-8 items-center">
                <a href="/" className={`md:ml-0 ${paths.indexOf(pathname) !== -1 ? "ml-10" : ""} py-2 flex gap-1`}>
                    <img src={logo} className="w-[25px] h-[25px]" />
                    <h1 className="font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#5938DD]">Ennovate</h1>
                </a>

                <ul className="md:flex gap-2 items-center hidden">
                    <li><button className="border-none"><a href="/dashboard/create" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/dashboard/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></button></li>
                    <li><button className="border-none"><a href="/explore" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></button></li>
                </ul>
            </div>

            <div className="flex items-center gap-6 relative">
                <div className="md:w-[300px] md:block hidden">
                    <Searchbar />
                </div>
                <a href="/settings" className="hover:text-green">
                    <FiSettings className="text-[25px] p-1 rounded" />
                </a>
                {
                    !user ? <Button text={"Login"} link={"/login"} />
                    : <>
                        <a href="/dashboard" className="block rounded-full bg-slate-100/[0.5] outline outline-green/[0.1] hover:text-green">
                            <FaUser className="p-[6px] text-2xl" />
                        </a>
                    </>
                }
                <div className="hover:text-green text-[18px] md:hidden block" onClick={() => setOpen(!open)}>
                    {
                        !open ? <FaBars /> : <FaTimes />
                    }
                </div>
                <ul className={`gap-2 items-center absolute top-[50px] right-0 rounded bg-white dark:bg-black shadow-lg w-[200px] ${open ? "md:hidden block" : "hidden"}`}>
                    {
                        pathname === "/settings" ? 
                            <div className="py-2 border border-transparent border-b-gray-400/[0.3]">
                                <p className="px-4 py-2 border border-transparent border-b-gray-400/[0.3]">Settings</p>
                                {
                                settingsLinks.map(link => {
                                    return (
                                        <li key={link.id} className="w-full"><button className="border-none w-full">
                                            <a href={link.link} className={`flex gap-2 items-center px-4 py-2 rounded hover:bg-[#5938DD]/[0.05]`}>
                                                <span className="text-[16px]">{link.icon}</span>
                                                {link.label}
                                            </a>
                                            </button>
                                        </li>
                                    )})
                                }
                            </div>
                        : ""
                    }
                    <li className="w-full"><button className="border-none w-full"><a href="/dashboard/create" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></button></li>
                    <li className="w-full"><button className="border-none w-full"><a href="/explore" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></button></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Topbar;