import { FiTablet, FiBell, FiBox, FiPenTool, FiUser, FiUsers, FiLogOut, FiHeadphones, FiSettings } from "react-icons/fi";
import { useLocation } from "react-router-dom";

interface Link {
    id: number; label: string; icon: any, link: string, msg: string
}

interface Links extends Array<Link>{}

function LeftBar() {
    const pathname = useLocation().pathname;

    const generalLinks: Links = [
        { id: 0, label: "Dashboard", icon: <FiTablet />, link: "/dashboard/home", msg: "" },
        { id: 1, label: "Projects", icon: <FiBox />, link: "/dashboard/projects", msg: "2" },
        { id: 2, label: "Learn", icon: <FiPenTool />, link: "/dashboard/learn", msg: "" },
        { id: 2, label: "My Projects", icon: <FiUser />, link: "/dashboard/myprojects", msg: "" },
        { id: 2, label: "Collaborate", icon: <FiUsers />, link: "/dashboard/collaborate", msg: "" },
    ]
    const userLinks: Links = [
        { id: 0, label: "Notifications", icon: <FiBell />, link: "/dashboard/notifications", msg: "" },
        { id: 1, label: "Settings", icon: <FiSettings />, link: "/dashboard/settings", msg: "2" },
        { id: 2, label: "Help", icon: <FiHeadphones />, link: "/dashboard/help", msg: "" },
        { id: 2, label: "Logout", icon: <FiLogOut />, link: "#", msg: "" }
    ]

    return (
        <div className="w-[240px] py-[20px] text-[12px] h-screen sticky top-0 left-0 bg-black border border-transparent border-r-slate-100/[0.09]">
            {
                generalLinks.map(link => {return (
                    <a key={link.id} href={link.link} className={`flex items-center justify-between w-full p-2 my-[1px] px-4 hover:bg-gray-200/[0.07] ${pathname === link.link ? "bg-gray-200/[0.07] border border-transparent border-r-green text-green" : ""}`}>
                        <span className="w-[30px]">{link.icon}</span>
                        <span className="flex-1 p-2">{link.label}</span>
                        <span className="p-[0px] px-2 rounded text-[10px] bg-purple/[0.1]">{link.msg}</span>
                    </a>
                )})
            }

            <p className="border border-transparent border-t-gray-100/[0.07] my-5 w-full"></p>
            {
                userLinks.map(link => {return (
                    <a key={link.id} href={link.link} className={`flex items-center justify-between w-full p-2 my-[1px] px-4 hover:bg-gray-200/[0.07] ${pathname === link.link ? "bg-gray-200/[0.07] border border-transparent border-r-green text-green" : ""}`}>
                        <span className="w-[30px]">{link.icon}</span>
                        <span className="flex-1 p-2">{link.label}</span>
                        <span className="p-[0px] px-2 rounded text-[10px] bg-purple/[0.1]">{link.msg}</span>
                    </a>
                )})
            }
        </div>
    )
}

export default LeftBar;