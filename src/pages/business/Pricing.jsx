import { BusinessNavbar } from "./BusinessNavbar"
import { Button } from "@/components/Button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getXSRFToken } from "../functions/csrf";
import { getCategories, getBusiness } from "../functions/getters";
import { useOutletContext } from "react-router-dom";


const tables = ['PRODUCT', 'COST', 'PRICE', 'MARGIN', 'VS COMP', 'ACTIVE'];
export const Pricing = () => {
    const { id } = useParams();
    const { business, categories } = useOutletContext();
    const [productForm, setProductForm] = useState({
        name: "",
        SKU: "",
        category_id: "",
        cost: "",
        selling_price: "",
        is_active: ""
    });

    const [isCustomSKUChecked, setIsCustomSKUChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const handleIsCustomSKUChecked = () => {
        setIsCustomSKUChecked((prev) => !prev);
    }
    const handleIsModalOpen = () => {
        setIsModalOpen((prev) => !prev);
    }


    // insert Product
    const handleProductForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await fetch('http://localhost:8000/sanctum/csrf-cookie', {
                credentials: 'include'
            });

            const xsrfToken = getXSRFToken();

            const response = await fetch(`http://localhost:8000/api/products/${id}/store`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                    "X-XSRF-TOKEN": xsrfToken
                },
                body: JSON.stringify(productForm)
            })

            const data = await response.json();

            setMessage(data.message);

            setIsModalOpen(false);

        } catch (error) {
            console.error(error);
        }

    }

    const validateForm = () => {
        let valid = true;
        if (productForm.name === "") {
            setErrors((prev) => ({
                ...prev,
                name: "Product name cannot be empty."
            }));
            valid = false
        }

        if (productForm.category_id === "") {
            setErrors((prev) => ({
                ...prev,
                category_id: "Select a category."
            }));
            valid = false

        }
        if (productForm.cost === "") {
            setErrors((prev) => ({
                ...prev,
                cost: "Cost price is required."
            }));
            valid = false

        }
        if (productForm.selling_price === "") {
            setErrors((prev) => ({
                ...prev,
                selling_price: "Selling price is required."
            }));
            valid = false
        }

        return valid;
    }
    return (
        <div className="flex flex-col md:flex-row items-center min-h-screen w-full overflow-x-hidden relative">
            <div className="flex-1 min-h-screen w-full min-w-0">
                <div className="p-5">
                    <h2 className="text-2xl"><span className="font-bold">{business.name}</span> - Pricing</h2>
                    <div className="flex items-center">
                        <p className="text-xs">Set and optimize product pricing strategies</p>
                        <Button size="sm" className="flex ml-auto pe-5" onClick={handleIsModalOpen}>
                            <Plus />Add Product
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mx-5">
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1 ">
                        <p>Average Margin</p>
                        <p className="text-2xl font-bold text-primary">67.4%</p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Active SKUs</p>
                        <p className="text-2xl font-bold text-success">5</p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Beating Competitors</p>
                        <p className="text-2xl text-warning font-bold">1</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="flex-2 my-6">
                        <div className="rounded-t-md border border-black/10 flex flex-col md:flex-row p-2 mx-6 bg-light">
                            {categories.map((category, index) => (
                                <div key={category.id} className="hidden md:block rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer">{category.name}</div>

                            ))}
                        </div>
                        <div className="mx-6">
                            <table className="w-full hidden md:table text-center">
                                <thead>
                                    <tr className="bg-blue-50">
                                        <th>PRODUCT</th>
                                        <th>COST</th>
                                        <th>PRICE</th>
                                        <th>MARGIN</th>
                                        <th>VS COMP</th>
                                        <th>ACTIVE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PRODUCT 1</td>
                                        <td>COST 1</td>
                                        <td>PRICE 1</td>
                                        <td>MARGIN 1</td>
                                        <td>VS COMP 1 </td>
                                        <td>ACTIVE 1</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* mobile cards*/}
                            <div className="border-t-0">
                                {tables.map((table, index) => (
                                    <div key={index} className="flex flex-row md:hidden">
                                        <div className="bg-blue-50 w-32" key={index}>{table}</div>
                                        <div>
                                            PRODUCT 1
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 my-6">RIGHT</div>
                </div>
            </div>

            {/* modal */}
            {
                isModalOpen &&
                <div className="fixed inset-0 flex flex-col items-end justify-start animate-right-fade-in bg-black/50 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}>
                    <div className="w-full max-w-xl border border-black/10 bg-light" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-row items-center px-6 py-3">
                            <h4 className="text-xl font-bold">Add Product</h4>
                            <X className="ml-auto cursor-pointer" onClick={handleIsModalOpen} />
                        </div>
                        <p className="text-xs text-secondary/70 px-6 font-semibold">Set pricing details for the new product</p>
                        <div className="h-px bg-secondary/20 "></div>
                        <p className="text-xs text-secondary/70 font-semibold mx-6 mt-4">PRODUCT INFO</p>
                        <form onSubmit={handleProductForm}>
                            <div className="flex flex-col mx-6 mt-4">
                                <label htmlFor="productName" className="font-semibold text-xs text-secondary">Product Name</label>
                                <input type="text" placeholder="eg. Victus Omen 16" className="outline outline-black/30 rounded-sm mt-2 py-1 px-4" onChange={(e) => setProductForm({
                                    ...productForm,
                                    name: e.target.value
                                })} />
                            </div>
                            <div className="mx-6">
                                {errors.name &&
                                    <p className="text-danger animate-fade-in">{errors.name}</p>
                                }
                            </div>
                            <div className="mx-6 mt-4">
                                <div className="flex flex-col gap-3 mb-1">
                                    <label htmlFor="SKU" className="font-semibold text-xs text-secondary">SKU</label>
                                    <input type="text" placeholder="eg. LAP-X1-001" className="outline outline-black/30 rounded-sm  h-8 py-1 px-4 disabled:bg-gray-300" onChange={(e) => setProductForm({
                                        ...productForm,
                                        SKU: e.target.value
                                    })} disabled={isCustomSKUChecked === false} />
                                </div>
                                <div className="mx-6 flex flex-row gap-2 items-center">
                                    <input type="checkbox" onClick={handleIsCustomSKUChecked} className="cursor-pointer" />
                                    <label htmlFor="custom-sku" className="text-secondary/70 text-sm">Custom SKU</label>

                                </div>

                                <div className="flex flex-col justify-center">
                                    <label htmlFor="category" className="font-semibold text-xs text-secondary mb-2">Category</label>
                                    <select className="outline outline-secondary/40 rounded-sm h-8 px-2" onChange={(e) => setProductForm({
                                        ...productForm,
                                        category_id: e.target.value
                                    })}>
                                        <option value="" hidden>Select...</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <div className="">
                                        {errors.category_id &&
                                            <p className="text-danger animate-fade-in">{errors.category_id}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-secondary/70 font-semibold mx-6 mt-4">Pricing</p>
                            <div className="grid grid-cols-2 mx-6 gap-2">
                                <div>
                                    <label htmlFor="pricing" className="font-semibold text-xs text-secondary">Base Cost</label>
                                    <input type="number" placeholder="₱20.00" className="outline outline-black/30 rounded-sm mt-2 h-8 py-1 px-4 text-xs w-full" onChange={(e) => setProductForm({
                                        ...productForm,
                                        cost: e.target.value
                                    })} />
                                    {errors.cost &&
                                        <p className="text-danger animate-fade-in">{errors.cost}</p>
                                    }
                                </div>
                                <div>
                                    <label htmlFor="pricing" className="font-semibold text-xs text-secondary">Selling Price</label>
                                    <input type="number" placeholder="₱20.00" className="outline outline-black/30 rounded-sm mt-2 h-8 py-1 px-4 text-xs w-full" onChange={(e) => setProductForm({
                                        ...productForm,
                                        selling_price: e.target.value
                                    })} />
                                    {errors.selling_price &&
                                        <p className="text-danger animate-fade-in">{errors.selling_price}</p>
                                    }
                                </div>
                            </div>
                            <div className="mx-6">
                                <label htmlFor="pricing" className="font-semibold text-xs text-secondary">Competitor Price (optional)</label>
                                <input type="number" placeholder="₱20.00" className="outline outline-black/30 rounded-sm mt-2 h-8 py-1 px-4 text-xs w-full" onChange={(e) => setProductForm({
                                    ...productForm,
                                    competitor_price: e.target.value
                                })} />
                            </div>

                            <div className="mx-6 my-6 flex flex-col md:flex-row gap-2">
                                <Button size="sm" type="submit" className="w-full">Add Product</Button>
                                <button type="button" onClick={handleIsModalOpen} className="outline outline-secondary/70 rounded-lg py-1 px-3 hover:bg-secondary/70 hover:text-light">Cancel</button>
                            </div>
                        </form>
                        <div className="mx-6">
                            <p className="text-danger">{message}</p>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}
