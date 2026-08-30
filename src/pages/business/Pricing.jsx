import { Button } from "@/components/Button";
import { Plus, X, Check, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getXSRFToken } from "../functions/csrf";
import { getProducts } from "../functions/getters";
import { useOutletContext } from "react-router-dom";
import api from "@/axios.js";

const tables = ['PRODUCT', 'COST', 'PRICE', 'MARGIN', 'VS COMP', 'ACTIVE'];
export const Pricing = () => {
    const { id } = useParams();
    const { business, categories, products, productCategory, setProducts, setProductCategory } = useOutletContext();
    // ADD
    const [productForm, setProductForm] = useState({
        name: "",
        category_id: "",
        cost: "",
        selling_price: "",
        competitor_price: "",
        is_active: ""
    });

    // SHOW
    const [showProduct, setShowProduct] = useState({
        id: null,
        name: "",
        SKU: "",
        cost: "",
        selling_price: "",
        competitor_price: "",
    })
    // UPDATE
    const [updateForm, setUpdateForm] = useState({

        cost: "",
        selling_price: "",
        competitor_price: ""
    });

    const [isCustomSKUChecked, setIsCustomSKUChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [panelMessage, setPanelMessage] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [showProductPanel, setShowProductPanel] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    console.log(selectedCategory);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentProducts = products.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleShowProduct = (product_id) => {
        let selectedProduct = products.find(
            (product) => product.id === product_id
        );
        setShowProduct(selectedProduct);

        setShowProductPanel(true);
    }
    const handleIsCustomSKUChecked = () => {
        setIsCustomSKUChecked((prev) => !prev);
    }
    const handleIsModalOpen = () => {
        setIsModalOpen((prev) => !prev);


    }

    // ACTIVE/INACTIVE BUTTON

    const handleToggleActive = async (product_id) => {

        const selectedProduct = products.find((product) =>
            product.id === product_id
        );

        const newStatus = selectedProduct.is_active === 1 ? 2 : 1;

        setProducts((prev) =>
            prev.map((product) =>
                product.id === product_id
                    ? { ...product, is_active: newStatus }
                    : product
            )
        )



        try {
            await api.get("/sanctum/csrf-cookie");

            const xsrfToken = getXSRFToken();

            const response = await api.patch(`/api/products/${product_id}/status`, {
                    is_active: newStatus
                });

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    // insert Product
    const handleProductForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setTimeout(() => {
            setIsModalOpen(false)
        }, 2000)


        try {
            await api.get('/sanctum/csrf-cookie')

            const response = await api.post(`/api/products/${id}/store`, productForm);

            const data = response.data
            ;
            setModalMessage(data.message);

            const updatedProducts = await getProducts(id);
            setProducts(updatedProducts.all_products);
            setProductCategory(updatedProducts.category_name);
            setProductForm({
                name: "",
                category_id: "",
                cost: "",
                selling_price: "",
                competitor_price: "",
                is_active: ""
            });

        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setModalMessage("")
        }, 5000);
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

    // UPDATE PRODUCT
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        if (!validateUpdateForm()) {
            return;
        }

        try {
            await api.get('/sanctum/csrf-cookie');

            const xsrfToken = getXSRFToken();

            const response = await api.patch(`/api/products/${showProduct.id}/update`, updateForm);

            if (!response.ok) {
                throw new Error('Failed to update product.');
            }

            const data = await response.json();
            setUpdateForm({
                cost: "",
                selling_price: "",
                competitor_price: ""
            });
            setPanelMessage(data.message);
            await getProducts();
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setPanelMessage("")
        }, 5000);
    }

    // validate for update
    const validateUpdateForm = () => {
        let valid = true;

        if (updateForm.selling_price === "") {
            setErrors((prev) => ({
                ...prev,
                selling_price: "Selling price is required."
            }));
            valid = false
            setTimeout(() => {
                setErrors((prev) => ({
                    ...prev,
                    selling_price: ""
                }));
            }, 3000);
        }

        if (updateForm.cost === "") {
            setErrors((prev) => ({
                ...prev,
                cost: "Base cost is required."
            }));

            valid = false

            setTimeout(() => {
                setErrors((prev) => ({
                    ...prev,
                    cost: ""
                }));
            }, 3000);
        }


        return valid;
    }

    // delete product
    const handleDeleteProduct = async (e) => {
        e.preventDefault();

        setProducts((prev) =>
            prev.filter((product) => product.id !== showProduct.id)
        );

        setShowProductPanel(false);



        try {
            await api.get('/sanctum/csrf-cookie')

            const xsrfToken = getXSRFToken();

            const response = await api.delete(`/api/products/${showProduct.id}/destroy`)

        } catch (error) {
            console.error(error);
        }
    }

    // number of active products
    const activeProducts = products.filter(
        product => product.is_active === 1
    ).length;

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
                        <p className="text-2xl font-bold text-primary">
                            {(products.reduce((total, product) => {
                                let margin = (product.selling_price - product.cost) / product.selling_price * 100;

                                return total + margin;
                            }, 0) / products.length).toFixed(2)} %
                        </p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Active SKUs</p>
                        <p className="text-2xl font-bold text-success">
                            {activeProducts}
                        </p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Beating Competitors</p>
                        <p className="text-2xl text-warning font-bold">{products.filter((product) =>
                            Number(product.selling_price) < Number(product.competitor_price)
                        ).length}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="flex-2 my-6">
                        <div className="rounded-t-md border border-black/10 flex flex-col md:flex-row p-2 mx-6 bg-light">
                            <div>
                                <input
                                    type="search"
                                    name="search"
                                    id="seach"
                                    placeholder="Search product..."
                                    className="px-2 py-1 text-xs border border-black/5 rounded-sm bg-dark/5"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                                <div className={selectedCategory==="All" ? `hidden md:flex items-center justify-center rounded-md bg-blue-600 text-white px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-blue-900` : `hidden md:flex items-center justify-center rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-dark/30`} onClick={(e) => setSelectedCategory("All")}>All</div>
                            {categories.map((category, index) => (
                                <div key={category.id} className={selectedCategory=== category.name ? `hidden md:flex items-center justify-center rounded-md bg-blue-600 text-white px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-blue-900` : `hidden md:flex items-center justify-center rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-dark/30`} onClick={() => setSelectedCategory(category.name)}>{category.name}</div>
                            ))}
                        </div>
                        <div className="mx-6 my-1">
                            <table className="w-full hidden md:table text-center">
                                <thead>
                                    <tr className="bg-blue-50 border border-secondary/10 text-left">
                                        <th className="ps-4">PRODUCT</th>
                                        <th>CATEGORY</th>
                                        <th>COST</th>
                                        <th>PRICE</th>
                                        <th>MARGIN</th>
                                        <th>VS COMP</th>
                                        <th>ACTIVE</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="border border-secondary/10 shadow-lg">
                                    {currentProducts.filter((product) => 
                                        (selectedCategory === "All" || 
                                            product.category.name === selectedCategory) &&
                                        product.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((product, index) => {
                                        let sellingPrice = product.selling_price;
                                        let cost = product.cost;
                                        let profit = sellingPrice - cost;
                                        let margin = (profit / sellingPrice) * 100;
                                        let competitorPrice = product.competitor_price;
                                        let vsComp = (sellingPrice - competitorPrice) / competitorPrice * 100;
                                        return (
                                            <tr key={product.id} onClick={() => handleShowProduct(product.id)} className="cursor-pointer text-left">
                                                <td className="ps-4 py-2">
                                                    <div className="flex flex-col text-start">
                                                        <span className="font-bold">{product.name}</span>
                                                        <span className="text-secondary/70 text-xs">{product.SKU}</span>
                                                    </div>
                                                </td>
                                                <td className="">{product.category.name}</td>
                                                <td className="jetbrains-mono">₱ {product.cost}</td>
                                                <td className="font-bold jetbrains-mono">₱ {product.selling_price}</td>
                                                <td className="jetbrains-mono">{margin.toFixed(2)} %</td>
                                                <td className="jetbrains-mono">
                                                    {product.competitor_price !== null
                                                        ? `${vsComp.toFixed(2)}%`
                                                        : "N/A"
                                                    }
                                                </td>
                                                <td onClick={() => handleToggleActive(product.id)}>
                                                    {product.is_active === 1
                                                        ? <span className="text-success">Active</span>
                                                        : <span className="text-danger">Inactive</span>
                                                    }
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="flex justify-center gap-2 mt-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>

                                <span>
                                    {currentPage} / {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>

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
                    {/* right */}
                    <div className="flex-1 my-6 mx-4.5">
                        {showProductPanel ?
                            (
                                <form onSubmit={handleUpdateProduct} key={showProduct.id}>
                                    <div className="rounded-xl border border-secondary/20 text-center p-3">
                                        <div className="flex flex-row items-center">
                                            <h3 className="font-semibold text-start">{showProduct.name}</h3>
                                            <button type="submit" className="flex items-center gap-1 text-light shadow-md bg-gray-400 w-18 ml-auto rounded w py-0.5 text-xs justify-center hover:bg-light hover:outline-secondary hover:text-secondary">
                                                <Check size={15} />Save
                                            </button>
                                        </div>
                                        <div className="flex flex-row justify-between mt-2">
                                            <p className="text-secondary/50 text-xs text-start">{showProduct.SKU}</p>
                                            <button type="button" className="flex items-center gap-1 text-light shadow-md bg-danger w-18 ml-auto rounded py-0.5 text-xs justify-center hover:text-danger hover:outline-danger hover:bg-light" onClick={handleDeleteProduct}>
                                                <Trash size={15} />Delete
                                            </button>
                                        </div>

                                        <div className="flex flex-row mt-3">
                                            <p className="text-secondary/80">Base Cost</p>
                                            <p className="ml-auto jetbrains-mono">
                                                ₱ {showProduct.cost}
                                            </p>

                                        </div>
                                        {errors.cost &&
                                            <p className="text-danger text-end animate-fade-in">{errors.cost}</p>
                                        }

                                        <div className="flex flex-row">
                                            <p className="text-secondary/80">Competitor Price</p>
                                            <p className="ml-auto jetbrains-mono">
                                                ₱ {showProduct.competitor_price}
                                            </p>
                                        </div>

                                        <div className="flex flex row mt-3">
                                            <p className="text-secondary/80">Your price</p>
                                            <p className="ml-auto jetbrains-mono">
                                                ₱ <input type="number" onChange={(e) => {
                                                    const newProduct = {
                                                        ...showProduct,
                                                        selling_price: e.target.value
                                                    }

                                                    setShowProduct(newProduct)
                                                    setUpdateForm(newProduct);
                                                    setProducts((prev) =>
                                                        prev.map((product) =>
                                                            product.id === newProduct.id
                                                                ? newProduct
                                                                : product
                                                        )
                                                    )
                                                }
                                                } value={showProduct.selling_price} className="border border-secondary/20 rounded-sm shadow w-full max-w-20" />
                                            </p>
                                        </div>
                                        {errors.selling_price &&
                                            <p className="text-danger text-end animate-fade-in">{errors.selling_price}</p>
                                        }

                                        <div className="text-left">
                                            {panelMessage &&
                                                <p className="animate-fade-in text-success">Updated successfully!</p>
                                            }
                                        </div>

                                        <hr className="text-secondary/20 my-5" />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-md border border-black/10 text-start px-2 py-1">
                                                <p className="font-bold">Gross Margin</p>
                                                <p className="font-semibold">
                                                    {((showProduct.selling_price - showProduct.cost) / showProduct.selling_price * 100).toFixed(2)} %
                                                </p>
                                            </div>
                                            <div className="rounded-md border border-black/10 text-start px-2 py-1">
                                                <p className="font-bold">Markup</p>
                                                <p className="font-semibold">
                                                    {((showProduct.selling_price - showProduct.cost) / showProduct.cost * 100).toFixed(2)} %
                                                </p>

                                            </div>
                                            <div className="rounded-md border border-black/10 text-start px-2 py-1">
                                                <p className="font-bold">Gross Profit</p>
                                                <p className="font-semibold">₱ {(showProduct.selling_price - showProduct.cost).toFixed(2)}</p>

                                            </div>
                                            <div className="rounded-md border border-black/10 text-start px-2 py-1">
                                                <p className="font-bold">VS Competition</p>
                                                <p className="font-semibold">
                                                    {((showProduct.selling_price - showProduct.competitor_price) / showProduct.competitor_price * 100).toFixed(2)} %

                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            )
                            :
                            (
                                <div className="rounded-xl border border-secondary/20 text-center p-10 me-5 ms-2">
                                    <p className="text-secondary/60">Select a product to view pricing details.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* modal */}
            {
                isModalOpen &&
                <div className="fixed inset-0 flex flex-col items-end justify-start animate-right-fade-in bg-black/50 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}>
                    <div className="w-full max-w-xl border border-black/10 bg-light h-screen flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-row items-center px-6 pt-3 pb-1">
                            <h4 className="text-xl font-bold">Add Product</h4>
                            <X className="ml-auto cursor-pointer" onClick={handleIsModalOpen} />
                        </div>
                        <p className="text-xs text-secondary/70 px-6 font-semibold">Set pricing details for the new product</p>
                        <div className="h-px bg-secondary/20"></div>
                        <p className="text-xs text-secondary/70 font-semibold mx-6 mt-4">PRODUCT INFO</p>
                        <form onSubmit={handleProductForm} className="flex flex-col flex-1">
                            <div className="flex flex-col mx-6 mt-4">
                                <label htmlFor="productName" className="font-semibold text-xs text-secondary">Product Name</label>
                                <input type="text" placeholder="eg. Victus Omen 16" className="outline outline-black/30 rounded-sm mt-2 py-1 px-4" onChange={(e) => {
                                    setProductForm({
                                        ...productForm,
                                        name: e.target.value
                                    });

                                }
                                } />
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
                                    <select className="outline outline-secondary/40 rounded-sm h-8 px-2" onChange={(e) => {
                                        setProductForm({
                                            ...productForm,
                                            category_id: e.target.value
                                        });

                                    }
                                    }>
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
                                    <input type="number" placeholder="₱20.00" step="" className="outline outline-black/30 rounded-sm mt-2 h-8 py-1 px-4 text-xs w-full" onChange={(e) => {
                                        setProductForm({
                                            ...productForm,
                                            cost: e.target.value
                                        });

                                    }
                                    } />
                                    {errors.cost &&
                                        <p className="text-danger animate-fade-in">{errors.cost}</p>
                                    }
                                </div>
                                <div>
                                    <label htmlFor="pricing" className="font-semibold text-xs text-secondary">Selling Price</label>
                                    <input type="number" placeholder="₱20.00" step="any" className="outline outline-black/30 rounded-sm mt-2 h-8 py-1 px-4 text-xs w-full" onChange={(e) => {
                                        setProductForm({
                                            ...productForm,
                                            selling_price: e.target.value
                                        });


                                    }
                                    } />
                                    {errors.selling_price &&
                                        <p className="text-danger animate-fade-in">{errors.selling_price}</p>
                                    }
                                </div>
                            </div>
                            <div className="mx-6">
                                <label htmlFor="pricing" className="font-semibold text-xs text-secondary">Competitor Price (optional)</label>
                                <input type="number" placeholder="₱20.00" step="any" className="outline outline-black/30 rounded-sm mt-2 h-8 py-1 px-4 text-xs w-full" onChange={(e) => {
                                    setProductForm({
                                        ...productForm,
                                        competitor_price: e.target.value
                                    })
                                }
                                } />
                            </div>

                            <div className="h-px bg-secondary/40 mt-auto"></div>

                            <div className="mx-6 my-3 flex flex-col md:flex-row gap-2">
                                <Button size="sm" type="submit" className="w-full" onClick={handleProductForm}>Add Product</Button>
                                <button type="button" onClick={handleIsModalOpen} className="outline outline-secondary/70 rounded-lg py-1 px-3 hover:bg-secondary/70 hover:text-light">Cancel</button>
                            </div>
                        </form>
                        <div className="mx-6 mt-3">
                            <p className="text-success">{modalMessage}</p>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

