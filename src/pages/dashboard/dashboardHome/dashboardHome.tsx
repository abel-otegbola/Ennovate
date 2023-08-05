import { useEffect, useState } from "react"
import Button from "../../../components/button/button"
import { database } from "../../../firebase/firebase"
import { onValue, ref } from "firebase/database"

function DashboardHome() {
    const [active, setActive] = useState("Wind Power")
    const [projects, setProjects] = useState<any>([])

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
        <div className="p-[3%] w-full">
            <div className="flex flex-wrap gap-6 justify-between">
                <h1 className="px-2 text-lg">Explore Newest Renewable Energy Projects</h1>
                <div className="ml-2">
                    <Button text={"Create New Project"} link={"/dashboard/create"} />
                </div>
            </div>
            
            <div className="w-full flex gap-4 border border-transparent border-y-gray-200 dark:border-y-gray-100/[0.1] bg-white dark:bg-slate-100/[0.01] p-2 my-4 overflow-x-auto scrollbar">
                {
                    projects.map((project: any) => {
                        return (
                            <a href={`/project/?id=${project.id}`} key={project.id} className={`${active === project.data.title ? "text-green" : "hover:text-green"}`} onClick={() => setActive(project.data.title)}>
                                <div className={`h-[150px] w-[300px] bg-slate-200 dark:bg-slate-200/[0.08] cursor-pointer rounded ${active === project.data.title ? "border border-green/[0.5]" : "hover:border hover:border-green/[0.5]"}`}>
                                    <img src={project.data.img.url} className="w-full h-full object-cover" />
                                </div>
                                <h2 className="p-2">{project.data.title}</h2>
                            </a>
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