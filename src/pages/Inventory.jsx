import { DashboardNavbar } from "@/pages/dashboard/DashboardNavbar";
import { Button } from "@/components/Button";
import { Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = ['All', 'Electronics', 'Audio', 'Furniture', 'Accessories', 'Snacks'];
const tables = ['PRODUCT', 'STATUS', 'STOCK', 'REORDER AT', 'REORDER QTY', 'UNIT COST', 'STOCK VALUE', 'LOCATION', 'RESTOCKED'];
export const Inventory = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleIsClicked = () => {
        setIsClicked((prev) => !prev);
    }
    return (
        <div className="flex flex-col md:flex-row items-center min-h-screen w-full overflow-x-hidden">
            <div className="w-full md:w-64">
                <DashboardNavbar />
            </div>
            <div className="flex-1 min-h-screen w-full min-w-0">
                <div className="p-5">
                    <h2 className="text-2xl">[Business Name] - Inventory</h2>
                    <div className="flex items-center">
                        <p className="text-xs">Track stock levels, reorder points, and warehouse locations</p>
                        <Button size="sm" className="flex ml-auto pe-5">
                            <Plus />Receive stock
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mx-5">
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1 ">
                        <p>Total SKU</p>
                        <p className="text-2xl font-bold text-primary">8</p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Inventory Value</p>
                        <p className="text-2xl font-bold">$89</p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Low Stock</p>
                        <p className="text-2xl text-warning font-bold">1</p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Critical</p>
                        <p className="text-2xl text-danger font-bold">1</p>
                    </div>
                </div>
                <div className="mt-5 mx-5 border border-black/10 bg-dark/1 rounded-t-lg flex flex-col relative">
                    <div className="flex flex-row ">
                        <div>
                            <input type="search" name="" id="" className="m-3 border border-black/5 rounded-sm bg-dark/5" />
                        </div>
                        <div className="flex md:flex-row items-center">
                            {categories.map((category, idx) =>
                                <div key={idx} className={idx >= 0 ? "hidden md:block rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer" : "md:hidden rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70"}>{category}</div>
                            )}
                            <div className="md:hidden rounded-md bg-dark/10 px-1 py-0 w-fit mx-2 text-xs text-dark/70 text-center flex items-center" onClick={handleIsClicked}>Show categories <ChevronDown size={15} /></div>
                            {/* mobile menu */}

                        </div>

                    </div>
                    {isClicked &&
                        <div className="absolute top-13 animate-fade-in border px-3 py-2 w-full rounded-b-lg bg-dark/50 text-light font-semibold">
                            {categories.map((cat, idx) => {

                                return (
                                    <div className="flex flex-col py-2 justify-center">
                                        {cat}
                                        <div className="h-px bg-light" />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className="mx-5 border border-t-0 border-black/10">
                    <table className="hidden md:table w-full bg-light">
                        <tr>
                            <th>PRODUCT</th>
                            <th>STATUS</th>
                            <th>STOCK</th>
                            <th>REORDER AT</th>
                            <th>REORDER QTY</th>
                            <th>UNIT COST</th>
                            <th>STOCK VALUE</th>
                            <th>LOCATION</th>
                            <th>RESTOCKED</th>
                        </tr>
                    </table>

                    {/* mobile */}
                    <div className="flex flex-col md:hidden ">
                        {tables.map((table, idx) => (
                            <div key={idx} className="flex flex-row items-center">
                                <div className="w-32 bg-light font-bold p-2">{table}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Inventory;