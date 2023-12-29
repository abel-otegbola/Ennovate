import { useState } from "react";
import Button from "../../components/button/button";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

function FinishSignup() {
    const [email, setEmail] = useState(localStorage.getItem('emailForSignIn' || null));
    const [error, setError] = useState("")

    const signIn = () => {
        // Confirm the link is a sign-in with email link.
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
            if(email) {
                signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    console.log(result.user)
                })
                .catch((error) => {
                    setError(error.message)
                });
            }
            else {
                setError("Please input your email")
            }
        }
    }

    return (
        <div className="w-full min-h-[500px] flex flex-col items-center justify-center">
            <div className="p-[40px] shadow-lg bg-white dark:bg-black rounded">
                <h1 className="text-xl my-3">Your email has been verified</h1>
                <p className="my-2">Please provide a username and profile image for your account</p>
                        
                <label htmlFor="email" className="block py-2 pt-4">Email:</label>
                <input className="p-[12px] bg-transparent max-w-[300px] outline-none border border-gray-400/[0.3] focus:border-green/[0.5] rounded" id="email" name="email" type="email" defaultValue={email ? email : ""} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="username" className="block py-2 pt-4">Username:</label>
                <input className="p-[12px] bg-transparent max-w-[300px] outline-none border border-gray-400/[0.3] focus:border-green/[0.5] rounded" id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => setEmail(e.target.value)} />
                <p className="mt-2 text-[10px] text-red-500">{error}</p>

                <div onClick={() => signIn()} className="py-4">
                    <Button text={"Continue"} link={"/dashboard"} />
                </div>
            </div>
        </div>
    )
}

export default FinishSignup;