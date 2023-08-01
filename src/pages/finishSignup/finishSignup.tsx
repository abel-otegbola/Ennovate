import Button from "../../components/button/button";

function FinishSignup() {
    return (
        <div className="bg-white dark:bg-black w-full min-h-[500px] flex flex-col items-center justify-center">
            <h1 className="text-xl my-3">Your email has been verified</h1>
            <p className="my-2">Please continue to the dashboard</p>
            <Button text={"Dashboard"} link={"/dashboard"} />
        </div>
    )
}

export default FinishSignup;