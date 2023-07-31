import Searchbar from "../searchbar/searchbar";
import { FiBell, FiSettings } from "react-icons/fi";
import logo from "../../assets/logo.png"

function DashboardTopbar() {
    return (
        <div className="flex items-center justify-between bg-black p-2 px-4 border border-transparent border-b-gray-100/[0.09]">

            {/* Brand name and logo */}
            <a href="/" className="flex gap-2">
                <img src={logo} className="w-[25px] h-[25px]" />
                <span className="mt-1">Ennovate</span>
            </a>

            <Searchbar />

            <div className="flex items-center gap-3">
                <a href="/notifications" className="relative">
                    <FiBell className="text-3xl p-1 rounded" />
                    <span className="absolute p-[0.5px] px-[4px] text-[10px] rounded-full -top-1 right-0 bg-gradient-to-r from-purple to-green text-white">2</span>
                </a>
                <a href="/notifications" className="relative">
                    <FiSettings className="text-3xl p-1 rounded" />
                </a>
            </div>
        </div>
    )
}

export default DashboardTopbar;