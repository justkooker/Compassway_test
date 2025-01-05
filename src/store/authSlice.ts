import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthentificated") || "false"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state,  action: PayloadAction<{ isAuthenticated: boolean }>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout(state,  action: PayloadAction<{ isAuthenticated: boolean }>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
