import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
  editStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await axios.get(`${url}/users`, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data, {
      position: "bottom-left",
    });
  }
});

export const userEdit = createAsyncThunk(
  "users/userEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/users/${values.user._id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data, {
        position: "bottom-left",
      });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [userDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      const newList = state.list.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newList;
      state.deleteStatus = "success";
      toast.error("User Deleted!", {
        position: "bottom-left",
      });
    },
    [userDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [userEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [userEdit.fulfilled]: (state, action) => {
      const updatedUser = state.list.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.list = updatedUser;
      state.editStatus = "success";
      toast.info("User Role Edited", {
        position: "bottom-left",
      });
    },
    [userEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export default usersSlice.reducer;
