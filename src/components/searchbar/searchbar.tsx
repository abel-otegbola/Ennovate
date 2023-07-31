import Button from "../button/button";

function Searchbar() {
    return (
        <form className="w-full text-[10px] gap-1 flex p-[3px] border border-slate-100/[0.09] rounded">
            <input className="p-[8px] bg-transparent flex-1 outline-none border-transparent border focus:border-green/[0.5] rounded" type="search" placeholder="Search projects..." />
            <Button text={"Search"} link={"#"} />
        </form>
    )
}

export default Searchbar;