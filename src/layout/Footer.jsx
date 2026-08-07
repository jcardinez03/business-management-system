import { BriefcaseBusiness } from "lucide-react"

export const Footer = () => {
    return (
        <section className="relative overflow-hidden w-full max-w-md mx-auto mt-12 px-4">
            <div className="animate-fade-in animation-delay-1200">
                <p className="flex gap-3 items-center justify-center"><BriefcaseBusiness /> <span className="font-bold">BizWise</span></p>
                <p className="text-center text-xs text-secondary/60 mt-3">&copy; 2026 BizWise Pro. All rights reserved.</p>
            </div>
        </section>
    )
}