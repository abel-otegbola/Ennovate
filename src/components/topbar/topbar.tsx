import Searchbar from "../searchbar/searchbar";
import { FiDatabase, FiGlobe, FiLogOut, FiPenTool, FiSettings, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import { useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { FaBars, FaTimes } from "react-icons/fa";


function Topbar() {
    const [open, setOpen] = useState(false)
    const {user} = useContext(AuthContext)
    const pathname = useLocation().pathname;
    const paths = [ "/project/"]
    const auth = getAuth(app)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if(open && menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    })

    return (
        <div className="flex items-center justify-between sticky top-0 left-0 w-full bg-white dark:bg-black p-[2px] lg:px-[9%] px-[3%] border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.09] z-20">

            <div className="flex gap-8 items-center">
                {/* Brand name and logo */}
                <a href="/" className={`md:ml-0 ${paths.indexOf(pathname) !== -1 ? "ml-10" : ""} py-2 flex gap-1`}>
                    <img src={logo} className="h-[25px]" />
                    <h1 className="font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#5938DD]">Ennovate</h1>
                </a>

                {/* Menu links for desktop */}
                <ul className="md:flex gap-2 items-center hidden">
                    <li><a href="/dashboard/create" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/dashboard/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></li>
                    <li><a href="/explore" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></li>
                    <li><a href="/resources" className={`flex gap-2 items-center px-4 py-1 rounded-full ${pathname === "/resources" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiDatabase className="text-[16px]"/> Resources</a></li>
                </ul>
            </div>

            <div ref={menuRef} className="flex items-center gap-6 relative">
                <div className="lg:w-[300px] flex-1 sm:block hidden">
                    <Searchbar />
                </div>

                {
                    user ? 
                    <a
                        href="/dashboard"
                        className="flex items-center justify-center w-[25px] h-[25px] py-0 rounded-full bg-slate-300/[0.5] outline outline-offset-2 outline-purple/[0.3] hover:text-green"
                        role="menuitem" 
                    >
                        { user?.photoURL ? <img src={user?.photoURL} alt="user" className="rounded-full" width={25} height={25} /> : user?.displayName.charAt(0)}
                    </a>
                    :
                    <a href="/login" className="md:block hidden px-6 py-[4px] bg-purple text-white rounded">Login</a>
                }
                
                <button className="text-[16px]" onClick={() => setOpen(!open)} aria-haspopup="true" aria-expanded={open} aria-controls="menu-popup" >
                    { !open ? <FaBars /> : <FaTimes /> }
                </button>
                    

                {/* Menu links for mobile */}
                <ul className={`gap-2 items-center absolute top-[50px] text-[13px] right-0 rounded-[10px] bg-white border border-gray-500/[0.1] dark:bg-black shadow-lg w-[230px] ${open ? "block" : "hidden"}`} id="menu-popup">
                    <div className="w-full p-2 sm:hidden block">
                        <Searchbar />
                    </div>
                    <li className="w-full"><a href={user ? "/dashboard" : "/login"} role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/login" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiUser className="text-[16px]"/> {user ? "Dashboard" : "Login" }</a></li>
                    <li className="w-full md:hidden"><a href="/dashboard/create" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/create" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiPenTool className="text-[16px]"/> Create</a></li>
                    <li className="w-full md:hidden"><a href="/explore" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiGlobe className="text-[16px]"/> Explore</a></li> 
                    <li className="w-full md:hidden"><a href="/resources" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded ${pathname === "/explore" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiDatabase className="text-[16px]"/> Resources</a></li> 
                    <li className="w-full"><a href="/settings" role="menuitem" className={`flex gap-2 items-center px-4 py-2 rounded border border-transparent border-t-gray-500/[0.1] ${pathname === "/settings" ? "bg-[#5938DD]/[0.05]" : "hover:bg-[#5938DD]/[0.05]"}`}><FiSettings className="text-[16px]"/> Settings</a></li> 
                    {
                        user ? <li className="w-full"><button role="menuitem" onClick={() => {signOut(auth); setOpen(false)}} className={`flex gap-2 mx-[5%] my-3 bg-purple w-[90%] text-white items-center px-4 py-2 rounded `}><FiLogOut className="text-[16px]"/> Logout</button></li> 
                        : ""
                    }                    
                </ul>
            </div>
        </div>
    )
}

export default Topbar;