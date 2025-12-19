import { useState } from "react";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TooltipWithTrigger from "@/components/customComponents/tooltip";
import { useToast } from "@/hooks/use-toast";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Code, GitCommitHorizontal, Share2Icon, Flame, Star } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import { AnimatedList } from "@/components/ui/animated-list";
import SparklesText from "@/components/ui/sparkles-text";
import TypingAnimation from "@/components/ui/typing-animation";
import BlurIn from "@/components/ui/blur-in";
import FlipText from "@/components/ui/flip-text";
import HyperText from "@/components/ui/hyper-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ShineBorder from "@/components/ui/shine-border";

interface Item {
    name: string;
    description: string;
    icon: string;
    color: string;
    time: string;
}

// const API_URL = "http://localhost:5000/githubUser/getDetails/";

// const Backend_API_URL = '';

const authUsername = import.meta.env.VITE_AUTH_USERNAME;
const authPassword = import.meta.env.VITE_AUTH_PASSWORD;



const FormPage = () => {
    const { toast } = useToast();

    const getColorClass = (count: number) => {
        if (count === 0) return "bg-gray-200";
        if (count < 5) return "bg-green-100";
        if (count < 10) return "bg-green-300";
        if (count < 15) return "bg-green-500";
        return "bg-green-700";
    };

    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [date, setData] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const validateUsername = (input: string) => {
        // GitHub username validation regex
        const regex = /^[a-zA-Z0-9-]+$/;
        return regex.test(input);
    };

    const handleSubmit = async () => {
        if (!validateUsername(username)) {
            setError("Please enter a valid GitHub username.");
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please enter a valid GitHub username.",
            });
            return;
        }

        setLoading(true);
        setError("");

        try {

            if (!authUsername || !authPassword) {
                throw new Error("Authentication credentials are missing. Please check your .env file.");
            }

            const authHeader = `Basic ${btoa(`${authUsername}:${authPassword}`)}`;

            const response = await fetch(`https://git-hub-wrapped-2024-express-type-script-backend.vercel.app/githubUser/getDetails/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                },
            });

            if (!response.ok) {
                setError("GitHub user not found.");
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "GitHub user not found.",
                });
                setIsValid(false);
            } else {
                const data = await response.json();
                setIsValid(true);
                setData(data);
            }
        } catch (error: any) {
            console.error("Error:", error.message || error);
            setError(error.message || "Failed to fetch data from GitHub.");
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message || "Failed to fetch data from GitHub.",
            });
            setIsValid(false);
        } finally {
            setLoading(false);
        }
        fetchGitHubUser();
    };

    const fetchGitHubUser = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch GitHub user data');
            }

            const data = await response.json();
            setAvatarUrl(data.avatar_url);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    let notifications = [
        {
            name: `${date?.topLanguages?.[2]}`,
            description: "Magic UI",
            time: "",
            icon: "🚀",
            color: "#FFB800",
        },
        {
            name: `${date?.topLanguages?.[1]}`,
            description: "Magic UI",
            time: "",
            icon: "🚀",
            color: "#FF3D71",
        },
        {
            name: `${date?.topLanguages?.[0]}`,
            description: "Magic UI",
            time: "",
            icon: "🚀",
            color: "#1E86FF",
        },
    ];

    const Notification = ({ name, icon, color }: Item) => {
        return (
            <figure
                className={cn(
                    "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-xl py-1 px-3",
                    // animation styles
                    "transition-all duration-200 ease-in-out hover:scale-[103%]",
                    // light styles
                    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                    // dark styles
                    "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                )}
            >
                <div className="flex flex-row items-center gap-3">
                    <div
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{
                            backgroundColor: color,
                        }}
                    >
                        <span className="text-lg">{icon}</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                            <span className="text-sm">{name}</span>
                        </figcaption>
                    </div>
                </div>
            </figure>
        );
    };


    const features = [
        {
            name: "",
            description: "",
            href: "#",
            cta: "",
            className: "col-span-3 lg:col-span-3",
            background: (
                <div className="transform scale-x-[-1] rotate-[-90deg]">
                    <div className="grid grid-cols-7 gap-[2px] md:gap-1">
                        {date && date.contributions.map((day: any, index: any) => (
                            <TooltipWithTrigger
                                trigger={
                                    <div
                                        key={index}
                                        className={`w-1 md:w-2 lg:w-3 xl:w-4 h-1 md:h-2 lg:h-3 xl:h-4 rounded-none lg:rounded ${getColorClass(day.contributionCount)} transition-transform transform hover:scale-110`}
                                    // title={`Date: ${day.date}, Contributions: ${day.contributionCount}`}
                                    ></div>
                                }
                                content={`Date: ${day.date}, Contributions: ${day.contributionCount}`}
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            Icon: GitCommitHorizontal,
            name: "Total Commits made in 2025",
            description: "",
            href: "#",
            cta: "",
            className: "col-span-3 lg:col-span-1",
            background: (
                <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
                    <NumberTicker value={date?.totalCommits} />
                </p>
            ),
        },
        {
            Icon: Code,
            name: "Top Languages",
            description: "",
            href: "#",
            cta: "",
            className: "col-span-3 lg:col-span-2",
            background: (
                <AnimatedList>
                    {notifications.map((item, idx) => (
                        <Notification {...item} key={idx} />
                    ))}
                </AnimatedList>
            ),
        },
        {
            Icon: Share2Icon,
            name: "Repositories created in 2025",
            description: "",
            href: "#",
            cta: "",
            className: "col-span-3 lg:col-span-2",
            background: (
                <div className="flex justify-center items-center h-[100%]">
                    <SparklesText text={date?.reposCreatedIn2024Count} />
                </div>
            ),
        },
        {
            Icon: CalendarIcon,
            name: "Most Active Month",
            description: "",
            className: "col-span-3 lg:col-span-1",
            href: "#",
            cta: "",
            background: (
                <TypingAnimation>{`${date?.mostActiveMonth?.name} -  ${date?.mostActiveMonth?.commits}`}</TypingAnimation>
            ),
        },
        {
            Icon: Flame,
            name: "Longest Streak",
            description: "",
            className: "col-span-3 lg:col-span-1",
            href: "#",
            cta: "",
            background: (
                <BlurIn
                    word={`${date?.longestStreak}`}
                    className="text-4xl font-bold text-black dark:text-white"
                />
            ),
        },
        {
            Icon: CalendarIcon,
            name: "Most Active Day",
            description: "",
            className: "col-span-3 lg:col-span-1",
            href: "#",
            cta: "",
            background: (
                <HyperText>{`${date?.mostActiveDay?.name} - ${date?.mostActiveDay?.commits}`}</HyperText>
            ),
        },
        {
            Icon: Star,
            name: "Stars Earned",
            description: "",
            className: "col-span-3 lg:col-span-1",
            href: "#",
            cta: "",
            background: (
                <FlipText
                    className="text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
                    word={`${date?.starsEarned}`}
                />
            ),
        }
    ];

    return (
        <>
            <div className="relative min:h-screen  w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-5 md:p-10 pt-10">
                {isValid ? (<>
                    <div className="absolute top-2 right-4">
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="text-xs p-0 border-none">
                                    <ShineBorder
                                        className="py-2 px-4 font-medium"
                                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                    >Who built this?</ShineBorder>
                                </Button>

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
                    <Card className="p-5 mt-4">
                        <AnimatedGradientText className="mb-10">
                            <img src={avatarUrl} className="h-5 w-5 md:h-10 md:w-10 rounded-full" /> <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                            <span
                                className={cn(
                                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                )}
                            >
                                {date?.username}
                            </span>
                        </AnimatedGradientText>
                        <BentoGrid>
                            {features.map((feature, idx) => (
                                <BentoCard key={idx} {...feature} />
                            ))}
                        </BentoGrid>
                    </Card>
                </>) : (<>
                    <div className="h-[500px] flex justify-center items-center">
                        <Card className="w-[350px] relative">
                            <CardHeader>
                                <CardTitle>Username</CardTitle>
                                <CardDescription>Enter your Github username.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Type here.."
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <TooltipWithTrigger
                                    trigger={
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? "Loading..." : "Submit"}
                                        </Button>
                                    }
                                    content={`Click to submit`}
                                />
                            </CardFooter>
                            <BorderBeam size={250} duration={5} delay={9} />
                        </Card>
                        <AnimatedGridPattern
                            numSquares={30}
                            maxOpacity={0.1}
                            duration={3}
                            repeatDelay={1}
                            className={cn(
                                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                            )}
                        />
                    </div>
                </>)}
            </div>
        </>
    );
};

export default FormPage;