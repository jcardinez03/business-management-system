import { useOutletContext, useParams } from "react-router-dom";
import { Button } from "@/components/Button";
import { Pen, StepBack, StepForward, Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../../axios";
import { getCategories } from "../functions/getters";
export const Categories = () => {
    const { business, categories, setCategories, products } = useOutletContext();
    const { id } = useParams();
    const [addCategory, setAddCategory] = useState({
        name: ""
    });
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentCategories = categories.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    // SELECT EDIT CATEGORY
    const [selectEditCategoy, setSelectEditCategory] = useState(false);
    const [editForm, setEditForm] = useState({
        id: null,
        name: ""
    });

    const handleEditForm = async (e) => {
        e.preventDefault();


        if (!validateEditForm()) {
            setTimeout(() => {
                setErrors("");
            }, 1000);
            return;
        }

        try {
            const response = await api.patch(`api/categories/${editForm.id}/update`, editForm);

            setSelectEditCategory(false);

            setCategories((prev) =>
                prev.map((category) =>
                    category.id === editForm.id ?
                        { ...category, name: editForm.name }
                        : category
                )
            );

            const data = await response.data;
            setMessage(data.message);

            setTimeout(() => {
                setMessage("");
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }

    // DELETE CATEGORY
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const handleDeleteCategoryId = async (category_id) => {
        setDeleteCategoryId(category_id);

        try {
            await api.delete(`/api/categories/${category_id}/destroy`);


            setCategories((prev) =>
                prev.filter((category) => category.id !== category_id)
            );

        } catch (error) {
            console.error(error);
        }
    }
    // BACKGROUND COLOR
    const backgroundCategoryColors = ['#2563EB', '#EBAC25', '#E11415', '#00853A', '#CF00C1'];

    // ERROR
    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");

    // AVERAGE
    const averageProductPerCategory = products.length / categories.length;

    // FUNCTIONS
    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setTimeout(() => {
                setErrors("");
            }, 1000);
            return;
        }

        try {
            const response = await api.post(`/api/categories/${id}/store`, addCategory)

            setAddCategory({ name: "" });

            const updatedCategories = await getCategories(id);
            setCategories(updatedCategories);

            const data = response.data;
            setMessage(data.message);

            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }

    // VALIDATIONs
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

    const validateEditForm = () => {
        let valid = true;

        if (editForm.name === "") {
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

                <div className="flex flex-col md:flex-row gap-4 mx-5">
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1 ">
                        <p>Total Categories</p>
                        <p className="text-2xl font-bold text-primary">
                            {categories.length}
                        </p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Total Products</p>
                        <p className="text-2xl font-bold text-success">
                            {products.length}
                        </p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Average Product / Category</p>
                        <p className="text-2xl text-warning font-bold">{averageProductPerCategory.toFixed(1)}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    {!selectEditCategoy &&
                        < div className="flex-1 mx-6 my-6 border border-secondary/10 rounded-xl py-4 h-55">
                            <p className="font-bold px-6 pb-3">New Category</p>
                            <div className="h-px bg-secondary/10"></div>
                            <form onSubmit={handleAddCategory} className="flex flex-col gap-2 mt-4">
                                <label htmlFor="name" className="text-xs text-muted px-6">Category Name <span className="text-danger">*</span></label>
                                <input type="text" value={addCategory.name} placeholder="eg. Snacks" className="mx-6 px-2 py-2 rounded-sm border border-black/30 text-xs" onChange={(e) => setAddCategory({
                                    name: e.target.value
                                })} />

                                <Button size="sm" className="mx-6 mt-1 py-2">
                                    Add Category
                                </Button>
                            </form>
                            <p className="text-success animate-fade-in mx-6">{message}</p>
                            <p className="text-danger animate-fade-in mx-6">{errors}</p>
                        </div>
                    }
                    {/* EDIT CATEGORY */}
                    {selectEditCategoy &&
                        <div className="flex-1 mx-6 my-6 border border-secondary/10 rounded-xl py-4 h-55">
                            <div className="flex flex-row justify-between">
                                <div className="flex-1">
                                    <p className="font-bold px-6 pb-3">Edit Category</p>
                                </div>
                                <div className="flex-1 text-end px-6">
                                    <span className="text-gray-500 text-xs cursor-pointer" onClick={() => {
                                        setSelectEditCategory(false)
                                        setAddCategory({
                                            name: ""
                                        });
                                        setEditForm({
                                            name: ""
                                        });
                                    }}>Cancel</span>
                                </div>
                            </div>
                            <div className="h-px bg-secondary/10"></div>
                            <form onSubmit={handleEditForm} className="flex flex-col gap-2 mt-4">
                                <label htmlFor="name" className="text-xs text-muted px-6">Category Name <span className="text-danger">*</span></label>
                                <input type="text" value={editForm.name} placeholder="eg. Snacks" className="mx-6 px-2 py-2 rounded-sm border border-black/30 text-xs" onChange={(e) => setEditForm({
                                    ...editForm,
                                    name: e.target.value
                                })} />

                                <Button size="sm" color="yellow" className="mx-6 mt-1 py-2">
                                    Save Changes
                                </Button>
                            </form>
                            <p className="text-success animate-fade-in mx-6">{message}</p>
                            <p className="text-danger animate-fade-in mx-6">{errors}</p>
                        </div>

                    }
                    <div className="flex-1 mx-6 mt-6">
                        <div className="h-120 overflow-y-auto">
                            {currentCategories.map((category, index) => {
                                const categoryInitials = category.name.slice(0, 2);
                                return (
                                    <div key={category.id} className="border border-secondary/20 rounded-md p-3 flex items-center mb-3">
                                        <div className="flex flex-row gap-4 items-center w-full">
                                            <div className="rounded-md w-10 h-10 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: backgroundCategoryColors[index % backgroundCategoryColors.length] }}>
                                                {categoryInitials}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>
                                                    {category.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {category.products.length} products
                                                </div>
                                            </div>

                                            {deleteCategoryId === category.id ?
                                                <div className="flex flex-row gap-2 items-center ml-auto">
                                                    <span className="text-xs">Delete?</span>
                                                    <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-md cursor-pointer" onClick={()=>handleDeleteCategoryId(category.id)}>Yes</span>
                                                    <span className="text-[10px] border border-gray-400 px-2 py-1 rounded-md cursor-pointer" onClick={() => setDeleteCategoryId(null)}>No</span>
                                                </div>
                                                :
                                                <div className="ml-auto flex flex-row gap-4 items-center"><Pen size={15} className="text-gray-400 hover:text-warning cursor-pointer" onClick={() => {
                                                    setSelectEditCategory(true)

                                                    setEditForm({
                                                        id: category.id,
                                                        name: category.name
                                                    });
                                                }} />
                                                    <Trash2 size={15} className="text-gray-400 hover:text-danger cursor-pointer" onClick={() => setDeleteCategoryId(category.id)} />

                                                </div>
                                            }

                                        </div>
                                    </div>
                                )
                            }
                            )}

                        </div>

                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="text-primary hover:outline-primary hover:outline-1 hover:bg-dark/5 hover:rounded-sm"
                            >
                                <StepBack />
                            </button>

                            <span>
                                {currentPage} / {totalPages}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="text-primary hover:outline-primary hover:outline-1 hover:bg-dark/5 hover:rounded-sm"
                            >
                                <StepForward />
                            </button>
                        </div>
                    </div>
                </div>


            </div>

        </div >
    )
}

