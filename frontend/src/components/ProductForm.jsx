// import React, { useState } from "react";
// import { motion } from "framer-motion";

// export default function ProductForm() {
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [category, setCategory] = useState("");
//     const [image, setImage] = useState(null);
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !price || !image)
//             return setMessage("❌ Please fill all required fields");

//         setLoading(true);
//         setMessage("");

//         try {
//             // 1️⃣ Upload to Cloudinary
//             const formData = new FormData();
//             formData.append("file", image);
//             formData.append("upload_preset", "ss-products");
//             formData.append("folder", "ss-products");

//             const cloudRes = await fetch(
//                 "https://api.cloudinary.com/v1_1/dmljreejl/image/upload",
//                 { method: "POST", body: formData }
//             );

//             const cloudData = await cloudRes.json();
//             if (!cloudRes.ok) throw new Error(cloudData.error?.message || "Cloudinary upload failed");

//             // 2️⃣ Convert Cloudinary URL to AVIF
//             let imageUrl = cloudData.secure_url;
//             if (imageUrl.includes("res.cloudinary.com")) {
//                 const url = new URL(imageUrl);
//                 url.pathname = url.pathname.replace(/\.\w+$/, ".avif");
//                 imageUrl = url.toString();
//             }

//             // 3️⃣ Generate slug
//             const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

//             // 4️⃣ Post product info to backend
//             const res = await fetch("http://127.0.0.1:5000/api/products", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ name, slug, category, price, image: imageUrl }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 setMessage("✅ Product uploaded successfully!");
//                 setName(""); setPrice(""); setCategory(""); setImage(null);
//             } else {
//                 setMessage(data.error || "❌ Upload failed");
//             }
//         } catch (err) {
//             console.error(err);
//             setMessage(`❌ Upload failed: ${err.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-gray-800 text-white">
//             <h1 className="text-2xl mb-5 font-bold">Upload Product</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="p-2 rounded bg-gray-700 text-white focus:outline-none"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Price"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     className="p-2 rounded bg-gray-700 text-white focus:outline-none"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Category (optional)"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="p-2 rounded bg-gray-700 text-white focus:outline-none"
//                 />
//                 <input
//                     type="file"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     className="p-2 rounded bg-gray-700"
//                 />
//                 <motion.button
//                     type="submit"
//                     className="bg-blue-600 p-2 rounded font-semibold mt-2 disabled:opacity-50"
//                     whileHover={{ scale: 1.05, backgroundColor: "#1D4ED8" }}
//                     disabled={loading}
//                 >
//                     {loading ? "Uploading..." : "Upload"}
//                 </motion.button>
//             </form>
//             {message && (
//                 <motion.p
//                     className={`mt-3 ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}
//                 >
//                     {message}
//                 </motion.p>
//             )}
//         </motion.div>
//     );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image)
      return setMessage("❌ Please fill all required fields");

    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Upload to Cloudinary (unsigned upload)
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ss-products"); // unsigned preset
      formData.append("folder", "ss-products");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dmljreejl/image/upload",
        { method: "POST", body: formData }
      );

      const cloudData = await cloudRes.json();
      if (!cloudRes.ok)
        throw new Error(cloudData.error?.message || "Cloudinary upload failed");

      // 2️⃣ Convert returned URL into AVIF with compression
      let imageUrl = cloudData.secure_url;
      imageUrl = imageUrl.replace("/upload/", "/upload/f_avif,q_auto/");

      // 3️⃣ Generate slug
      const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

      // 4️⃣ Post product info to backend
      const res = await fetch("http://127.0.0.1:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, category, price, image: imageUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product uploaded successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setImage(null);
      } else {
        setMessage(data.error || "❌ Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-gray-800 text-white">
      <h1 className="text-2xl mb-5 font-bold">Upload Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 rounded bg-gray-700"
        />
        <motion.button
          type="submit"
          className="bg-blue-600 p-2 rounded font-semibold mt-2 disabled:opacity-50"
          whileHover={{ scale: 1.05, backgroundColor: "#1D4ED8" }}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </motion.button>
      </form>
      {message && (
        <motion.p
          className={`mt-3 ${
            message.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
