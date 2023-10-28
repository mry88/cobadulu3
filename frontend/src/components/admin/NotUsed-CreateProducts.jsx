import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { url, setHeaders } from "../../slices/api";
import { productsCreate } from "../../slices/productsSlice";

const CreateProducts = () => {
    const dispatch = useDispatch();

    const { createStatus } = useSelector((state) => state.products);
    const { items } = useSelector((state) => state.features);

    const [productImg, setProductImg] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [features, setFeatures] = useState("");

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        TransformFileData(file);
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);

            // reader.onloadstart = () => {
            //   console.log("FileReader started reading.");
            // };

            reader.onloadend = () => {
                if (reader.result) {
                    setProductImg(reader.result);
                } else {
                    console.error("Failed to read the file.");
                }
                // setProductImg(reader.result);
                // console.log(productImg);
            };
        } else {
            setProductImg("");
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        try {

            // Prepare the data to be sent in the request body
            const requestData = {
                name,
                brand,
                price,
                desc,
                image: productImg,
            };

            // Serialize the data to JSON
            const requestDataJSON = JSON.stringify(requestData);

            // Log the size of the request payload
            const payloadSizeInBytes = new Blob([requestDataJSON]).size;
            const payloadSizeInKb = payloadSizeInBytes / 1024; // Convert to KB
            const payloadSizeInMb = payloadSizeInKb / 1024; // Convert to MB

            console.log(
                `Request payload size: ${payloadSizeInBytes} bytes (${payloadSizeInKb} KB, ${payloadSizeInMb} MB)`
            );


            // Send a POST request to create the feature
            const response = await fetch(`${url}/products`, {
                method: "POST",
                headers: {
                    ...setHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                // Feature created successfully
                const newProduct = await response.json();
                console.log("New product:", newProduct);

                //dispatch(featuresCreate(newFeature));
            } else {
                // Handle error cases
                console.error("Error create feature:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating feature:", error);
        }

        // dispatch(
        //   productsCreate({
        //     name,
        //     brand,
        //     price,
        //     desc,
        //     image: productImg,
        //     features: Array.isArray(features) ? features : [features],
        //   })
        // );
    };

    return (
        <StyledCreateProduct>
            <StyledForm onSubmit={handleCreateProduct}>
                <h3>Create a Product</h3>
                <input
                    id="imgUpload"
                    accept="image/*"
                    type="file"
                    onChange={handleProductImageUpload}
                    required
                />
                <select onChange={(e) => setBrand(e.target.value)} required>
                    <option value="">Select Brand</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="xiomi">Xiomi</option>
                    <option value="other">Other</option>
                </select>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Short Description"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <select onChange={(e) => setFeatures(e.target.value)} required>
                    {items.map((item) => (
                        <option key={item.id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                <PrimaryButton type="submit">
                    {createStatus === "pending" ? "Submitting" : "Submit"}
                </PrimaryButton>
            </StyledForm>
            <ImagePreview>
                {productImg ? (
                    <>
                        <img src={productImg} alt="error!" />
                    </>
                ) : (
                    <p>Product image upload preview will appear here!</p>
                )}
            </ImagePreview>
        </StyledCreateProduct>
    );
};

export default CreateProducts;

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

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
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
