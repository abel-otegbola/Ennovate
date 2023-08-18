import { useEffect, useState } from "react";
import { useContext } from "react";
import Button from "../button/button";
import { AuthContext } from "../../customHooks/useAuth";
import { nanoid } from "nanoid";
import { FaTimesCircle } from "react-icons/fa";
import { database } from "../../firebase/firebase";
import { onValue, ref, set } from "firebase/database";

function Chat({ project_id }: any) {
    const {user} = useContext(AuthContext)
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")
    const [chats, setChats] = useState<any>([{id: "0", username: "Ennovate", email: "abel.d.otegbola@gmail.com", date: "07/08/2023", msg: "Welcome to the chat! Please, do comment on the product" }])


    const submitMsg = () => {
        if(msg !== "") {
            const newId = nanoid()
            let newMsg = { id: newId, project_id, username: user.displayName, email: user.email, date: new Date().toLocaleString("en-GB"), msg }
            setChats([...chats, newMsg])
            set(ref(database, 'chats/' + newId), newMsg);
        }
        else {
            setError("Please type a message to send")
        }
    }

    useEffect(() => {
        const projectsRef = ref(database, 'chats/');
        let arr: any[] = []
        onValue(projectsRef, (snapshot) => {
            const data: any = snapshot.val();
            Object.keys(data).map((key: any) => {
                arr.unshift(data[key])
            })
            setChats(arr.filter(item => item.project_id === project_id))
        });
    }, [])

    return (
        <div className="p-4 h-[90vh] flex flex-col justify-between">
            <div>
                <h2 className="py-2 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.06]">Chat</h2>

                {
                    error !== "" ? <p className="flex items-center justify-between p-2 px-4 rounded bg-red-100/[0.09] text-red-600">{error} <FaTimesCircle onClick={() => setError("")} /></p> : ""
                }
                {
                    chats.map((chat: any) => (
                        <div key={chat.id} className={`flex flex-col ${!user ? "" : user.email === chat.email ? "items-end" : ""} text-[12px] py-4`}>
                            <div className="flex items-center text-[10px] gap-4">
                                <p>{chat.username}</p>
                                <p>{chat.date}</p>
                            </div>
                            <p className={`p-3 ${!user ? "" : user.email === chat.email ? "rounded-l-lg bg-purple text-white" : "rounded-r-lg bg-white dark:bg-gray-200/[0.09]"} w-fit`}>{chat.msg}</p>
                        </div>
                    ))
                
                }
            </div>

            <div className="flex items-center p-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-100/[0.09] rounded w-[100%] bottom-2 right-2">
                <input className="p-[8px] flex-1 border-none rounded bg-transparent outline-none" placeholder="Send message" onChange={(e) => setMsg(e.target.value)} />
                <div onClick={() => submitMsg()}>
                    <Button text="Send" link="#" />
                </div>
            </div>

        </div>
    )
}

export default Chat;