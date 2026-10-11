import Sidebar from "../../Components/Sidebar";
import Allservices from "../../Services/Services.jsx";
import "./UpdateProduct.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await Allservices.getAllServices("products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  //   const handleDelete=async(id)=>{
  //     Allservices.deleteService("Products",id);
  //     setProducts(products.filter((product)=>product.productid!==id));
  //   }

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchMatch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });
  const handleDelete = async (id) => {
    try {
      await Allservices.deleteService("products", id);
      setProducts(products.filter((product) => product.productId !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <>
      <div className="d-flex update-products-container">
        <Sidebar />
        <div className="container mt-5">
          <h2 className="fs-4 mb-5">Update Products</h2>
          <div className="d-flex justify-content-around">
            <select
              className="form-select w-25"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Filter by Category</option>
              <option value="electronics">Electronics</option>
              <option value="kids-clothings">Kid's Clothings</option>
              <option value="mens-clothings">Men's Clothings</option>
              <option value="womens-clothings">Women's Clothings</option>
              <option value="video-games-toys">Video Games & Toys</option>
              <option value="sports">Sports</option>
              <option value="groceries">Groceries</option>
            </select>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/addproducts")}
            >
              {" "}
              + Add Products
            </button>
          </div>
          <div className="admin-product-card  mt-5">
            {filteredProducts.map((product) => (
              <div className="card" key={product.productId}>
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.productName}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <p>In Stock: {product.stock}</p>
                  <p>{product.category}</p>
                  <div className="admin-product-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/admin/editproduct/${product.productId}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product.productId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProducts;
