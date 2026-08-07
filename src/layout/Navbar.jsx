import { Button } from "@/components/Button";
import { Menu, X, BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
const navLinks = [
    { id: "login", href: "#login", label: "Sign In" },
    { id: "get-started", href: "#get-started", label: "Get started" }
]

export const Navbar = () => {
    const [isMenuButtonOpen, setIsMenuButtonOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150); // check if webpage has been scrolled
        }

        window.addEventListener("scroll", handleScroll);

        return() => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <header className={`fixed top-0 left-0 right-0 bg-transparent py-5 shadow-sm/10 z-10 transition-transform duration-800 ${isScrolled ? "-translate-y-full" : "translate-y-0"} `} >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-xl fw-bold hover:text-primary">
                    <h1 className="flex items-center gap-3 text-dark"><BriefcaseBusiness /> BizWise</h1>
                </a>


                {/* desktop buttons */}
                <div className="flex items-center gap-1">
                    {navLinks.map((link, index) => (
                        link.id !== "get-started" ?
                        <Button key={link.id} size="sm" color="white" className="font-semibold">
                            <a href={link.href}>{link.label}</a>
                        </Button>
                            :
                        <Button key={link.id} size="sm" color="blue" className="font-semibold">
                            <a href={link.href}>{link.label}</a>
                        </Button>
                        
                    ))}
                </div>
            </nav>
        </header>
    );
}