export type Mood = 'happy' | 'sensitive' | 'tired' | 'calm' | 'annoyed';

export interface Cycle {
  id: string;
  startDate: string;
  endDate?: string;
  isPrediction: boolean;
}

export interface MoodLog {
  date: string;
  mood: Mood;
  note?: string;
}

export type AppTheme = 'luna' | 'rose' | 'sky' | 'forest' | 'night';

export interface UserSettings {
  name?: string;
  age?: number;
  tonePreference?: 'fun' | 'calm';
  theme: AppTheme;
  schoolMode: boolean;
  reminderInterval: number; // in hours
  nextReminderTime?: string;
  onboardingComplete: boolean;
}
