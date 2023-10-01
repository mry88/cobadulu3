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
import { categoryEdit } from "../../slices/categorySlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.category);
    const { editStatus } = useSelector((state) => state.category);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [currentCat, setCurrentCat] = useState({});
    const { catId } = useParams();

    useEffect(() => {
        // Fetch the selected category item by ID
        const selectedCategory = items.find((item) => item._id === catId);
        if (selectedCategory) {
            setCurrentCat(selectedCategory);
            setName(selectedCategory.name);
            setDesc(selectedCategory.desc);
        }
    }, []);

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        dispatch(categoryEdit({
            category: {
                ...currentCat,
                name: name,
                description: desc,
            }
        }));
    };

    return (
        <div>
            <StyledEditCategory>
                <StyledForm onSubmit={handleUpdateCategory}>
                    <h3>Edit Category</h3>
                    <h5>Nama Category :</h5>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <h5>Deskripsi Category :</h5>
                    <input
                        type="text"
                        placeholder="Short Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                    <PrimaryButton type="submit">
                        {editStatus === "pending" ? "Submitting" : "Submit"}
                    </PrimaryButton>
                </StyledForm>
            </StyledEditCategory>
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

const StyledEditCategory = styled.div`
  display: flex;
  justify-content: space-between;
`;
