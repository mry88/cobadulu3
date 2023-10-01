import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCreate } from "../../slices/productsSlice";
import styled from "styled-components";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <form className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Create a Product</h3>
        <div className="mb-4">
          <label htmlFor="imgUpload" className="block text-sm text-gray-700">
          <h5 className="text-lg font-semibold">Upload Image:</h5>
            
          </label>
          <input
            id="imgUpload"
            accept="image/*"
            type="file"
            onChange={handleProductImageUpload}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm text-gray-700">
          <h5 className="text-lg font-semibold">Select Category:</h5>
            
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
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
          <label htmlFor="productName" className="block text-sm text-gray-700">
            <h5 className="text-lg font-semibold">Product Name:</h5>
            
          </label>
          <input
            id="productName"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-sm text-gray-700">
          <h5 className="text-lg font-semibold">Product Price:</h5>
            
          </label>
          <input
            id="productPrice"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDesc" className="block text-sm text-gray-700">
            <h5 className="text-lg font-semibold">Description:</h5>
          </label>
          <textarea
            id="productDesc"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
            rows="4" // Menentukan jumlah baris yang ditampilkan
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Select Features:</label>
          <div className="mt-1">
            <table className="w-full">
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2">
                      <input
                        type="checkbox"
                        value={item._id}
                        checked={selectedFeatures.includes(item._id)}
                        onChange={handleFeatureSelection}
                      />
                    </td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="videoLink" className="block text-sm text-gray-700">
          <h5 className="text-lg font-semibold">Insert Video Link:</h5>
            
          </label>
          <input
            id="videoLink"
            type="text"
            placeholder="Video Link"
            onChange={(e) => setVideo(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </button>
      </form>
      <div className="max-w-md mx-auto mt-8">
        <ImagePreview>
          {productImg ? (
            <img src={productImg} alt="Product Preview" className="max-w-full" />
          ) : (
            <p className="border border-gray-300 p-4 text-gray-700">
              Product image upload preview will appear here!
            </p>
          )}
        </ImagePreview>
      </div>
    </div>
  );
};

export default CreateProduct;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
