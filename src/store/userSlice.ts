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
    console.log(process.env)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/login`, { email, password }, { withCredentials: true });
   const  user  =  res.data.user

    dispatch(setUser(user));
    return user;
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/register`, { name, email, password });
    return res.status;
  }
);
// userSlice.ts
export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async ({ email, otp }: { email: string; otp: string }, thunkAPI) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth/verify-otp`, {
    email,
    otp,    

    });
    if (response.status === 200) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue('OTP verification failed');
    }

  }
);

// export const signInWithGoogle = createAsyncThunk(
//   'user/signInWithGoogle',
//   async (credential: string, { dispatch }) => {
//     const res = await axios.post('http://192.168.1.8:5000/api/users/auth/google', { token: credential });
//     const user = res.data.user;

//     dispatch(setUser(user));
//     return user;
//   }
// );

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
