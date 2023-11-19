import { FaSearch } from "react-icons/fa";

function Searchbar() {
    return (
        <form className="w-full text-[12px] gap-1 flex p-[2px] border border-gray-200 dark:border-slate-100/[0.09] rounded">
            <input className="p-[5px] bg-transparent flex-1 outline-none border-transparent border focus:border-green/[0.5] rounded" name="search" type="search" placeholder="Search projects..." />
            <button className="px-[20px] py-[5px] bg-[#5938DD] rounded hover:bg-[#000] text-white"><FaSearch /></button>
        </form>
    )
}

export default Searchbar;