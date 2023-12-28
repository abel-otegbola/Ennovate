import { useContext, useEffect, useState } from "react"
import Button from "../../../components/button/button"
import { app, database } from "../../../firebase/firebase"
import { onValue, ref } from "firebase/database"
import { AuthContext } from "../../../customHooks/useAuth"
import { getAuth, signOut } from "firebase/auth";
import ProjectGrid from "../../../components/projectGrid/projectGrid"

function DashboardHome() {
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
        <div className="md:px-[3%] py-[40px] w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-[16px]">Welcome: {user?.displayName || user?.email}</h1>
                <button className="border border-gray-500/[0.5] p-4 py-[6px] rounded" aria-label="logout" onClick={() => signOut(auth)} >Logout</button>
            </div>

            <h2 className="mt-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] text-[14px] text-purple">MY PROJECTS</h2>
            <div className="w-full flex flex-wrap gap-4 py-2 my-4 scrollbar">
                {
                    projects?.filter((item: any) => item.user === user?.email).map((project: any) => {
                        return (
                            <ProjectGrid key={project.id} id={project.id} project={project.data} />
                        )
                    })
                }
                <div className="flex flex-col items-center justify-center w-[300px] min-h-[300px] rounded-[10px] border border-gray-700/[0.1] bg-gray-300/[0.07]">
                    {
                        projects.filter((item: any) => item.user !== user?.email).length === 0 ? <p>You haven't created any project</p> : ""
                    }
                    <div className="pt-4">
                        <Button text={"Create"} link={"/dashboard/create"} />
                    </div>
                </div>
            </div>
            <h2 className="mt-8 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] text-[14px] text-purple">FEATURED</h2>

            <div className="w-full min-h-[250px] flex gap-4 py-2 my-4 overflow-x-auto scrollbar">
                {
                    projects.map((project: any) => {
                        return (
                            <ProjectGrid key={project.id} id={project.id} project={project.data} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default DashboardHome;