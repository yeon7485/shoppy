import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";

export default function Navbar() {
    const [user, setUser] = useState();

    useEffect(() => {
        // 인자가 동일하므로 참조값만 전달
        onUserStateChange(setUser);
    }, []);
    return (
        <header className="flex justify-between border-b border-gray-300 p-4">
            <Link to="/" className="flex items-center text-4xl text-brand">
                <FiShoppingBag />
                <h1>Shoppy</h1>
            </Link>
            <nav className="flex items-center text-xl gap-4 font-semibold">
                <Link to="/products">Products</Link>
                <Link to="/cart">Carts</Link>
                <Link to="/products/new" className="text-2xl">
                    <BsPencilFill />
                </Link>
                {user && <User user={user} />}
                {!user && <button onClick={login}>Login</button>}
                {user && <button onClick={logout}>Logout</button>}
            </nav>
        </header>
    );
}
