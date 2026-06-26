import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-container-padding h-16">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform">
          menu
        </span>
        <h1 className="font-headline-md text-headline-md-mobile tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(255,177,195,0.6)]">
          MISSION_HUB
        </h1>
      </div>
      <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
        <img
          className="w-full h-full object-cover"
          alt="User Avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd19AMXxoZA6pRyBlfoHSddW3LH59SHAwba3UqUE65-mwEmm6JdvnQf4WqKmGx-gSok2Ss26rlCkl2RNRhDqsLlF_IRihfwQufmj3H4hzuzRHvsMUbAT2v0Ru5QdzmQcE8BpMvoJMs6HAwagztPxW-pmmt4IiaSgxZmlZPs0pV04u55TC2hXq5psf82cxQ8pOdVi6mGzlIFkUcioqJ5_g9ckkqM6GdFea2kP6pFJoimweWV7GlXSzgqe96m9XHeXqR-3_uAN1orNie"
        />
      </div>
    </header>
  );
};
