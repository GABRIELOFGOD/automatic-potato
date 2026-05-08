import { create } from 'zustand';
import { ARIATask, ARIAResponse, Task } from '@/types';

interface TaskState {
  ariaResponse: ARIAResponse | null;
  pendingTasks: ARIATask[];
  todayTasks: Task[];
  isProcessing: boolean;
  transcript: string;
  setAriaResponse: (response: ARIAResponse) => void;
  setPendingTasks: (tasks: ARIATask[]) => void;
  setTodayTasks: (tasks: Task[]) => void;
  setIsProcessing: (val: boolean) => void;
  setTranscript: (val: string) => void;
  updatePendingTask: (id: string, updates: Partial<ARIATask>) => void;
  removePendingTask: (id: string) => void;
  clearPending: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  ariaResponse: null,
  pendingTasks: [],
  todayTasks: [],
  isProcessing: false,
  transcript: '',

  setAriaResponse: (response) =>
    set({ ariaResponse: response, pendingTasks: response.tasks }),

  setPendingTasks: (tasks) => set({ pendingTasks: tasks }),
  setTodayTasks: (tasks) => set({ todayTasks: tasks }),
  setIsProcessing: (val) => set({ isProcessing: val }),
  setTranscript: (val) => set({ transcript: val }),

  updatePendingTask: (id, updates) =>
    set((state) => ({
      pendingTasks: state.pendingTasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  removePendingTask: (id) =>
    set((state) => ({
      pendingTasks: state.pendingTasks.filter((t) => t.id !== id),
    })),

  clearPending: () => set({ ariaResponse: null, pendingTasks: [], transcript: '' }),
}));
