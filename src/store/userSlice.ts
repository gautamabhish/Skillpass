import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

// --- Thunks ---

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    const res = await axios.post('http://192.168.1.7:5000/api/users/auth/login', { email, password }, { withCredentials: true });
    const user = res.data.user;

    dispatch(setUser(user));
    return user;
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const res = await axios.post('http://192.168.1.7:5000/api/users/auth/register', { name, email, password });
    return res.status;
  }
);

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithGoogle',
  async (credential: string, { dispatch }) => {
    const res = await axios.post('http://192.168.1.7:5000/api/users/auth/google', { token: credential });
    const user = res.data.user;

    dispatch(setUser(user));
    return user;
  }
);

// --- Slice ---

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
