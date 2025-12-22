import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/ui/box-reveal";
import { Link } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

const LandingPage = () => {
    return (
        <>
            <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 hidden">
                <div className="absolute top-2 right-2">
                    <Popover >
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="text-xs sm:text-sm">Who built this?</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 mr-2">
                            <div className="font-semibold leading-none tracking-tight flex items-center justify-between">
                                <p>Built with ❤️</p>
                            </div>
                            <div className="text-sm text-gray-700">Curious about the creator?</div>
                            <p className="text-sm text-gray-700 pt-2">This awesome project was crafted by a passionate developer who loves creating cool stuff!</p>
                            <div className="flex w-full pt-4">
                                <a href="https://newnagendra.netlify.app/" target="_blank" className="w-full"><Button className="w-full" variant="outline">Visit My Portfolio</Button></a>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
                    <BoxReveal boxColor={"#133E87"} duration={0.5}>
                        <p className="text-[2.5rem] font-semibold">
                            GitHub Wrapped 2025<span className="text-[#133E87]">.</span>
                        </p>
                    </BoxReveal>

                    <BoxReveal boxColor={"#133E87"} duration={0.5}>
                        <h2 className="mt-[.5rem] text-[1rem]">
                            Your Year, Your Code.{" "}
                            <span className="text-[#133E87]">Visualized.</span>
                        </h2>
                    </BoxReveal>

                    <BoxReveal boxColor={"#133E87"} duration={0.5}>
                        <div className="mt-6">
                            <p>
                                -&gt; Seamless Integration: All data fetched directly from the
                                <span className="font-semibold text-[#133E87]"> GitHub API</span>,
                                for
                                <span className="font-semibold text-[#133E87]"> real-time stats</span>,
                                and
                                <span className="font-semibold text-[#133E87]"> insights.</span>
                                . <br />
                            </p>
                        </div>
                    </BoxReveal>

                    <BoxReveal boxColor={"#133E87"} duration={0.5}>
                        <Link to='/form' >
                            <Button className="mt-[1.6rem] bg-[#133E87]" >Explore</Button>
                        </Link>

                    </BoxReveal>
                </div>
                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                />
            </div>
        </>
    )
}
export default LandingPage;