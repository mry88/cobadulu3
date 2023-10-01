import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import { PrimaryButton } from "../CommonStyled";
import { setHeaders, url } from "../../../slices/api";
import { useEffect } from "react";
import { useState } from "react";

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
    { field: "id", headerName: "ID", width: 150 },
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
      width: 170,
      renderCell: (params) => {
        const prodId = params.row.id;
        return (
          <Actions>
            <Edit onClick={() => navigate(`edit-product/${prodId}`)}>Edit</Edit>
            <Delete onClick={() => navigate(`delete-product/${prodId}`)}>Delete</Delete>
            <View onClick={() => navigate(`/product/${prodId}`)}>
              View
            </View>
          </Actions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
      <PrimaryButton onClick={() => navigate("/admin/products/create-product")}>
        Create
      </PrimaryButton>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
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

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;

    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
