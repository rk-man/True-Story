import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectRoute from "./components/ProtectRoute";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/my-account/*" element={<ProtectRoute />}>
                    <Route path="/my-account/*" element={<MyAccount />} />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
