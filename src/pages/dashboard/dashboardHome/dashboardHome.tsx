import { useContext, useEffect, useState } from "react"
import Button from "../../../components/button/button"
import { app, database } from "../../../firebase/firebase"
import { onValue, ref } from "firebase/database"
import { AuthContext } from "../../../customHooks/useAuth"
import { getAuth, signOut } from "firebase/auth";

function DashboardHome() {
    const [active, setActive] = useState("Wind Power")
    const [projects, setProjects] = useState<any>([])
    const { user } = useContext(AuthContext);
    const auth = getAuth(app)

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
            <div className="flex items-center justify-between">
                <h1 className="text-[16px]">Welcome: {user?.displayName || user?.email}</h1>
                <button className="border border-gray-500/[0.5] p-4 py-[6px] rounded" aria-label="logout" onClick={() => signOut(auth)} >Logout</button>
            </div>

            <h2 className="mt-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] text-[14px]">MY PROJECTS</h2>
            <div className="w-full flex gap-4 py-2 my-4 overflow-x-auto scrollbar">
                <div className="flex flex-col items-center justify-center h-[200px] w-[250px] rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.07]">
                    <p>You haven't created any project</p>
                    <div className="mt-4">
                        <Button text={"Create"} link={"/dashboard/create"} />
                    </div>
                </div>
            </div>
            <h2 className="mt-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] text-[14px]">FEATURED</h2>

            <div className="w-full min-h-[250px] flex gap-4 py-2 my-4 overflow-x-auto scrollbar">
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

        </div>
    )
}

export default DashboardHome;