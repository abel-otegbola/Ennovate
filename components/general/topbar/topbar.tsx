'use client'
import ScrollTextReveal from "@/components/animations/scroll-text-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useState } from 'react';
import SearchBar from "../search/searchBar";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/useAuth";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";
import ScrollAnimate from "@/components/animations/scrollAnimation";
import ResourcesSubMenu from "@/components/subMenus/resourcesSubMenu";
import LogoIcon from "@/assets/icons/logo";

export default function Topbar() {
    const [open, setOpen] = useState(false)
    const [openSubMenu, setOpenSubMenu] = useState("")
    const pathname = usePathname()
    const { user } = useContext(AuthContext)

    const removeFromPages = ["/discover", "/account", "/events", "/competitions", "/opportunities", "/login", "/register", "/forgot-password", "/reset-password"]

    if(removeFromPages.includes(pathname)) {
        return null
    }
    return (
        <>
        <ul className={`
            md:hidden fixed top-0 right-0 z-2 flex lg:flex-row flex-col lg:px-0 md:py-0 py-6 pt-12 px-4 bg-background lg:w-auto md:h-full h-screen w-full overflow-hidden
            ${open ? "translate-x-[0px] w-full" : "lg:translate-x-[0] translate-x-[120%] lg:w-auto w-0"} duration-500
        `}>
            <div className="py-6 mb-12">
                <SearchBar />
            </div>
            <p className="opacity-50 uppercase text-sm">menu</p>
            {
                
                [
                    { id: 0, title: "Discover", href: "/discover" },
                    { id: 1, title: "Features", href: "/features" },
                    { id: 2, title: "Resources", href: "/resources" },
                    { id: 3, title: "Products", href: "/products" },
                ].map(link => (
                        <Link
                            key={link.id}
                            href={link.href} 
                            className={`font-medium text-[28px] py-2 lg:border-none border-b border-gray-500/[0.2] duration-300`}
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
            <p className="opacity-50 uppercase text-sm mt-18">Contact</p>
            <Link href="mailto:info@ennovate.com" className="text-lg opacity-70">info@ennovate.com</Link>
        </ul>
        <div className="flex items-center justify-between md:px-8 px-4 bg-background border-b border-input/[0.4] py-2 sticky top-0 z-5">
            <div className="flex items-center gap-6 md:min-w-[15%]">
                <Link href={"/"} className="flex items-center gap-2">
                    <LogoIcon width={28} />
                    <h1 className="tracking-[10%] font-semibold text-[15px] uppercase">Ennovate.</h1>
                </Link>
                
                <div className="items-center gap-4 text-[14px] md:flex hidden">
                    {
                        [
                            { id: 0, title: "Discover", href: "/discover" },
                            { id: 1, title: "Features", href: "/features" },
                            { id: 2, title: "Resources", href: "#", subMenu: <ResourcesSubMenu /> },
                            { id: 3, title: "Products", href: "/products" },
                        ].map(link => (
                            <div key={link.id} >
                            <Link
                                className="px-2 py-2 capitalize flex gap-1 items-center opacity-75" 
                                href={link.href}
                                onClick={() => {
                                    // scroll to top of page
                                    setOpenSubMenu(!link.subMenu ? "" : openSubMenu === link.title ? "" : link.title )
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <span className="font-medium">{link.title}</span>
                                { link?.subMenu && <ChevronDownIcon className={`duration-500 ${!link.subMenu ? "rotate-[180deg]" : openSubMenu === link.title ? "rotate-[180deg]" : ""}` } size={14} /> }
                            </Link>
                            {
                                openSubMenu === link.title &&
                                <ScrollAnimate animation="slideDown" repeat={openSubMenu === link.title || openSubMenu === ""} className="w-[99%] mx-auto absolute top-[60px] left-[0.5%]">
                                    <div className="px-[3%] py-8 w-full border border-input/[0.6] rounded-[8px] bg-[#fff] shadow-[0px_20px_120px_0px_#10101020] duration-300 z-10">
                                    { link?.subMenu && link.subMenu }
                                    </div>
                                </ScrollAnimate>
                            }
                                
                            </div>
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
                            <Link href="/login">
                                <Button variant="outline" className="" size="sm">Sign in</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="" size="sm">Sign up</Button>
                            </Link>
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