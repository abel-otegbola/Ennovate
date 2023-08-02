import { FaBrain, FaConnectdevelop, FaObjectGroup, FaPenFancy } from "react-icons/fa";
import Button from "../../components/button/button";

interface Project {
    id: number, img: any, title: string, info: string
}
interface Projects extends Array<Project>{}

function Home()  {
    const projects: Projects = [
        { id: 0, img: "", title: "Wind Power", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 1, img: "", title: "Solar Thermal Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 2, img: "", title: "Biomass", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 3, img: "", title: "Green Hydrogen", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 4, img: "", title: "Biofuel", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 5, img: "", title: "Nuclear Energy", info: "Wind turbine projects which involves using wind as source of energy" },
        { id: 6, img: "", title: "Hydro Electricity", info: "Wind turbine projects which involves using wind as source of energy" },
    ]

    return (
        <main>
            <header className="flex flex-wrap jutify-between items-center px-[3%] py-[5%]">
                <div className="md:w-[50%] w-full md:px-[5%] md:py-0 py-[10%]">
                    <p className="p-1 rounded-full bg-white dark:bg-slate-100/[0.05] w-fit border border-slate-100/[0.04] px-3 mb-3">A better world, one project at a time</p>
                    <p className="py-[3%] md:text-[40px] font-bold md:leading-[45px] text-[30px]">Learn, Explore, Share, and Create with the World's <span className=" bg-clip-text text-transparent bg-gradient-to-r from-purple to-green">Renewable Energy</span></p>
                    <p className="pb-6">Explore a wide range of renewable energy projects and find the ones that are right for you. Share your own renewable energy projects with the community and get feedback from others. Create new renewable energy projects and help to make a difference in the world.</p>
                    <Button text={"Get Involved"} link={"/dashboard"} />
                </div>
                
                <div className="p-4 h-[350px] md:w-[45%] w-full rounded-lg bg-gray-200 dark:bg-gray-200/[0.09]">
                    <img className="hidden rounded w-full h-full bg-slate-100/[0.08]" alt="renewable energy sources illustration" />
                </div>
                
            </header>

            <section className="py-[70px] bg-white dark:bg-gray-100/[0.02]">
                <h2 className="md:text-3xl text-xl text-center py-4 mb-8">Explore Amazing Projects</h2>

                <div className="w-full flex gap-4 p-2 my-4 text-[12px] overflow-x-auto scrollbar">
                    {
                        projects.map(project => {
                            return (
                                <div key={project.id} className="hover:text-green">
                                    <div className={`md:h-[250px] md:w-[500px] h-[200px] w-[350px] bg-slate-200 dark:bg-slate-200/[0.08] cursor-pointer roundedborder hover:border hover:border-green/[0.5]`}></div>
                                    
                                </div>
                            )
                        })
                    }
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
        </main>
    )
}

export default Home;