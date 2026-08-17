import { BusinessNavbar } from "@/pages/business/BusinessNavbar";
import { Pricing } from "@/pages/business/Pricing";
import { getBusiness, getCategories } from "../functions/getters";
import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
export const BusinessLayout = () => {
    const { id } = useParams();

    const [business, setBusiness] = useState({});
    const [categories, setCategories] = useState([]);

    
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories(id);
            setCategories(data);
            
        }

        const fetchBusiness = async () => {
            const data = await getBusiness(id);
            setBusiness(data);
        }

        fetchCategories();
        fetchBusiness()
    }, [id]);

    return (

        <div className="flex flex-col md:flex-row items-center min-h-screen">
            <div className="w-full md:w-64">
                <BusinessNavbar />
            </div>
            <div className="flex-1 min-h-screen w-full">
                <Outlet context={{ business, categories }}/>
            </div>
        </div>

    )
}

