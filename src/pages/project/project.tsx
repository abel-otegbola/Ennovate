import { useEffect, useState } from "react";
import { FaBars, FaMoneyCheck, FaTimes } from "react-icons/fa";
import { FiBox, FiInfo, FiList, FiUsers, FiVideo } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { child, get, ref } from "firebase/database";

interface Link {
    id: number; label: string; icon: any, link: string
}

interface Links extends Array<Link>{}

function Project() {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState("Appearance")
    const [searchParams] = useSearchParams()
    const [project, setProject] = useState({ title: "", category: "", date: "", description: "", equipments: [], img: {name: "", url: ""}, links: "", procedures: "", user: "" })
    
    const generalLinks: Links = [
        { id: 0, label: "Description", icon: <FiInfo />, link: "#description" },
        { id: 1, label: "Video", icon: <FiVideo />, link: "#video" },
        { id: 2, label: "Equipments", icon: <FiBox />, link: "#equipments" },
        { id: 3, label: "Procedures", icon: <FiList />, link: "#procedures" },
        { id: 4, label: "Estimations", icon: <FaMoneyCheck />, link: "#estimations" },
        { id: 5, label: "Comments", icon: <FiUsers />, link: "#comments" },
    ]

    useEffect(() => {
        const id = searchParams.get("id")
        const dbRef = ref(database);
        get(child(dbRef, `projects/${id}`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            setProject(snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
        });

    }, [searchParams])

    return (
        <>
            <button className="md:hidden fixed z-50 top-0 left-0 p-5 text-lg opacity-[0.6] " onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
            <div className="md:flex items-start">
                <div className={`xl:w-[18%] lg:w-[22%] md:w-[27%] text-[12px] h-screen md:sticky fixed top-[60px] left-0 bg-white dark:bg-black border border-transparent border-r-gray-200 dark:border-r-slate-100/[0.09] overflow-hidden z-10 transition-all duration-700 ${open ? " w-[240px]": "w-0"}`}>  
                    <div className="flex items-center my-2 gap-4 p-4">
                        <div className="h-[40px] w-[40px] rounded bg-slate-100 dark:bg-slate-200/[0.04]"></div>
                        <div className="text-[10px]">
                            <h3>{project.user}</h3>
                            <div className="flex items-center gap-4">
                                <p>{project.date}</p>
                                <p>{project.category}</p>
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

                <div className="p-[3%] flex-1">
                    <div className="py-10 border border-transparent border-b-gray-200 dark: border-b-gray-100/[0.1]">
                        <h1 className="md:text-4xl text-xl font-bold py-2">{project.title}</h1>
                        <p>By: {project.user}</p>
                        <div className="flex items-center gap-4">
                            <p>{project.date}</p>
                        </div>
                    </div>
                    <div className={`flex justify-center items-center md:w-[70%] w-full py-10 md:h-[400px] h-[350px] cursor-pointer rounded border border-transparent border-b-gray-200 dark: border-b-gray-100/[0.1]`}>
                        <img src={project.img?.url} className="w-full h-full object-cover" />
                    </div>
                    <div id="description" className="py-10 border border-transparent border-b-gray-200 dark: border-b-gray-100/[0.1]">
                        <h1 className="text-lg py-2">Description</h1>
                        <p>{project.description}</p>
                    </div>
                    <div id="equipments" className="py-10 border border-transparent border-b-gray-200 dark: border-b-gray-100/[0.1]">
                        <h1 className="text-lg py-2">Equipments</h1>
                        {project.equipments.map((equipment, i) => {
                            return (
                                <p key={i} className="py-1 flex gap-2"><span>{i + 1}.</span>{equipment}</p>
                            )
                        })}
                    </div>
                    <div id="procedures" className="py-10 border border-transparent border-b-gray-200 dark: border-b-gray-100/[0.1]">
                        <h1 className="text-lg py-2">Procedures</h1>
                        <p>{project.procedures}</p>
                    </div>
                    <div className="py-10 border border-transparent border-b-gray-200 dark: border-b-gray-100/[0.1]">
                        <h1 className="text-lg py-2">Links</h1>
                        <p>{project.links}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;