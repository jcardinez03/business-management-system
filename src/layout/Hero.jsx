import { Button } from "@/components/Button"
import dashboardImg from "@/assets/images/dashboard.png";

const stats = [
    {
        value: "12k+",
        label: "Businesses",
    },
    {
        value: "$2.4B",
        label: "Managed",
    },
    {
        value: "99.9%",
        label: "Uptime",
    },
];



export const Hero = () => {
    return (
        <section className="relative pt-26">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="bg-blue-50 flex items-center gap-2 rounded-2xl px-3 py-1.5 w-fit mx-auto md:mx-0">
                            <div className="w-1.5 h-1.5 bg-success animate-pulse rounded-full" />
                            <p className="text-center text-sm text-primary font-semibold">Now in Pro Edition</p>
                        </div>
                        <p className="text-3xl md:text-7xl font-semibold mx-auto text-center md:text-start">Run your business with total clarity</p>
                        <p className=" text-secondary/80 text-center text-sm mt-6 md:text-start md:text-2xl">BizWise gives you a real-time command centre for costs, pricing, inventory, sales, and customer intelligence — all in one place.</p>

                        <div className="w-full mx-auto flex flex-col md:flex-row gap-5 mt-6">
                            <Button color="blue" size="default" className="w-full">
                                Start for free
                            </Button>
                            <Button color="default" size="default" className="w-full border border-black/10">
                                Sign in to your account
                            </Button>
                        </div>
                        <p className="text-secondary/60 text-center text-xs mt-2">No credit card required &middot; 14 days free trial</p>
                    </div>
                    <div className="flex-1">
                        <div className="mt-6">
                            <img src={dashboardImg} alt="Dashboard PNG" className="mx-auto w-full" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-center">
                    {stats.map((stat) =>
                        <div key={stat.label} className="border border-secondary/30 py-3 w-full rounded shadow-md text-center">
                            <p className="font-bold text-xl md:text-3xl">{stat.value}</p>
                            <p className="text-xs text-secondary/50">{stat.label}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}