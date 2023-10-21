import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaders, url } from './api';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  items2: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
};

export const featuresCreate = createAsyncThunk(
  "features/featuresCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/features`,
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

export const featuresFetch = createAsyncThunk(
  "features/featuresFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/features`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const featuresEdit = createAsyncThunk(
  "features/featuresEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/features/${values.features._id}`,
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

export const featuresDelete = createAsyncThunk(
  "features/featuresDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/features/${id}`,
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

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: {
    [featuresFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [featuresFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.items2 = action.payload;
      state.status = "success";
    },
    [featuresFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [featuresCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [featuresCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Feature Created!", {
        position: "bottom-left",
      });
    },
    [featuresCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [featuresDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [featuresDelete.fulfilled]: (state, action) => {
      if (action.payload) {
        const newList = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.success("Feature Deleted!", {
          position: "bottom-left",
        });
      } else {
        toast.error("Feature is Used", {
          position: "bottom-left",
        });
      }
    },
    [featuresDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [featuresEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [featuresEdit.fulfilled]: (state, action) => {
      if (action.payload) {
        const updatedFeatures = state.items.map((features) =>
          features._id === action.payload._id ? action.payload : features
        );
        state.items = updatedFeatures;
        state.editStatus = "success";
        toast.info("Feature Edited", {
          position: "bottom-left",
        });
      } else {
        toast.error("Feature is Used", {
          position: "bottom-left",
        });
      }
    },
    [featuresEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export const { addFeature } = featuresSlice.actions;
export default featuresSlice.reducer;