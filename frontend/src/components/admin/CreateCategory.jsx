import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"; // Import styled-components
import { PrimaryButton } from "./CommonStyled";
import { categoryCreate } from "../../slices/categorySlice";

// Define StyledCreateCategory using styled-components
const StyledCreateCategory = styled.div`
  display: flex;
  justify-content: flex-start; /* Align to the left */
  align-items: flex-start; /* Align to the top */
  height: 100vh;
  padding: 2rem; /* Add some padding to move the form up and to the left */
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
    <StyledCreateCategory>
      <form
        onSubmit={handleCreateCategory}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">Create a Category</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama category :</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">Deskripsi Category :</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="desc"
            type="text"
            placeholder="Short Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <PrimaryButton
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            {createStatus === "pending" ? "Submitting" : "Submit"}
          </PrimaryButton>
        </div>
      </form>
    </StyledCreateCategory>
  );
};

export default CreateCategory;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateFeatures = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateForm = styled.div`
  margin-top: 10px;
`;
