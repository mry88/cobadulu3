import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userDelete, usersFetch } from "../../../slices/UsersSlice";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "../CommonStyled";

export default function UsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const rows =
    list &&
    list.map((user) => {
      return {
        id: user._id,
        uName: user.name,
        uEmail: user.email,
        uPhone: user.nohp,
        uAddress: user.address,
        isAdmin: user.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "uName", headerName: "Name", width: 150 },
    { field: "uEmail", headerName: "Email", width: 180 },
    { field: "uPhone", headerName: "Phone", width: 200 },
    { field: "uAddress", headerName: "Address", width: 200 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const usrId = params.row.id;
        return (
          <Actions>
            <button onClick={() => navigate(`edit-user/${usrId}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Role</button>
            {/* <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete> */}
            <button onClick={() => navigate(`/user/${params.row.id}`)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View</button>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: 400, width: "100%", marginTop: "4rem" }}>
        <DataGrid
          rows={rows ? rows : []}
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

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
