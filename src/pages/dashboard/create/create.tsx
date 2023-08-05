import { useContext, useState } from "react";
import Button from "../../../components/button/button";
import { FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import Upload from "../../../components/upload/upload";
import { database } from "../../../firebase/firebase";
import { ref, set } from "firebase/database";
import { AuthContext } from "../../../customHooks/useAuth";
import { nanoid } from "nanoid";

function Create() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [equipment, setEquipment] = useState("")
    const [equipments, setEquipments] = useState<string[]>([])
    const [procedures, setProcedures] = useState("")
    const [img, setImg] = useState({id: "", name: "", type: "", url: "" })
    const [images, setImages] = useState<any>([])
    const [video, setVideo] = useState({ name: "", type: "", url: "" })
    const [links, setLinks] = useState("")
    const [error, setError] = useState("")
    const { user } = useContext(AuthContext)

    const addEquipment = () => {
        if(equipment !== "") {
            setEquipments([ ...equipments, equipment ])
        }
        else {
            setError("Please type the equipment before adding")
        }
    }

    const deleteEquipment = (title: string) => {
        setEquipments(equipments.filter(item => item !== title))
    }

    const submitProject = () => {
        const projectId = nanoid();
        const date = new Date().toLocaleString('en-GB')
        set(ref(database, 'projects/' + projectId), {
            title, category, description, equipments, procedures, img, video, links, user: user.email, date
          });
        console.log()
    }

    const handleImages = () => {
        setImages([...images, img])
        setImg({id: "", name: "", type: "", url: "" })
    }
    const deleteImage = (id: string) => {
        setImages(images.filter((image: any) => image.id !== id))
    }

    return (
        <div className="p-[3%] relative bg-white dark:bg-black"> 
            {    
            error ? 
            <div className="absolute bg-white/[0.8] dark:bg-black/[0.9] backdrop-blur-sm top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="bg-white dark:bg-black p-[40px] m-[5%] shadow-lg rounded">
                    <h2 className="mb-3 text-2xl">An error occured</h2>
                    <p className="py-2 mb-4">{error}</p>
                    <div onClick={() => setError("")}>
                        <Button text={"Try again"} link={"#"} />
                    </div>
                </div>
            </div> : ""
            }
            <h1 className="px-2 text-lg py-2">Create new project</h1>
            <div className="py-8 px-2 border border-transparent border-y-gray-300/[0.2]">
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Title: </p>
                        <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add a title" />
                    </div>
                </div>
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Category: </p>
                        <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Add a category"/>
                    </div>
                </div>
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Description: </p>
                        <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Add a description"/>
                    </div>
                </div>
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Equipments: </p>
                        <div className="flex items-center w-full border border-gray-200/[0.5] rounded p-1 pr-2 ">
                            <input className="p-[12px] rounded bg-transparent border-none flex-1 outline-none focus:border-2 focus:border-green" onChange={(e) => setEquipment(e.target.value)} type="text" placeholder="Input an equipment"/>
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
                        <div className="flex items-center w-full border border-gray-200/[0.5] rounded p-1 pr-2 ">
                            <textarea className="p-[12px] rounded bg-transparent min-h-[200px] border-none flex-1 outline-none focus:border-2 focus:border-green" onChange={(e) => setProcedures(e.target.value)} placeholder="Highlight the project procedures"></textarea>
                        </div>
                    </div>
                </div>
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex flex-wrap items-start">
                        <p className="md:w-[20%] md:mb-0 py-2">Image: </p>
                        <div className="md:w-[80%] w-full">
                            { images.map((image: any) => (
                                <div className="flex items-center justify-between w-full border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.03]">
                                    <Upload id={nanoid(10)} accept={"image/*"} images={images} setImages={setImages} />
                                    <FaTrashAlt className="text-3xl text-red-500 p-2" onClick={() => deleteImage(image.id)} />
                                </div>
                            )) }
                            <button className="m-3 p-6 py-[10px] rounded border border-gray-200/[0.3]" onClick={() => handleImages()}>Add new image</button>
                        </div>
                    </div>
                </div>
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex">
                        <p className="md:w-[20%] md:mb-0 py-2">Video: </p>
                        <Upload id={2} accept={"video/*"} img={video} setImg={setVideo} />
                    </div>
                </div>
                <div className="py-6 border border-transparent border-y-gray-100 dark:border-y-gray-100/[0.06]">
                    <div className="md:flex">
                        <p className="md:w-[23%] md:mb-0 py-2">Other Links: </p>
                        <textarea className="p-[12px] rounded bg-transparent min-h-[200px] border border-gray-200/[0.4] flex-1 outline-none focus:border-2 focus:border-green" onChange={(e) => setLinks(e.target.value)}></textarea>
                    </div>
                </div>

                <div onClick={() => submitProject()} className="py-8">
                    <Button text={"Publish Project"} link={"#"} />
                </div>
            </div>
        </div>
    )
}

export default Create;