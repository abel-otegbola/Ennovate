import Topbar from "@/components/general/topbar/topbar";
import ScrollTextReveal from "../components/animations/scroll-text-reveal";
import ScrollAnimate from "../components/animations/scrollAnimation";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="">
      <header className="md:gap-12 gap-4">
        <Topbar />
        <div className="md:px-[5%] px-5 py-[5%] md:w-[55%] mx-auto min-h-[600px] flex flex-col flex-1 gap-6 text-center items-center justify-center">
          <ScrollTextReveal repeat={true} tag="h1" className="font-medium 2xl:text-[44px] lg:text-[36px] sm:text-[40px] text-[32px] leading-[120%] tracking-[-2%]">
            Insights and Innovations Shaping the Future of Engineering
          </ScrollTextReveal>
          <ScrollTextReveal repeat={true} tag="p" className="md:w-[60%] w-[80%] font-medium opacity-75">
            Access knowledge resources, and explore opportunities in the engineering field.
          </ScrollTextReveal>

          <ScrollAnimate className=" sm:w-fit w-full" delay={0.3} animation="slideUp">
            <Link href="/discover">
              <Button variant="ghost" size="sm"  className="sm:w-fit w-full border border-input">Discover</Button>
            </Link>
          </ScrollAnimate>
        </div>
      </header>
    </main>
  )
}
