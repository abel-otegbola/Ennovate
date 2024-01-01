import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { database } from "../../firebase/firebase";
import { onValue, ref } from "firebase/database";
import ProjectGrid from "../../components/projectGrid/projectGrid";
import Skeleton from "../../components/projectGrid/projectSkeleton";

export default function Search() {
    const [URLSearchParams] = useSearchParams()
    const query = URLSearchParams.get("search")?.toUpperCase()
    const [projects, setProjects] = useState<any>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const projectsRef = ref(database, 'projects/');
        let arr: any[] = []
        onValue(projectsRef, (snapshot) => {
            const data: any = snapshot.val();
            Object.keys(data).map((key: any) => {
                arr.push({id: key, data: data[key]})
            })
            setProjects(arr)
            setLoading(false)
        });
    }, [query])

    return (
        <div className="md:px-[9%] px-[3%] py-[40px] min-h-[80vh]">
            <h1 className="uppercase font-semibold">Search results for: <span className="text-purple"> {query}</span></h1>

            {
                loading ? 
                <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 py-2 my-4">
                    <Skeleton numbers={[0, 1, 2, 3]} />
                </div>
                :
                <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 py-2 my-4">
                    {   
                        projects.filter((item: any) => (item.data.title.toUpperCase().indexOf(query) !== -1 || item.data.description.toUpperCase().indexOf(query) !== -1)).length < 1 ?
                        <h2>Couldn't find any project.</h2>
                        :
                        projects.filter((item: any) => (item.data.title.toUpperCase().indexOf(query) !== -1 || item.data.description.toUpperCase().indexOf(query) !== -1))
                        .map((project: any) => {
                            return (
                                <ProjectGrid key={project.id} id={project.id} project={project.data} />
                            )
                        })
                    }
                </div>
            }

            
        </div>
    )
}