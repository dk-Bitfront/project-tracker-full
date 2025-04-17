import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios'; // 

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/projects');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const addProject = createAsyncThunk(
  'project/addProject',
  async (projectData, thunkAPI) => {
    try {
      const res = await api.post('/projects', projectData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId, thunkAPI) => {
    try {
      await api.delete(`/projects/${projectId}`);
      return projectId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete project');
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
