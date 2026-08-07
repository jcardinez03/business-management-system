import {
    Zap,
    Tags,
    Package,
    ChartColumn,
    Users,
    Settings
} from "lucide-react";

export const features = [
    {
        id: 1,
        icon: Zap,
        title: "Cost Calculator",
        description:
            "Break down production costs with markup and tax modelling.",
    },
    {
        id: 2,
        icon: Tags,
        title: "Pricing Manager",
        description:
            "Set competitive strategies and track margins in real time.",
    },
    {
        id: 3,
        icon: Package,
        title: "Inventory",
        description:
            "Monitor stock levels, reorder points, and warehouse locations.",
    },
    {
        id: 4,
        icon: ChartColumn,
        title: "Sales Analytics",
        description:
            "Revenue charts, order tracking, and performance trends.",
    },
    {
        id: 5,
        icon: Users,
        title: "Customers",
        description:
            "Track Overall business health with consolidated views"
    },
    {
        id: 6,
        icon: Settings,
        title: "Operations Dashboard",
        description:
            "LTV analysis, churn scoring, and AI-powered recommendations.",
    },
];

export const Features = () => {
    return (
        <section className="relative overflow-hidden container mx-auto mt-12 px-4">
            <p className="font-bold text-2xl">Everything you need</p>
            <div className="grid md:grid-cols-2 flex flex-col md:flex-row gap-4">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div key={feature.id} className="w-full border border-secondary/10 p-5 rounded-xl flex gap-4 items-center">
                            <p><Icon /></p>
                            <div>
                                <p className="font-semibold">{feature.title}</p>
                                <p className="text-xs text-secondary/60">{feature.description}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </section>
    )
}