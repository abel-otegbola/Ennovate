import Topbar from "@/components/general/topbar/topbar";
import ScrollTextReveal from "../components/animations/scroll-text-reveal";
import ScrollAnimate from "../components/animations/scrollAnimation";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image"
import { ArrowUpRight } from "lucide-react";

export default function Page() {
  return (
    <main className="">
      <header className="flex flex-col h-[640px]">
        <Topbar />
        <div className="flex md:flex-row flex-col gap-12 md:p-8 p-4 md:py-8 py-[40px] flex-1">
          <div className="mx-auto flex flex-col md:w-[35%] gap-6 justify-end py-6">
            <ScrollTextReveal repeat={true} tag="p" delay={0.6} className="font-bold w-fit uppercase py-1 text-[14px]">
              Engineering Resources Hub
            </ScrollTextReveal>
            <ScrollTextReveal repeat={true} tag="h1" className="font-medium 2xl:text-[64px] lg:text-[44px] text-[40px] leading-[120%] tracking-[-2%]">
              Discover the Future of Engineering
            </ScrollTextReveal>
            <div className="flex gap-6">
              <div className="w-[80px] aspect-video rounded-lg bg-gray-200  bg-[url('/2.png')] bg-cover"></div>

              <ScrollTextReveal repeat={true} tag="p" className="md:w-[60%] w-[80%] font-medium opacity-75">
                Access knowledge resources, and explore opportunities in the engineering field.
              </ScrollTextReveal>
            </div>

            <ScrollAnimate className=" sm:w-fit w-full mt-16" delay={0} start="top 100%" animation="slideUp">
              <Link href="/discover">
                <Button className="sm:w-fit w-full border border-input">Get Started</Button>
              </Link>
            </ScrollAnimate>
          </div>

          <div className="sm:w-[30%] relative flex items-center justify-center">
            <div className="shadow-md flex justify-end p-3 gap-2 rounded-[16px] bg-white/50 backdrop-blur-sm absolute z-2 top-6 md:right-[-40%]">
              <div className="flex flex-col gap-2 justify-between">
                <ScrollTextReveal repeat={true} tag="p" className="font-medium text-[12px]">
                  Engineering community
                </ScrollTextReveal>
                <ScrollTextReveal repeat={true} tag="p" className="font-medium w-[200px] text-[10px]">
                  Join the community and explore vast resources in the engineering field
                </ScrollTextReveal>
              </div>
              <div className="flex flex-col gap-3 items-end justify-between">
                 <ScrollTextReveal repeat={true} tag="p" className="font-medium ">
                  <span className="opacity-75 text-[12px]">Join 20k+ users</span>
                </ScrollTextReveal>
                <Image src="/users.png" width={120} height={60} alt="users" />
              </div>
            </div>
            <Image src="/hero-bg.jpg" width={2000} height={100} alt="hero" className="md:h-full h-[200px] md:aspect-3/4 object-cover w-full mx-auto md:rounded-[20px] rounded-[10px] bg-gray-200" />
          </div>
          <div className="flex flex-col md:w-[35%] gap-6 justify-end">
            <div className="flex gap-3 items-center">
              <div className="flex">
                <div className="h-[48px] aspect-square rounded-lg bg-gray-200 border-2 border-white bg-[url('/1.png')] bg-cover"></div>
                <div className="h-[48px] aspect-square rounded-lg bg-gray-200 -ml-4 border-2 border-white bg-[url('/2.png')] bg-cover"></div>
                <div className="h-[48px] aspect-square rounded-lg bg-gray-200 -ml-4 border-2 border-white bg-[url('/3.png')] bg-cover"></div>
              </div>

              <ScrollTextReveal repeat={true} tag="p" className="md:w-[60%] w-[80%] font-medium ">
                <span className="text-primary text-lg">Experiences</span><br />
                <span className="opacity-75">Revolutionizing industries</span>
              </ScrollTextReveal>
            </div>

            <div className="flex justify-start md:h-[200px] h-[160px] items-end">
              <div className="rounded-full p-8 border border-border w-fit">
                <ArrowUpRight />
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  )
}
