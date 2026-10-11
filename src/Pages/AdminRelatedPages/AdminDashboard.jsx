
import Sidebar from '../../Components/Sidebar';
import './AdminDashboard.css';
import Allservices from '../../Services/Services.jsx';
import { useEffect, useState } from 'react';

function AdminDashboard() {
    const [queries, setQueries] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await Allservices.getAllServices('Contacts');
                setQueries(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching queries:", error);
            }

            try {
                const productData =
                    await Allservices.getAllServices('products');
                setProducts(
                    Array.isArray(productData) ? productData : []
                );
            } catch (error) {
                console.error("Error fetching products:", error);
            }

            try {
                const orderData =
                    await Allservices.getAllServices('orders/all');
                setOrders(Array.isArray(orderData) ? orderData : []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const pendingOrders = orders.filter(
        order => order.orderStatus?.toUpperCase() === 'PENDING'
    ).length;

    const confirmedOrders = orders.filter(
        order => order.orderStatus?.toUpperCase() === 'CONFIRMED'
    ).length;

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-5">
                <h2 className="text-center mb-4">Admin Dashboard</h2>

                <div className="d-flex flex-wrap">

                    <div className="display-container mt-5">
                        <h3 className="text-center mb-4 fs-5">
                            User Queries
                        </h3>
                        <p className="text-center fs-3 fw-bold">
                            {queries.length}
                        </p>
                    </div>

                    <div className="display-container mt-5">
                        <h3 className="text-center mb-4 fs-5">
                            Total No of Products
                        </h3>
                        <p className="text-center fs-3 fw-bold">
                            {products.length}
                        </p>
                    </div>

                    <div className="display-container mt-5">
                        <h3 className="text-center mb-4 fs-5">
                            No of Orders Pending
                        </h3>
                        <p className="text-center fs-3 fw-bold">
                            {pendingOrders}
                        </p>
                    </div>

                    <div className="display-container mt-5">
                        <h3 className="text-center mb-4 fs-5">
                            No of Orders Confirmed
                        </h3>
                        <p className="text-center fs-3 fw-bold">
                            {confirmedOrders}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;