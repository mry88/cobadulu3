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
import { productsEdit } from "../../slices/productsSlice";
import { useEffect } from "react";

export default function EditProduct({ prodId }) {
  const [open, setOpen] = useState(false);
  const { items } = useSelector((state) => state.products);
  const { items2 } = useSelector((state) => state.features);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const dispatch = useDispatch();
  const { editStatus } = useSelector((state) => state.products);

  const [previewImg, setPreviewImg] = useState("");
  const [currentProd, setCurrentProd] = useState({});

  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleCheckboxChange = (e) => {
    const selectedFeatureId = e.target.value;
    if (e.target.checked) {
      setSelectedFeatures([...selectedFeatures, selectedFeatureId]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== selectedFeatureId));
    }
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsEdit({
        productImg,
        product: {
          ...currentProd,
          name: name,
          brand: brand,
          price: price,
          desc: desc,
          features: selectedFeatures,
        },
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);

    const initialSelectedFeatures = [];
    let selectedProd = items.find((item) => item._id === prodId);

    selectedProd.features.forEach((featureId) => {
      initialSelectedFeatures.push(featureId);
    });
    setSelectedFeatures(initialSelectedFeatures);

    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setProductImg("");
    setBrand(selectedProd.brand);
    setName(selectedProd.name);
    setPrice(selectedProd.price);
    setDesc(selectedProd.desc);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Create a Product</h3>
              <h5>Upload Image :</h5>
              <input
                id="imgUpload"
                accept="image/*"
                type="file"
                onChange={handleProductImageUpload}
              />
              <h5>Select Category :</h5>
              <select
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                required
              >
                <option value="">Select Brand</option>
                <option value="iphone">iPhone</option>
                <option value="samsung">Samsung</option>
                <option value="xiomi">Xiomi</option>
                <option value="other">Other</option>
              </select>
              <h5>Product Name :</h5>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <h5>Product Price :</h5>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <h5>Description :</h5>
              <input
                type="text"
                placeholder="Short Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <h5>Select Features :</h5>
              <table>
                <tbody>
                  {items2.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          value={item._id}
                          checked={selectedFeatures.includes(item._id)}
                          onChange={handleCheckboxChange}
                        />
                      </td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <PrimaryButton type="submit">
                {editStatus === "pending" ? "Submitting" : "Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (
                <>
                  <img src={previewImg} alt="error!" />
                </>
              ) : (
                <p>Product image upload preview will appear here!</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
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

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
