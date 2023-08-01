function Footer() {
    return (
        <div className="">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[30px] p-[3%] border border-transparent border-t-gray-200/[0.09]">
                <ul className="w-full">
                    <h2 className="py-2 text-lg">Products</h2>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Household</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Students</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Fundings</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Community</a></li>
                </ul>
                <ul className="w-full">
                    <h2 className="py-2 text-lg">Resources</h2>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Projects</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Learn</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Launch</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Collaborations</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">FAQs</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Terms of Service</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Privacy Policy</a></li>
                </ul>
                <ul className="w-full">
                    <h2 className="py-2 text-lg">Solutions</h2>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Project Resources</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Renewable sources</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Careers</a></li>
                    <li className="py-[5px] flex w-full"><a href="/projects" className="py-[5px] w-full hover:text-green">Guides</a></li>
                </ul>
                <ul className="w-full">
                    <h2 className="py-1 text-lg mb-3">Ennovate</h2>
                    <p className="py-1">300 Park Avenue, Lagos, Nigeria</p>
                    <p className="mt-4 py-1">+234 706 0989 331</p>
                    <p className="py-1">Support@ennovate.com</p>
                </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-100/[0.09]">
                <p className="p-[3%]">Copyright &copy; {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Footer;