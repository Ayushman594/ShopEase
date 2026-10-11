import Allservices from '../../Services/Services';
import { useState, useEffect } from 'react';
import Sidebar from './UserSidebar';
import './ViewProducts.css';

function ViewProducts() {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response =
                    await Allservices.getAllServices('products');

                setProducts(response);

            } catch (error) {

                console.error("Error fetching products:", error);

            }
        };

        fetchProducts();

    }, []);


    // Search and category filter
    const filteredProducts = products.filter((product) => {

        const categoryMatch =
            selectedCategory === "" ||
            product.category?.toLowerCase() ===
            selectedCategory.toLowerCase();

        const searchMatch =
            product.productName?.toLowerCase().includes(
                searchTerm.toLowerCase()
            );

        return categoryMatch && searchMatch;

    });


    // Add product to cart
    const handleAddToCart = async (productId) => {

        try {

            await Allservices.addToCart(productId, 1);

            alert("Product added to cart successfully!");

            // Close modal
            setSelectedProduct(null);

        } catch (error) {

            console.error("Error adding product to cart:", error);

            if (error.response?.status === 401) {

                alert("Please login to add products to cart.");

            } else {

                alert("Failed to add product to cart.");

            }

        }

    };


    return (

        <>

            <div className="d-flex">

                {/* Sidebar */}
                <Sidebar />


                {/* Main Product Page */}
                <div className="main-product-page">

                    <h3 className="text-center text-primary">
                        View Products
                    </h3>


                    {/* Search Section */}
                    <div className="Search-related-container">

                        {/* Category Filter */}
                        <select
                            className="form-select w-25"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >

                            <option value="">
                                Filter by Category
                            </option>

                            <option value="electronics">
                                Electronics
                            </option>

                            <option value="kids-clothings">
                                Kid's Clothings
                            </option>

                            <option value="mens-clothings">
                                Men's Clothings
                            </option>

                            <option value="womens-clothings">
                                Women's Clothings
                            </option>

                            <option value="video-games-toys">
                                Video Games & Toys
                            </option>

                            <option value="sports">
                                Sports
                            </option>

                            <option value="groceries">
                                Groceries
                            </option>

                        </select>


                        {/* Search Input */}
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Search Products"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>


                    {/* Products */}
                    <div className="products-grid">

                        {filteredProducts.length > 0 ? (

                            filteredProducts.map((product) => (

                                <div
                                    className="product-card-wrapper"
                                    key={product.productId}
                                >

                                    <div className="product-card">

                                        {/* Product Image */}
                                        <img
                                            src={product.imageUrl}
                                            alt={product.productName}
                                        />


                                        <div className="main-content">

                                            {/* Product Name */}
                                            <h3>
                                                {product.productName}
                                            </h3>


                                            {/* Product Price */}
                                            <p>
                                                Price: ₹ {product.price}
                                            </p>


                                            {/* Stock */}
                                            <p>
                                                In Stock: {product.stock}
                                            </p>


                                            {/* View Details */}
                                            <button
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#productModal"
                                                onClick={() =>
                                                    setSelectedProduct(product)
                                                }
                                            >
                                                View Details
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <p className="no-products">
                                No products found.
                            </p>

                        )}

                    </div>


                    {/* =========================
                        PRODUCT DETAILS MODAL
                    ========================= */}

                    <div
                        className="modal fade"
                        id="productModal"
                        tabIndex="-1"
                        aria-labelledby="productModalLabel"
                        aria-hidden="true"
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">


                                {/* Modal Header */}
                                <div className="modal-header">

                                    <h1
                                        className="modal-title fs-5"
                                        id="productModalLabel"
                                    >
                                        {selectedProduct?.productName}
                                    </h1>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                    </button>

                                </div>


                                {/* Modal Body */}
                                <div className="modal-body">

                                    {selectedProduct && (

                                        <>

                                            {/* Product Image */}
                                            <img
                                                src={selectedProduct.imageUrl}
                                                alt={selectedProduct.productName}
                                                className="img-fluid mb-3"
                                            />


                                            {/* Product Description */}
                                            <p>
                                                <strong>
                                                    Description:
                                                </strong>{" "}
                                                {selectedProduct.description}
                                            </p>


                                            {/* Product Price */}
                                            <p>
                                                <strong>
                                                    Price:
                                                </strong>{" "}

                                                ₹{" "}

                                                <strike>
                                                    {selectedProduct.price}
                                                </strike>{" "}

                                                <strong>
                                                    {selectedProduct.price * 0.5}
                                                </strong>
                                            </p>


                                            {/* Category */}
                                            <p>
                                                <strong>
                                                    Category:
                                                </strong>{" "}
                                                {selectedProduct.category}
                                            </p>


                                            {/* Stock */}
                                            <p>
                                                <strong>
                                                    In Stock:
                                                </strong>{" "}
                                                {selectedProduct.stock}
                                            </p>

                                        </>

                                    )}

                                </div>


                                {/* Modal Footer */}
                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>


                                    {/* Add To Cart */}
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() =>
                                            handleAddToCart(
                                                selectedProduct?.productId
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ViewProducts;