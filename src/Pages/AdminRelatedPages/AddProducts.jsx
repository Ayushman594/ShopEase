import { useForm } from "react-hook-form";
import Allservices from "../../Services/Services";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AddProducts.css";

function AddProducts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Check whether we are adding or editing
  const isEditMode = Boolean(id);

  // Fetch product when editing
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const product = await Allservices.getServiceById("products", id);

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
        setImageError("");

        let finalImageUrl = data.imageUrl?.trim() || "";

        // Upload selected image first
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const uploadResponse = await Allservices.addService(
                "uploads/image",
                formData
            );

            finalImageUrl = uploadResponse.imageUrl;
        }

        if (!finalImageUrl) {
            setImageError("Please provide an image URL or upload an image.");
            return;
        }

        const productData = {
            ...data,
            imageUrl: finalImageUrl
        };

        if (isEditMode) {
            await Allservices.updateService(
                "products",
                id,
                productData
            );

            alert("Product updated successfully");
        } else {
            await Allservices.addService(
                "products",
                productData
            );

            alert("Product added successfully");
        }

        navigate("/admin/products");

    } catch (error) {
        console.error("Error saving product:", error);
        setImageError(
            error.response?.data?.message ||
            "Unable to save product. Please try again."
        );
    }
};

  return (
    <>
      <div className="p-3">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
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
            <label htmlFor="pname" className="form-label">
              Enter Product Name:
            </label>

            <input
              type="text"
              className="form-control"
              id="pname"
              {...register("productName", {
                required: true,
              })}
            />

            {errors.productName && (
              <span className="text-warning">This field is required</span>
            )}
          </div>

          {/* Category */}

          <div className="mb-3">
            <label htmlFor="pcategory" className="form-label">
              Enter Category:
            </label>

            <input
              type="text"
              className="form-control"
              id="pcategory"
              {...register("category", {
                required: true,
              })}
            />

            {errors.category && (
              <span className="text-warning">This field is required</span>
            )}
          </div>

          {/* Description */}

          <div className="mb-3">
            <label htmlFor="pdescription" className="form-label">
              Enter Description:
            </label>

            <input
              type="text"
              className="form-control"
              id="pdescription"
              {...register("description", {
                required: true,
              })}
            />

            {errors.description && (
              <span className="text-warning">This field is required</span>
            )}
          </div>

          {/* Price */}

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Enter Price:
            </label>

            <input
              type="number"
              className="form-control"
              id="price"
              {...register("price", {
                required: true,
                min: 1,
              })}
            />

            {errors.price && (
              <span className="text-warning">Enter a valid price</span>
            )}
          </div>

          {/* Stock */}

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Enter Stock:
            </label>

            <input
              type="number"
              className="form-control"
              id="stock"
              {...register("stock", {
                required: true,
                min: 0,
              })}
            />

            {errors.stock && (
              <span className="text-warning">Enter a valid stock</span>
            )}
          </div>

          {/* Image URL */}

          {/* Image URL */}
          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              Product Image URL:
            </label>

            <input
              type="url"
              className="form-control"
              id="url"
              placeholder="Paste image URL or upload an image below"
              {...register("imageUrl")}
              onChange={(e) => {
                setSelectedFile(null);
                setImageError("");
                setImagePreview(e.target.value);
              }}
            />
          </div>

          <div className="text-center my-3">
            <span>OR</span>
          </div>

          {/* Upload Image */}
          <div className="mb-3">
            <label htmlFor="imageFile" className="form-label">
              Upload Product Image:
            </label>

            <input
              type="file"
              id="imageFile"
              className="form-control"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                  setImageError("Image must not exceed 5 MB.");
                  setSelectedFile(null);
                  setImagePreview("");
                  e.target.value = "";
                  return;
                }

                setImageError("");
                setSelectedFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />

            {imageError && <small className="text-danger">{imageError}</small>}
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 text-center">
              <p className="form-label">Image Preview</p>

              <img
                src={imagePreview}
                alt="Product preview"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
                onError={() => {
                  if (!selectedFile) {
                    setImageError("Unable to load this image URL.");
                  }
                }}
              />
            </div>
          )}

          {/* Submit Button */}

          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProducts;
