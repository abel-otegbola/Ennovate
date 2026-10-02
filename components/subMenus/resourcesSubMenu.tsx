import { BookOpenIcon, BriefcaseIcon, InfoIcon, NetworkIcon, SearchCheckIcon, UsersIcon } from "lucide-react";

export default function ResourcesSubMenu() {
    return (
        <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
                <p className="opacity-50 uppercase text-[12px] p-2">Resources</p>
                {
                    [
                        {
                            id: 0,
                            title: "Insights",
                            icon: <BookOpenIcon strokeWidth={1} size={28} />,
                            text: "Stay ahead with insights on engineering innovations, technologies, research, and industry trends."
                        },
                        {
                            id: 1,
                            title: "Opportunities",
                            icon: <SearchCheckIcon strokeWidth={1} size={28} />,
                            text: "Discover engineering competitions, internships, scholarships, events, and career opportunities."
                        },
                        {
                            id: 2,
                            title: "Network",
                            icon: <NetworkIcon strokeWidth={1} size={28} />,
                            text: "Connect with engineers, researchers, and industry professionals while sharing knowledge and ideas."
                        },
                    ].map(item => (
                        <div key={item.id} className="flex items-start gap-2 p-2 pb-3 hover:bg-muted/[0.5] cursor-pointer rounded-[10px]">
                            {item.icon}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="opacity-75">{item.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col gap-2">
                <p className="opacity-50 uppercase text-[12px] p-2">Company</p>
                {
                    [
                        {
                            id: 0,
                            title: "About us",
                            icon: <InfoIcon strokeWidth={1} size={28} />,
                            text: "Learn about Ennovate and our mission to make engineering knowledge more accessible."
                        },
                        {
                            id: 1,
                            title: "Careers",
                            icon: <BriefcaseIcon strokeWidth={1} size={28} />,
                            text: "Explore career opportunities and discover pathways to build a meaningful career in engineering."
                        },
                        {
                            id: 2,
                            title: "Community",
                            icon: <UsersIcon strokeWidth={1} size={28} />,
                            text: "Join a growing community of engineers, students, researchers, and professionals sharing ideas."
                        },
                    ].map(item => (
                        <div key={item.id} className="flex items-start gap-2 p-2 pb-3 hover:bg-muted/[0.5] cursor-pointer rounded-[10px]">
                            {item.icon}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="opacity-75">{item.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col gap-5 p-4 rounded-lg h-full bg-gray-100/[0.5] border border-input/[0.4]">
                <p className="opacity-50 uppercase text-[12px]">Trending stories</p>
                <div className="relative flex flex-col justify-end gap-5 p-4 rounded h-full bg-[url('/resources.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden">
                    <div className="flex flex-col gap-1 text-white z-2">
                        <h3 className="font-medium">Engineering Essentials</h3>
                        <p className="">The concepts, tools, and principles every engineer should know.</p>
                        {/* <Link href="/discover">
                        <Button variant="link" size="sm"  className="sm:w-fit w-full px-0 text-white opacity-75">Read more</Button>
                        </Link> */}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#000000] "></div>
                </div>

            </div>
        </div>
    )
}