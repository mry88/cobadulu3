import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { featuresDelete } from "../../../slices/featuresSlice";
import { featuresFetch } from "../../../slices/featuresSlice";
import EditFeatures from "../EditFeatures";
import { useEffect } from "react";
import { PrimaryButton } from "../CommonStyled";
//import EditFeature from "../EditFeature";

export default function FeaturesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.features);

  useEffect(() => {
      // Fetch features when the component mounts
      dispatch(featuresFetch());
  });

  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        pName: item.name,
        pDesc: item.description,
        price: item.price.toLocaleString(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "pName", headerName: "Name", width: 130 },
    { field: "pDesc", headerName: "Description", width: 130 },
    {
      field: "price",
      headerName: "Price(Rp.)",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        const featId = params.row.id;
        return (
          <Actions>
            <Edit onClick={() => navigate(`edit-features/${featId}`)}>Edit</Edit>
            <Delete onClick={() => navigate(`delete-features/${featId}`)}>Delete</Delete>
          </Actions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
      <PrimaryButton onClick={() => navigate("/admin/features/create-features")}>
        Create
      </PrimaryButton>
      <DataGrid
        rows={rows}
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

  button {
    border: none;
    outline: none;
    margin: 5px;
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
