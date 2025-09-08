import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/config";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <p className="p-5 text-gray-400 bg-gray-900 text-center text-lg">Loading...</p>
    );

  if (error)
    return (
      <p className="p-5 text-red-400 bg-gray-900 text-center text-lg">{error}</p>
    );

  return (
    <div className="p-5 bg-gray-900 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-5 text-white sticky top-0 bg-gray-900 z-10 py-2">
        My Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <motion.div
            key={p._id}
            className="border border-gray-700 rounded-xl shadow-xl overflow-hidden bg-gray-800 cursor-pointer transition-transform"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover mb-3"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg text-white">{p.name}</h2>
              <p className="text-gray-300">Category: {p.category}</p>
              <p className="text-green-400 font-semibold">Price: ₹{p.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
