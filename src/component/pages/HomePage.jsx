import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import "../../style/homePage.css";

const HomePage = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let allProducts = [];
                const queryParams = new URLSearchParams(location.search);
                const searchItem = queryParams.get("search");

                if (searchItem) {
                    const response = await ApiService.searchProducts(searchItem);
                    allProducts = response.productList || [];
                    setCurrentPage(1);
                } else {
                    const response = await ApiService.getAllProducts();
                    allProducts = response.productList || [];
                }

                // Ensure all images have correct URLs
                allProducts = allProducts.map((product) => ({
                    ...product,
                    imageUrl: product.imageUrl?.startsWith("http")
                        ? product.imageUrl
                        : `http://localhost:2424/uploads/${product.imageUrl}`,
                }));

                setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } catch (error) {
                setError(error.response?.data?.message || error.message || "Unable to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search, currentPage]);

    return (
        <div className="home">
            {loading ? (
                <p className="loading-message">Loading products...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <ProductList products={products} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default HomePage;
