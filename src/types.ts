export interface Task {
  id: string;
  title: string;
  status: 'new' | 'in-progress' | 'completed';
  category: string;
  xpReward: number;
}

export interface CompletedMission {
  id: string;
  title: string;
  stars: number;
  date: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  avatar: string;
  color: string;
  isUser?: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  xpCost: number;
  icon: string; // Type of icon/emoji representation
  category: 'hat' | 'potion' | 'badge' | 'theme';
  description: string;
}

export interface UserStats {
  name: string;
  avatar: string;
  title: string;
  xp: number;
  lessonsDone: number;
  activeTab: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
