
import { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar.jsx";
import Allservices from "../../Services/Services";
import "./UserDashboard.css";

function Userdashboard() {
  const name = localStorage.getItem("name");

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch logged-in user's orders
        const orderResponse =
          await Allservices.getAllServices("orders/my-orders");

        const orders = Array.isArray(orderResponse)
          ? orderResponse
          : Array.isArray(orderResponse?.data)
          ? orderResponse.data
          : [];

        setTotalOrders(orders.length);

        // Count pending orders
        const pending = orders.filter(
          (order) =>
            order.orderStatus?.toUpperCase() === "PENDING"
        );

        setPendingOrders(pending.length);

      } catch (error) {
        console.error("Error fetching orders:", error);
      }

      try {
        // Fetch the logged-in user's cart
        const cartResponse =
          await Allservices.getAllServices("cart");

        const cartData = Array.isArray(cartResponse)
          ? cartResponse
          : Array.isArray(cartResponse?.data)
          ? cartResponse.data
          : Array.isArray(cartResponse?.items)
          ? cartResponse.items
          : Array.isArray(cartResponse?.data?.items)
          ? cartResponse.data.items
          : [];

        // Add quantities, not just the number of product rows
        const total = cartData.reduce(
          (sum, item) => sum + Number(item.quantity || 0),
          0
        );

        setCartItems(total);

      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="d-flex w-100">
      <UserSidebar />

      <div className="user-dashboard w-100 p-3">
        {/* Welcome Section */}
        <div className="mb-4">
          <h3 className="text-primary">
            Welcome to ShopEase, {name} 👋
          </h3>
          <p>Your shopping activity at a glance.</p>
        </div>

        {/* Quick Stats */}
        <div className="row g-4">

          {/* Total Orders */}
          <div className="col-md-6 col-lg-4">
            <div className="stats-card">
              <div className="stats-icon">📦</div>
              <div>
                <h6>Total Orders</h6>
                <h3>{totalOrders}</h3>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="col-md-6 col-lg-4">
            <div className="stats-card">
              <div className="stats-icon">⏳</div>
              <div>
                <h6>Pending Orders</h6>
                <h3>{pendingOrders}</h3>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="col-md-6 col-lg-4">
            <div className="stats-card">
              <div className="stats-icon">🛒</div>
              <div>
                <h6>Cart Items</h6>
                <h3>{cartItems}</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Userdashboard;