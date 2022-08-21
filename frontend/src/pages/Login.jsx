import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { reset, login } from "../features/auth/authSlice";

import { Link } from "react-router-dom";

function Login() {
    //local state variables
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = userData;

    //global state variables
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
            toast.success("Successfully logged in");
        } else if (isError) {
            toast.error(message);
        }

        //this should be called on every state changes but the user field do not get changed, only isSuccess, isError etc
        dispatch(reset());
    }, [isSuccess, isError, message, navigate, token, dispatch, user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && password) {
            dispatch(login(userData));
        }
    };

    const handleFieldValues = (e) => {
        e.preventDefault();
        setUserData((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    return (
        <main className="form">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl text-3xl">
                <h1 className="mb-10 text-center">Login Here</h1>

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
                            type="email"
                            required
                            value={email}
                            onChange={handleFieldValues}
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
                            type="password"
                            placeholder="******************"
                            required
                            value={password}
                            onChange={handleFieldValues}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-1/3">
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <p>
                            New user ?
                            <Link to="/signup">
                                <span style={{ color: "#ffbb00" }}>
                                    Sign in
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Login;
