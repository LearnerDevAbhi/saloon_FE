import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AuthResponse, AuthUser } from './types';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const STORAGE_KEY = 'salon_auth';

const readPersistedState = (): AuthState => {
  if (typeof window === 'undefined') {
    return { user: null, accessToken: null, refreshToken: null };
  }
  try {
    const persisted = localStorage.getItem(STORAGE_KEY);
    if (persisted) {
      return JSON.parse(persisted) as AuthState;
    }
  } catch {
    // ignore parse errors
  }
  return { user: null, accessToken: null, refreshToken: null };
};

const writePersistedState = (state: AuthState) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (state.accessToken) {
    localStorage.setItem('salon_access', state.accessToken);
  } else {
    localStorage.removeItem('salon_access');
  }
  if (state.refreshToken) {
    localStorage.setItem('salon_refresh', state.refreshToken);
  } else {
    localStorage.removeItem('salon_refresh');
  }
};

const initialState: AuthState = readPersistedState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      writePersistedState(state);
    },
    updateUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      writePersistedState(state);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      writePersistedState(state);
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.accessToken);
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export default authSlice.reducer;

