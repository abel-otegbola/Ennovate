import Button from "../../components/button/button";

export default function ErrorPage() {
    return (
        <div className="md:px-[9%] px-[3%] flex flex-col justify-center items-center min-h-[80vh]">
            <h1 className="text-purple text-[64px] font-bold">404</h1>
            <p className="py-4">Page could not be found</p>
            <Button text="Home page" link="/" />
        </div>
    )
}