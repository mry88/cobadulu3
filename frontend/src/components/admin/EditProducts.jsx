import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider, createTheme } from "@mui/material";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsEdit } from "../../slices/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditProducts() {
    const [open, setOpen] = useState(false);
    const { items } = useSelector((state) => state.products);
    const { items2 } = useSelector((state) => state.features);
    const { catItems } = useSelector((state) => state.category);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const { prodId } = useParams();

    const dispatch = useDispatch();
    const { editStatus } = useSelector((state) => state.products);

    const [previewImg, setPreviewImg] = useState("");
    const [currentProd, setCurrentProd] = useState({});

    const [productImg, setProductImg] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [video, setVideo] = useState("");

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        // Move the initial state setup into useEffect with an empty dependency array
        const initialSelectedFeatures = [];
        let selectedProd = items.find((item) => item._id === prodId);
        console.log(selectedProd);

        selectedProd.features.forEach((featureId) => {
            initialSelectedFeatures.push(featureId);
            console.log(initialSelectedFeatures);
        });
        setSelectedFeatures(initialSelectedFeatures);

        setCurrentProd(selectedProd);
        setPreviewImg(selectedProd.image.url);
        setProductImg("");
        setCategory(selectedProd.category);
        setName(selectedProd.name);
        setPrice(selectedProd.price);
        setDesc(selectedProd.desc);
        setVideo(selectedProd.video)
    }, []);

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
                    brand: category,
                    price: price,
                    desc: desc,
                    features: selectedFeatures,
                },
            })
        );
    };

    return (
        // <div>
        //     <StyledEditProduct>
        //         <StyledForm onSubmit={handleSubmit}>
        //             <h3>Create a Product</h3>
        //             <h5>Upload Image :</h5>
        //             <input
        //                 id="imgUpload"
        //                 accept="image/*"
        //                 type="file"
        //                 onChange={handleProductImageUpload}
        //             />
        //             <h5>Select Category :</h5>
        //             <select onChange={(e) => setCategory(e.target.value)} required>
        //                 {catItems.map((item) => (
        //                     <option key={item._id} value={item.name}>
        //                         {item.name}
        //                     </option>
        //                 ))}
        //             </select>
        //             <h5>Product Name :</h5>
        //             <input
        //                 type="text"
        //                 placeholder="Name"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 required
        //             />
        //             <h5>Product Price :</h5>
        //             <input
        //                 type="number"
        //                 placeholder="Price"
        //                 value={price}
        //                 onChange={(e) => setPrice(e.target.value)}
        //                 required
        //             />
        //             <h5>Description :</h5>
        //             <input
        //                 type="text"
        //                 placeholder="Short Description"
        //                 value={desc}
        //                 onChange={(e) => setDesc(e.target.value)}
        //                 required
        //             />
        //             <h5>Select Features :</h5>
        //             <table>
        //                 <tbody>
        //                     {items2.map((item) => (
        //                         <tr>
        //                             <td>
        //                                 <input
        //                                     type="checkbox"
        //                                     value={item._id}
        //                                     checked={selectedFeatures.some((i)=> i._id === item._id)}
        //                                     onChange={handleCheckboxChange}
        //                                 />
        //                             </td>
        //                             <td>{item.name}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>

        //             <PrimaryButton type="submit">
        //                 {editStatus === "pending" ? "Submitting" : "Submit"}
        //             </PrimaryButton>
        //         </StyledForm>
        //         <ImagePreview>
        // {previewImg ? (
        //     <>
        //         <img src={previewImg} alt="error!" />
        //     </>
        // ) : (
        //     <p>Product image upload preview will appear here!</p>
        // )}
        //         </ImagePreview>
        //     </StyledEditProduct>
        // </div>

        <ThemeProvider theme={darkTheme}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-200 text-white py-16">
                    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                        {/* <h3 className="mb-4 text-xl font-semibold">Create a Product</h3> */}
                        <div className="mb-4">
                            <label htmlFor="imgUpload" className="block text-sm text-gray-400">
                                <h5 className="text-lg font-semibold">Upload Image:</h5>
                            </label>
                            <input
                                id="imgUpload"
                                accept="image/*"
                                type="file"
                                onChange={handleProductImageUpload}
                                required
                                className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm text-gray-400">
                                <h5 className="text-lg font-semibold">Select Category:</h5>
                            </label>
                            <select
                                id="category"
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
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
                            <label htmlFor="productName" className="block text-sm text-gray-400">
                                <h5 className="text-lg font-semibold">Product Name:</h5>
                            </label>
                            <input
                                id="productName"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productPrice" className="block text-sm text-gray-400">
                                <h5 className="text-lg font-semibold">Product Price:</h5>
                            </label>
                            <input
                                id="productPrice"
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productDesc" className="block text-sm text-gray-400">
                                <h5 className="text-lg font-semibold">Description:</h5>
                            </label>
                            <textarea
                                id="productDesc"
                                placeholder="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                required
                                className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400">Select Features:</label>
                            <div className="mt-1">
                                {items2.map((item) => (
                                    <div key={item.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={item._id}
                                            checked={selectedFeatures.some((i) => i._id === item._id)}
                                            onChange={handleCheckboxChange}
                                            className="mr-2 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-blue-300 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="videoLink" className="block text-sm text-gray-400">
                                <h5 className="text-lg font-semibold">Insert Video Link:</h5>
                            </label>
                            <input
                                id="videoLink"
                                type="text"
                                placeholder="Video Link"
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
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
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-md">
                        <div className="p-4">
                            <div className="flex items-center justify-center h-48 mt-[300px]">
                                {previewImg ? (
                                    <>
                                        <img src={previewImg} alt="error!" />
                                    </>
                                ) : (
                                    <p>Product image upload preview will appear here!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ThemeProvider>
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
  justify-content: left;
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
