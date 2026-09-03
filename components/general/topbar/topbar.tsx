'use client'
import ScrollTextReveal from "@/components/animations/scroll-text-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useState } from 'react';
import SearchBar from "../search/searchBar";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/useAuth";
import Image from "next/image";

export default function Topbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { user } = useContext(AuthContext)

    const removeFromPages = ["/discover", "/account", "/events", "/competitions", "/opportunities", "/login", "/register", "/forgot-password", "/reset-password"]

    if(removeFromPages.includes(pathname)) {
        return null
    }
    return (
        <>
        <ul className={`
            md:hidden fixed top-0 right-0 z-2 flex lg:flex-row flex-col lg:px-0 md:py-0 py-6 pt-12 px-4 bg-white dark:bg-dark-bg lg:w-auto md:h-full h-screen w-full overflow-hidden
            ${open ? "translate-x-[0px] w-full" : "lg:translate-x-[0] translate-x-[120%] lg:w-auto w-0"} duration-500
        `}>
            <div className="py-6">
                <SearchBar />
            </div>
            <p className="opacity-50 uppercase text-sm">menu</p>
            {
                
                [
                    { id: 0, title: "Discover", href: "/discover" },
                    { id: 1, title: "Events", href: "/events" },
                    { id: 2, title: "Competitions", href: "/competitions" },
                    { id: 3, title: "Opportunities", href: "/opportunities" },
                ].map(link => (
                        <Link
                            key={link.id}
                            href={link.href} 
                            className={`font-medium text-[42px] tracking-[-2px] py-2 lg:border-none border-b border-gray-500/[0.2] duration-300`}
                            onClick={() => {
                                setOpen(false)
                                // scroll to top of page
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <ScrollTextReveal repeat={open} delay={0.2 * (link.id + 1)}>
                                {link.title}
                            </ScrollTextReveal>
                        </Link>
                ))
            }
            <p className="opacity-50 uppercase text-sm mt-12">Contact</p>
            <Link href="mailto:info@ennovate.com" className="text-lg opacity-70">info@ennovate.com</Link>
        </ul>
        <div className="flex items-center justify-between md:px-[5%] px-4 bg-white/80 border-b border-input/[0.5] backdrop-blur-sm py-2 sticky top-0 z-5 overflow-x-hidden">
            <div className="flex items-center gap-6 md:min-w-[15%]">
                {/* <img src="/logo.png" className="w-[40px] h-[36px]" /> */}
                <Link href={"/"} className="flex flex-col gap-0">
                    <h1 className="tracking-[10%] font-bold text-[16px] uppercase">Ennovate.</h1>
                </Link>
                
                <div className="items-center font-medium opacity-75 gap-4 text-[14px] md:flex hidden">
                    {
                        ["discover", "events", "competitions"].map(link => (
                            <Link 
                                key={link} 
                                className="px-2 py-2 capitalize" 
                                href={`/${link.replace(" ", "-")}`}
                                onClick={() => {
                                    // scroll to top of page
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >{link}</Link>
                        ))
                    }
                </div>
            </div>
            <div className="items-center gap-4 md:flex hidden">
                <SearchBar />
                {
                    user ? (
                        <Link href={"/account"} className="flex items-center gap-2">
                            <Image src={user.avatar || "/user.png"} width={30} height={30} alt="user" className="w-[30px] h-[30px] rounded-full" />
                            <p className="text-[14px]">{user.fullname || user.email}</p>
                        </Link>
                    ) : (
                        <>
                <Button variant="ghost" className="" size="sm">Sign in</Button>
                <Button className="" size="sm">Sign up</Button>
                        </>
                    )
                }
            </div>
            
            <button className="md:hidden flex flex-col justify-center items-center gap-1 text-lg w-10 h-10 sm::hidden z-[50]" onClick={() => setOpen(!open)}>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-black rounded-[2px] ${open ? "rotate-[45deg] translate-y-[5px]" : "rotate-[0deg]"}`}></span>
                <span className={`duration-500 transition-all bg-black rounded-[2px] ${open ? "py-[0px] w-[0px] h-[0px] translate-x-[-24px]" : "translate-x-[4px] py-[1px] px-[10px] w-[8px] h-[2px]"}`}></span>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-black rounded-[2px] ${open ? "rotate-[-45deg] translate-y-[-5px]" : "rotate-[0deg]"}`}></span>
            </button>
        </div>
        </>
    )
}