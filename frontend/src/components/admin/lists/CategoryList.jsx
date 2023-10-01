import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { categoryDelete } from "../../../slices/featuresSlice";
import { PrimaryButton } from "../CommonStyled";
//import EditCategory from "../EditFeature";

export default function CategoryList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.category);
  console.log(items);

  const rows =
    items &&
    items.map((item) => {
      console.log(item.name);
      console.log(item.description);
      return {
        id: item._id,
        pName: item.name,
        pDesc: item.desc,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "pName", headerName: "Name", width: 130 },
    { field: "pDesc", headerName: "Description", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        const catId = params.row.id;
        return (
          <Actions>
            <Edit onClick={() => navigate(`edit-category/${catId}`)}>Edit</Edit>
            <Delete onClick={() => navigate(`delete-category/${catId}`)}>Delete</Delete>
          </Actions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
      <PrimaryButton onClick={() => navigate("/admin/category/create-category")}>
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
const Edit = styled.button`
  border: none;
  outline: none;

  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
