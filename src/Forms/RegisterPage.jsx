
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Allservices from "../Services/Services";
import "./RegisterPage.css";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setMessage("");
    setErrorMessage("");

    try {
      const response = await Allservices.addService("users/register", {
        name: data.name,
        email: data.email,
        password: data.password
      });

      setMessage("Registration successful! Please log in.");

      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container register">
        <h2 className="text-center mb-4">Register</h2>

        <form
          className="border border-dark rounded p-3 bg-secondary text-white mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          {message && (
            <div className="alert alert-success">{message}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger">{String(errorMessage)}</div>
          )}

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <small className="text-warning">{errors.name.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", {
                required: "Email is required"
              })}
            />
            {errors.email && (
              <small className="text-warning">{errors.email.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <small className="text-warning">{errors.password.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value =>
                  value === watch("password") || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && (
              <small className="text-warning">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;