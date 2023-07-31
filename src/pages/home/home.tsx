import Button from "../../components/button/button";
import hero_img from "../../assets/hero_img.png"

function Home()  {
    return (
        <main>
            <header className="flex flex-wrap jutify-between items-center">
                <div className="md:w-[50%] w-full px-[5%] md:py-0 py-[10%]">
                    <p className="p-1 rounded-full bg-slate-100/[0.05] w-fit border border-slate-100/[0.04] text-sm px-3 mb-3">A better world, one project at a time</p>
                    <h1 className="py-[3%] text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-purple to-green">Making Renewable Energy  more accessible, affordable and fun</h1>
                    <p className="pb-6">Quest is built to help accelerate success by eliminating failure factors and providing success systems such as collaboration, accountability, time management and lots more.</p>
                    <Button text={"Get started"} link={"#"} />
                </div>
                
                <img className="md:w-[50%] w-full" src={hero_img} alt="renewable energy sources illustration" />
            </header>
        </main>
    )
}

export default Home;