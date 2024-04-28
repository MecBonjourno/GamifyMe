export interface Habit {
  _id: string;
  name: string;
  category: HabitCategory;
  type: HabitType;
  milestonesIds: string[];  // Array of milestone IDs
  userId: string;          // User ID
  logsIds: string[];
  targetFrequency: Frequencies;
  habitTriggerCron?: string;
  habitLastTriggeredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum Frequencies {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly'
}

export enum HabitType {
  good = 'good',
  bad = 'bad'
}

export enum HabitCategory {
  Health = 'Health',
  Professional = 'Professional',
  Fitness = 'Fitness',
  Productivity = 'Productivity',
  Learning = 'Learning',
  Social = 'Social',
  Other = 'Other'
}

export interface HabitLog {
  _id: string;
  habitId: string;
  date: Date;
  status: HabitLogStatus;
  quantity?: number;
  expected?: number;
}

export enum HabitLogStatus {
  Completed = 'Completed',
  Overachieved = 'Overachieved',
  InProgress = 'In Progress',
  Partial = 'Partial',
  Failed = 'Failed',
}

export interface Achievement {
  _id: string;
  name: string;
  description: string;
  type: AchievementType;
  imageUrl?: string;
  habitId?: string;
  endDate?: Date;
}

export interface AchievementLog {
  _id: string;
  achievementId: string;
  date: Date;
  complete: boolean;
}

export enum AchievementType {
  Repeatable = 'Repeatable',
  OneTime = 'OneTime'
}
