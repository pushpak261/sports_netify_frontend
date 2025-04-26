import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import "../../style/productDetailsPage.css";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { cart, dispatch } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await ApiService.getProductById(productId);
                const productData = response.product;

                // Ensure image URL is correctly formatted
                if (productData && productData.imageUrl && !productData.imageUrl.startsWith("http")) {
                    productData.imageUrl = `http://localhost:2424/uploads/${productData.imageUrl}`;
                }

                setProduct(productData);
            } catch (error) {
                setError(error.response?.data?.message || "Product not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const addToCart = () => {
        if (product) {
            dispatch({ type: "ADD_ITEM", payload: product });
        }
    };

    const incrementItem = () => {
        if (product) {
            dispatch({ type: "INCREMENT_ITEM", payload: product });
        }
    };

    const decrementItem = () => {
        if (product) {
            const cartItem = cart.find((item) => item.id === product.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({ type: "DECREMENT_ITEM", payload: product });
            } else {
                dispatch({ type: "REMOVE_ITEM", payload: product });
            }
        }
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const cartItem = cart.find((item) => item.id === product.id);

    return (
        <div className="product-detail">
            <img
                src={product.imageUrl || "https://via.placeholder.com/200"} // Default image if not available
                alt={product.name}
                className="product-image"
                onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
            />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>${product.price.toFixed(2)}</span>
            {cartItem ? (
                <div className="quantity-controls">
                    <button onClick={decrementItem}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={incrementItem}>+</button>
                </div>
            ) : (
                <button onClick={addToCart}>Add To Cart</button>
            )}
        </div>
    );
};

export default ProductDetailsPage;
