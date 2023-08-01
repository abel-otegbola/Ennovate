import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";

function Login() {
    return (
            <div className="w-full flex flex-wrap jutify-between items-center px-[3%] py-[5%]">
                <div className="sm:max-w-[400px] w-full m-auto md:py-0 py-[10%]">
                    <p className="py-[3%] md:text-[40px] font-bold md:leading-[45px] text-[30px] bg-clip-text text-transparent bg-gradient-to-r from-purple to-green">Welcome!</p>
                    <p className="pb-6">Login to share your ideas, get insights and join in the projects of making the world a better place.</p>

                    <div className="grid grid-cols-2 gap-4 my-8">
                        {
                            ['Google', 'Facebook', 'Twitter', 'Linkedin'].map(social => {
                                return (
                                    <button className="flex items-center justify-center gap-4 p-[12px] border border-gray-200 dark:border-gray-100/[0.09] w-full rounded hover:border-green hover:dark:border-green hover:text-green">
                                        { social === "Google" ? <FaGoogle /> : social === "Facebook" ? <FaFacebook /> : social === "Twitter" ? <FaTwitter /> : social === "Linkedin" ? <FaLinkedin /> : "" }
                                        {social}
                                    </button>
                                )
                            })
                        }
                    </div>

                    <label htmlFor="email" className="block py-2 pt-4">Email:</label>
                    <input className="p-[12px] bg-transparent w-full outline-none border border-gray-400/[0.3] focus:border-green/[0.5] rounded" id="email" name="email" type="email" placeholder="Enter your email" />
                    
                    
                    <label htmlFor="password" className="block py-2 pt-4">Password:</label>
                    <input className="p-[12px] bg-transparent w-full outline-none border border-gray-400/[0.3] focus:border-green/[0.5] rounded" id="password" name="password" type="password" placeholder="Enter your password" />

                    <button className="w-full p-[15px] rounded bg-purple hover:bg-fuchsia-800 mt-8">Login</button>
                </div>
                
                <div className="p-4 h-[550px] w-[45%] rounded-lg bg-gray-200/[0.09] md:block hidden">
                    <img className="hidden rounded w-full h-full bg-slate-100/[0.08]" alt="renewable energy sources illustration" />
                </div>
                
            </div>
    )
}

export default Login;