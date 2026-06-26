import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ChallengeInvitationsScreen } from './screens/ChallengeInvitationsScreen';
import { ProfileInitializationScreen } from './screens/ProfileInitializationScreen';
import { TabType } from './types';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('inbox');
  const { user, userProfile, loading, signInWithGoogle } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen font-body-md bg-background text-on-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary animate-spin text-[48px]">sync</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen font-body-md bg-background text-on-surface flex flex-col items-center justify-center px-container-padding relative z-10">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <span className="material-symbols-outlined text-primary text-[64px] mb-6 glow-pink">explore</span>
        <h1 className="font-headline-lg text-primary text-center mb-2 drop-shadow-[0_0_8px_rgba(255,177,195,0.6)]">HK Explorer</h1>
        <p className="font-body-md text-on-surface-variant text-center mb-8 max-w-sm">
          Join the urban adventure. Discover hidden neon truths.
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-primary text-on-primary font-label-caps py-4 px-8 rounded-lg uppercase tracking-widest glow-pink active:scale-95 transition-all w-full max-w-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  // If user is authenticated but has no profile document, show Initialization
  if (!userProfile) {
    return <ProfileInitializationScreen />;
  }

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

export default function App() {
  return (
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  );
}

