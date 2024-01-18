import { useContext, useEffect, useState } from "react";
import { FaBars, FaMoneyCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { FiBox, FiEdit, FiHome, FiInfo, FiList, FiTrash, FiUsers } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { child, get, ref, remove } from "firebase/database";
import Chat from "../../components/chat/chat";
import { AuthContext } from "../../customHooks/useAuth";
import Popup from "../../components/popup/popup";
import Skeleton from "../../components/projectGrid/projectSkeleton";

interface Link {
    id: number; label: string; icon: any, link: string
}

interface Links extends Array<Link>{}

function Project() {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState("Description")
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState({type: "", msg: ""})
    const { user } = useContext(AuthContext)
    const [project, setProject] = useState({ title: "", category: "", date: "", description: "", equipments: [], images: [{name: "", url: ""}], links: "", estimation: "", video: "", procedures: "", user: { displayName: "", email: "", photoURL: ""} })
    const navigate = useNavigate()
    
    const generalLinks: Links = [
        { id: 0, label: "Description", icon: <FiInfo />, link: "#description" },
        { id: 2, label: "Equipments", icon: <FiBox />, link: "#equipments" },
        { id: 3, label: "Procedures", icon: <FiList />, link: "#procedures" },
        { id: 4, label: "Estimations", icon: <FaMoneyCheck />, link: "#estimations" },
        { id: 5, label: "Chats", icon: <FiUsers />, link: "#chats" },
    ]
    const id = searchParams.get("id")

    useEffect(() => {
        setLoading(true)
        const dbRef = ref(database);
        get(child(dbRef, `projects/${id}`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            setProject(snapshot.val());
            setLoading(false)
        } else {
            setPopup({type: "error", msg: "No data available"});
            setLoading(false)
        }
        }).catch((error) => {
            console.error(error);
            setLoading(false)
        });

    }, [searchParams])

    const handleDelete = () => {
        setLoading(true)
        remove(ref(database, `projects/${id}`))
        .then(() => {
            setLoading(false)
            setPopup({type: "success", msg: "Project deleted succesfully"})
            navigate("/dashboard")
        })
        .catch(() => {
            setPopup({type: "error", msg: "Error occured. Project not deleted"})
        })
    }

    return (
        <div className="">

            {    
            popup.type !== "" ? 
            <Popup type={popup.type} msg={popup.msg} setPopup={setPopup} /> : ""
            }
            <div className="flex items-center sticky top-[50px] gap-2 text-[12px] py-4 md:px-[9%] px-[3%] bg-white dark:bg-black border border-transparent border-b-gray-200 dark:border-b-slate-100/[0.09] z-[2]">
                <button className="md:hidden p-2 mr-2 text-lg" onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
                <a href="/" className="text-lg"><FiHome /></a> | <a href="/project" className="opacity-[0.6]"> Project</a> | <span className="opacity-[0.6]"> {active}</span>
            </div>
            
            <div className="md:flex relative md:px-[9%] bg-white dark:bg-transparent">
                <div className={`lg:w-[25%] md:w-[27%] w-[240px] md:h-screen h-full md:sticky absolute md:top-[115px] top-0 md:pl-0 p-4 left-0 bg-white dark:bg-black border border-transparent border-r-gray-200 dark:border-r-slate-100/[0.09] overflow-hidden z-[1] transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[-130%]"}`}>  
                    
                    {
                        generalLinks.map(link => {
                                return (
                                <a key={link.id} href={link.link} onClick={() => {setActive(link.label); setOpen(false) }} className={`flex items-center justify-between w-full p-1 my-[1px] px-4 hover:bg-purple hover:text-white rounded ${active === link.label ? "bg-purple text-white" : ""}`}>
                                    <span className="w-[30px] text-lg">{link.icon}</span>
                                    <span className="flex-1 p-2 break-normal">{link.label}</span>
                                </a>
                                )
                        })
                    }
                </div>

                <div className="p-[3%] flex-1">
                    {
                    !loading ?
                    <>
                    <div className="border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="md:text-4xl text-xl font-bold py-2">{project.title}</h1>
                        <div className="flex items-center gap-2">
                            <img src={project.user.photoURL} alt={project.user.displayName} className="w-[25px] h-[25px] rounded-full outline outline-offset-1 outline-purple/[0.3]" />
                            <p className="opacity-[0.7]">{project.user.displayName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p>{project.date}</p>
                            <p>{project.category}</p>
                        </div>
                    </div>
                    <div className={`w-full py-10 md:h-[400px] h-[350px] rounded border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]`}>
                        { project.video === "" ?
                        <img src={project.images[0].url} className="w-full h-full object-cover" />
                        :
                        <iframe className="w-full h-full" src={project.video}></iframe>
                        }
                    </div>
                    </>
                    :
                    <Skeleton numbers={[0]} />
                    }
                    
                    <div id="description" className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Description</h1>
                        <p>{project.description}</p>
                    </div>
                    <div id="equipments" className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Equipments</h1>
                        {project.equipments?.map((equipment, i) => {
                            return (
                                <p key={i} className="py-1 flex gap-2"><span>{i + 1}.</span>{equipment}</p>
                            )
                        })}
                    </div>
                    <div id="procedures" className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Procedures</h1>
                        <div dangerouslySetInnerHTML={{ __html: project.procedures }}></div>
                            
                    </div>
                    <div className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Images</h1>
                        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
                        {
                            project.images.map((image: any) => (
                                <img key={image.title} src={image.url} className="h-full rounded object-cover" />
                            ))
                        }
                        </div>
                    </div>
                    <div id="procedures" className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Links</h1>
                        <p>{project.links}</p>
                    </div>
                    <div id="estimations" className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Estimation</h1>
                        <p>{project.estimation}</p>
                    </div>
                    {
                        user?.email === project.user.email ? 
                        <div className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                            <h1 className="font-semibold uppercase mb-4">Project actions</h1>
                            <div className="flex gap-4">
                                <a href={`/dashboard/edit-project/?id=${id}`} className="flex items-center gap-2 border border-gray-600 rounded p-2 px-4"><FiEdit /> Edit project</a>
                                <button onClick={() => handleDelete()} className="flex items-center gap-2 text-red-500 border border-red-600 rounded p-2 px-4"><FiTrash /> {!loading ? "Delete project" : <FaSpinner className="animate-spin" />}</button>
                            </div>
                        </div>
                        : ""
                    }
                    <div id="chats" className="py-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Chats</h1>
                        <Chat project_id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;
