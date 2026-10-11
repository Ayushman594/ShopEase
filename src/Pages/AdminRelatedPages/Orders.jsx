import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Allservices from "../../Services/Services";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await Allservices.getAllServices("orders/all");
      setOrders(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load orders. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm(`Delete order #${orderId}? This cannot be undone.`)) {
      return;
    }

    try {
      await Allservices.deleteService("orders", orderId);

      alert("Order deleted successfully!");
      await fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert(error.response?.data?.message || "Failed to delete order.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();

    return (
      String(order.orderId ?? "")
        .toLowerCase()
        .includes(term) ||
      String(order.user?.name ?? "")
        .toLowerCase()
        .includes(term) ||
      String(order.user?.email ?? "")
        .toLowerCase()
        .includes(term) ||
      String(order.paymentStatus ?? "")
        .toLowerCase()
        .includes(term) ||
      String(order.orderStatus ?? "")
        .toLowerCase()
        .includes(term)
    );
  });

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleString("en-IN");
  };

  return (
    <div className="admin-orders-layout">
      <Sidebar />

      <main className="admin-orders-content">
        <div className="orders-header">
          <div>
            <h2>Manage Orders</h2>
            <p>View and track customer orders.</p>
          </div>

          <button
            className="orders-refresh-btn"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Orders"}
          </button>
        </div>

        <div className="orders-summary">
          <div className="orders-summary-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>

          <div className="orders-summary-card">
            <h3>Paid Orders</h3>
            <p>
              {orders.filter((order) => order.paymentStatus === "PAID").length}
            </p>
          </div>

          <div className="orders-summary-card">
            <h3>Pending Orders</h3>
            <p>
              {
                orders.filter((order) => order.paymentStatus === "PENDING")
                  .length
              }
            </p>
          </div>
        </div>

        <div className="orders-table-section">
          <div className="orders-table-header">
            <h3>All Orders</h3>

            <input
              type="text"
              placeholder="Search order, customer, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="orders-message">Loading orders...</p>
          ) : error ? (
            <div className="orders-error">
              <p>{error}</p>
              <button onClick={fetchOrders}>Try Again</button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <p className="orders-message">
              {orders.length === 0
                ? "No orders found."
                : "No orders match your search."}
            </p>
          ) : (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td>#{order.orderId}</td>
                      <td>{order.user?.name || "N/A"}</td>
                      <td>{order.user?.email || "N/A"}</td>
                      <td>{formatDate(order.orderDate)}</td>
                      <td className="orders-amount">
                        ₹
                        {Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span
                          className={`orders-status ${
                            order.paymentStatus?.toLowerCase() || "unknown"
                          }`}
                        >
                          {order.paymentStatus || "UNKNOWN"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`orders-status ${
                            order.orderStatus?.toLowerCase() || "unknown"
                          }`}
                        >
                          {order.orderStatus || "UNKNOWN"}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="orders-delete-btn"
                          onClick={() => deleteOrder(order.orderId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;
