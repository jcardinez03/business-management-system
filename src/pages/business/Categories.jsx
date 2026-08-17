import { useOutletContext, useParams } from "react-router-dom";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { getXSRFToken } from "../functions/csrf";

export const Categories = () => {
    const { business, categories } = useOutletContext();
    const { id } = useParams();
    const [addCategory, setAddCategory] = useState({
        name: ""
    });
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentCategories = categories.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(categories.length / itemsPerPage);



    // ERROR
    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const XSRFToken = getXSRFToken();

        const response = await fetch(`http://localhost:8000/api/categories/${id}/store`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                "X-XSRF-TOKEN": XSRFToken
            },
            body: JSON.stringify(addCategory)
        });

        const data = await response.json();


        setMessage(data.message)
        setAddCategory({ name: "" });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const validateForm = () => {
        let valid = true;

        if (addCategory.name === "") {
            setErrors("Category is required");
            valid = false;
        } else {
            setErrors("");
        }

        return valid;
    }
    return (
        <div className="flex flex-col md:flex-row items-center min-h-screen w-full overflow-x-hidden relative">
            <div className="flex-1 min-h-screen w-full min-w-0 relative">
                <div className="p-5">
                    <h2 className="text-2xl"><span className="font-bold">{business.name}</span> - Categories</h2>
                    <div className="flex items-center">
                        <p className="text-xs">Add all the categories of your business.</p>

                    </div>
                </div>
                <div className="mx-6">
                    <form onSubmit={handleAddCategory} className="flex flex-row gap-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={addCategory.name} className="rounded-lg border border-black/30" onChange={(e) => setAddCategory({
                            name: e.target.value
                        })} />

                        <button className="flex items-center gap-1 bg-primary text-white rounded-md px-3"><Plus /> Add</button>
                    </form>
                    <p className="text-success animate-fade-in">{message}</p>
                    <p className="text-danger animate-fade-in">{errors}</p>
                </div>
                <div className="mx-6 mt-6 w-full md:max-w-xl">
                    <table className="w-full md:max-w-xl">
                        <thead>
                            <tr>
                                <th colSpan={4}>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategories.map((category, index) => {
                                let count = 1
                                return (
                                    <tr key={category.id}>
                                        <td>{firstIndex + index + 1}</td>
                                        <td className="px-2 py-2 text-center">{category.name}</td>
                                        <td className="px-2 py-2"><SquarePen className="text-warning cursor-pointer" /></td>
                                        <td className="px-2 py-2"><Trash2 className="text-danger cursor-pointer" /></td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="text-primary hover:outline-primary hover:outline-1 hover:bg-dark/5 hover:rounded-sm"
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="text-primary hover:outline-primary hover:outline-1 hover:bg-dark/5 hover:rounded-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

