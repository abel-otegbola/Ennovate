function Footer() {
    return (
        <div className="">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[30px] py-[30px] md:px-[9%] px-[3%] border border-transparent border-t-gray-700/[0.09]">
                <ul className="w-full">
                    <h2 className="py-2 font-semibold uppercase">Products</h2>
                    <li className="flex w-full"><a href="/explore" className="py-[5px] w-full hover:text-green">Projects</a></li>
                    <li className="flex w-full"><a href="https://sdgs.un.org" className="py-[5px] w-full hover:text-green">Learn</a></li>
                    <li className="flex w-full"><a href="/dashboard/create" className="py-[5px] w-full hover:text-green">Create</a></li>
                </ul>
                <ul className="w-full">
                    <h2 className="py-2 font-semibold uppercase">Support</h2>
                    <li className="flex w-full"><a href="/FAQs" className="py-[5px] w-full hover:text-green">FAQs</a></li>
                    <li className="flex w-full"><a href="/terms&conditions" className="py-[5px] w-full hover:text-green">Terms of Service</a></li>
                    <li className="flex w-full"><a href="/privacypolicy" className="py-[5px] w-full hover:text-green">Privacy Policy</a></li>
                </ul>
                <ul className="w-full">
                    <h2 className="py-2 font-semibold uppercase">Resources and Blogs</h2>
                    <li className="flex w-full"><a href="/dashboard/projects" className="py-[5px] w-full hover:text-green">Project Resources</a></li>
                    <li className="flex w-full"><a href="https://sdgs.un.org/goals/goal7" className="py-[5px] w-full hover:text-green">SDG goal7 - Access to affordable, reliable, sustainable and modern energy</a></li>
                    <li className="flex w-full"><a href="https://sdgs.un.org/events/hlpf-2023-side-event-youth-engagement-systemic-transformation-sdg-summit-implementing-global" className="py-[5px] w-full hover:text-green">Youth engagement for systemic transformation at SDG-summit</a></li>
                </ul>
                <ul className="w-full">
                    <h2 className="py-1 text-lg mb-3 font-bold">Ennovate</h2>
                    <p className="py-1">300 Park Avenue, Lagos, Nigeria</p>
                    <a href="tel:+2347060989331" className="block mt-4 py-1">+2347060989331</a>
                    <a href="mailto:support@ennovate.com" className="block py-1">Support@ennovate.com</a>
                </ul>
            </div>
            <div className="bg-gray-900 text-white text-center">
                <p className="p-[3%]">Copyright &copy; {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Footer;