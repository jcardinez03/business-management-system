import { BusinessNavbar } from "@/pages/business/BusinessNavbar";
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Plus, ChevronDown, X } from "lucide-react";
import { useState, useEffect, use } from "react";
import {
    getCategories,
    getBusiness,
    getInventories,
} from "../functions/getters";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { getXSRFToken } from "../functions/csrf";

const tables = [
    "PRODUCT",
    "STATUS",
    "STOCK",
    "REORDER AT",
    "REORDER QTY",
    "UNIT COST",
    "STOCK VALUE",
    "LOCATION",
    "RESTOCKED",
];
export const Inventory = () => {
    const { id } = useParams();
    const { business, categories, products, inventories, setInventories } =
        useOutletContext();
    const [isClicked, setIsClicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [chooseProduct, setChooseProduct] = useState({
        product_id: "",
    });
    const [inventoryForm, setInventoryForm] = useState({
        product_id: "",
        stock: "",
        reorder_at: "",
        reorder_qty: "",
        location: "",
        last_restocked_at: "",
    });
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("All");
    console.log(selectedCategory);
    const handleShowInventory = (productId) => {
        const inventory = inventories.find(
            (inventory) => inventory.product_id === productId,
        );

        if (inventory) {
            setInventoryForm({
                product_id: inventory.product_id,
                stock: "",
                reorder_at: inventory.reorder_at,
                reorder_qty: inventory.reorder_qty,
                last_restocked_at: "",
                location: ""
            });
        } else {
            setInventoryForm({
                product_id: productId,
                stock: "",
                reorder_at: "",
                reorder_qty: "",
                last_restocked_at: "",
                location: ""
            });
        }
    };

    // ADD INVENTORY
    const handleInventoryForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setTimeout(() => {
            setIsModalOpen(false);
        }, 2000);

        try {
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                credentials: "include",
            });
            const xsrfToken = getXSRFToken();

            const response = await fetch(
                `http://localhost:8000/api/inventories/store`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                        "X-XSRF-TOKEN": xsrfToken,
                    },
                    body: JSON.stringify(inventoryForm),
                },
            );

            setInventoryForm({
                product_id: "",
                reorder_at: "",
                reorder_qty: "",
                location: "",
                last_restocked_at: "",
            });

            const updatedInventory = await getInventories();
            setInventories(updatedInventory);

            const data = await response.json();
            setModalMessage(data.message);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setModalMessage("");
        }, 5000);
    };

    const handleIsModalOpen = () => {
        setIsModalOpen((prev) => !prev);
    };
    const handleIsClicked = () => {
        setIsClicked((prev) => !prev);
    };

    // validation
    const validateForm = () => {
        let valid = true;

        if (inventoryForm.product_id === "") {
            setErrors((prev) => ({
                ...prev,
                product_id: "Please choose a product",
            }));
            valid = false;
        }
        if (inventoryForm.stock === "") {
            setErrors((prev) => ({
                ...prev,
                stock: "Stock cannot be empty.",
            }));
            valid = false;
        }
        if (inventoryForm.reorder_at === "") {
            setErrors((prev) => ({
                ...prev,
                reorder_at: "Reorder at cannot be empty.",
            }));
            valid = false;
        }
        if (inventoryForm.reorder_qty === "") {
            setErrors((prev) => ({
                ...prev,
                reorder_qty: "Reorder quantity cannot be empty.",
            }));
            valid = false;
        }
        if (inventoryForm.last_restocked_at === "") {
            setErrors((prev) => ({
                ...prev,
                last_restocked_at: "Please choose a date.",
            }));
            valid = false;
        }

        setTimeout(() => {
            setErrors({});
        }, 5000);

        return valid;
    };

    // LOW COUNT
    const lowCount = inventories.filter(
        (inventory) =>
            ((inventory.stock - inventory.reorder_at) / inventory.reorder_at) * 100 <=
            50 &&
            ((inventory.stock - inventory.reorder_at) / inventory.reorder_at) * 100 >=
            30,
    ).length;

    const criticalCount = inventories.filter(
        (inventory) =>
            ((inventory.stock - inventory.reorder_at) / inventory.reorder_at) * 100 <
            30,
    ).length;
    return (
        <div className="flex flex-col md:flex-row items-center min-h-screen w-full overflow-x-hidden">
            <div className="flex-1 min-h-screen w-full min-w-0">
                <div className="p-5">
                    <h2 className="text-2xl">
                        <span className="font-bold">{business.name}</span> - Inventory
                    </h2>
                    <div className="flex items-center">
                        <p className="text-xs">
                            Track stock levels, reorder points, and warehouse locations
                        </p>
                        <Button
                            size="sm"
                            className="flex ml-auto pe-5"
                            onClick={() => {
                                handleIsModalOpen();
                            }}
                        >
                            <Plus />
                            Receive stock
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mx-5">
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1 ">
                        <p>Total SKU</p>
                        <p className="text-2xl font-bold text-primary">
                            {inventories.length}
                        </p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Inventory Value</p>
                        <p className="text-2xl font-bold jetbrains-mono">
                            ₱{" "}
                            {Number(
                                inventories.reduce((total, inventory) => {
                                    const stock_value =
                                        Number(inventory.product.cost) * Number(inventory.stock);

                                    total = total + stock_value;

                                    return total;
                                }, 0),
                            ).toFixed(2)}
                        </p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Low Stock</p>
                        <p className="text-2xl text-warning font-bold">{lowCount}</p>
                    </div>
                    <div className="border border-black/10 rounded-xl w-full px-4 py-1">
                        <p>Critical</p>
                        <p className="text-2xl text-danger font-bold">{criticalCount}</p>
                    </div>
                </div>
                <div className="mt-5 mx-5 border border-black/10 bg-dark/1 rounded-t-lg flex flex-col relative">
                    <div className="flex flex-row ">
                        <div>
                            <input
                                type="search"
                                name="search"
                                id="seach"
                                placeholder="Search product..."
                                className="px-2 py-1 text-xs m-3 border border-black/5 rounded-sm bg-dark/5"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex md:flex-row items-center">
                            <div className={selectedCategory === "All" ? `hidden md:flex items-center justify-center rounded-md bg-blue-600 text-white px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-blue-900` : `hidden md:flex items-center justify-center rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-dark/30`} onClick={(e) => setSelectedCategory("All")}>All</div>
                            {categories.map((category, idx) => (
                                <div
                                    key={idx}
                                    className={
                                        idx >= 0 && selectedCategory === category.name
                                            ? `hidden md:flex items-center justify-center rounded-md bg-blue-600 text-white px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-blue-900`
                                            : `hidden md:flex items-center justify-center rounded-md bg-dark/10 px-3 py-1 mx-2 text-xs text-dark/70 cursor-pointer hover:bg-dark/30`
                                    }
                                    onClick={()=>setSelectedCategory(category.name)}
                                >
                                    {category.name}
                                </div>
                            ))}
                            <div
                                className="md:hidden rounded-md bg-dark/10 px-1 py-0 w-fit mx-2 text-xs text-dark/70 text-center flex items-center"
                                onClick={handleIsClicked}
                            >
                                Show categories <ChevronDown size={15} />
                            </div>
                        </div>
                    </div>
                    {/* mobile menu */}
                    {isClicked && (
                        <div className="absolute top-13 animate-fade-in border px-3 py-2 w-full rounded-b-lg bg-dark/50 text-light font-semibold">
                            {categories.map((cat, idx) => {
                                return (
                                    <div className="flex flex-col py-2 justify-center">
                                        {cat}
                                        <div className="h-px bg-light" />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="mx-5 border border-t-0 border-black/10">
                    <table className="hidden md:table w-full">
                        <thead>
                            <tr className="bg-blue-50 border border-secondary/10 text-center">
                                <th className="ps-4 text-left">PRODUCT</th>
                                <th>STATUS</th>
                                <th>STOCK</th>
                                <th>REORDER AT</th>
                                <th>REORDER QTY</th>
                                <th>UNIT COST</th>
                                <th>STOCK VALUE</th>
                                <th>LOCATION</th>
                                <th>RESTOCKED</th>
                            </tr>
                        </thead>
                        <tbody>
                             {inventories.filter((inventory) =>
                                    (selectedCategory === "All" || 
                                        inventory.product.category.name === selectedCategory
                                    ) &&
                                    inventory.product.name.toLowerCase().includes(search.toLowerCase())
                                ).map((inventory) => {
                                return (
                                <tr key={inventory.id} className="text-center">
                                    <td className="ps-4 text-left">
                                        <div className="flex flex-col">
                                            <p>{inventory.product.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {inventory.product.SKU}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {((inventory.stock - inventory.reorder_at) /
                                            inventory.reorder_at) *
                                            100 >=
                                            50 ? (
                                            <p className="text-success font-bold text-xs w-17 rounded-md bg-success/10 mx-auto">
                                                OK
                                            </p>
                                        ) : ((inventory.stock - inventory.reorder_at) /
                                            inventory.reorder_at) *
                                            100 <=
                                            50 &&
                                            ((inventory.stock - inventory.reorder_at) /
                                                inventory.reorder_at) *
                                            100 >=
                                            30 ? (
                                            <p className="text-warning font-bold text-xs w-17 rounded-md bg-warning/10 mx-auto">
                                                Low
                                            </p>
                                        ) : (
                                            <p className="text-danger font-bold text-xs w-17 rounded-md bg-danger/10 mx-auto">
                                                Critical
                                            </p>
                                        )}
                                    </td>
                                    <td className="jetbrains-mono">{inventory.stock}</td>
                                    <td className="jetbrains-mono">{inventory.reorder_at}</td>
                                    <td className="jetbrains-mono">{inventory.reorder_qty}</td>
                                    <td className="jetbrains-mono">
                                        ₱ {Number(inventory.product.cost).toFixed(2)}
                                    </td>
                                    <td className="jetbrains-mono">
                                        ₱ {(inventory.product.cost * inventory.stock).toFixed(2)}
                                    </td>
                                    <td>
                                        {inventory.location_id ? inventory.location_id : "N/A"}
                                    </td>
                                    <td className="text-xs text-gray-400">
                                        {new Date(inventory.last_restocked_at).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            },
                                        )}
                                    </td>
                                </tr>
                                )
                            }
                            )
                            }
                        </tbody>
                    </table>

                    {/* mobile */}
                    <div className="flex flex-col md:hidden ">
                        {tables.map((table, idx) => (
                            <div key={idx} className="flex flex-row items-center">
                                <div className="w-32 bg-light font-bold p-2">{table}</div>
                            </div>
                        ))}
                    </div>

                    {/* Receive Stock Modal */}
                    {isModalOpen && (
                        <div
                            className="fixed inset-0 flex flex-col items-end justify-start animate-right-fade-in bg-black/50 backdrop-blur-xs"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <div
                                className="w-full max-w-xl border border-black/10 bg-light py-3 h-screen flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-row px-6">
                                    <h3 className="font-bold">Receiving Stock</h3>
                                    <X className="ml-auto cursor-pointer" onClick={handleIsModalOpen} />
                                </div>
                                <p className="text-xs text-muted/60 pb-4 px-6">
                                    Record incoming inventory for a product.
                                </p>
                                <div className="h-px bg-secondary/50" />
                                {/* form */}
                                <p className="pt-4 px-6 font-bold text-sm text-secondary/50">
                                    PRODUCT
                                </p>

                                <form
                                    className="flex flex-col flex-1"
                                    onSubmit={handleInventoryForm}
                                >
                                    <div className="flex flex-col pt-3 px-6 relative">
                                        <label
                                            htmlFor="product"
                                            className="text-xs text-muted/40 font-bold"
                                        >
                                            Select Product
                                        </label>
                                        <select
                                            name="product"
                                            id="product"
                                            className="outline outline-secondary/40 rounded-sm focus:outline focus:outline-blue-600 px-2 py-1"
                                            value={inventoryForm.product_id}
                                            onChange={(e) => {
                                                setInventoryForm((prev) => ({
                                                    ...prev,
                                                    product_id: e.target.value,
                                                }));

                                                setChooseProduct((prev) => ({
                                                    ...prev,
                                                    product_id: e.target.value,
                                                }));

                                                handleShowInventory(Number(e.target.value));
                                            }}
                                        >
                                            <option value="" hidden>
                                                Choose product
                                            </option>
                                            {products.map((product) => (
                                                <>
                                                    <option value={product.id} key={product.id}>
                                                        {product.name}
                                                    </option>
                                                </>
                                            ))}
                                        </select>
                                        {errors.product_id &&
                                            <p className="text-danger text-xs mt-0 animate-fade-in absolute top-15">{errors.product_id}</p>
                                        }
                                    </div>
                                    <p className="font-bold text-secondary/40 text-sm px-6 pt-5">
                                        RECEIPT DETAILS
                                    </p>
                                    <div className="px-6 relative">
                                        <FormInput
                                            label="QUANTITY RECEIVED"
                                            type="number"
                                            onChange={(e) =>
                                                setInventoryForm((prev) => ({
                                                    ...prev,
                                                    stock: e.target.value,
                                                }))
                                            }
                                        />
                                        {errors.stock &&
                                            <p className="text-danger text-xs mt-0 animate-fade-in absolute top-15">{errors.stock}</p>
                                        }
                                    </div>
                                    <div className="flex gap-5 px-6">
                                        <div className="flex-1 relative">
                                            <FormInput
                                                label="REORDER AT"
                                                type="number"
                                                value={inventoryForm.reorder_at}
                                                onChange={(e) => {
                                                    setInventoryForm((prev) => ({
                                                        ...prev,
                                                        reorder_at: e.target.value,
                                                    }));
                                                }}
                                            />
                                            {errors.reorder_at &&
                                                <p className="text-danger text-xs mt-0 animate-fade-in absolute top-15">{errors.reorder_at}</p>
                                            }
                                        </div>
                                        <div className="flex-1 relative">
                                            <FormInput
                                                label="REORDER QUANTITY"
                                                type="number"
                                                value={inventoryForm.reorder_qty}
                                                onChange={(e) => {
                                                    setInventoryForm((prev) => ({
                                                        ...prev,
                                                        reorder_qty: e.target.value,
                                                    }));
                                                }}
                                            />
                                            {errors.reorder_qty &&
                                                <p className="text-danger text-xs mt-0 animate-fade-in absolute top-15">{errors.reorder_qty}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex gap-5 px-6">
                                        <div className="flex-1 py-1.5">
                                            <label
                                                htmlFor="warehouse"
                                                className="text-xs text-muted/40 font-bold"
                                            >
                                                Warehouse Location (optional)
                                            </label>
                                            <select
                                                name="warehouse"
                                                id="warehouse"
                                                className="outline outline-secondary/40 hover:outline hover:outline-blue-600 rounded-sm w-full px-2 py-1"
                                                value={inventoryForm.location_id}
                                            >
                                                <option value="" hidden>
                                                    Select location
                                                </option>
                                                {/* add location options */}
                                            </select>
                                        </div>
                                        <div className="flex-1 relative">
                                            <FormInput
                                                label="RESTOCK DATE"
                                                className="px-3"
                                                type="date"
                                                onChange={(e) =>
                                                    setInventoryForm((prev) => ({
                                                        ...prev,
                                                        last_restocked_at: e.target.value,
                                                    }))
                                                }
                                            />
                                            {errors.last_restocked_at &&
                                                <p className="text-danger text-xs mt-0 animate-fade-in absolute top-15">{errors.last_restocked_at}</p>
                                            }
                                        </div>
                                    </div>
                                    {modalMessage && (
                                        <p className="px-6 text-success">Added successfully!</p>
                                    )}

                                    <div className="h-px bg-secondary/40 mt-auto" />

                                    <div className="px-6 pt-3">
                                        <div className="flex gap-4">
                                            <Button size="sm" className="w-full">
                                                Confirm Receipt
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={handleIsModalOpen}
                                                className="outline outline-secondary/70 rounded-lg py-1 px-3 hover:bg-secondary/70 hover:text-light"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
