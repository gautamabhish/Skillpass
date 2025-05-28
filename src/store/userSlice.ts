import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Certificate {
  id: string;
  title: string;
  url: string;
}

interface UserState {
  id: string;
  name: string;
  email: string;
  referralMoney: number;
  totalPoints: number;
  certificates: Certificate[];
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  referralMoney: 0,
  totalPoints: 0,
  certificates: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...action.payload };
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
