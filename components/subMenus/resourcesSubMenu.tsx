import { BookOpenIcon, BriefcaseIcon, InfoIcon, NetworkIcon, SearchCheckIcon, UsersIcon } from "lucide-react";
import Link from "next/link"
import { Button } from "../ui/button";

export default function ResourcesSubMenu() {
    return (
        <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-5">
                <p className="opacity-50 uppercase text-[12px]">Resources</p>
                {
                    [
                        { id: 0, title: "Articles", icon: <BookOpenIcon strokeWidth={1} size={28} />, text: "Discover latest articles to get yourself up to speed with latest innovations in the engineering world." },
                        { id: 1, title: "Opportunities", icon: <SearchCheckIcon strokeWidth={1} size={28} />, text: "Find engineering positions opened for specifically for you to gain experience in the field." },
                        { id: 2, title: "Network", icon: <NetworkIcon strokeWidth={1} size={28} />, text: "Discover experts and build connections with industry giants. Share valuable knowledge." },
                        
                    ].map(item => (
                        <div key={item.id} className="flex items-start gap-2">
                            {item.icon}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="opacity-75">{item.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col gap-5">
                <p className="opacity-50 uppercase text-[12px]">Company</p>
                {
                    [
                        { id: 0, title: "About us", icon: <InfoIcon strokeWidth={1} size={28} />, text: "Discover latest articles to get yourself up to speed with latest innovations in the engineering world." },
                        { id: 1, title: "Careers", icon: <BriefcaseIcon strokeWidth={1} size={28} />, text: "Find engineering positions opened for specifically for you to gain experience in the field." },
                        { id: 2, title: "Community", icon: <UsersIcon strokeWidth={1} size={28} />, text: "Discover experts and build connections with industry giants. Share valuable knowledge." },
                        
                    ].map(item => (
                        <div key={item.id} className="flex items-start gap-2">
                            {item.icon}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="opacity-75">{item.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col gap-5 p-4 rounded-lg h-full bg-gray-100/[0.5]">
                <p className="opacity-50 uppercase text-[12px]">Trending stories</p>
                <div className="relative flex flex-col justify-end gap-5 p-4 rounded-lg h-full bg-[url('/auth-bg.png')] bg-cover bg-no-repeat bg-center overflow-hidden">
                    <div className="flex flex-col gap-1 text-white z-2">
                        <h3 className="font-medium">Safety</h3>
                        <p className="">What every engineer must learn before practicing.</p>
                        <Link href="/discover">
                        <Button variant="link" size="sm"  className="sm:w-fit w-full px-0 text-primary">Read more</Button>
                        </Link>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#000000] "></div>
                </div>

            </div>
        </div>
    )
}