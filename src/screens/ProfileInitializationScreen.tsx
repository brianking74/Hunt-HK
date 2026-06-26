import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';

export const ProfileInitializationScreen: React.FC = () => {
  const { user, signOut } = useFirebase();
  const [alias, setAlias] = useState('');
  const [sector, setSector] = useState('Central District');
  const [specialization, setSpecialization] = useState('Scout (Urban Mobility)');
  const [loading, setLoading] = useState(false);

  const handleClose = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !alias.trim()) return;

    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        displayName: alias.trim(),
        sector,
        specialization,
        avatarUrl: user.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd19AMXxoZA6pRyBlfoHSddW3LH59SHAwba3UqUE65-mwEmm6JdvnQf4WqKmGx-gSok2Ss26rlCkl2RNRhDqsLlF_IRihfwQufmj3H4hzuzRHvsMUbAT2v0Ru5QdzmQcE8BpMvoJMs6HAwagztPxW-pmmt4IiaSgxZmlZPs0pV04u55TC2hXq5psf82cxQ8pOdVi6mGzlIFkUcioqJ5_g9ckkqM6GdFea2kP6pFJoimweWV7GlXSzgqe96m9XHeXqR-3_uAN1orNie',
        rank: 'Neon Rookie',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      // The context will automatically pick up the new userProfile
      // and redirect to the main app.
    } catch (error) {
      setLoading(false);
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}`, { currentUser: user });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] heritage-pattern bg-background text-on-surface overflow-y-auto selection:bg-primary-container selection:text-white">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 px-container-padding h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">fingerprint</span>
          <h1 className="font-display-lg text-[24px] tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(255,177,195,0.4)] whitespace-nowrap">
            AGENT INITIALIZATION
          </h1>
        </div>
        <button onClick={handleClose} type="button" className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="pt-24 pb-12 px-container-padding max-w-2xl mx-auto relative z-10">
        {/* Identity Scan Section */}
        <section className="mb-xl text-center">
          <div className="relative inline-block group">
            {/* Outer Ring */}
            <div className="absolute -inset-4 border border-secondary-container/30 rounded-full animate-spin-slow pointer-events-none"></div>
            
            {/* Profile Image Container */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-secondary-container bg-surface-container-high neon-border-cyan">
              <img 
                className="w-full h-full object-cover" 
                alt="Avatar" 
                src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCtR5biOS_-VWqo07zD34DX1YvGNNJ5GFiQMOJw4b4yRqZ7XzAmyMcIdhMskegspALcvc0DC6J0H7Oh8K7NyHYCFG5v38R3dJHzAo0xOuMLiLtQuc_9AfU_bP0S2ci64gsnR8SueyXx20fgoVnQiQb29EFjRlMMOrzWQlnm_EF9Scz3GDo2tega5cLdkj4YDTrMQzDzUtd6h58_Ww7TJpz4pl29hpIriN8_hZ9miwnPrmWkmEtlK_UkGeAJSzgbwoJZ2JoUk0B5qwhk"}
              />
              <div className="scanning-line"></div>
              <div className="absolute inset-0 bg-secondary-container/10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-secondary-container">refresh</span>
                <span className="font-label-caps text-xs text-secondary-container mt-2">RESYNC</span>
              </div>
            </div>
            
            {/* HUD Elements */}
            <div className="absolute -right-16 top-4 glass-card p-2 rounded-lg border border-secondary-container/50 hidden md:block floating">
              <p className="font-label-caps text-[10px] text-secondary-container">SCANNING IDENTITY...</p>
              <p className="font-label-caps text-[12px] text-white">MATCH 98.4%</p>
            </div>
          </div>
          
          <h2 className="font-headline-md text-[24px] mt-lg text-white font-bold uppercase">IDENTITY SCAN</h2>
          <p className="font-body-md text-on-surface-variant max-w-sm mx-auto mt-xs">
            Establish your visual presence in the HK Explorer database.
          </p>
        </section>

        {/* Avatar Selection Grid */}
        <div className="grid grid-cols-2 gap-md mb-xl">
          <button type="button" className="glass-card p-lg rounded-xl flex flex-col items-center gap-sm group hover:border-primary-container transition-all active:scale-95">
            <span className="material-symbols-outlined text-3xl text-primary-container group-hover:scale-110 transition-transform">cloud_upload</span>
            <span className="font-label-caps text-on-surface">Upload Bio-Data</span>
          </button>
          <button type="button" className="glass-card p-lg rounded-xl flex flex-col items-center gap-sm group hover:border-secondary-container transition-all active:scale-95">
            <span className="material-symbols-outlined text-3xl text-secondary-container group-hover:animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
            <span className="font-label-caps text-on-surface text-center">Generate Neural Link</span>
          </button>
        </div>

        {/* Dossier Form */}
        <form onSubmit={handleSubmit} className="space-y-lg glass-card p-xl rounded-2xl relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[120px] text-primary" style={{ fontVariationSettings: "'wght' 100" }}>description</span>
          </div>
          
          <div className="space-y-sm relative z-10">
            <label className="font-label-caps text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">alternate_email</span>
              Agent Alias
            </label>
            <div className="relative">
              <input 
                className="w-full bg-surface-container-highest/50 border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-white font-headline-md py-3 px-2 outline-none transition-all placeholder:text-on-surface-variant/30" 
                placeholder="e.g. MONGOOSE_7" 
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg relative z-10">
            <div className="space-y-sm">
              <label className="font-label-caps text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">location_on</span>
                Sector
              </label>
              <div className="relative">
                <select 
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-surface-container-highest/50 border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-white font-body-lg py-3 px-2 outline-none appearance-none transition-all"
                >
                  <option>Central District</option>
                  <option>Kowloon Walled City</option>
                  <option>Mong Kok High-Rise</option>
                  <option>Tsim Sha Tsui Waterfront</option>
                  <option>Lantau Outpost</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
            
            <div className="space-y-sm">
              <label className="font-label-caps text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">military_tech</span>
                Specialization
              </label>
              <div className="relative">
                <select 
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-surface-container-highest/50 border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-white font-body-lg py-3 px-2 outline-none appearance-none transition-all"
                >
                  <option>Scout (Urban Mobility)</option>
                  <option>Specialist (Tech-Heist)</option>
                  <option>Operative (Deep Cover)</option>
                  <option>Archivist (Heritage Hunter)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
          
          {/* Additional Dossier Data */}
          <div className="pt-md border-t border-outline-variant/20 flex flex-wrap gap-md relative z-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">BIOMETRICS STABLE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">HKG-NODE-72 ACTIVE</span>
            </div>
          </div>
        </form>

        {/* Primary Action Button */}
        <div className="mt-xl text-center">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-lg rounded-xl bg-primary-container text-on-primary-container font-headline-md text-xl neon-glow-pink hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">autorenew</span>
            ) : (
              <span className="material-symbols-outlined">bolt</span>
            )}
            {loading ? 'ENCRYPTING...' : 'INITIALIZE PROFILE'}
          </button>
          <p className="font-label-caps text-[11px] text-on-surface-variant/40 mt-lg tracking-widest leading-loose px-4">
            BY INITIALIZING, YOU ACCEPT ALL MISSION PROTOCOLS AND WAIVE PHYSICAL SAFETY LIABILITY.
          </p>
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-secondary-container/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
    </div>
  );
};
