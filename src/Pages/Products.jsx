// import { useParams } from "react-router-dom";
// import Navbar from '../Components/Navbar';
// import products from "../Data/products";

// function Products() {

//   const { category } = useParams();

//   const filteredProducts = products.filter(
//     product => product.category === category
//   );

//   return (
//     <div>
//       <Navbar />
//       <h2>{category}</h2>

//       <div className="products-container">

//         {filteredProducts.map(product => (
//           <div className="product-card" key={product.id}>

//             <img src={product.image} alt={product.name} />

//             <h3>{product.name}</h3>

//             <p>₹{product.price}</p>

//             <button>Add to Cart</button>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// export default Products;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allservices from "../Services/Services";
import Navbar from "../Components/Navbar";
import "./PageStyles/ProductsPage.css";

function Products() {
    const { category } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            try {
                const response =
                    await Allservices.getAllServices("products");

                setProducts(response);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error.response?.data || error.message
                );
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = category
        ? products.filter(
              (product) =>
                  product.category?.toLowerCase().replace(/\s+/g, "-") ===
                  category.toLowerCase()
          )
        : products;

    if (loading) {
        return <h5 className="text-center">Loading products...</h5>;
    }

    return (
        <div>
            <Navbar />

            <h2 className="mt-2">
                {category
                    ? `${category.replace(/-/g, " ")} Products`
                    : "All Products"}
            </h2>

            <div className="homepage-products-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            className="homepage-product-card"
                            key={product.productId}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.productName}
                            />

                            <h3>{product.productName}</h3>
                            <p>₹{product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
}

export default Products;

