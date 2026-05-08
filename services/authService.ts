import api from './api';
import { ENDPOINTS } from '@/constants/api';
import { LoginPayload, RegisterPayload, AuthTokens, User } from '@/types';

export const authService = {
  login: async (payload: LoginPayload): Promise<{ user: User; tokens: AuthTokens }> => {
    const res = await api.post(ENDPOINTS.login, payload);
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<{ user: User; tokens: AuthTokens }> => {
    const res = await api.post(ENDPOINTS.register, payload);
    return res.data;
  },

  getProfile: async (): Promise<User> => {
    const res = await api.get(ENDPOINTS.profile);
    return res.data;
  },
};
