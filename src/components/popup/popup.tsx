import { FaTimes } from "react-icons/fa"

interface popup {
    type: string,
    msg: string,
    setPopup: any
}

export default function Popup({ type, msg, setPopup }: popup) {
    return (
        <div className="fixed bg-white/[0.8] dark:bg-black/[0.7] backdrop-blur-sm top-0 left-0 w-full h-full flex items-center justify-center">
            <div className={`flex items-center gap-8 bg-white dark:bg-black p-[20px] m-[5%] shadow-lg rounded border-2 ${type === "error" ? "border-t-red-500 border-red-500/[0.1]": "border-t-emerald-500 border-emerald-500/[0.1]"}`}>
                <p className="py-2">{msg}</p>
                <button className="p-2 px-4 rounded w-fit border border-gray-600/[0.5]" onClick={() => setPopup({type: "", msg: ""})}>
                    <FaTimes />
                </button>
            </div>
        </div>
    )
}