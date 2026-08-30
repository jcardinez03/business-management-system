import { Briefcase, Menu, LayoutGrid, Calculator, Tag, Box, ChartLine, Users, ListCheck, LogOut } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getXSRFToken } from "../functions/csrf";



export const BusinessNavbar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dashboardNav = [
        {
            icon: LayoutGrid,
            title: "Dashboard",
            link: `/business/${id}/dashboard`,
            status: 'disabled'
        },
        {
            icon: Box,
            title: "Inventory",
            link: `/business/${id}/inventory`,
            status: 'active'
        },
        {
            icon: Tag,
            title: "Pricing",
            link: `/business/${id}/pricing`,
            status: 'active'
        },
        {
            icon: Calculator,
            title: "Cost Calculator",
            link: `/business/${id}/cost-calculation`,
            status: 'disabled'
        },
        {
            icon: ChartLine,
            title: "Sales",
            link: `/business/${id}/sales`,
            status: 'disabled'
        },
        {
            icon: Users,
            title: "Customers",
            link: `/business/${id}/customers`,
            status: 'disabled'
        },
        {
            icon: ListCheck,
            title: "Categories",
            link: `/business/${id}/categories`,
            status: 'disabled'
        }
    ]

    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();

        const xsrfToken = getXSRFToken();

        const response = await fetch('http://localhost:8000/api/logout', {
            method:"POST",
            credentials:"include",
            headers: {
                "Content-type": "application/json",
                "X-XSRF-TOKEN" : xsrfToken
            }
        });

        const data = await response.json()


        setMessage(data.message);
        navigate('/login');
    }

    const handleIsActive = () => {
        setIsActive((prev) => !prev);
    }

    const handleIsClicked = () => {
        setIsClicked((prev) => !prev);
    }
    return (
        <div className="w-full md:flex md:flex-col md:min-h-screen overflow-auto bg-dark text-light">
            <div className="flex items-center gap-1 p-5">
                <Briefcase size={25} />
                <div className="flex flex-col">
                    <h1>BizWise</h1>
                    {/* change this based on plan later */}
                    <p className="text-xs text-light/40">Pro Edition</p>
                </div>


                <div className="md:hidden ml-auto relative" onClick={handleIsClicked}>
                    <Menu />
                </div>

            </div>
            <div className="bg-light h-px" />
            <div className="hidden md:flex md:flex-col md:flex-1">
                <div className="px-7 pt-6">
                    <p className="text-xs text-light/40 font-bold">MAIN</p>
                </div>

                <div className="py-2">
                    {dashboardNav.map((nav, idx) => {
                        const Icon = nav.icon
                        return (
                            <div className="px-3 my-2" key={idx}>
                                <NavLink to={nav.link} onClick={(e) => {
                                    if(nav.status === "disabled"){
                                        e.preventDefault();
                                    }
                                }} className={({ isActive }) => 
                                    nav.status === "disabled" ? "flex items-center gap-4 px-4 py-4 w-full opacity-40 cursor-not-allowed"
                                    : isActive ?
                                        "flex items-center gap-4 px-4 py-4 w-full bg-light text-secondary rounded-xl" :
                                        "flex items-center gap-4 px-4 py-4 w-full hover:bg-light hover:rounded-xl hover:text-secondary"}>
                                    <Icon size={35} />
                                    <p className="text-xl">{nav.title}</p>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>

                <div className="h-px bg-light mt-auto" />
                
                <div className="px-6 cursor-pointer">
                    <h2>USERNAME</h2>
                    <div className="flex flex-row justify-between">
                    <p className="text-danger">Logout</p>
                    <LogOut />
                    </div>
                </div>
            </div>

            {/* mobile menu */}
            {isClicked &&
                <div className="animate-fade-in absolute glass w-full py-3 px-1">
                    {dashboardNav.map((nav, idx) => {
                        const Icon = nav.icon
                        return (
                            <div className="px-3" key={idx}>
                                <NavLink to={nav.link}>
                                    <div className="p-2 text-2xl flex gap-5 items-center" type="button">
                                        <Icon size={35} />
                                        <p className="text-xl">{nav.title}</p>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            }
        </div>

    )
}