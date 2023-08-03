import { useState } from "react";
import Button from "../../../components/button/button";
import { FaTimesCircle } from "react-icons/fa";

function Create() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [equipment, setEquipment] = useState("")
    const [equipments, setEquipments] = useState<string[]>([])
    const [procedures, setProcedures] = useState("")
    const [error, setError] = useState("")

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
        console.log(title, category, description, equipments, procedures)
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
                <div className="py-6">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Title: </p>
                        <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add a title" />
                    </div>
                </div>
                <div className="py-6">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Category: </p>
                        <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Add a category"/>
                    </div>
                </div>
                <div className="py-6">
                    <div className="md:flex items-center">
                        <p className="md:w-[30%] md:mb-0 mb-2">Description: </p>
                        <input className="p-[12px] rounded border border-gray-200/[0.5] bg-transparent w-full outline-none focus:border-2 focus:border-green" onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Add a description"/>
                    </div>
                </div>
                <div className="py-6">
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
                <div className="py-6">
                    <div className="md:flex">
                        <p className="md:w-[30%] md:mb-0 py-2">Procedures: </p>
                        <div className="flex items-center w-full border border-gray-200/[0.5] rounded p-1 pr-2 ">
                            <textarea className="p-[12px] rounded bg-transparent min-h-[200px] border-none flex-1 outline-none focus:border-2 focus:border-green" onChange={(e) => setProcedures(e.target.value)} placeholder="Highlight the project procedures"></textarea>
                        </div>
                    </div>
                </div>

                <div onClick={() => submitProject()}>
                    <Button text={"Publish Project"} link={"#"} />
                </div>
            </div>
        </div>
    )
}

export default Create;