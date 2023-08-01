import Button from "../../components/button/button";

function Home()  {
    return (
        <main>
            <header className="flex flex-wrap jutify-between items-center px-[3%] py-[5%]">
                <div className="md:w-[50%] w-full md:px-[5%] md:py-0 py-[10%]">
                    <p className="p-1 rounded-full bg-white dark:bg-slate-100/[0.05] w-fit border border-slate-100/[0.04] px-3 mb-3">A better world, one project at a time</p>
                    <p className="py-[3%] md:text-[40px] font-bold md:leading-[45px] text-[30px]">Learn, Explore, Share, and Create with the World's <span className=" bg-clip-text text-transparent bg-gradient-to-r from-purple to-green">Renewable Energy</span></p>
                    <p className="pb-6">Explore a wide range of renewable energy projects and find the ones that are right for you. Share your own renewable energy projects with the community and get feedback from others. Create new renewable energy projects and help to make a difference in the world.</p>
                    <Button text={"Get started"} link={"#"} />
                </div>
                
                <div className="p-4 h-[350px] md:w-[45%] w-full rounded-lg bg-gray-200/[0.09]">
                    <img className="hidden rounded w-full h-full bg-slate-100/[0.08]" alt="renewable energy sources illustration" />
                </div>
                
            </header>
        </main>
    )
}

export default Home;