import { BusinessNavbar } from "@/pages/business/BusinessNavbar";
import { useOutletContext } from "react-router-dom";
export const Dashboard = () => {
    const {business, categories} = useOutletContext();
    return (
        <div className="flex-1 min-h-screen w-full min-w-0">
            
            {business.name}
        </div>
    )
}