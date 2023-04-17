import React from "react";
import { Link } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";

export default function Navbar() {
    return (
        <header>
            <Link to="/">
                <h1>Shoppy</h1>
            </Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Carts</Link>
            <Link to="/products/new">
                <BsPencilFill />
            </Link>
            <Link to="/">Login</Link>
        </header>
    );
}
