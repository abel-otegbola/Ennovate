import { useContext, useState } from "react";
import Button from "../../../components/button/button";
import { FaSpinner, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import Upload from "../../../components/upload/upload";
import { database } from "../../../firebase/firebase";
import { ref, set } from "firebase/database";
import { AuthContext } from "../../../customHooks/useAuth";
import { nanoid } from "nanoid";
import Popup from "../../../components/popup/popup";

function Create() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [equipment, setEquipment] = useState("")
    const [equipments, setEquipments] = useState<string[]>([])
    const [procedures, setProcedures] = useState("")
    const [images, setImages] = useState<any>([])
    const [video, setVideo] = useState("")
    const [links, setLinks] = useState("")
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState({type: "", msg: ""})
    const { user } = useContext(AuthContext)

    const addEquipment = () => {
        if(equipment !== "") {
            setEquipments([ ...equipments, equipment ])
        }
        else {
            setPopup({type: "error", msg: "Please type the equipment before adding"})
        }
    }

    const deleteEquipment = (title: string) => {
        setEquipments(equipments.filter(item => item !== title))
    }

    const submitProject = () => {
        setLoading(true)
        const projectId = nanoid();
        const date = new Date().toLocaleString('en-GB')
        set(ref(database, 'projects/' + projectId), {
            title, category, description, equipments, procedures, images, video, links, user: user.email, date
        })
        .then(() => {
            setLoading(false)
            setPopup({type: "success", msg: "Project saved succesfully"})
        })
        .catch(() => {
            setPopup({type: "error", msg: "Error occured. Project not saved"})
        })
    }

    const handleImages = () => {
        setImages([...images, {id: nanoid(), name: "", type: "", url: "" }])
    }
    const deleteImage = (id: string) => {
        setImages(images.filter((image: any) => image.id !== id))
    }

    return (
        <div className="md:p-[3%] relative bg-white dark:bg-black"> 
            {    
            popup.type !== "" ? 
            <Popup type={popup.type} msg={popup.msg} setPopup={setPopup} /> : ""
            }
            <h1 className="font-semibold uppercase py-2 mt-6">Create new project</h1>
            <div className="grid md:grid-cols-2 py-8">
                <div className="md:pr-[8%]">
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Title: </p>
                            <input className="p-[10px] rounded border border-gray-500/[0.5] bg-transparent w-full focus:outline outline-purple outline-offset-1" onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add a title" />
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Description: </p>
                            <input className="p-[10px] rounded border border-gray-500/[0.5] bg-transparent w-full focus:outline outline-purple outline-offset-1" onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Add a description"/>
                        </div>
                    </div>
                    
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="flex flex-col gap-2">
                            <p className="md:w-[30%] md:mb-0 mb-2">Category: </p>
                            <input className="p-[10px] rounded border border-gray-500/[0.5] bg-transparent w-full focus:outline outline-purple outline-offset-1" onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Add a category"/>
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
                        <div className="md:flex">
                            <p className="md:w-[30%] md:mb-0 py-2">Procedures: </p>
                            <div className="flex items-center w-full border border-gray-500/[0.5] rounded p-1 pr-2 ">
                                <textarea className="p-[10px] rounded bg-transparent min-h-[200px] border-none flex-1 focus:outline outline-purple outline-offset-1" onChange={(e) => setProcedures(e.target.value)} placeholder="Highlight the project procedures"></textarea>
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
                            <input className="p-[10px] w-full rounded bg-transparent border border-gray-500/[0.4] flex-1 focus:outline outline-purple outline-offset-1" onChange={(e) => setVideo(e.target.value)} placeholder="Enter video link"/>                       
                        </div>
                    </div>
                    <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                        <div className="md:flex">
                            <p className="md:w-[23%] md:mb-0 py-2">Other Links: </p>
                            <textarea className="p-[10px] rounded bg-transparent min-h-[200px] w-full border border-gray-500/[0.4] flex-1 focus:outline outline-purple outline-offset-1" onChange={(e) => setLinks(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div onClick={() => submitProject()} className="py-8">
                        <button className="p-2 px-4 rounded bg-purple text-white">{!loading ? "Publish project" : <FaSpinner className="animate-spin text-[18px]" />}</button>
                    </div>

                </div>

                <div>
                <div className="p-[5%] flex-1 bg-gray-100 dark:bg-gray-100/[0.05] border border-gray-200 dark:border-slate-100/[0.09]">
                    <h2 className="font-bold uppercase">Preview</h2>
                    <div className="py-10 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="md:text-2xl text-lg font-bold py-2">{title}</h1>
                        <p>By: {user.displayName}</p>
                        <div className="flex items-center gap-4">
                            <p>{new Date().getFullYear()}</p>
                            <p>{category}</p>
                        </div>
                    </div>
                    <div className={`flex justify-center items-center w-full py-2 md:h-[300px] h-[150px] rounded border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]`}>
                        <img src={images[0]?.url} alt={images[0]?.name} className="w-full h-full object-cover" />
                    </div>
                    <div id="description" className="py-10 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Description</h1>
                        <p>{description}</p>
                    </div>
                    <div id="equipments" className="py-10 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Equipments</h1>
                        {equipments.map((equipment, i) => {
                            return (
                                <p key={i} className="py-1 flex gap-2"><span>{i + 1}.</span>{equipment}</p>
                            )
                        })}
                    </div>
                    <div id="procedures" className="py-10 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Procedures</h1>
                        <p>{procedures}</p>
                    </div>
                    <div className="py-10 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">
                        <h1 className="font-semibold uppercase">Links</h1>
                        <p>{links}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Create;