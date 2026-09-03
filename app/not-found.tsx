import ScrollTextReveal from "@/components/animations/scroll-text-reveal";
import Link from "next/link";

export default function ErrorPage() {
    return (
        <main className="">
          
          {/* ========== Header hero ========== */}
          <header className="relative bg-cover bg-center text-white">
            
                            
            <div className="flex flex-col gap-5 items-center justify-center text-center overflow-hidden py-[7%] px-4 md:px-4">
                <ScrollTextReveal tag="h1" repeat={true} className="font-semibold tracking-[-0.6px] leading-[120%] text-[40px] max-[480px]:text-[32px] leading-[130%]">
                    404
                </ScrollTextReveal>
                
                <ScrollTextReveal tag="p" repeat={true} className="mb-4 md:w-[95%] font-medium leading-[120%] tracking-[-2%]">
                    Page not found
                </ScrollTextReveal>
            </div>
        </header>
        
            <article className="md:px-[20%] sm:px-[10%] p-4">
                <div className="flex flex-col gap-[50px] border border-neutral-100 rounded-[32px] lg:p-[60px] p-5">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <h3 className="uppercase text-[20px] text-center text-neutral-1000 font-bold">We could not find that page</h3>
                        <Link href="/" className="flex md:w-fit w-full gap-[10px] items-center justify-center font-medium  rounded-full bg-neutral-1000 text-white px-9 py-4">
                            Take me home
                        </Link>
                    </div>
                </div>
            </article>
        

    </main>
    )
}