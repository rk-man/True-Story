import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { useState } from "react";

import { register, reset } from "./../features/auth/authSlice";
import { useEffect } from "react";

function Signup() {
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    //extracting values from the local state variables
    const { password, confirmPassword, name, email, username } = userData;

    const { user, isSuccess, isError, message, token } = useSelector(
        (state) => {
            return state.auth;
        }
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && user && token) {
            navigate("/");
            toast.success("Successfully signed in");
        } else if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isSuccess, isError, dispatch, message, token, navigate, user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            dispatch(register(userData));
        }
    };

    const handleFieldValues = (e) => {
        setUserData((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });

        e.preventDefault();
    };

    return (
        <main className="form mt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl text-3xl">
                <h1 className="mb-10 text-center">Sign Up Here</h1>
                <div className="md:flex md:items-center mb-10">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleFieldValues}
                            required
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-10">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="username"
                        >
                            Username
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="username"
                            type="text"
                            onChange={handleFieldValues}
                            value={username}
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-10">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="email"
                        >
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="email"
                            onChange={handleFieldValues}
                            value={email}
                            type="email"
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-10">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="password"
                            value={password}
                            onChange={handleFieldValues}
                            type="password"
                            placeholder="******************"
                            required
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-10">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="confirm-password"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="confirmPassword"
                            type="password"
                            onChange={handleFieldValues}
                            value={confirmPassword}
                            placeholder="******************"
                            required
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <p className="text-center mt-10">
                    Already a user ?{" "}
                    <Link to="/login">
                        <span style={{ color: "blue" }}>Login here</span>
                    </Link>
                </p>
            </form>
        </main>
    );
}

export default Signup;
