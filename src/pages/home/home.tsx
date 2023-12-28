import Button from "../../components/button/button";
import ProjectGrid from "../../components/projectGrid/projectGrid";
import { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { onValue, ref } from "firebase/database";
import boy from "../../assets/3d-illus-boy.png"
import innov from "../../assets/3d-illus-innov.jpg"
import team from "../../assets/3d-illus-team.jpg"
import solar from "../../assets/3d-mini-solar.png"


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
            <header className="relative bg-gradient-to-br from-white dark:from-black via-white dark:via-black to-purple/[0.05]">
                
                {/* <div className="absolute left-0 h-[85%] w-[100%]">
                    <img src={hero} className="rounded w-full h-full object-cover" alt="renewable energy sources illustration" />
                </div> */}
                <div className="m-auto flex flex-col md:px-[5%] md:pt-[30px] pt-[60px] z-[1] md:w-[60%] w-[94%]">
                    <p className="text-[#5938DD]">A better world, one project at a time</p>
                    <h1 className="py-3 md:text-[40px] font-bold md:leading-[45px] leading-[40px] text-[35px]">Build, Explore, Share, and Create Renewable Energy Projects</h1>
                    <p className="pb-6">Explore a wide range of renewable energy projects and find the ones that are right for you. Share your own renewable energy projects with the community and get feedback from others.</p>
                    <div className="md:w-[75%]">
                        <Button text="Eplore" link="/explore" />
                    </div>
                </div>
            
                <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-8 gap-2 overflow-hidden my-[60px] px-[3%]">
                    {
                        [boy, innov, team, solar].map((img, i:number) => (
                            <div key={i} style={{ backgroundImage: `url("${img}")` }} className="flex bg-cover bg-center items-center justify-center md:h-[250px] h-[200px] w-full rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.07]">
                                
                            </div>
                        ))
                    }
                </div>
            </header>

            <section className="py-[70px] dark:bg-gray-100/[0.02] bg-gray-300/[0.2] md:px-[9%] px-[3%]">
                <h2 className="md:text-2xl text-lg font-bold md:text-center py-4">Explore Amazing Projects</h2>
                <p className="md:text-center mb-6">Transforming the Future with Sustainable Energy Solutions</p>

                <div className="w-full flex gap-4 py-2 pb-8 my-4 overflow-x-auto scrollbar">
                    {
                        data?.map((project:any) => {
                            return (
                                <ProjectGrid key={project.id} id={project.id} project={project.data} />
                            )
                        })
                    }
                </div>

                <div className="md:text-center py-4">
                    <p className="mb-4">Get involved in the renewable energy community by posting your own projects or participating in discussions.</p>
                    <Button text="Get Started" link={"/dashboard"} />
                </div>
            </section>

        </main>
    )
}

export default Home;