import ScrollTextReveal from "../components/animations/scroll-text-reveal";
import ScrollAnimate from "../components/animations/scrollAnimation";
import { Button } from "../components/ui/button";

export default function Page() {
  return (
    <main className="">
      <header className="md:px-[5%] px-4 flex md:flex-row flex-col md:gap-12 gap-4 min-h-[500px] py-[5%]">
        <div className="md:w-[54%] flex flex-col gap-6">
          <ScrollTextReveal repeat={true} tag="h1" className="font-semibold 2xl:text-[64px] lg:text-[52px] sm:text-[40px] text-[32px] leading-[120%] tracking-[-2%]">
            Get engineering knowledge and opportunities.
          </ScrollTextReveal>
          <ScrollTextReveal repeat={true} tag="p" className="md:w-[75%] font-medium opacity-75">
            Ennovate is a global engineering platform that lets you connect with experts, access knowledge resources, and explore opportunities in the engineering field—all from one secure app.
          </ScrollTextReveal>

          <div className="flex sm:flex-row flex-col gap-4 sm:w-fit w-full">
            <ScrollAnimate className=" sm:w-fit w-full" delay={0.3} animation="slideUp">
              <Button className="font-semibold sm:w-fit w-full">Discover</Button>
            </ScrollAnimate>
            <ScrollAnimate className=" sm:w-fit w-full" delay={0.6} animation="slideUp">
              <Button variant="secondary" className="font-semibold sm:w-fit w-full">Learn more</Button>
            </ScrollAnimate>
          </div>
        </div>
      </header>
    </main>
  )
}
