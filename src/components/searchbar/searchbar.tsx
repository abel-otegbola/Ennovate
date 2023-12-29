import { FaSearch } from "react-icons/fa";


function Searchbar() {
    return (
        <form action="/search" className="w-full text-[12px] gap-1 flex p-[2px] border border-gray-200 dark:border-slate-100/[0.09] rounded-full">
            <input className="px-2 bg-transparent flex-1 rounded-full outline-none border-transparent border focus:border-green/[0.5] rounded" name="search" type="search" placeholder="Search projects..." />
            <button className="px-[12px] bg-[#5938DD] rounded-full hover:bg-[#000] text-white"><FaSearch /></button>
        </form>
    )
}

export default Searchbar;