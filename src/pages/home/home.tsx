import Button from "../../components/button/button";

function Home()  {
    return (
        <>
            <h1 className="text-center p-[3%] text-3xl text-purple">Home</h1>
            <Button text={"Get started"} icon={"o"} link={"#"} />
        </>
    )
}

export default Home;