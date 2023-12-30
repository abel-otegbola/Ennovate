import { useEffect, useState } from "react"
import ProjectGrid from "../../components/projectGrid/projectGrid"
import { database } from "../../firebase/firebase"
import { onValue, ref } from "firebase/database"
import { TbBuildingWindTurbine, TbSun } from "react-icons/tb"
import { FcBiomass } from "react-icons/fc"

interface Category {
    id: number, img: any, title: string, info: string
}
interface Categories extends Array<Category>{}

function Explore() {
    const [active, setActive] = useState("solar")
    const [projects, setProjects] = useState<any>([])

    const categories: Categories = [
        { id: 0, img: <TbBuildingWindTurbine />, title: "Wind Power", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 1, img: <TbSun />, title: "solar", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 2, img: <FcBiomass />, title: "Biomass", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "H+", title: "Green Hydrogen", info: "Wind turbine projects which involves using wind as source of energy" },
    ]
    

    useEffect(() => {
        const projectsRef = ref(database, 'projects/');
        let arr: any[] = []
        onValue(projectsRef, (snapshot) => {
            const data: any = snapshot.val();
            Object.keys(data).map((key: any) => {
                arr.push({id: key, data: data[key]})
            })
            setProjects(arr)
        });
    }, [])

    return (
        <div className="md:px-[9%] p-[3%] w-full">
            <h1 className="px-2 font-semibold py-2 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] uppercase">Renewable Energy Sources</h1>
            <div className="w-full flex gap-4 md:p-2 my-4 overflow-x-auto scrollbar">
                {
                    categories.map(category => {
                        return (
                            <div key={category.id} className={`${active === category.title ? "text-green" : "hover:text-green"}`} onClick={() => setActive(category.title)}>
                                <div className={`flex items-center justify-center text-[30px] text-emerald-600 h-[150px] w-[250px] bg-slate-200 dark:bg-slate-200/[0.08] cursor-pointer rounded ${active === category.title ? "border border-green/[0.5]" : "hover:border hover:border-green/[0.5]"}`}>
                                    {category.img}
                                </div>
                                <h2 className="p-2">{category.title}</h2>
                            </div>
                        )
                    })
                }
            </div>
            
            <h3 className="md:px-2 mt-12 font-semibold uppercase border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1]">{active}</h3>
            <div className="flex gap-4 flex-wrap py-4">
                {
                    projects.filter((item: any) => item.data.category === active).map((project: any) => {
                        return (
                            <ProjectGrid key={project.id} id={project.id} project={project.data} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Explore;