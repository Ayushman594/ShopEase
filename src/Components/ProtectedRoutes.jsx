import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role
    if (allowedRole && role !== allowedRole) {

        if (role === "ADMIN") {
            return <Navigate to="/admin/dashboard" replace />;
        }

        return <Navigate to="/user/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;