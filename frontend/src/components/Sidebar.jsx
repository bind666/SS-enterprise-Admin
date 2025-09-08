import React from "react";
import { motion } from "framer-motion";

export default function Sidebar({ currentPage, setCurrentPage }) {
    const buttonClasses = (page) =>
        `mb-3 text-left p-3 rounded font-semibold transition-all duration-300 ${
            currentPage === page
                ? "bg-gray-700 scale-105 text-white"
                : "hover:bg-gray-700 hover:scale-105 text-gray-300"
        }`;

    return (
        <div className="w-64 h-screen bg-gray-950 text-white flex flex-col p-6 shadow-xl">
            <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-10 text-center text-white"
            >
                SS Enterprise
            </motion.h1>
            <motion.button
                className={buttonClasses("my-products")}
                onClick={() => setCurrentPage("my-products")}
                whileHover={{ scale: 1.05 }}
            >
                My Products
            </motion.button>
            <motion.button
                className={buttonClasses("upload-product")}
                onClick={() => setCurrentPage("upload-product")}
                whileHover={{ scale: 1.05 }}
            >
                Upload Product
            </motion.button>
        </div>
    );
}
