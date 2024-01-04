import axios from "axios";
import { useEffect, useState } from "react";
import { FiDatabase, FiHome, FiMessageSquare, FiSettings } from "react-icons/fi";
import AIChat from "../../components/aichat/aichat";
import { FaBars, FaTimes } from "react-icons/fa";
import { TbCalculator } from "react-icons/tb";

interface Link {
    id: number; label: string; icon: any, link: string
}
interface Links extends Array<Link>{}

export default function Resources() {
    const [active, setActive] = useState("Overview") 
    const [open, setOpen] = useState(false)

    const generalLinks: Links = [
        { id: 0, label: "Overview", icon: <FiDatabase />, link: "#overview" },
        { id: 1, label: "Energy Optimization", icon: <FiSettings />, link: "#optimization" },
        { id: 2, label: "Energy Calculator", icon: <TbCalculator />, link: "#calculator" },
        { id: 3, label: "AI Chat", icon: <FiMessageSquare />, link: "#chat" }
    ]

    useEffect(() => {
        axios.get("")
    })

    return (
        <div className="">

            <div className="flex items-center gap-2 text-[12px] py-4 md:px-[9%] px-[3%] border border-transparent border-b-gray-200 dark:border-b-slate-100/[0.09] ">
                <button className="md:hidden p-2 mr-2 text-lg" onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
                <a href="/" className="text-lg"><FiHome /></a> | <a href="/resources" className="opacity-[0.6]"> Resources</a> | <span className="opacity-[0.6]"> {active}</span>
            </div>
            
            <div className="md:flex relative min-h-[100vh] md:px-[9%] px-[3%] bg-white dark:bg-transparent">
                <div className={`lg:w-[25%] md:w-[27%] w-[240px] h-screen md:sticky absolute top-[0px] md:pl-0 p-4 left-0 bg-white dark:bg-black border border-transparent border-r-gray-200 dark:border-r-slate-100/[0.09] overflow-hidden z-10 transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[-130%]"}`}>  
                    {
                        generalLinks.map(link => {
                                return (
                                <a key={link.id} href={link.link} onClick={() => {setActive(link.label); setOpen(false) }} className={`flex items-center justify-between p-1 my-[2px] px-4 hover:bg-purple hover:text-white rounded ${active === link.label ? "bg-purple text-white" : ""}`}>
                                    <span className="w-[30px] text-lg">{link.icon}</span>
                                    <span className="flex-1 p-2 break-normal">{link.label}</span>
                                </a>
                                )
                        })
                    }
                </div>

                <div className="md:p-[3%] py-3">
                    <h1 className="font-semibold uppercase text-[15px] text-purple">Energy Calculator</h1>
                        <p>Welcome to the Energy Calculator. We help you detect the amount of energy your devices use and best way to optimize.</p>
                    <AIChat />
                </div>
            </div>
        </div>
    )
}