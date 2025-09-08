import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import UploadProduct from "./pages/UploadProduct";
import MyProducts from "./pages/MyProducts";

function App() {
  const [currentPage, setCurrentPage] = useState("upload-product");

  const renderPage = () => {
    switch (currentPage) {
      case "my-products":
        return <MyProducts />;
      case "upload-product":
      default:
        return <UploadProduct />;
    }
  };

  return (
    <div className="flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1">{renderPage()}</div>
    </div>
  );
}

export default App;
