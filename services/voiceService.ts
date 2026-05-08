import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, ENDPOINTS } from '@/constants/api';
import { ARIAResponse } from '@/types';

export const voiceService = {
  processAudio: async (audioUri: string, mimeType = 'audio/m4a'): Promise<ARIAResponse> => {
    const token = await SecureStore.getItemAsync('accessToken');

    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: mimeType,
      name: 'voice.m4a',
    } as unknown as Blob);

    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.voiceProcess}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token ?? ''}` },
      body: formData,
    });

    if (!res.ok) throw new Error('Voice processing failed');
    return res.json() as Promise<ARIAResponse>;
  },
};
