import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

function Header() {
    const [loggedout, setLoggedout] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedout) {
            console.log("Navigating to login");
            toast.success("logged out successfully");
            navigate("/login");
        }

        setLoggedout(false);
        // eslint-disable-next-line
    }, [navigate]);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());
        setLoggedout(true);
    };

    return (
        <div className="header">
            <Link to="/">
                <h1>TRUE STORY</h1>
            </Link>

            {(window.location.pathname === "/" ||
                window.location.pathname === "/my-account") && (
                <div className="btns">
                    <Link to="/my-account">
                        <button className="btn">My Account</button>
                    </Link>
                    <Link to="/login">
                        <button onClick={handleLogout} className="btn">
                            Log out
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;
