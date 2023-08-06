function TermsConditions() {
    const sections: string[] = ["Introduction", "Definitions", "Use of the Website", "Intellectual Property", "Privacy", "Limitation of Liability", "Indemnification", "Dispute Resolution", "General"]
    return (
        <div className="p-[3%] md:flex">
            <div className="md:sticky flex flex-col items-center top-[65px] h-screen md:w-[250px] p-4">
                {
                    sections.map((section: string, i:number) => (
                        <a key={i} href={`#${section}`} className="block p-[12px] w-full hover:text-green">{section}</a>
                    ))
                }
            </div>
            <div className="flex-1 p-[3%] border border-transparent border-l-gray-200 dark:border-l-gray-100/[0.04]">
                <h1 className="md:text-4xl text-xl font-bold py-2 border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.04]">Terms and Conditions</h1>
                <div className="py-12" id="Introduction">
                    <h2 className="text-lg py-2">Introduction</h2>
                    <p className="py-2">These terms and conditions govern your use of the website located at Ennovate. By using the website, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you should not use the website</p>
                </div>
                <div className="py-12" id="Definitions">
                    <h2 className="text-lg py-2">Definitions</h2>
                    <p className="py-2">
                    In these terms and conditions, the following terms have the following meanings:

                    <li>"Website" means the website located at Ennovate.</li>
                    <li>"You" means the individual or entity accessing or using the website.</li>
                    </p>
                </div>
                <div className="py-12" id="Use of the Website">
                    <h2 className="text-lg py-2">Use of the Website</h2>
                    <p className="py-2">
                    You may use the website for lawful purposes only. You may not use the website for any of the following purposes:

                    <li>To transmit any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable material.</li>
                    <li>To harm minors in any way.</li>
                    <li>To impersonate any person or entity, or to misrepresent your affiliation with any person or entity.</li>
                    <li>To violate the privacy or publicity rights of any person.</li>
                    <li>To collect or store personal information about other users.</li>
                    <li>To spam or otherwise flood the website with unwanted messages.</li>
                    <li>To engage in any other conduct that may violate applicable laws or regulations.</li>
                    </p>
                </div>
                <div className="py-12" id="Intellectual Property">
                    <h2 className="text-lg py-2">Intellectual Property</h2>
                    <p className="py-2">The content on the website is protected by copyright and other intellectual property laws. You may not modify, reproduce, distribute, or create derivative works from the content on the website without the express written permission of the copyright holder.</p>
                </div>
                <div className="py-12" id="Privacy">
                    <h2 className="text-lg py-2">Privacy</h2>
                    <p className="py-2">Your privacy is important to us. We collect and use your personal information in accordance with our privacy policy, which is available at <a href="https://Ennovate.netlify.app/privacypolicy.">Privacy page</a></p>
                </div>
                <div className="py-12" id="Limitations of Liability">
                    <h2 className="text-lg py-2">Limitations of Liability</h2>
                    <p className="py-2">We will not be liable for any damages arising out of or in connection with your use of the website, including, but not limited to, direct, indirect, incidental, consequential, or punitive damages.</p>
                </div>
                <div className="py-12" id="Indemnification">
                    <h2 className="text-lg py-2">Indemnification</h2>
                    <p className="py-2">You agree to indemnify and hold us harmless from any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the website.</p>
                </div>
                <div className="py-12" id="Dispute Resolution">
                    <h2 className="text-lg py-2">Dispute Resolution</h2>
                    <p className="py-2">Any disputes arising out of or in connection with these terms and conditions will be resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be held in Lagos, Nigeria.</p>
                </div>
                <div className="py-12" id="General">
                    <h2 className="text-lg py-2">General</h2>
                    <p className="py-2">These terms and conditions may be modified from time to time. Your continued use of the website after any modification constitutes your acceptance of the modified terms and conditions.</p>

                    <p>If any provision of these terms and conditions is found to be invalid or unenforceable, such provision will be struck from these terms and conditions and the remaining provisions will remain in full force and effect.</p>

                    <p>These terms and conditions are governed by the laws of the State of Lagos. You agree to submit to the exclusive jurisdiction of the courts in the State of Lagos for any disputes arising out of or in connection with these terms and conditions.</p>
                </div>
               
            </div>
        </div>
    )
}

export default TermsConditions;