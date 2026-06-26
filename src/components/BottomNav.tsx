import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: TabType; icon: string; label: string; hasBadge?: boolean; isFilled?: boolean }[] = [
    { id: 'missions', icon: 'explore', label: 'Missions' },
    { id: 'squads', icon: 'group', label: 'Squads' },
    { id: 'inbox', icon: 'notifications', label: 'Inbox', hasBadge: true, isFilled: true },
    { id: 'profile', icon: 'person_pin', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface/90 backdrop-blur-2xl border-t border-primary/20 flex justify-around items-center h-20 pb-safe px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all active:translate-y-[-2px] ${
              isActive
                ? 'text-secondary drop-shadow-[0_0_10px_rgba(0,222,233,0.5)]'
                : 'text-on-surface-variant opacity-60 hover:text-secondary/80'
            }`}
          >
            <div className="relative">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive || tab.isFilled ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              {tab.hasBadge && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface"></span>
              )}
            </div>
            <span className="font-label-md text-label-md">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
