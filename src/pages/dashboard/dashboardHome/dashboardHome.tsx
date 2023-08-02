import { useState } from "react"
import Button from "../../../components/button/button"

interface Category {
    id: number, img: any, title: string, info: string
}
interface Categories extends Array<Category>{}

function DashboardHome() {
    const [active, setActive] = useState("Wind Power")
    const Projects: Categories = [
        { id: 0, img: "", title: "Wind Power", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 1, img: "", title: "Solar Thermal Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 2, img: "", title: "Biomass", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "", title: "Green Hydrogen", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 4, img: "", title: "Biofuel", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 5, img: "", title: "Nuclear Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 6, img: "", title: "Hydro Electricity", info: "Wind turbine projects which involves using wind as source of energy" },
    ]

    return (
        <div className="p-[3%] w-full">
            <div className="flex justify-between">
                <h1 className="px-2 text-lg">Explore Newest Renewable Energy Projects</h1>
                <Button text={"Create New Project"} link={"/dashboard/create"} />
            </div>
            
            <div className="w-full flex gap-4 border border-transparent border-y-gray-200 dark:border-y-gray-100/[0.1] bg-white dark:bg-slate-100/[0.01] p-2 my-4 text-[12px] overflow-x-auto scrollbar">
                {
                    Projects.map(project => {
                        return (
                            <div key={project.id} className={`${active === project.title ? "text-green" : "hover:text-green"}`} onClick={() => setActive(project.title)}>
                                <div className={`h-[150px] md:w-[300px] w-full bg-slate-200 dark:bg-slate-200/[0.08] cursor-pointer rounded ${active === project.title ? "border border-green/[0.5]" : "hover:border hover:border-green/[0.5]"}`}></div>
                                <h2 className="p-2">{project.title}</h2>
                            </div>
                        )
                    })
                }
            </div>
            
            
            <h1 className="px-2 text-lg mt-8 py-2">Trending Renewable Energy Projects</h1>
            <div className="py-2">
                
            </div>

        </div>
    )
}

export default DashboardHome;