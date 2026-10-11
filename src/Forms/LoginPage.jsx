import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Allservices from "../Services/Services";
import "./LoginPage.css";

function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            const response = await Allservices.addService(
                "users/login",
                data
            );

            console.log("Login successful:", response);

            // Store JWT
            localStorage.setItem("token", response.token);

            // Store role
            localStorage.setItem("role", response.role);
            localStorage.setItem("name", response.name);
            
            // Redirect based on role
            if (response.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }

        } catch (error) {

            console.error("Login failed:", error);

            alert("Invalid email or password");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container login mt-2">

                <h2 className="text-center mb-4">
                    Login
                </h2>

                <form
                    className="border border-dark rounded p-3 bg-secondary text-white mx-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    <div className="mb-3">

                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            {...register("email", {
                                required: true
                            })}
                        />

                        {errors.email && (
                            <span className="text-danger">
                                Email is required
                            </span>
                        )}

                    </div>

                    <div className="mb-3">

                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        {errors.password && (
                            <span className="text-danger">
                                Password is required
                            </span>
                        )}

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Login
                    </button>

                </form>

            </div>
        </>
    );
}

export default LoginPage;