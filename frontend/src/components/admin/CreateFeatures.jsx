import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
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
    <StyledCreateFeatures>
      <StyledForm onSubmit={handleCreateFeature}>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create a Feature</h3>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium">
              Nama Fitur :
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 w-full border rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="text-sm font-medium">
              Harga Fitur :
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="p-2 w-full border rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-sm font-medium">
              Deskripsi Fitur :
            </label>
            <input
              type="text"
              id="description"
              placeholder="Short Description"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="p-2 w-full border rounded focus:outline-none"
            />
          </div>
          <PrimaryButton
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            {createStatus === "pending" ? "Submitting" : "Submit"}
          </PrimaryButton>
        </div>
      </StyledForm>
    </StyledCreateFeatures>
  );
};

export default CreateFeatures;

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
