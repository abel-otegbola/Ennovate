import { FaBrain, FaConnectdevelop, FaObjectGroup, FaPenFancy } from "react-icons/fa";
import Button from "../../components/button/button";
import ProjectGrid from "../../components/projectGrid/projectGrid";
import { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { onValue, ref } from "firebase/database";
import hero from "../../assets/renewable.jpg"


function Home()  {
    const [data, setData] = useState<any>([])

    useEffect(() => {
        const projectsRef = ref(database, 'projects/');
        let arr: any[] = []
        onValue(projectsRef, (snapshot) => {
            const data: any = snapshot.val();
            Object.keys(data).map((key: any) => {
                arr.push({id: key, data: data[key]})
            })
            setData(arr)
        });
    }, [])

    return (
        <main>
            <header className="flex flex-wrap jutify-between items-center px-[3%] py-[5%]">
                <div className="md:w-[50%] w-full md:px-[5%] md:py-0 py-[10%]">
                    <p className="p-1 rounded-full bg-white dark:bg-slate-100/[0.05] w-fit border border-slate-100/[0.04] px-3 mb-3">A better world, one project at a time</p>
                    <p className="py-[3%] md:text-[40px] font-bold md:leading-[45px] text-[30px]">Learn, Explore, Share, and Create with the World's <span className=" bg-clip-text text-transparent bg-gradient-to-r from-purple to-green">Renewable Energy</span></p>
                    <p className="pb-6">Explore a wide range of renewable energy projects and find the ones that are right for you. Share your own renewable energy projects with the community and get feedback from others. Create new renewable energy projects and help to make a difference in the world.</p>
                    <Button text={"Get Started"} link={"/dashboard"} />
                </div>
                
                <div className="p-4 md:h-[350px] md:w-[45%] w-full rounded-lg bg-gradient-to-r from-purple/[0.3] to-green/[0.3]">
                    <img src={hero} className="rounded w-full h-full bg-slate-100/[0.08] object-cover" alt="renewable energy sources illustration" />
                </div>
                
            </header>

            <section className="py-[70px] bg-white dark:bg-gray-100/[0.02]">
                <h2 className="md:text-3xl text-xl text-center py-4 mb-8">Explore Amazing Projects</h2>

                <div className="w-full flex gap-4 p-2 my-4 text-[12px] overflow-x-auto scrollbar">
                    {
                        data?.map((project: any) => {
                            return (
                                <a href={`/project/?id=${project.id}`} key={project.id} className="hover:text-green">
                                    <div className={`relative md:h-[250px] md:w-[500px] h-[200px] w-[350px] bg-slate-200 dark:bg-slate-200/[0.08] cursor-pointer roundedborder hover:border hover:border-green/[0.5]`}>
                                        <img src={project.data.img.url} className="w-full h-full object-cover" />
                                        <p className="absolute bottom-0 left-0 p-3 bg-gray-200 dark:bg-black">{project.data.title}</p>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>

                <div className="text-center flex flex-col items-center py-4 px-6">
                    <p className="mb-4">Get involved in the renewable energy community by posting your own projects or participating in discussions.</p>
                    <Button text="Get Involved" link={"/dashboard"} />
                </div>
            </section>

            <section className="md:px-[7%] px-[3%] py-[70px]">
                <h2 className="md:text-3xl text-xl text-center py-4 mb-8">Features</h2>
                <div className="">
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="md:p-8 p-4 rounded border border-gray-100/[0.09] bg-white dark:bg-transparent shadow">
                            <FaBrain className="text-5xl p-2 rounded bg-gray-100/[0.09] mb-3" />
                            <h2 className="text-lg mb-4">Learn about different renewable energy projects</h2>
                            <p>Explore a wide range of renewable energy projects, from small-scale solar installations to large-scale wind farms</p>
                        </div>
                        <div className="md:p-8 p-4 rounded border border-gray-100/[0.09] bg-white dark:bg-transparent shadow">
                            <FaObjectGroup className="text-5xl p-2 rounded bg-gray-100/[0.09] mb-3" />
                            <h2 className="text-lg mb-4">Get the full scope and resources needed</h2>
                            <p>Find detailed information about the scope, resources, and costs of each project</p>
                        </div>
                        <div className="md:p-8 p-4 rounded border border-gray-100/[0.09] bg-white dark:bg-transparent shadow">
                            <FaPenFancy className="text-5xl p-2 rounded bg-gray-100/[0.09] mb-3" />
                            <h2 className="text-lg mb-4">Post your own renewable energy projects</h2>
                            <p>Share your own renewable energy projects with the community and get feedback from others</p>
                        </div>
                        <div className="md:p-8 p-4 rounded border border-gray-100/[0.09] bg-white dark:bg-transparent shadow">
                            <FaConnectdevelop className="text-5xl p-2 rounded bg-gray-100/[0.09] mb-3" />
                            <h2 className="text-lg mb-4">Connect with other renewable energy enthusiasts</h2>
                            <p>Find like-minded people who are passionate about renewable energy and collaborate on projects</p>
                        </div>
                    </div>
                </div>

            </section>

            <section  className="md:px-[7%] px-[3%] py-[70px]">
                <h2 className="md:text-3xl text-xl text-center py-4 mb-8">Amazing New Projects</h2>
                {
                    data?.slice(0,4).map((project:any) => {
                        return (
                            <ProjectGrid key={project.id} id={project.id} project={project.data} />
                        )
                    })
                }
                
                <div className="text-center flex flex-col items-center py-[10%] px-6 my-4 rounded bg-white dark:bg-gray-100/[0.02]">
                    <p className="mb-4">Help to make a difference in the world by supporting renewable energy projects</p>
                    <Button text="Make a difference" link={"/dashboard"} />
                </div>
            </section>

        </main>
    )
}

export default Home;