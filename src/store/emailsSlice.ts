import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Email {
  id: number;
  recipient: string;
  subject: string;
  message: string;
  sender: string;
}
interface AuthState {
  emails: Email[];
  currentUser: string;
  userId: number | null;
}

const initialState: AuthState = {
  emails: [],
  currentUser: "",
  userId: null,
};

const authSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload;
    },
    setCurrentUser(
      state,
      action: PayloadAction<{ currentUser: string; userId: number | null }>
    ) {
      state.currentUser = action.payload.currentUser;
      state.userId = action.payload.userId;
    },
  },
});

export const { setEmails, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
