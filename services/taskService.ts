import api from './api';
import { ENDPOINTS } from '@/constants/api';
import { ApprovedTask, ARIAResponse, Task } from '@/types';

export const taskService = {
  getTodayTasks: async (): Promise<Task[]> => {
    const res = await api.get(ENDPOINTS.tasksToday);
    return res.data;
  },

  getTasksByDate: async (date: string): Promise<Task[]> => {
    const res = await api.get(`${ENDPOINTS.tasksByDate}/${date}`);
    return res.data;
  },

  approveTasks: async (tasks: ApprovedTask[]): Promise<{ message: string }> => {
    const res = await api.post(ENDPOINTS.aiApprove, { tasks });
    return res.data;
  },

  clarify: async (
    originalTranscript: string,
    clarification: string,
    pendingTasks: ApprovedTask[]
  ): Promise<ARIAResponse> => {
    const res = await api.post(ENDPOINTS.aiClarify, {
      originalTranscript,
      clarification,
      pendingTasks,
    });
    return res.data;
  },
};
