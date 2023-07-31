import { useState } from "react"
import ProjectGrid from "../../../components/projectGrid/projectGrid"

interface Category {
    id: number, img: any, title: string, info: string
}
interface Categories extends Array<Category>{}

function DashboardHome() {
    const [active, setActive] = useState("Wind Power")

    const categories: Categories = [
        { id: 0, img: "./", title: "Wind Power", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 1, img: "./", title: "Solar Thermal Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 2, img: "./", title: "Biomass", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "./", title: "Green Hydrogen", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "./", title: "Biofuel", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "./", title: "Nuclear Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 4, img: "./", title: "Hydro Electricity", info: "Wind turbine projects which involves using wind as source of energy" },
    ]
    
    const Projects: Categories = [
        { id: 0, img: "./", title: "Wind Power", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 1, img: "./", title: "Solar Thermal Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 2, img: "./", title: "Biomass", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "./", title: "Green Hydrogen", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "./", title: "Biofuel", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "./", title: "Nuclear Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 4, img: "./", title: "Hydro Electricity", info: "Wind turbine projects which involves using wind as source of energy" },
    ]

    return (
        <div className="p-[3%] w-full">
            <h1 className="px-2">Renewable Energy Sources</h1>
            <div className="w-full flex gap-4 border border-transparent border-y-gray-100/[0.1] bg-slate-100/[0.01] p-2 my-4 text-[12px] overflow-x-auto scrollbar">
                {
                    categories.map(category => {
                        return (
                            <div key={category.id} className={`${active === category.title ? "text-green" : "hover:text-green"}`} onClick={() => setActive(category.title)}>
                                <div className={`h-[150px] w-[200px] bg-slate-200/[0.08] cursor-pointer rounded ${active === category.title ? "border border-green/[0.5]" : "hover:border hover:border-green/[0.5]"}`}></div>
                                <h2 className="p-2">{category.title}</h2>
                            </div>
                        )
                    })
                }
            </div>
            
            <h3 className="px-2 text-transparent bg-clip-text bg-gradient-to-b from-purple to-green mt-8">{active}</h3>
            <div className="py-2">
                {
                    Projects.filter(item => item.title === active).map(project => {
                        return (
                            <ProjectGrid id={project.id} img={project.img} title={project.title} info={project.info} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default DashboardHome;