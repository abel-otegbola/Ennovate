import Button from "../../components/button/button";

function Home()  {
    return (
        <main>
            <header className="flex flex-wrap jutify-between items-center px-[3%] py-[5%]">
                <div className="md:w-[50%] w-full md:px-[5%] md:py-0 py-[10%]">
                    <p className="p-1 rounded-full bg-white dark:bg-slate-100/[0.05] w-fit border border-slate-100/[0.04] text-sm px-3 mb-3">A better world, one project at a time</p>
                    <p className="py-[3%] md:text-[40px] font-bold md:leading-[45px] text-[30px]">Making <span className=" bg-clip-text text-transparent bg-gradient-to-r from-purple to-green">Renewable Energy</span>  more accessible, affordable and fun</p>
                    <p className="pb-6">Quest is built to help accelerate success by eliminating failure factors and providing success systems such as collaboration, accountability, time management and lots more.</p>
                    <Button text={"Get started"} link={"#"} />
                </div>
                
                <div className="p-4 h-[350px] md:w-[45%] w-full rounded-lg bg-gray-200/[0.09]">
                    <img className="rounded w-full h-full bg-slate-100/[0.08]" alt="renewable energy sources illustration" />
                </div>
                
            </header>
        </main>
    )
}

export default Home;