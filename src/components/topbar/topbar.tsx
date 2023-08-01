import Searchbar from "../searchbar/searchbar";
import { FiBell, FiSettings } from "react-icons/fi";
import logo from "../../assets/logo.png"
import { FaUser } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../customHooks/useAuth";
import Button from "../button/button";

function Topbar() {
    const {user} = useContext(AuthContext)

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div className="flex items-center justify-between sticky top-0 left-0 w-full bg-white dark:bg-black p-2 px-4 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.09] z-20">

            {/* Brand name and logo */}

            <a href="/" className="md:ml-0 ml-10 py-2 flex gap-2">
                <img src={logo} className="w-[25px] h-[25px]" />
                <h1 className="mt-[2px] text-lg">Ennovate</h1>
            </a>

            <div className="md:w-[50%] md:block hidden">
                <Searchbar />
            </div>


            <div className="flex items-center gap-4">
                <a href="/settings" className="relative">
                    <FiSettings className="text-2xl p-1 rounded" />
                </a>
                {
                    !user ? <Button text={"Login"} link={"/login"} />
                    : <>
                        <a href="/notifications" className="relative">
                            <FiBell className="text-2xl p-1 rounded" />
                            <span className="absolute p-[3px] px-[3px] text-[10px] rounded-full top-0 right-1 bg-gradient-to-r from-purple to-green text-white"></span>
                        </a>
                        <a href="/dashboard" className="block rounded-full bg-slate-100/[0.5] outline outline-green/[0.3]">
                            <FaUser className="p-2 text-3xl" />
                        </a>
                    </>
                }
            </div>
        </div>
    )
}

export default Topbar;