import { Briefcase, Menu, LayoutGrid, Calculator, Tag, Box, ChartLine, Users } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const dashboardNav = [
    {
        icon: Box,
        title: "All Businesses",
        link: "/index"
    }
]


export const IndexNavbar = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleIsActive = () => {
        setIsActive((prev) => !prev);
    }
    
    const handleIsClicked = () => {
        setIsClicked((prev) => !prev);
    }
    return (
        <div className="w-full md:min-h-screen overflow-auto bg-dark text-light">
            <div className="flex items-center gap-3 p-5">
                <Briefcase size={25} />
                <div>
                    <h1>BizWise</h1>
                    {/* change this based on plan later */}
                    <p className="text-xs text-light/40">Pro Edition</p>

                </div>


                <div className="md:hidden ml-auto relative" onClick={handleIsClicked}>
                    <Menu />
                </div>

            </div>
            <div className="bg-light h-px" />
            <div className="hidden md:block">
                <div className="px-7 pt-6">
                    <p className="text-xs text-light/40 font-bold">MAIN</p>
                </div>

                <div className="py-2">
                {dashboardNav.map((nav, idx) => {
                    const Icon = nav.icon
                    return (
                    <div className="px-3 my-2" key={idx}>
                        <NavLink to={nav.link} className={({isActive}) => 
                        isActive ?
                        "flex items-center gap-4 px-4 py-4 w-full bg-light text-secondary rounded-xl":
                        "flex items-center gap-4 px-4 py-4 w-full hover:bg-light hover:rounded-xl hover:text-secondary"}>
                            <Icon size={35}/>
                            <p className="text-xl">{nav.title}</p>
                        </NavLink>
                    </div>
                    )
                })}
                </div>

            </div>

            {/* mobile menu */}
            {isClicked &&
                <div className="animate-fade-in absolute glass w-full py-3 px-1">
                    {dashboardNav.map((nav, idx) => {
                    const Icon = nav.icon
                    return (
                    <div className="px-3" key={idx}>
                        <div className="p-2 text-2xl flex gap-5 items-center">
                            <Icon size={35}/>
                            <p className="text-xl">{nav.title}</p>
                        </div>
                    </div>
                    )
                })}
                </div>
            }
        </div>

    )
}