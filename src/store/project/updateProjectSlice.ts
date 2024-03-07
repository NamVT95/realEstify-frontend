import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface ProjectState {
  projectId: number;
  isUpdateFormOpen: boolean;
  project: any;
}

const initialState: ProjectState = {
  projectId: 0,
  isUpdateFormOpen: false,
  project: {},
};

export const updateProjectSlice = createSlice({
  name: "updateProject",
  initialState,
  reducers: {
    openUpdateForm: (state, action) => {
      state.isUpdateFormOpen = true;
      state.projectId = action.payload.projectId;
    },
    closeUpdateForm: (state) => {
      state.isUpdateFormOpen = false;
      state.projectId = 0;
      state.project = {};
    },
    setProject: (state, action) => {
      state.project = action.payload.project;
    },
  },
});

export const { openUpdateForm, closeUpdateForm, setProject } =
  updateProjectSlice.actions;
export default updateProjectSlice.reducer;
