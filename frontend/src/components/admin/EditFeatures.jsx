import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useEffect } from "react";
import { setHeaders, url } from "../../slices/api";
import { featuresEdit } from "../../slices/featuresSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFeatures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.features);
    const { editStatus } = useSelector((state) => state.features);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [currentFeat, setCurrentFeat] = useState({});
    const { featId } = useParams();

    //let selectedFeat = items.filter((item) => item._id === featId);
    //selectedFeat = selectedFeat[0];

    useEffect(() => {
        // Fetch the selected feature item by ID
        const selectedFeature = items.find((item) => item._id === featId);
        if (selectedFeature) {
            setCurrentFeat(selectedFeature);
            setName(selectedFeature.name);
            setPrice(selectedFeature.price);
            setDesc(selectedFeature.description);
        }
    }, []);

    const handleUpdateFeature = async (e) => {
        e.preventDefault();
        dispatch(featuresEdit({
            features: {
                ...currentFeat,
                name: name,
                description: description,
                price: price,
            }
        }));
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 mt-32">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h3 className="text-2xl font-semibold text-white text-center mb-4">Edit Feature</h3>
        <form onSubmit={handleUpdateFeature}>
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
            {editStatus === "pending" ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </div>
        // <div>
        //     <StyledEditFeatures>
        //         <StyledForm onSubmit={handleUpdateFeature}>
        //             <h3>Edit Feature</h3>
        //             <h5>Nama Fitur :</h5>
        //             <input
        //                 type="text"
        //                 placeholder="Name"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 required
        //             />
        //             <h5>Harga Fitur :</h5>
        //             <input
        //                 type="number"
        //                 placeholder="Price"
        //                 value={price}
        //                 onChange={(e) => setPrice(e.target.value)}
        //                 required
        //             />
        //             <h5>Deskripsi Fitur :</h5>
        //             <input
        //                 type="text"
        //                 placeholder="Short Description"
        //                 value={description}
        //                 onChange={(e) => setDesc(e.target.value)}
        //                 required
        //             />
        //             <PrimaryButton type="submit">
        //                 {editStatus === "pending" ? "Submitting" : "Submit"}
        //             </PrimaryButton>
        //         </StyledForm>
        //     </StyledEditFeatures>
        // </div>
    );
}

const Edit = styled.button`
  border: none;
  outline: none;

  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

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

const StyledEditFeatures = styled.div`
  display: flex;
  justify-content: space-between;
`;
