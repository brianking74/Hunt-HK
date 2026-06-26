export type TabType = 'missions' | 'squads' | 'inbox' | 'profile';

export interface Challenge {
  id: string;
  type: 'versus' | 'coop' | 'event';
  challengerName: string;
  challengerAvatar: string;
  challengerRank: string;
  objective: string;
  description?: string;
  reward?: string;
  difficulty?: 'HARD' | 'NORMAL' | 'EASY';
  isLive?: boolean;
}
