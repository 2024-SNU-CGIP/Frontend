import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    modelList: [],
    predictList: [],
    loading: false,
    error: null,
};

export const fetchModelList = createAsyncThunk('models/fetchModelList', async (data) => {
    try {
        const response = await axios.get('http://localhost:8000/train/train_results?page=' + data.currPage);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const predictModel = createAsyncThunk('models/predictModel', async ({ data }) => {
    try {
        const formData = new FormData();

        if (!data.lat) {
            console.log('LAT is not uploaded');
        }

        if (!data.U) {
            console.log('Upper is not uploaded');
        }

        if (!data.L) {
            console.log('Lower is not uploaded');
        }

        if (!data.name) {
            console.log('Name is not uploaded');
        }

        if (!data.birth) {
            console.log('Birth is not uploaded');
        }

        formData.append('xray', data.lat);
        formData.append('photo_U', data.U);
        formData.append('photo_L', data.L);
        formData.append('name', data.name);
        formData.append('birthdate', data.birth);

        const response = await axios.post('http://localhost:8000/predict/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const fetchPredictList = createAsyncThunk('models/fetchPredictList', async (data) => {
    try {
        const response = await axios.get('http://localhost:8000/predict/predict_results?page=' + data.currPage);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const startTraining = createAsyncThunk('models/startTraining', async () => {
    try {
        const response = await axios.get('http://localhost:8000/train/train');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const modelStat = createAsyncThunk('models/modelStat', async () => {
    try {
        const response = await axios.get('http://localhost:8000/stats/stats');
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const fetchPredictResultByTaskId = createAsyncThunk('models/fetchPredictResultByTaskId', async (data) => {
    try {
        const response = await axios.get('http://localhost:8000/predict/predict_result/' + data.predictnum);
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
        })
        .addCase(fetchPredictList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPredictList.fulfilled, (state, action) => {
            state.predictList = action.payload;
            state.loading = false;
        })
        .addCase(fetchPredictList.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(startTraining.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(startTraining.fulfilled, (state, action) => {
            state.modelList = action.payload;
            state.loading = false;
        })
        .addCase(startTraining.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(modelStat.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(modelStat.fulfilled, (state, action) => {
            state.modelList = action.payload;
            state.loading = false;
        })
        .addCase(modelStat.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default modelSlice.reducer;