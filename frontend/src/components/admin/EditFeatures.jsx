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
        <div>
            <StyledEditFeatures>
                <StyledForm onSubmit={handleUpdateFeature}>
                    <h3>Edit Feature</h3>
                    <h5>Nama Fitur :</h5>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <h5>Harga Fitur :</h5>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <h5>Deskripsi Fitur :</h5>
                    <input
                        type="text"
                        placeholder="Short Description"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                    <PrimaryButton type="submit">
                        {editStatus === "pending" ? "Submitting" : "Submit"}
                    </PrimaryButton>
                </StyledForm>
            </StyledEditFeatures>
        </div>
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
