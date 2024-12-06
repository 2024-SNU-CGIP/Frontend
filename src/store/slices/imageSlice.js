import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currImageList: [],
    loading: false,
    error: null,
};

export const uploadImage = createAsyncThunk("images/upload", async ({ data }) => {
    try {
        const formData = new FormData();

        // check each files
        if (!data.lat) {
            console.log("LAT is not uploaded");
        }

        if (!data.U) {
            console.log("Upper is not uploaded");
        }

        if (!data.L) {
            console.log("Lower is not uploaded");
        }


        formData.append("xray", data.lat);
        formData.append("photo_U", data.U);
        formData.append("photo_L", data.L);

        const response = await axios.post(`http://localhost:8000/upload_data`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: {
                label: data.label,
            },
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const fetchImageByPatientId = createAsyncThunk("images/fetchByPatientId", async (patientId) => {
    try {
        const response = await axios.get(`http://localhost:8000/images/${patientId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const fetchImage = createAsyncThunk("images", async () => {
    try {
        const response = await axios.get("http://localhost:8000/images");
        console.log(response.data);
        return response.data.patient;
    } catch (error) {
        return error.response.data;
    }
});

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImageList: (state, action) => {
            state.currImages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(uploadImage.fulfilled, (state, action) => {
            state.currImages = action.payload;
            state.loading = false;
        })
        .addCase(uploadImage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(fetchImageByPatientId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchImageByPatientId.fulfilled, (state, action) => {
            state.currImages = action.payload;
            state.loading = false;
        })
        .addCase(fetchImageByPatientId.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(fetchImage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchImage.fulfilled, (state, action) => {
            state.currImages = action.payload;
            state.loading = false;
        })
        .addCase(fetchImage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default imageSlice.reducer;
