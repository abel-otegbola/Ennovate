import { useContext, useEffect, useState } from "react";
import Popup from "../../../components/popup/popup";
import Button from "../../../components/button/button";
import { FaSpinner, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import Upload from "../../../components/upload/upload";
import { nanoid } from "nanoid";
import { database } from "../../../firebase/firebase";
import { child, get, ref, set } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../customHooks/useAuth";
import ContentEditor from "../../../components/quillEditor/quillEditor";


export default function EditProject() {
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState({type: "", msg: ""})
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [equipment, setEquipment] = useState("")
    const [equipments, setEquipments] = useState<string[]>([])
    const [procedures, setProcedures] = useState("")
    const [estimation, setEstimation] = useState("")
    const [images, setImages] = useState<any>([])
    const [video, setVideo] = useState("")
    const [links, setLinks] = useState("")
    const [project, setProject] = useState({ title: "", category: "", date: "", description: "", equipments: [], images: [{name: "", url: ""}], video: "", estimation:"", links: "", procedures: "", user: { displayName: "", email: "", photoURL: ""}})
    const [searchParams] = useSearchParams()
    const { user } = useContext(AuthContext)

    const id = searchParams.get("id")
    
    const addEquipment = () => {
        if(equipment !== "") {
            setEquipments([ ...equipments, equipment ])
        }
        else {
            setPopup({type: "error", msg: "Please type the equipment before adding"})
        }
    }

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `projects/${id}`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            setProject(snapshot.val());
            setTitle(snapshot.val().title)
            setCategory(snapshot.val().category)
            setDescription(snapshot.val().description)
            setProcedures(snapshot.val().procedures)
            setEstimation(snapshot.val().estimation)
            setVideo(snapshot.val().video)
            setLinks(snapshot.val().links)
            setImages(snapshot.val().images)
            setEquipments(snapshot.val().equipments || [])
        } else {
            setPopup({type: "error", msg: "No data available"});
        }
        }).catch(() => {
            setPopup({type: "error", msg: "Error occured! Please try again"});
        });

    }, [searchParams])

    const submitUpdatedProject = () => {
        setLoading(true)
        const date = new Date().toLocaleString('en-GB')
        set(ref(database, 'projects/' + id), {
            title, category, description, equipments, procedures, images, video, links, estimation, user: { displayName: user.displayName, email: user.email, photoURL: user.photoURL}, date
        })
        .then(() => {
            setLoading(false)
            setPopup({type: "success", msg: "Project updated succesfully"})
        })
        .catch(() => {
            setPopup({type: "error", msg: "Error occured. Project not updated"})
        })
    }

    const deleteEquipment = (title: string) => {
        setEquipments(equipments.filter(item => item !== title))
    }
    
    const handleImages = () => {
        setImages([...images, {id: nanoid(), name: "", type: "", url: "" }])
    }
    const deleteImage = (id: string) => {
        setImages(images.filter((image: any) => image.id !== id))
    }


    return (
        <div className="relative bg-white dark:bg-black"> 
            {    
            popup.type !== "" ? 
            <Popup type={popup.type} msg={popup.msg} setPopup={setPopup} /> : ""
            }
            <h1 className="font-semibold uppercase py-2 mt-6">Edit project</h1>
                <div className="md:pr-[8%]">
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Title: </p>
                            <input className="p-[10px] rounded border border-gray-500/[0.5] bg-transparent w-full focus:outline outline-purple outline-offset-1" defaultValue={project.title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add a title" />
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Description: </p>
                            <input className="p-[10px] rounded border border-gray-500/[0.5] bg-transparent w-full focus:outline outline-purple outline-offset-1" defaultValue={project.description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Add a description"/>
                        </div>
                    </div>
                    
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Category: </p>
                            <input className="p-[10px] rounded border border-gray-500/[0.5] bg-transparent w-full focus:outline outline-purple outline-offset-1" defaultValue={project.category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Add a category"/>
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Equipments: </p>
                            <div className="flex items-center w-full border border-gray-500/[0.5] rounded p-1 pr-2 ">
                                <input className="p-[10px] rounded bg-transparent border-none flex-1 focus:outline outline-purple outline-offset-1" onChange={(e) => setEquipment(e.target.value)} type="text" placeholder="Input an equipment"/>
                                <div onClick={() => addEquipment()}>
                                    <Button text={"Add"} link={"#"}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap md:ml-[24%] my-2">
                            {
                                equipments.map((item, i) => {
                                    return (
                                        <p key={i} className="flex items-center gap-6 p-2 bg-gray-100/[0.2] rounded">
                                            {item}
                                            <span onClick={() => deleteEquipment(item)}><FaTimesCircle /></span>
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="">
                            <p className="md:w-[30%] md:mb-0 py-2">Procedures: </p>
                        </div>
                        <ContentEditor procedures={procedures} setProcedures={setProcedures} />
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="md:flex">
                            <p className="md:w-[30%] md:mb-0 py-2">Estimation: </p>
                            <div className="flex items-center w-full border border-gray-500/[0.5] rounded p-1 pr-2 ">
                                <textarea className="p-[10px] rounded bg-transparent min-h-[200px] border-none flex-1 focus:outline outline-purple outline-offset-1" defaultValue={project.estimation} onChange={(e) => setEstimation(e.target.value)} placeholder="Add an estimatated amount for the project"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="md:flex flex-wrap items-start">
                            <p className="md:w-[23%] md:mb-0 py-2">Image: </p>
                            <div className="flex items-center flex-wrap gap-2 md:w-[77%] w-full">
                                { images.map((image: any, i: number) => (
                                    <div key={i} className="relative py-2 rounded bg-gray-100 dark:bg-gray-100/[0.03] my-1">
                                        <div className="flex items-center">
                                            <Upload id={image.id} i={i} accept={"image/*"} images={images} setImages={setImages} />
                                            <button onClick={() => deleteImage(image.id)} className="absolute top-1 left-1 bg-white dark:bg-black shadow-lg  text-red-500 p-2"><FaTrashAlt  /></button>
                                        </div>
                                    </div>
                                )) }
                                <div className="flex items-center justify-center w-[200px] h-[245px] py-2 rounded bg-gray-100 dark:bg-gray-100/[0.03] my-1">
                                    <button className="m-3 p-6 py-[10px] text-sm rounded border border-gray-500/[0.3]" onClick={() => handleImages()}>Add new image</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="md:flex">
                            <p className="md:w-[23%] md:mb-0 py-2">Video: </p>
                            <input className="p-[10px] w-full rounded bg-transparent border border-gray-500/[0.4] flex-1 focus:outline outline-purple outline-offset-1" defaultValue={project.video} onChange={(e) => setVideo(e.target.value)} placeholder="Enter video link"/>                       
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="md:flex">
                            <p className="md:w-[23%] md:mb-0 py-2">Other Links: </p>
                            <textarea className="p-[10px] rounded bg-transparent min-h-[200px] w-full border border-gray-500/[0.4] flex-1 focus:outline outline-purple outline-offset-1" defaultValue={project.links} onChange={(e) => setLinks(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="py-8">
                        <button onClick={() => submitUpdatedProject()} className="p-2 px-4 rounded bg-purple text-white">{!loading ? "Update project" : <FaSpinner className="animate-spin text-[18px]" />}</button>
                    </div>

                </div>
        </div>
    )
}