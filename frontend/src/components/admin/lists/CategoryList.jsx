import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { categoryDelete } from "../../../slices/featuresSlice";
import { PrimaryButton, darkTheme } from "../CommonStyled";
import { ThemeProvider } from "@mui/material";
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
    { field: "pName", headerName: "Name", width: 250 },
    { field: "pDesc", headerName: "Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        const catId = params.row.id;
        return (
          <Actions>
            <button onClick={() => navigate(`edit-category/${catId}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
            <button onClick={() => navigate(`delete-category/${catId}`)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
          </Actions>
        );
      },
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
        <button className="my-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => navigate("/admin/category/create-category")}>
          Create
        </button>
        <DataGrid
          rows={rows}
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
    </ThemeProvider>
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
  justify-content: space-between;
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
