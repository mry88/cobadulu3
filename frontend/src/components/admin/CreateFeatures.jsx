import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "./CommonStyled";
import { featuresCreate } from "../../slices/featuresSlice";

const CreateFeatures = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.features);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");

  const handleCreateFeature = async (e) => {
    e.preventDefault();

    dispatch(
      featuresCreate({
        name,
        description,
        price,
      })
    );
    setName("");
    setDesc("");
    setPrice("");
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 mt-32">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h3 className="text-2xl font-semibold text-white text-center mb-4">Create a Feature</h3>
        <form onSubmit={handleCreateFeature}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
              Nama Fitur:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-300 text-sm font-bold mb-2">
              Harga Fitur:
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">
              Deskripsi Fitur:
            </label>
            <input
              type="text"
              id="description"
              placeholder="Short Description"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {createStatus === "pending" ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFeatures;
