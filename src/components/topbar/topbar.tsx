import Searchbar from "../searchbar/searchbar";
import { FiSettings } from "react-icons/fi";
import logo from "../../assets/logo.png"
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import Button from "../button/button";
import { useLocation } from "react-router-dom";

function Topbar() {
    const {user} = useContext(AuthContext)
    const pathname = useLocation().pathname;
    const paths = ["/dashboard/home", "/dashboard/projects", "/dashboard/create", "/dashboard/notifications",  "/settings", "/project/"]

    return (
        <div className="flex items-center justify-between sticky top-0 left-0 w-full bg-white dark:bg-black p-2 px-4 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.09] z-20">

            {/* Brand name and logo */}

            <a href="/" className={`md:ml-0 ${paths.indexOf(pathname) !== -1 ? "ml-10" : ""} py-2 flex gap-2`}>
                <img src={logo} className="w-[25px] h-[25px]" />
                <h1 className="mt-[2px] text-lg">Ennovate</h1>
            </a>

            


            <div className="flex items-center gap-6">
                <div className="md:w-[300px] md:block hidden">
                    <Searchbar />
                </div>
                <a href="/settings" className="hover:text-green">
                    <FiSettings className="text-2xl p-1 rounded" />
                </a>
                {
                    !user ? <Button text={"Login"} link={"/login"} />
                    : <>
                        <a href="/dashboard" className="block rounded-full bg-slate-100/[0.5] outline outline-green/[0.3] hover:text-green">
                            <FaUser className="p-2 text-3xl" />
                        </a>
                    </>
                }
            </div>
        </div>
    )
}

export default Topbar;