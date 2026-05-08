export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';

export const ENDPOINTS = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  googleAuth: '/auth/google',
  refreshToken: '/auth/refresh',

  // Voice & AI
  voiceProcess: '/voice/process',
  aiApprove: '/ai-orchestrator/approve',
  aiClarify: '/ai-orchestrator/clarify',

  // Tasks
  tasksToday: '/tasks/today',
  tasksByDate: '/tasks/date',
  tasksApprove: '/ai-orchestrator/approve',

  // Calendar
  calendarEvents: '/calendar/events',
  calendarCreate: '/calendar/events/create',

  // User
  profile: '/users/profile',
  updateProfile: '/users/profile',
} as const;
