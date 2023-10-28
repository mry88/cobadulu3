import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { categoryCreate } from "../../slices/categorySlice";

const StyledCreateCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-h-screen;
  background-color: #1a202c; /* Warna latar belakang tema gelap */
`;

const FormContainer = styled.div`
  background-color: #2d3748; /* Warna latar belakang form */
  border-radius: 10px;
  padding: 2rem;
  width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    dispatch(
      categoryCreate({
        name,
        desc,
      })
    );
    setName("");
    setDesc("");
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 mt-32">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h3 className="text-2xl font-bold mb-4 text-center text-white">Create a Category</h3>
        <form onSubmit={handleCreateCategory}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Nama category :
            </label>
            <input
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="desc">
              Deskripsi Category :
            </label>
            <input
              className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
              id="desc"
              type="text"
              placeholder="Short Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {createStatus === "pending" ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
