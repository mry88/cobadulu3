import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCreate } from "../../slices/productsSlice";
import { ThemeProvider, createTheme } from "@mui/material";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.features);
  const { catItems } = useSelector((state) => state.category);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [productImg, setProductImg] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (reader.result) {
          setProductImg(reader.result);
        } else {
          console.error("Failed to read the file.");
        }
      };
    } else {
      setProductImg("");
    }
  };

  const handleFeatureSelection = (e) => {
    const selectedFeatureId = e.target.value;
    if (e.target.checked) {
      setSelectedFeatures([...selectedFeatures, selectedFeatureId]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== selectedFeatureId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        category,
        price,
        desc,
        image: productImg,
        features: selectedFeatures,
        video,
      })
    );
    setName("");
    setCategory("");
    setDesc("");
    setPrice("");
  };

  return (
    <ThemeProvider theme={darkTheme}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 text-white py-16">
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          {/* <h3 className="mb-4 text-xl font-semibold">Create a Product</h3> */}
          <div className="mb-4">
            <label htmlFor="imgUpload" className="block text-sm text-gray-400">
              <h5 className="text-lg font-semibold">Upload Image:</h5>
            </label>
            <input
              id="imgUpload"
              accept="image/*"
              type="file"
              onChange={handleProductImageUpload}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm text-gray-400">
              <h5 className="text-lg font-semibold">Select Category:</h5>
            </label>
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            >
              <option value="" disabled>
                <h5 className="text-lg font-semibold">Select Category</h5>
              </option>
              {catItems.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm text-gray-400">
              <h5 className="text-lg font-semibold">Product Name:</h5>
            </label>
            <input
              id="productName"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm text-gray-400">
              <h5 className="text-lg font-semibold">Product Price:</h5>
            </label>
            <input
              id="productPrice"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productDesc" className="block text-sm text-gray-400">
              <h5 className="text-lg font-semibold">Description:</h5>
            </label>
            <textarea
              id="productDesc"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Select Features:</label>
            <div className="mt-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={item._id}
                    checked={selectedFeatures.includes(item._id)}
                    onChange={handleFeatureSelection}
                    className="mr-2 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="videoLink" className="block text-sm text-gray-400">
              <h5 className="text-lg font-semibold">Insert Video Link:</h5>
            </label>
            <input
              id="videoLink"
              type="text"
              placeholder="Video Link"
              onChange={(e) => setVideo(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {createStatus === "pending" ? "Submitting" : "Submit"}
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md">
          <div className="p-4">
            <div className="flex items-center justify-center h-48">
              {productImg ? (
                <img src={productImg} alt="Product Preview" className="max-w-full" />
              ) : (
                <p className="border border-gray-700 p-4 text-gray-400">
                  Product image upload preview will appear here!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>

  );
};

export default CreateProduct;
