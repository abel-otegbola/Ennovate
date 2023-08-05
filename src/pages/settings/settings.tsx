import { FiUser, FiSettings, FiShield, FiGlobe, FiTablet } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { FaBars, FaCheckCircle, FaTimes } from "react-icons/fa";
import dark from "../../assets/dark.png";
import light from "../../assets/light.png";
import system from "../../assets/system.png";
import { AuthContext } from "../../customHooks/useAuth";
import { useLocalStorage } from "../../customHooks/useLocalStorage";

interface Link {
    id: number; label: string; icon: any, link: string
}

interface Links extends Array<Link>{}

interface Theme {
    id: number, img: any, title: string
}
interface Themes extends Array<Theme>{}


function Settings() {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState("Appearance")
    const [theme, setTheme] = useState(localStorage.theme)
    const [fontSize, setFontSize] = useLocalStorage("size", 12)
    const { user } = useContext(AuthContext)

    const themes: Themes = [
        { id: 0, img: system, title: "System" },
        { id: 1, img: light, title: "light" },
        { id: 2, img: dark, title: "dark" },
    ]

    const generalLinks: Links = [
        { id: 0, label: "Appearance", icon: <FiSettings />, link: "#appearance" },
        { id: 1, label: "Preferences", icon: <FiUser />, link: "#preferences" },
        { id: 2, label: "Profile", icon: <FiTablet />, link: user ? "#account" : "/login" },
        { id: 3, label: "Notifications", icon: <FiGlobe />, link: "#notifications" },
        { id: 4, label: "Privacy & Safety", icon: <FiShield />, link: "#privacy" },
    ]

    useEffect(() => {
        if(theme === 'light') {
            // Whenever the user explicitly chooses light mode
            localStorage.theme = 'light'
        }
        else if(theme === 'dark') {
            // Whenever the user explicitly chooses dark mode
            localStorage.theme = 'dark'
        }  
        else {
            // Whenever the user explicitly chooses to respect the OS preference
            localStorage.removeItem('theme')
        }  
    }, [theme])
    
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        if(!localStorage.theme) {
            setTheme("System")
        }
    }, [theme])

    return (
        <>
        <button className="md:hidden fixed z-50 top-0 left-0 p-5 text-lg opacity-[0.6] " onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
        <div className="md:flex items-start">
            <div className={`xl:w-[18%] lg:w-[22%] md:w-[27%] text-[12px] h-screen md:sticky fixed top-[60px] left-0 bg-white dark:bg-black border border-transparent border-r-gray-200 dark:border-r-slate-100/[0.09] overflow-hidden z-10 transition-all duration-700 ${open ? " w-[240px]": "w-0"}`}>  
                <div className="flex items-center my-2 gap-4 p-4">
                    <div className="h-[40px] w-[40px] rounded bg-slate-100 dark:bg-slate-200/[0.04]"></div>
                    <div className="text-[10px]">
                        <h3>Abel Otegbola</h3>
                        <div className="flex items-center gap-4">
                            <p>Abelo</p>
                        </div>
                    </div>                    
                </div>
            {
                generalLinks.map(link => {return (
                    <a key={link.id} href={link.link} onClick={() => setActive(link.label)} className={`flex items-center justify-between w-full p-2 my-[1px] px-4 hover:bg-slate-100 dark:hover:bg-gray-200/[0.07] ${active === link.label ? "bg-slate-100 dark:bg-gray-200/[0.07] border border-transparent border-r-green text-green" : ""}`}>
                        <span className="w-[30px] text-lg">{link.icon}</span>
                        <span className="flex-1 p-2 break-normal">{link.label}</span>
                    </a>
                )})
            }
            </div>
            <div className="md:m-2 p-4 bg-white dark:bg-[#1d1d23]/[0.5] flex-1">
                <h2 className="text-xl pb-3 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.08]">Settings</h2>
                <div className="py-8 text-[12px]">
                    <h3 id="appearance" className="py-2 opacity-[0.6] text-lg">Appearance</h3>
                    <h3 className="pb-2 pt-4 text-sm">Interface theme</h3>
                    <p className="opacity-[0.6]">Select or customize your ui theme</p>
                    <div className="grid grid-cols-3 gap-4 py-2">
                        {
                            themes.map(item => {
                                return (
                                    <div key={item.id} className={`relative ${item.title === theme ? "text-green" : "hover:text-green"}`} onClick={() => setTheme(item.title)}>
                                        { theme === item.title ? <FaCheckCircle className="absolute -top-1 -right-1 text-lg text-green" /> : "" }
                                        <div className={`w-full bg-gray-200 dark:bg-slate-200/[0.08] cursor-pointer rounded  ${theme === item.title ? "border border-green/[0.5]" : "hover:border hover:border-green/[0.5]"}`}>
                                            <img src={item.img} className="w-full rounded" />
                                        </div>
                                        <h2 className="p-2 capitalize">{item.title}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <h3 id="preferences" className="py-2 opacity-[0.6] text-lg">Preferences</h3>
                    <h3 className="pb-2 pt-4 text-sm">Font</h3>
                    <p className="opacity-[0.6]">Font size</p>
                    <div className="flex items-center gap-4 py-2">
                        <select className="w-[100px] p-4 rounded bg-black text-white" onChange={(e) => setFontSize(e.target.value)} defaultValue={fontSize}>
                        {
                            [10, 12, 16, 20].map((item, i) => (
                                <option key={i} className="bg-black text-white">{item}</option>
                            ))
                        }
                        </select>
                        <p style={{ fontSize: fontSize }}>Renewable energy will help us achieve 100% free CO<sub>2</sub> emission</p>
                    </div>
                </div>

                {
                    user ?
                    <div className="py-8 text-[12px]">
                        <h3 id="account" className="py-2 opacity-[0.6] text-lg">Account</h3>
                        <h3 className="pb-2 pt-4 text-sm">Profile</h3>
                        <p className="opacity-[0.6]">Update your photo and personal details</p>
                        <div className="py-6">
                            <div className="md:flex items-center">
                                <p className="md:w-[30%] md:mb-0 mb-2">Username: </p>
                                <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" type="text" placeholder="Change your username" defaultValue={user?.displayName} />
                            </div>
                        </div>
                        <div className="py-6">
                            <div className="md:flex items-center">
                                <p className="md:w-[30%] md:mb-0 mb-2">Email: </p>
                                <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" type="email" placeholder="Change your email" defaultValue={user?.email} />
                            </div>
                        </div>
                        <div className="py-6">
                            <div className="md:flex items-center">
                                <p className="md:w-[23%] md:mb-0 mb-2">Your photo: </p>
                                <div className="h-[60px] w-[60px] rounded bg-slate-100 dark:bg-slate-200/[0.04]"></div>
                            </div>
                        </div>
                    </div>
                    : ""
                }
                
            </div>

        </div>
        </>
    )
}

export default Settings;