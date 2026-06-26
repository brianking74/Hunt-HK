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
      <div className="min-h-screen font-body-md bg-background text-on-surface flex flex-col items-center justify-center px-container-padding relative z-10 overflow-hidden heritage-pattern">
        
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] -translate-y-20 translate-x-20" />
        </div>
        
        <div className="flex flex-col items-center w-full max-w-[320px]">
          <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center mb-8 relative glass-card">
            <div className="absolute inset-0 rounded-full border border-primary/50 animate-spin-slow border-t-transparent" />
            <span className="material-symbols-outlined text-primary text-[48px] neon-glow-pink">explore</span>
          </div>

          <h1 className="font-display-lg text-[48px] text-primary text-center mb-4 tracking-tight drop-shadow-[0_0_12px_rgba(255,177,195,0.8)] leading-[1.1]">
            HK Explorer
          </h1>
          
          <div className="glass-card w-full p-8 rounded-2xl border border-white/10 mb-10 mt-2 relative">
            <div className="scanning-line" />
            <p className="font-body-lg text-on-surface-variant text-center leading-relaxed">
              Join the urban adventure. <br/> Discover hidden neon truths.
            </p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full py-lg rounded-xl bg-primary-container text-on-primary-container font-headline-md text-xl neon-glow-pink hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase font-bold tracking-widest"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
            Access Node
          </button>
          
          <p className="text-[11px] font-label-caps text-on-surface-variant/40 text-center mt-8 uppercase tracking-widest">
            Secure connection required
          </p>
        </div>
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

