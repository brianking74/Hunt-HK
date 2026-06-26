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
    <div className="fixed inset-0 z-[100] bg-background text-on-surface flex flex-col overflow-y-auto">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/seigaiha.png')]" />
      
      <header className="flex justify-between items-center p-md border-b border-white/5 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <button type="button" className="text-on-surface-variant hover:text-white transition-colors p-2 flex items-center justify-center">
          <span className="material-symbols-outlined">fingerprint</span>
        </button>
        <h1 className="font-headline-md text-primary tracking-widest text-lg uppercase glow-pink absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Agent Initialization</h1>
        <button onClick={handleClose} type="button" className="text-on-surface-variant hover:text-white transition-colors p-2 flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="flex-1 p-container-padding flex flex-col items-center max-w-md mx-auto w-full">
        
        {/* Profile Image Area */}
        <div className="mt-lg flex flex-col items-center text-center">
          <div className="relative w-48 h-48 rounded-full border border-secondary/30 flex items-center justify-center mb-6">
            <div className="w-44 h-44 rounded-full border-2 border-secondary shadow-[0_0_30px_rgba(0,222,233,0.4)] overflow-hidden">
              <img 
                src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuAm7HeUsaUQqLIt_EFhn5Ip8Ck7zBF5is2hoWzwgLs2NSYhi2O8FSqS14WiBb9jAX6MyzNoZJXhh4DwaXY8JnwCE_kc9pk9o0fQgRDOxdCsrujEttmEsHnqqMyIJ_PFXymwFXN2d_YOrBrYCnYGtnXmBR-h98LPvKCSiua7xvPrJQYUqnuNWpwh20-oMiUQyK_hCGxufbhOejW5TQUwkQIS8rtPhygnPwub85fMUjFVIb8D-6RIZBR6sRyxw38I4IwhCwu-sexI1Cpu"} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="font-headline-lg-mobile text-on-surface mb-2 tracking-wide uppercase font-bold text-[26px]">Identity Scan</h2>
          <p className="text-on-surface-variant text-[15px] font-body-md px-4 leading-relaxed">
            Establish your visual presence in the HK Explorer database.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
          <button type="button" className="glass-card bg-[#1a1a20]/80 rounded-xl p-5 flex flex-col items-center justify-center gap-3 border border-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-primary text-[28px]">cloud_upload</span>
            <span className="font-body-md text-sm text-center text-on-surface leading-tight">Upload Bio-<br/>Data</span>
          </button>
          <button type="button" className="glass-card bg-[#1a1a20]/80 rounded-xl p-5 flex flex-col items-center justify-center gap-3 border border-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-secondary text-[12px] animate-pulse">auto_awesome</span>
            <span className="font-body-md text-sm text-center text-on-surface leading-tight">Generate<br/>Neural Link</span>
          </button>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="w-full mt-6 flex flex-col gap-5 glass-card bg-[#1a1a20]/80 rounded-xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">description</span>
          </div>

          <div className="flex flex-col gap-2 relative z-10">
            <label className="text-on-surface-variant font-label-caps flex items-center gap-2 tracking-widest text-[11px]">
              <span className="material-symbols-outlined text-[16px]">alternate_email</span>
              Agent Alias
            </label>
            <input 
              type="text" 
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="e.g. MONGOOSE_7"
              className="bg-surface-container border border-white/5 focus:border-primary px-4 py-3.5 rounded-lg text-on-surface font-body-md outline-none transition-colors w-full"
              required
            />
          </div>

          <div className="flex flex-col gap-2 relative z-10">
            <label className="text-on-surface-variant font-label-caps flex items-center gap-2 tracking-widest text-[11px]">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              Sector
            </label>
            <div className="relative">
              <select 
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="bg-surface-container border border-white/5 focus:border-primary px-4 py-3.5 rounded-lg text-on-surface font-body-md outline-none appearance-none transition-colors w-full"
              >
                <option>Central District</option>
                <option>Kowloon Walled City</option>
                <option>Mong Kok Grid</option>
                <option>Sham Shui Po Market</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative z-10">
            <label className="text-on-surface-variant font-label-caps flex items-center gap-2 tracking-widest text-[11px]">
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
              Specialization
            </label>
            <div className="relative">
              <select 
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="bg-surface-container border border-white/5 focus:border-primary px-4 py-3.5 rounded-lg text-on-surface font-body-md outline-none appearance-none transition-colors w-full"
              >
                <option>Scout (Urban Mobility)</option>
                <option>Hacker (Data Retrieval)</option>
                <option>Enforcer (Combat Missions)</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex flex-col gap-3 mt-4 relative z-10">
            <div className="bg-surface-container-low inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#59de9b]"></span>
              <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider">BIOMETRICS STABLE</span>
            </div>
            <div className="bg-surface-container-low inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#00dbe9]"></span>
              <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider">HKG-NODE-72 ACTIVE</span>
            </div>
          </div>
        </form>

        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-primary text-on-primary font-label-caps py-4 rounded-xl uppercase tracking-widest glow-pink active:scale-95 transition-all flex items-center justify-center gap-2 font-bold text-[14px]"
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Initialize Profile
            </>
          )}
        </button>

        <p className="text-[10px] font-label-caps text-on-surface-variant/40 text-center mt-6 mb-10 uppercase tracking-widest leading-loose max-w-[300px]">
          By initializing, you accept all mission protocols and waive physical safety liability.
        </p>

      </main>
    </div>
  );
};
