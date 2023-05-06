import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
    product,
    product: { id, image, title, category, price, description, options },
}) {
    const navigate = useNavigate();
    return (
        <li
            className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
            onClick={() => {
                navigate(`/products/${id}`, { state: { product } });
            }}
        >
            <img className="w-full" src={image} alt={title} />
            <div className="mt-2 px-2 text-lg flex justify-between items-center">
                <h3 className="truncate">{title}</h3>
                <p>{`₩${price}`}</p>
            </div>
            <p className="mb-2 px-2 text-gray-600">{category}</p>
        </li>
    );
}
