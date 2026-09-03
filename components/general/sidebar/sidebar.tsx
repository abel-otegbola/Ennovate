'use client'
import { useContext, useState, type ReactElement } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { DatabaseIcon, GitGraphIcon, HomeIcon, LogOutIcon, LucideIcon, SettingsIcon, SidebarIcon, UserCircleIcon, VideoIcon, XIcon } from "lucide-react";
import { AuthContext } from "@/context/useAuth";

export interface Link {
    id: number; label: string; icon: ReactElement<LucideIcon>, activeIcon: ReactElement<LucideIcon>, link: string, subtext?: string
}

function Sidebar() {
    const [open, setOpen] = useState(true)
    const pathname = usePathname();
    const { user, logOut } = useContext(AuthContext);

    const generalLinks: Link[] = [
        { id: 0, label: "Home", icon: <HomeIcon strokeWidth={1} size={20} />, activeIcon: <HomeIcon size={20} />, link: "/discover" },
        { id: 1, label: "Library", icon: <DatabaseIcon strokeWidth={1}  size={20} />, activeIcon: <DatabaseIcon size={20} />, link: "/account/library" },
        { id: 2, label: "Stories", icon: <VideoIcon strokeWidth={1}  size={20} />, activeIcon: <VideoIcon size={20} />, link: "/account/stories" },
        { id: 3, label: "Stats", icon: <GitGraphIcon strokeWidth={1}  size={20} />, activeIcon: <GitGraphIcon size={20} />, link: "/account/stats" },
    ]
    
    const otherLinks: Link[] = [
        { id: 5, label: "Following", icon: <UserCircleIcon strokeWidth={1}  size={20} />, activeIcon: <UserCircleIcon size={20} />, link: "/account/following" },
        { id: 6, label: "Settings", icon: <SettingsIcon strokeWidth={1}  size={20} />, activeIcon: <SettingsIcon  size={20} />, link: "/account/settings" },
    ]

    return (
        <div className={`md:sticky top-0 left-0 h-screen w-0 duration-500 text-[14px] ${open ? "sm:w-[70px]": "sm:w-[250px]"}`}>
            <button className={`md:absolute fixed top-[18px] flex flex-col justify-center items-center backdrop-blur-md gap-1 z-[50] p-[6px] h-8 w-8 bg-gray-100 dark:bg-gray-500/[0.05] outline outline-offset-2 outline-secondary/[0.2] cursor-pointer rounded-full ${open ? "md:-right-3 right-5" : "right-5"}`} onClick={() => setOpen(!open)}>
                { open ?
                <XIcon strokeWidth={1} size={24} color="currentColor" />
                :
                <SidebarIcon strokeWidth={1} size={20} color="currentColor" />
                }
            </button>

            <div  className={`fixed top-0 right-0 md:hidden bg-[#000]/[0.5] duration-300 ${open ? "w-full h-full" : "w-0 h-full"}`} onClick={() => setOpen(false)}></div>
            <div  className={`flex flex-col justify-between md:h-full bg-white dark:bg-[#1C1B24] border-x border-gray-500/[0.1] dark:border-gray-500/[0.2] h-[100vh] md:sticky fixed md:shadow-none shadow-lg md:top-0 top-0 py-4 px-3 right-0 overflow-y-auto overflow-x-hidden z-[5] transition-all duration-700 ${open ? "sm:w-[70px] w-[280px] translate-x-[0px] opacity-[1]": "sm:w-full translate-x-[400px] md:translate-x-[0px] md:opacity-[1] opacity-[0]"}`}>  
                <Link href={"/"} className={`flex items-center fill-black dark:fill-white mb-2 h-[38px] ${open ? "sm:px-0 px-4" : "px-[14px]" }`}>
                    {/* <LogoIcon width={24} /> */}
                </Link>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col gap-6 mt-8">
                    <div className="flex flex-col gap-2">
                        {/* <p className={`text-gray-500 text-[12px] mb-2 px-4 ${open ? "sm:opacity-0" : ""}`}>MAIN</p> */}
                        {
                        generalLinks.map(link => {
                                return (
                                <Link key={link.id} onClick={() => setOpen(false)} href={ link.link} className={`relative flex items-center justify-between px-3 py-[6px] rounded-[8px] duration-300 ${pathname.includes(link.link) ? "text-primary" : "font-medium opacity-50 hover:bg-gray-500/[0.05]"}`}>
                                    <div className="flex items-center gap-6">
                                        <span className={`w-[18px] ${pathname.includes(link.link) ? "text-primary opacity-100" : "opacity-100"}`}>{pathname.includes(link.link) ? link.activeIcon : link.icon}</span>
                                        <span className={`flex-1 break-normal font-medium duration-500 ${open ? "sm:hidden" : ""}`}>{link.label} </span>
                                    </div>
                                    { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                                </Link>
                                )
                        })
                        }
                        {/* <p className={`text-gray-500 text-[12px] mb-2 px-4 mt-6 ${open ? "sm:opacity-0" : ""}`}>OTHERS</p> */}
                        <span className="w-full border-t border-gray-500/[0.1] my-6"></span>
                        {
                       otherLinks.map(link => {
                                return (
                                <Link key={link.id} onClick={() => setOpen(false)} href={ link.link} className={`relative flex items-center justify-between px-3 py-[6px] rounded-[8px] duration-300 ${pathname.includes(link.link) ? "text-primary" : "font-medium opacity-50 hover:bg-gray-500/[0.05]"}`}>
                                    <div className="flex items-center gap-6">
                                        <span className={`w-[18px] ${pathname.includes(link.link) ? "text-primary opacity-100" : "opacity-100"}`}>{pathname.includes(link.link) ? link.activeIcon : link.icon}</span>
                                        <span className={`flex-1 break-normal font-medium duration-500 ${open ? "sm:hidden" : ""}`}>{link.label} </span>
                                    </div>
                                    { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                                </Link>
                                )
                        })
                        }
                        
                        <button onClick={() => {
                            setOpen(false); 
                            logOut()
                        }
                        } className={`relative flex items-center justify-between px-3 py-[6px] md:rounded-[8px] duration-300 font-medium opacity-50 hover:bg-gray-500/[0.05]`}>
                            <div className="flex items-center gap-6">
                                <span className={`w-[18px]`}><LogOutIcon strokeWidth={1} size={20} /></span>
                                <span className={`flex-1 break-normal duration-500 ${open ? "sm:hidden" : ""}`}>Logout </span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* User Info & Theme Toggle */}
                <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">

                    {/* User Info */}
                    {
                    // user && 
                    (
                        <div className={`flex items-center gap-3 p-1`}>
                            {/* User Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-fuchsia-400 flex items-center justify-center text-white font-bold  flex-shrink-0">
                                <Image src={user?.avatar || "/profile.jpg"} alt="profile" width={32} height={32} className="rounded-full" />
                            </div>
                            
                            {/* User Details */}
                            <div className={`flex-1 min-w-0 ${open ? "sm:hidden" : ""}`}>
                                <p className="font-medium  mb-1">
                                    <span className=" capitalize">{user?.fullname || user?.email?.split('@')[0]}</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user?.email || ''}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
