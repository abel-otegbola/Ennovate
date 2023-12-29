import Searchbar from "../searchbar/searchbar";
import { FiGlobe, FiPenTool, FiSettings, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg"
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import { useLocation } from "react-router-dom";


function Topbar() {
    const [open, setOpen] = useState(false)
    const {user} = useContext(AuthContext)
    const pathname = useLocation().pathname;
    const paths = ["/dashboard/home", "/dashboard/projects", "/dashboard/create", "/dashboard/notifications", "/project/"]
    const menuRef = useRef<HTMLLIElement>(null)

    const handleKeyUp = (key: string) => {
        if (key === "Space") {
            setOpen(!open)
            if(menuRef.current) {
                menuRef.current.focus()
            }
        }
    }

    return (
        <div className="flex items-center justify-between sticky top-0 left-0 w-full bg-white dark:bg-black p-[2px] md:px-[9%] px-[3%] border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.09] z-20">

            <div className="flex gap-8 items-center">
                {/* Brand name and logo */}
                <a href="/" className={`md:ml-0 ${paths.indexOf(pathname) !== -1 ? "ml-10" : ""} py-2 flex gap-1`}>
                    <img src={logo} className="w-[25px] h-[25px]" />
                    <h1 className="font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#5938DD]">Ennovate</h1>
                </a>

                {/* Menu links for desktop */}
                <ul className="md:flex gap-2 items-center hidden">
                    <li><button className="border-none"><a href="/dashboard/create" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/dashboard/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></button></li>
                    <li><button className="border-none"><a href="/explore" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></button></li>
                </ul>
            </div>

            <div className="flex items-center gap-6 relative">
                <div className="md:w-[300px] md:block hidden">
                    <Searchbar />
                </div>
                <a href="/settings" className="hover:text-green" role="menuitem">
                    <FiSettings className="text-[25px] p-1 rounded" />
                </a>

                {/* Show user avatar if logged in, else show login button  */}
                {
                    !user ? <a href="/login" className="md:block hidden px-8 py-1 rounded-full text-purple" role="menuitem">Login</a>
                    : <>
                        <a 
                            href="/dashboard" 
                            className="flex items-center justify-center w-[25px] h-[25px] py-0 rounded-full bg-slate-100/[0.5] outline outline-offset-2 outline-green/[0.1] hover:text-green"
                            role="menuitem"    
                        >
                            { user?.photoURL ? <img src={user?.photoURL} alt="user" className="rounded-full" width={25} height={25} /> : user?.displayName.charAt(0)}
                        </a>
                    </>
                }

                {/* Menu links for mobile */}
                <button className="hover:text-green text-[18px] md:hidden block" aria-haspopup="true" aria-expanded={open} aria-controls="menu-popup" onKeyUp={(e) => handleKeyUp(e.key)} onClick={() => setOpen(!open)}>
                    {
                        !open ? <FaBars /> : <FaTimes />
                    }
                </button>
                <ul className={`gap-2 items-center absolute top-[50px] right-0 rounded bg-white dark:bg-black shadow-lg w-[200px] ${open ? "md:hidden block" : "hidden"}`} id="menu-popup">
                    <li ref={menuRef} className="w-full"><a href={user ? "/dashboard" : "/login"} role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/login" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiUser className="text-[16px]"/> {user ? "Dashboard" : "Login" }</a></li>
                    <li className="w-full"><a href="/dashboard/create" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></li>
                    <li className="w-full"><a href="/explore" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></li> 
                </ul>
            </div>
        </div>
    )
}

export default Topbar;