export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskCategory = 'WORK' | 'PERSONAL' | 'HEALTH' | 'COMMUNICATION';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'SKIPPED';
export type TaskFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type SubscriptionPlan = 'FREE' | 'PRO' | 'BUSINESS';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
  plan: SubscriptionPlan;
  googleConnected: boolean;
  avatarUrl?: string;
}

export interface ARIATask {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  estimatedDuration: number;
  suggestedTime?: string;
  category: TaskCategory;
  requiresCalendarBlock: boolean;
  reminderMinutesBefore: number[];
}

export interface ApprovedTask extends ARIATask {
  status?: TaskStatus;
}

export interface Task extends ARIATask {
  status: TaskStatus;
  scheduledTime?: string;
  completedAt?: string;
  createdAt: string;
}

export interface RecurringTaskSuggestion {
  shouldAsk: boolean;
  question: string;
  tasksToAdd: string[];
}

export interface TaskConflict {
  taskTitle: string;
  conflictsWith: string;
  suggestion: string;
}

export interface ARIAResponse {
  transcript?: string;
  greeting: string | null;
  summary: string;
  tasks: ARIATask[];
  recurringTaskSuggestion: RecurringTaskSuggestion;
  clarifyingQuestion: string | null;
  conflicts: TaskConflict[];
  insights: string | null;
}

export interface CalendarEvent {
  eventId?: string;
  summary: string;
  start: string;
  end: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
