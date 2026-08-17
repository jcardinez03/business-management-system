import { IndexNavbar } from "@/pages/index/IndexNavbar";
import { getBusinesses } from "./functions/getters";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Index = () => {

    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const data = await getBusinesses();

            setBusinesses(data);
        }


        fetchBusinesses();
    }, []);

    return (

        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64">
                <IndexNavbar />
            </div>

            <div className="grid grid-cols-2 gap-4 h-fit">
                {businesses.map((business) => {
                    return (
                        <Link to={`/business/${business.id}/dashboard`} key={business.id}>
                            <div className="rounded border border-black/40">
                                <h2 className="font-semibold text-4xl">{business.name}</h2>
                                <p>This will redirect you to business page</p>
                            </div>
                        </Link>
                    )
                }
                )}
            </div>
        </div>

    )
}

export default Index;