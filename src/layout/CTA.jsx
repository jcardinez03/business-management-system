import { Button } from "@/components/Button"

export const CTA = () => {
    return (
        <section className="relative overflow-hidden w-full max-w-md mx-auto mt-12 px-4">
            <div className="bg-primary rounded-2xl p-6 text-center">
                <p className="text-primary-foreground font-bold text-xl">Ready to take control?</p>
                <p className="text-primary-foreground/60 text-xs">Join 12,000+ businesses managing smarter with BizWise</p>
                <Button color="white" size="default" className="w-full mt-6 font-bold">
                    Create free account
                </Button>
            </div>
        </section>
    )
}