import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import Sidebar from "../../Components/Sidebar";
import Allservices from "../../Services/Services";
import "./Profile.css";

function Profile() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await Allservices.getAllServices("users/me");

      // If your service returns Axios response instead of response.data,
      // use response.data below.
      const data = response?.data ?? response;

      setProfile(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
      });
    } catch (err) {
      setError("Unable to load profile. Please log in again if needed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await Allservices.updateService("users", "me", formData);

      const updated = response?.data ?? response;

      setProfile((previous) => ({
        ...previous,
        name: updated.name ?? formData.name,
        email: updated.email ?? formData.email,
      }));

      setFormData({
        name: updated.name ?? formData.name,
        email: updated.email ?? formData.email,
      });

      localStorage.setItem("name", updated.name ?? formData.name);
      localStorage.setItem("email", updated.email ?? formData.email);

      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to update profile. Please try again.",
      );
    }
  };

  if (loading) {
    return <p className="profile-loading">Loading profile...</p>;
  }
  console.log("Editing mode:", editing);
  return (
    <>
      <div className="profile-layout">
        {isAdmin ? <Sidebar /> : <UserSidebar />}

        <main className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {(profile.name || "U").charAt(0).toUpperCase()}
              </div>

              <h2>My Profile</h2>
              <p>Manage your ShopEase account</p>
            </div>

            <div className="profile-body">
              {message && <div className="profile-success">{message}</div>}

              {error && <div className="profile-error">{error}</div>}

              <form onSubmit={handleSave}>
                <div className="profile-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="role">Account Role</label>
                  <input
                    id="role"
                    type="text"
                    value={profile.role || "USER"}
                    disabled
                    readOnly
                  />
                </div>

                {editing && (
                  <div className="profile-actions">
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setFormData({
                          name: profile.name || "",
                          email: profile.email || "",
                        });
                        setEditing(false);
                        setMessage("");
                        setError("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>

              {!editing && (
                <div className="profile-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => {
                      setFormData({
                        name: profile.name || "",
                        email: profile.email || "",
                      });
                      setEditing(true);
                      setMessage("");
                      setError("");
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
