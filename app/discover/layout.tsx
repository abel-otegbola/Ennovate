'use client'
// import LogoIcon from "@/assets/icons/logo";
import Sidebar from "@/components/general/sidebar/sidebar";
import { AuthContext } from "@/context/useAuth";
import { BellIcon, GlobeIcon, PenIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";

function AcoountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1">
            <div className="flex flex-wrap gap-4 justify-between bg-white dark:bg-[#1C1B24] items-center md:pl-8 p-2 border-b border-gray-500/[0.1]">
              <Link href={"/"} className={`md:hidden flex items-center fill-black dark:fill-white h-[24px]`}>
                  {/* <LogoIcon width={20} /> */}
              </Link>
              <Link href="/" title="Go back to home" className="md:flex hidden items-center justify-center h-8 w-8 rounded-full bg-gray-100 ">
                <GlobeIcon strokeWidth={1} size={20} />
              </Link>

              <div className="flex items-center gap-6 mr-4">
                <Link href="/account/write">
                  <Button variant="ghost" size="xs"  className="sm:w-fit w-full border border-input gap-1 pl-3 pr-4">
                    <PenIcon strokeWidth={1} size={10} />
                    Write
                  </Button>
                </Link>
                {/* <Button href="/account/create-video">Create Pitch</Button> */}
                <Link href="/inbox"> <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-500/[0.05]"><BellIcon strokeWidth={1} size={20} /></button></Link>
                <div className="flex gap-2 items-center w-fit">
                  <div className="h-8 w-8 rounded-full bg-[url('/profile.jpg')] bg-cover bg-center">
                    <Image src={user?.avatar || "/profile.jpg"} alt="profile" width={32} height={32} className="rounded-full" />
                  </div>
                  <div className="flex-col gap-1 md:flex hidden">
                    <p className="font-semibold">{user?.fullname}</p>
                    <p className="text-[12px] opacity-[0.7]">{user?.email}</p>
                  </div>
                </div>
                <button className="md:hidden flex flex-col justify-center items-center gap-1 text-lg w-10 h-10 sm::hidden z-[50]" onClick={() => setOpen(!open)}>
                    <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-black rounded-[2px] ${open ? "rotate-[45deg] translate-y-[5px]" : "rotate-[0deg]"}`}></span>
                    <span className={`duration-500 transition-all bg-black rounded-[2px] ${open ? "py-[0px] w-[0px] h-[0px] translate-x-[-24px]" : "translate-x-[4px] py-[1px] px-[10px] w-[8px] h-[2px]"}`}></span>
                    <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-black rounded-[2px] ${open ? "rotate-[-45deg] translate-y-[-5px]" : "rotate-[0deg]"}`}></span>
                </button>
              </div>
            </div>
            { children }
        </div>
    </div>
  )
}

export default AcoountLayout