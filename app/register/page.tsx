'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/useAuth";
import { registerSchema } from "@/schema/auth";
import { Formik } from "formik";
import { Loader, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Register() {

    const { signUp, loading } = useContext(AuthContext)

    return (
        <div className="min-h-[500px] flex gap-12">
            
            
            <div className="sm:block hidden w-[400px] h-screen relative">
                <Image src={"/auth-bg.png"} alt="auth-bg" fill sizes={"100%"} className="object-cover" />
            </div>

            <div className="sm:flex-1 w-full p-8 sm:px-[10%] flex items-center h-screen justify-center">
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: "" }}
                    validationSchema={registerSchema}
                    onSubmit={({...values}, { setSubmitting }) => {
                        signUp(values.email, values.password);
                        setSubmitting(false);
                    }}
                    className=""
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <form className="flex flex-col gap-3 sm:min-w-[300px]" onSubmit={handleSubmit}>
                            <div className="w-full mb-2 text-center">
                                <h1 className="font-bold text-xl">Create account</h1>
                                <p className="mt-2 mb-6">Let&apos;s get you started sharing your account</p>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                                <div className="relative">
                                    <MailIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input id="email" name="email" value={values.email} onChange={handleChange} type="email" placeholder="e.g alex@email.com" className="pl-10" />
                                </div>
                                {touched.email && errors.email ? <p className="text-xs text-red">{errors.email}</p> : null}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-sm font-medium">Create password</label>
                                <div className="relative">
                                    <LockIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input id="password" name="password" value={values.password} onChange={handleChange} type="password" placeholder="At least 8 characters" className="pl-10" />
                                </div>
                                {touched.password && errors.password ? <p className="text-xs text-red">{errors.password}</p> : null}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
                                <div className="relative">
                                    <LockIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} type="password" placeholder="At least 8 characters" className="pl-10" />
                                </div>
                                {touched.confirmPassword && errors.confirmPassword ? <p className="text-xs text-red">{errors.confirmPassword}</p> : null}
                            </div>

                            <p className="text-[12px] opacity-[0.6]">Password must contain at least 8 characters</p>

                            <Button type="submit" className="w-full">{ isSubmitting || loading ? <Loader size={16} className="animate-spin" /> : "Create new account" }</Button>

                            <p className="text-center">Already have an account? <Link href={"/login"} className="text-primary">Login</Link></p>
                        </form>
                    
                    )}
                </Formik>
            </div>
        </div>
    )
}