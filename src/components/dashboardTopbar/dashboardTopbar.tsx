import Searchbar from "../searchbar/searchbar";
import { FiBell, FiSettings } from "react-icons/fi";
import logo from "../../assets/logo.png"

function DashboardTopbar() {
    return (
        <div className="flex items-center justify-between sticky top-0 left-0 w-full bg-white dark:bg-black p-2 px-4 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.09] z-10">

            {/* Brand name and logo */}

            <a href="/" className="md:ml-0 ml-10 py-2 flex gap-2">
                <img src={logo} className="w-[25px] h-[25px]" />
                <h1 className="mt-[2px]">Ennovate</h1>
            </a>

            <div className="md:w-[50%] md:block hidden">
                <Searchbar />
            </div>

            <div className="flex items-center gap-3">
                <a href="/notifications" className="relative">
                    <FiBell className="text-2xl p-1 rounded" />
                    <span className="absolute p-[3px] px-[3px] text-[10px] rounded-full top-0 right-1 bg-gradient-to-r from-purple to-green text-white"></span>
                </a>
                <a href="/notifications" className="relative">
                    <FiSettings className="text-2xl p-1 rounded" />
                </a>
            </div>
        </div>
    )
}

export default DashboardTopbar;