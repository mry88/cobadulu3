import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import { PrimaryButton, darkTheme } from "../CommonStyled";
import { setHeaders, url } from "../../../slices/api";
import { useEffect } from "react";
import { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';


export default function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [row, setRow] = useState([]);

  const fetchAll = async () => {
    try {
      const allRows = await Promise.all(
        items.map(async (item) => {
          const responseFeat = await fetch(`${url}/features/names`, {
            method: "POST",
            headers: {
              ...setHeaders(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ featureIds: item.features }),
          });

          const responseCat = await fetch(`${url}/category/names`, {
            method: "POST",
            headers: {
              ...setHeaders(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryIds: item.category }),
          });

          if (responseFeat.ok && responseCat.ok) {
            const dataFeat = await responseFeat.json();
            const dataCat = await responseCat.json();
            const featureNames = dataFeat.map((feature) => feature).join(", ");
            const categoryNames = dataCat.map((category) => category);

            return {
              id: item._id,
              imageUrl: item.image.url,
              pName: item.name,
              pCat: categoryNames,
              pDesc: item.desc,
              price: item.price.toLocaleString(),
              feature: featureNames,
            };
          } else {
            console.error("Error fetching feature names:", responseFeat.statusText);
            console.error("Error fetching category names:", responseCat.statusText);
            return null;
          }
        })
      );

      // Filter out any null values (failed requests) and update the rows state
      setRow(allRows.filter((row) => row !== null));
    } catch (error) {
      console.error("Error fetching feature names:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [items]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 100 },
    { field: "pCat", headerName: "Category", width: 100 },
    { field: "pDesc", headerName: "Description", width: 130 },
    { field: "price", headerName: "Price(Rp.)", width: 100, },
    { field: "feature", headerName: "Features", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        const prodId = params.row.id;
        return (
          <Actions>
            <button onClick={() => navigate(`edit-product/${prodId}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
            <button onClick={() => navigate(`delete-product/${prodId}`)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
            <button onClick={() => navigate(`/product/${prodId}`)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View</button>
          </Actions>
        );
      },
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="h-screen">
        <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
          <button className="my-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => navigate("/admin/products/create-product")}>
            Create
          </button>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={5}
            sx={{
              backgroundColor: '#0f1418', 
              color: '#fff', 
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                borderColor: '#555',
              }
            }}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
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

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
