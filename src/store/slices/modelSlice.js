import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    modelList: [],
    predictList: [],
    loading: false,
    error: null,
};

export const fetchModelList = createAsyncThunk('models/fetchModelList', async () => {
    try {
        const response = await axios.get('http://localhost:8000/models');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const predictModel = createAsyncThunk('models/predictModel', async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/predict', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

// TODO Fix it
export const fetchPredictList = createAsyncThunk('models/fetchPredictList', async () => {
    try {
        const response = await axios.get('http://localhost:8000/predict');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        setModelList: (state, action) => {
            state.modelList = action.payload;
        },
        setPredictList: (state, action) => {
            state.predictList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchModelList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchModelList.fulfilled, (state, action) => {
            state.modelList = action.payload;
            state.loading = false;
        })
        .addCase(fetchModelList.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(predictModel.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(predictModel.fulfilled, (state, action) => {
            state.predictList = action.payload;
            state.loading = false;
        })
        .addCase(predictModel.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default modelSlice.reducer;