import { Briefcase, Menu, LayoutGrid, Calculator, Tag, Box, ChartLine, Users, ListCheck, LogOut, MonitorCheck } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const BusinessNavbar = () => {
    const { user } = useAuth();

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
            icon: MonitorCheck,
            title: "Point of Sales",
            link: `/business/${id}/point-of-sales`,
            status: 'disabled'
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
            status: 'active'
        }
    ]

    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState(false);
    console.log(isClicked);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('api/logout');

            setMessage(response.data.message);

        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem('token');
            navigate('/login');
        }
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
                                    if (nav.status === "disabled") {
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
                    <h2>{user.name}</h2>
                    <div className="flex flex-row gap-4" onClick={(e) => handleLogout(e.target.value)}>
                        <p className="">Logout</p>
                        <LogOut />
                    </div>
                </div>
            </div>

            {/* mobile menu */}
            {isClicked &&
                <div className="fixed inset-0 z-10 pt-20" onClick={() => setIsClicked(false)}>
                    <div className="animate-fade-in absolute z-10 glass w-full py-3 px-1" onClick={(e) => e.stopPropagation()}>
                        {dashboardNav.filter((nav) =>
                            nav.status !== "disabled")
                            .map((nav, idx) => {
                                const Icon = nav.icon
                                return (
                                    <div className="px-3" key={idx}>
                                        <NavLink to={nav.link} onClick={()=>setIsClicked(false)}>
                                            <div className="p-2 text-2xl flex gap-5 items-center" type="button">
                                                <Icon size={35} />
                                                <p className="text-xl">{nav.title}</p>
                                            </div>
                                        </NavLink>
                                    </div>
                                )
                            }
                            )}
                    </div>
                </div>
            }
        </div>

    )
}