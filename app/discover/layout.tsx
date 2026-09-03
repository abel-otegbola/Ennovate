'use client'
// import LogoIcon from "@/assets/icons/logo";
import SearchBar from "@/components/general/search/searchBar";
import Sidebar from "@/components/general/sidebar/sidebar";
import { AuthContext } from "@/context/useAuth";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

function AcoountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1">
            <div className="flex flex-wrap gap-4 justify-between bg-white dark:bg-[#1C1B24] items-center md:pl-8 p-2 border-b border-gray-500/[0.1]">
              <Link href={"/"} className={`md:hidden flex items-center fill-black dark:fill-white h-[24px]`}>
                  {/* <LogoIcon width={20} /> */}
              </Link>
              <SearchBar />

              <div className="flex items-center gap-6 mr-4">
                {/* <Button href="/account/create-video">Create Pitch</Button> */}
                <Link href="/inbox"> <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-500/[0.05] outline outline-offset-2 outline-primary/[0.2]"><BellIcon strokeWidth={1} size={20} /></button></Link>
                <div className="flex gap-2 items-center w-fit">
                  <div className="h-8 w-8 rounded-full bg-[url('/profile.jpg')] bg-cover bg-center outline outline-offset-2 outline-primary/[0.2]">
                    <Image src={user?.avatar || "/profile.jpg"} alt="profile" width={32} height={32} className="rounded-full" />
                  </div>
                  <div className="flex-col gap-1 md:flex hidden">
                    <p className="font-semibold">{user?.fullname}</p>
                    <p className="text-[12px] opacity-[0.7]">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            { children }
        </div>
    </div>
  )
}

export default AcoountLayout