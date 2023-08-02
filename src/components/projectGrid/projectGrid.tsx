import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa"

interface Project {
    id: number, img: any, title: string, info: string
}

function ProjectGrid({ id, img, title, info }: Project ) {
    const [openSide, setOpenSide] = useState(false)

    return (
        <div className="relative flex items-stretch mt-4 bg-white dark:bg-gray-100/[0.01]">
            <button className="lg:hidden block p-6 px-4 absolute top-0 right-0 opacity-[0.3] hover:opacity-[1] z-10" onClick={() => setOpenSide(!openSide)}><FaEllipsisV /></button>
            <div key={id} className="md:w-[50%] w-full p-[20px]">
                <div className="flex items-center my-2 gap-4">
                    <div className="h-[40px] w-[40px] rounded bg-slate-100 dark:bg-slate-200/[0.04]"></div>
                    <div className="text-[10px]">
                        <h3>Abel Otegbola</h3>
                        <div className="flex items-center gap-4">
                            <p>12 Jan 2023</p>
                            <p className="text-purple/[0.6]">Collaborate</p>
                        </div>
                    </div>                    
                </div>
                <div className={`flex justify-center items-center w-full min-h-[200px] bg-slate-200 dark:bg-slate-200/[0.04] cursor-pointer rounded hover:border hover:border-green hover:bg-green/[0.2]`}>
                    <img src={img} className="w-full max-h-[300px]" />
                </div>
                <h2 className="py-2">{title}</h2>
                <p className="text-[12px]">{info}</p>
            </div>
            <div className={`lg:static text-[12px] lg:h-auto h-full absolute top-0 right-0 bg-slate-200 dark:bg-[#1d1d23] overflow-hidden transition-all duration-700 ${openSide ? "lg:w-[50%] w-[75%]" : "lg:w-[50%] w-0"}`}>
                <p className="p-4">other details</p>
            </div>
        </div>
    )
}

export default ProjectGrid;