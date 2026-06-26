import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ChallengeInvitationsScreen } from './screens/ChallengeInvitationsScreen';
import { TabType } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inbox');

  return (
    <div className="relative min-h-screen font-body-md bg-background text-on-surface pb-24">
      <Header />
      
      {currentTab === 'inbox' && <ChallengeInvitationsScreen />}
      
      {/* Placeholder for other tabs */}
      {currentTab !== 'inbox' && (
        <main className="pt-24 px-container-padding flex flex-col items-center justify-center min-h-[70vh]">
           <span className="material-symbols-outlined text-[64px] text-primary/30 mb-4 animate-pulse">
             satellite_alt
           </span>
           <h2 className="font-headline-md text-on-surface capitalize">{currentTab}</h2>
           <p className="font-body-md text-on-surface-variant text-center mt-2">
             Module offline. <br/> Connect to local node to access {currentTab} data.
           </p>
        </main>
      )}

      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}
