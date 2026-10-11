import { useEffect, useState } from "react";
import Allservices from "../../Services/Services";
import Sidebar from "./UserSidebar";
import "./MyCart.css";

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart
  const fetchCart = async () => {
    try {
      const response = await Allservices.getAllServices("cart");

      setCartItems(response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // To handle quantity change
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      await Allservices.updateCartQuantity(cartItemId, newQuantity);

      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);

      alert("Failed to update quantity");
    }
  };
  // Remove item
  const handleRemove = async (cartItemId) => {
    try {
      await Allservices.deleteService("cart/item", cartItemId);

      alert("Product removed from cart");

      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);

      alert("Failed to remove product");
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(Boolean(window.Razorpay));
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    try {
        // 1. Create the ShopEase/Razorpay order
        const order = await Allservices.createOrder();

        // 2. Load Razorpay Checkout if needed
        const loaded = await loadRazorpay();

        if (!loaded) {
            alert("Unable to load Razorpay Checkout");
            return;
        }

        // 3. Open Razorpay Checkout
        const options = {
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: "ShopEase",
            description: "Order payment",
            order_id: order.razorpayOrderId,

            handler: async function (paymentResponse) {
                try {
                    // 4. Send Razorpay's actual response to backend
                    const result = await Allservices.verifyPayment({
                        shopEaseOrderId: order.shopEaseOrderId,
                        razorpayOrderId:
                            paymentResponse.razorpay_order_id,
                        razorpayPaymentId:
                            paymentResponse.razorpay_payment_id,
                        razorpaySignature:
                            paymentResponse.razorpay_signature
                    });

                    // 5. Update the UI only after backend verification
                    if (result.paymentStatus === "PAID") {
                        alert("Payment successful!");

                        // Clear displayed cart items after verification
                        setCartItems([]);
                    }
                } catch (error) {
                    console.error(
                        "Payment verification failed:",
                        error.response?.data || error.message
                    );
                    alert(
                        "Payment verification failed. Please check your order status."
                    );
                }
            }
        };

        const checkout = new window.Razorpay(options);
        checkout.open();

    } catch (error) {
        console.error(
            "Unable to start payment:",
            error.response?.data || error.message
        );
        alert("Unable to start payment.");
    }
};
  // Clear cart
  const handleClearCart = async () => {
    try {
      await Allservices.clearCart();

      alert("Cart cleared successfully");

      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);

      alert("Failed to clear cart");
    }
  };

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Cart */}
      <div className="my-cart-page">
        <h2 className="cart-title">My Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h4>Your cart is empty</h4>

            <p>Add some products to your cart.</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}

            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  {/* Product Image */}

                  <div className="cart-image">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.productName}
                    />
                  </div>

                  {/* Product Details */}

                  <div className="cart-details">
                    <h4>{item.product.productName}</h4>

                    <p>Price: ₹ {item.product.price}</p>

                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span className="quantity-value">{item.quantity}</span>

                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p>Subtotal: ₹ {item.product.price * item.quantity}</p>
                  </div>

                  {/* Remove */}

                  <div className="cart-actions">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}

            <div className="cart-summary">
              <h3>Cart Summary</h3>

              <p>Total Items: {cartItems.length}</p>

              <h4>Total Amount: ₹ {totalAmount}</h4>

              <div className="cart-summary-buttons">
                <button className="btn btn-danger" onClick={handleClearCart}>
                  Clear Cart
                </button>

                <button
                  className="btn btn-success"
                  onClick={handlePayment}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyCart;
