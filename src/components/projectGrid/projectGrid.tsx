import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa"

interface Project {
    id: number, img: any, title: string, info: string
}

function ProjectGrid({ id, img, title, info }: Project ) {
    const [openSide, setOpenSide] = useState(false)

    return (
        <div className="relative flex mt-4 bg-gray-100/[0.01]">
            <button className="lg:hidden block p-6 px-4 absolute top-0 right-0 opacity-[0.3] hover:opacity-[1] z-10" onClick={() => setOpenSide(!openSide)}><FaEllipsisV /></button>
            <div key={id} className="md:w-[50%] w-full p-[20px]">
                <div className={`flex justify-center items-center h-[350px] md:w-[400px] w-full bg-slate-200/[0.04] cursor-pointer rounded hover:border hover:border-green hover:bg-green/[0.2]`}>
                    <img src={img} className="hidden" />
                </div>
                <h2 className="py-2">{title}</h2>
                <p className="text-[12px]">{info}</p>
            </div>
            <div className={`lg:static text-[12px] h-full absolute top-0 right-0 bg-[#1d1d23] overflow-hidden transition-all duration-700 ${openSide ? "lg:w-[50%] w-[75%]" : "lg:w-[50%] w-0"}`}>
                <p className="p-4">other details</p>
            </div>
        </div>
    )
}

export default ProjectGrid;