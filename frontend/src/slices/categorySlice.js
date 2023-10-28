import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaders, url } from './api';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  catItems: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
};

export const categoryCreate = createAsyncThunk(
  "category/categoryCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/category`,
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

export const categoryFetch = createAsyncThunk(
  "category/categoryFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/category`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const categoryEdit = createAsyncThunk(
  "category/categoryEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/category/${values.category._id}`,
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

export const categoryDelete = createAsyncThunk(
  "category/categoryDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/category/${id}`,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response?.data, {
        position: "bottom-left",
      });
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [categoryFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [categoryFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.catItems = action.payload;
      state.status = "success";
    },
    [categoryFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [categoryCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [categoryCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Category Created!", {
        position: "bottom-left",
      });
    },
    [categoryCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [categoryEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
    [categoryDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [categoryDelete.fulfilled]: (state, action) => {
      if (action.payload) {
        const newList = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.success("Category Deleted!", {
          position: "bottom-left",
        });
      } else {
        toast.error("Category is Used", {
          position: "bottom-left",
        });
      }
    },
    [categoryDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [categoryEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [categoryEdit.fulfilled]: (state, action) => {
      if (action.payload) {
        const updatedCategory = state.items.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
        state.items = updatedCategory;
        state.editStatus = "success";
        toast.info("Category Edited", {
          position: "bottom-left",
        });
      } else {
        toast.error("Category is Used", {
          position: "bottom-left",
        });
      }
    },
  }
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;