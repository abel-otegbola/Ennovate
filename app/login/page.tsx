'use client'
import GoogleIcon from "@/assets/icons/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/useAuth";
import { loginSchema } from "@/schema/auth";
import { Formik } from "formik";
import { Loader, LockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react"

export default function Loginpage() {
    const { signIn, loading, signInWithGoogle } = useContext(AuthContext)

    
    return (
        <div className="min-h-[500px] flex gap-12">
                    
            <div className="sm:block hidden w-[400px] h-screen relative">
                <Image src={"/auth-bg.png"} alt="auth-bg" fill sizes={"100%"} className="object-cover" />
            </div>

            <div className="sm:flex-1 w-full p-8 sm:max-w-[360px] mx-auto flex flex-col items-center h-screen justify-center">
                <div className="w-full mb-8 text-center">
                    <h1 className="font-bold text-xl">Welcome</h1>
                    <p className="mt-2">Sign in to your account</p>
                </div>
                <button className="w-full mb-4 flex items-center justify-center gap-2 border border-input/[0.5] py-[10px] rounded-lg"
                    onClick={() => signInWithGoogle()}
                >
                    <GoogleIcon width={16} height={16} />
                    <p className="text-sm">Sign in with Google</p>
                </button>

                <p className="text-sm mb-6 ">or continue with email</p>
                <Formik
                    initialValues={{ email: '', password: ''}}
                    validationSchema={loginSchema}
                    onSubmit={( values, { setSubmitting }) => {
                        signIn(values.email, values.password);
                        setSubmitting(false);
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                      }) => (

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                            
                            <div className="flex flex-col gap-2 w-full">
                                {/* <label htmlFor="email" className="text-sm font-medium">Email address</label> */}
                                <div className="relative">
                                    <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input id="email" name="email" value={values.email} onChange={handleChange} type="email" placeholder="e.g alex@email.com" className="pl-10" />
                                </div>
                                {touched.email && errors.email ? <p className="text-xs text-red">{errors.email}</p> : null}
                            </div>

                            <div className="flex flex-col gap-2">
                                {/* <label htmlFor="password" className="text-sm font-medium">Password</label> */}
                                <div className="relative">
                                    <LockIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input id="password" name="password" value={values.password} onChange={handleChange} type="password" placeholder="At least 8 characters" className="pl-10" />
                                </div>
                                {touched.password && errors.password ? <p className="text-xs text-red">{errors.password}</p> : null}
                            </div>

                            <Button type="submit" className="w-full">{ isSubmitting || loading ? <Loader size={16} className="animate-spin" /> : "Login"}</Button>
                            <div className="grid grid-cols-2 justify-center font-medium mt-4">
                                <Link href="/forgot-password" className="px-4 text-right hover:text-primary text-[12px] border-r border-gray-500/[0.6]">
                                    <span className="">Forgot password?</span>
                                </Link>
                                <Link href="/register" className="px-4 text-start hover:text-primary text-[12px]">
                                    <span className="">Create Account</span>
                                </Link>
                            </div>
                            
                            <Link href="/" className="text-center mt-4 text-[12px] opacity-70">
                                Back to Home
                            </Link>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
