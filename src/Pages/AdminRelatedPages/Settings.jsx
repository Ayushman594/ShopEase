import { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(true);

    const [admin, setAdmin] = useState({
        name: "Admin",
        email: "admin@shopease.com",
        phone: ""
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleAdminChange = (e) => {

        const { name, value } = e.target;

        setAdmin({
            ...admin,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {

        const { name, value } = e.target;

        setPassword({
            ...password,
            [name]: value
        });
    };

    const handleProfileSubmit = (e) => {

        e.preventDefault();

        console.log("Admin details:", admin);

        alert("Profile updated successfully");
    };

    const handlePasswordSubmit = (e) => {

        e.preventDefault();

        if (password.newPassword !== password.confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        if (password.newPassword.length < 6) {
            alert("Password must contain at least 6 characters");
            return;
        }

        console.log("Password updated");

        alert("Password updated successfully");

        setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    const handleLogout = () => {

        // Later you can remove JWT/token here
        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div className="settings-page">

            <Sidebar />

            <main className="settings-content">

                <h2 className="settings-title">
                    Settings
                </h2>

                {/* Admin Profile */}

                <section className="settings-card">

                    <h4>Admin Profile</h4>

                    <p className="settings-description">
                        Manage your admin account information.
                    </p>

                    <form onSubmit={handleProfileSubmit}>

                        <div className="settings-form-grid">

                            <div className="settings-input-group">

                                <label>
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={admin.name}
                                    onChange={handleAdminChange}
                                />

                            </div>


                            <div className="settings-input-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={admin.email}
                                    onChange={handleAdminChange}
                                />

                            </div>


                            <div className="settings-input-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={admin.phone}
                                    onChange={handleAdminChange}
                                    placeholder="Enter phone number"
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="settings-primary-btn"
                        >
                            Save Changes
                        </button>

                    </form>

                </section>


                {/* Change Password */}

                <section className="settings-card">

                    <h4>Change Password</h4>

                    <p className="settings-description">
                        Update your admin account password.
                    </p>

                    <form onSubmit={handlePasswordSubmit}>

                        <div className="settings-form-grid">

                            <div className="settings-input-group">

                                <label>
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={password.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />

                            </div>


                            <div className="settings-input-group">

                                <label>
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="newPassword"
                                    value={password.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />

                            </div>


                            <div className="settings-input-group">

                                <label>
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={password.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="settings-primary-btn"
                        >
                            Update Password
                        </button>

                    </form>

                </section>


                {/* Notifications */}

                <section className="settings-card">

                    <h4>Notifications</h4>

                    <p className="settings-description">
                        Manage your admin notification preferences.
                    </p>

                    <div className="notification-setting">

                        <div>
                            <strong>
                                Order Notifications
                            </strong>

                            <p>
                                Receive notifications when a new order is placed.
                            </p>
                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() =>
                                    setNotifications(!notifications)
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                </section>


                {/* Account */}

                <section className="settings-card danger-card">

                    <h4>Account</h4>

                    <p className="settings-description">
                        Sign out from your ShopEase admin account.
                    </p>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Settings;