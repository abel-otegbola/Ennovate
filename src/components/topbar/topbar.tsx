import Searchbar from "../searchbar/searchbar";
import { FiGlobe, FiLogOut, FiPenTool, FiSettings, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import { useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase";


function Topbar() {
    const [open, setOpen] = useState(false)
    const {user} = useContext(AuthContext)
    const pathname = useLocation().pathname;
    const paths = [ "/project/"]
    const auth = getAuth(app)
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
                    <img src={logo} className="h-[25px]" />
                    <h1 className="font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#5938DD]">Ennovate</h1>
                </a>

                {/* Menu links for desktop */}
                <ul className="md:flex gap-2 items-center hidden">
                    <li><button className="border-none"><a href="/dashboard/create" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/dashboard/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></button></li>
                    <li><button className="border-none"><a href="/explore" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></button></li>
                </ul>
            </div>

            <div className="flex items-center gap-6 relative">
                <div className="md:w-[300px] ">
                    <Searchbar />
                </div>
                <a href="/settings" className="hover:text-purple hover:outline hover:outline-purple/[0.3] outline-offset-1 p-[2px] rounded-full bg-gray-300/[0.5]" role="menuitem">
                    <FiSettings className="text-[22px] p-1 rounded" />
                </a>

                <button 
                    className="flex items-center justify-center w-[25px] h-[25px] py-0 rounded-full bg-slate-300/[0.5] outline outline-offset-2 outline-purple/[0.3] hover:text-green"
                    role="menuitem" 
                    aria-haspopup="true" aria-expanded={open} aria-controls="menu-popup"  
                    onKeyUp={(e) => handleKeyUp(e.key)} onClick={() => setOpen(!open)}  
                >
                    { user?.photoURL ? <img src={user?.photoURL} alt="user" className="rounded-full" width={25} height={25} /> : user?.displayName.charAt(0)}
                </button>
                    

                {/* Menu links for mobile */}
                <ul className={`gap-2 items-center absolute top-[50px] right-0 rounded bg-white dark:bg-black shadow-lg w-[200px] ${open ? "block" : "hidden"}`} id="menu-popup">
                    <li ref={menuRef} className="w-full"><a href={user ? "/dashboard" : "/login"} role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/login" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiUser className="text-[16px]"/> {user ? "Dashboard" : "Login" }</a></li>
                    <li className="w-full"><a href="/dashboard/create" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></li>
                    <li className="w-full"><a href="/explore" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></li> 
                    {
                        user ? <li className="w-full"><button role="menuitem" onClick={() => {signOut(auth); setOpen(false)}} className={`flex gap-2 items-center px-4 py-2 rounded `}><FiLogOut className="text-[16px]"/> Logout</button></li> 
                        : ""
                    }
                </ul>
            </div>
        </div>
    )
}

export default Topbar;