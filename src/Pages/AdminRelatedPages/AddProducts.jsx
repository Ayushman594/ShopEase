import { useForm } from "react-hook-form";
import Allservices from "../../Services/Services";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./AddProducts.css";

function AddProducts() {

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Check whether we are adding or editing
    const isEditMode = Boolean(id);

    // Fetch product when editing
    useEffect(() => {

        if (id) {

            const fetchProduct = async () => {

                try {

                    const product = await Allservices.getServiceById(
                        "products",
                        id
                    );

                    reset(product);

                } catch (error) {

                    console.error("Error fetching product:", error);

                }
            };

            fetchProduct();
        }

    }, [id, reset]);


    // Add or Update product
    const saveProduct = async (data) => {

        try {

            let response;

            if (isEditMode) {

                // Update product
                response = await Allservices.updateService(
                    "products",
                    id,
                    data
                );

                if (response) {
                    alert("Product updated successfully");
                }

            } else {

                // Add product
                response = await Allservices.addService(
                    "products",
                    data
                );

                if (response) {
                    alert("Product added successfully");
                }
            }

            navigate("/admin/products");

        } catch (error) {

            console.error("Error saving product:", error);

        }
    };


    return (
        <>

            <div className="p-3">

                <button
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                >
                    ←
                </button>

            </div>


            <div>

                <form
                    className="border border-dark rounded p-3 bg-secondary text-white mx-auto"
                    onSubmit={handleSubmit(saveProduct)}
                >

                    <h3 className="mb-4 fs-5">
                        {isEditMode ? "Edit Product" : "Add Product"}
                    </h3>


                    {/* Product Name */}

                    <div className="mb-3">

                        <label
                            htmlFor="pname"
                            className="form-label"
                        >
                            Enter Product Name:
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="pname"
                            {...register("productName", {
                                required: true
                            })}
                        />

                        {errors.productName && (
                            <span className="text-warning">
                                This field is required
                            </span>
                        )}

                    </div>


                    {/* Category */}

                    <div className="mb-3">

                        <label
                            htmlFor="pcategory"
                            className="form-label"
                        >
                            Enter Category:
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="pcategory"
                            {...register("category", {
                                required: true
                            })}
                        />

                        {errors.category && (
                            <span className="text-warning">
                                This field is required
                            </span>
                        )}

                    </div>


                    {/* Description */}

                    <div className="mb-3">

                        <label
                            htmlFor="pdescription"
                            className="form-label"
                        >
                            Enter Description:
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="pdescription"
                            {...register("description", {
                                required: true
                            })}
                        />

                        {errors.description && (
                            <span className="text-warning">
                                This field is required
                            </span>
                        )}

                    </div>


                    {/* Price */}

                    <div className="mb-3">

                        <label
                            htmlFor="price"
                            className="form-label"
                        >
                            Enter Price:
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            {...register("price", {
                                required: true,
                                min: 1
                            })}
                        />

                        {errors.price && (
                            <span className="text-warning">
                                Enter a valid price
                            </span>
                        )}

                    </div>


                    {/* Stock */}

                    <div className="mb-3">

                        <label
                            htmlFor="stock"
                            className="form-label"
                        >
                            Enter Stock:
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            {...register("stock", {
                                required: true,
                                min: 0
                            })}
                        />

                        {errors.stock && (
                            <span className="text-warning">
                                Enter a valid stock
                            </span>
                        )}

                    </div>


                    {/* Image URL */}

                    <div className="mb-3">

                        <label
                            htmlFor="url"
                            className="form-label"
                        >
                            Enter Product Image URL:
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="url"
                            {...register("imageUrl", {
                                required: true
                            })}
                        />

                        {errors.imageUrl && (
                            <span className="text-warning">
                                This field is required
                            </span>
                        )}

                    </div>


                    {/* Submit Button */}

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {isEditMode ? "Update Product" : "Add Product"}
                    </button>

                </form>

            </div>

        </>
    );
}

export default AddProducts;