import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ordersEdit, ordersFetch } from "../../../slices/ordersSlice";
import moment from "moment";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "../CommonStyled";

export default function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(ordersFetch());
    console.log(list);
  }, [dispatch]);

  const rows = list && list.map((order) => {
    // Initialize an empty array to store feature names
    const featureNames = [];

    // Loop through the first layer (array)
    order.selectedFeatures.forEach((innerArray) => {
      // Loop through the second layer (objects)
      innerArray.forEach((feature) => {
        if (feature.name) {
          featureNames.push(feature.name);
        }
      });
    });

    // Join the feature names with a comma
    const featureNamesString = featureNames.join(', ');

    return {
      id: order._id,
      oUser: order.userId,
      oUserEmail: order.userEmail,
      oProduct: order.products,
      oFeatures: featureNamesString,
      oTotal: order.total.toLocaleString(),
      oStatus: order.payment_status,
    };
  });

  const columns = [
    { field: "id", headerName: "ID Order", width: 160 },
    { field: "oUser", headerName: "ID User", width: 220 },
    { field: "oUserEmail", headerName: "Email", width: 120 },
    { field: "oProduct", headerName: "Product Name", width: 150 },
    { field: "oFeatures", headerName: "Features", width: 200 },
    { field: "oTotal", headerName: "Total (Rp.)", width: 120 },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };

  const handleDeliver = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: 400, width: "100%", marginTop: "6rem" }}>
        <DataGrid
          rows={rows ? rows : []}
          columns={columns}
          pageSize={10}
          className=""
          sx={{
            backgroundColor: '#0f1418', 
            color: '#fff',
            '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
              borderColor: '#555',
            }
          }}
          rowsPerPageOptions={[10]}
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
// `;

// const DispatchBtn = styled.button`
//   background-color: rgb(38, 198, 249);
// `;
// const DeliveryBtn = styled.button`
//   background-color: rgb(102, 108, 255);
// `;
// const View = styled.button`
//   background-color: rgb(114, 225, 40);
// `;

// const Pending = styled.div`
//   color: rgb(253, 181, 40);
//   background: rgb(253, 181, 40, 0.12);
//   padding: 3px 5px;
//   border-radius: 3px;
//   font-size: 14px;
// `;
// const Dispatched = styled.div`
//   color: rgb(38, 198, 249);
//   background-color: rgb(38, 198, 249, 0.12);
//   padding: 3px 5px;
//   border-radius: 3px;
//   font-size: 14px;
// `;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;