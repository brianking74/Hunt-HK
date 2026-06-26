import React, { useState } from 'react';
import { Challenge } from '../types';
import { ChallengeCard } from '../components/ChallengeCard';

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: '1',
    type: 'versus',
    challengerName: 'Neon_Ghost',
    challengerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAm7HeUsaUQqLIt_EFhn5Ip8Ck7zBF5is2hoWzwgLs2NSYhi2O8FSqS14WiBb9jAX6MyzNoZJXhh4DwaXY8JnwCE_kc9pk9o0fQgRDOxdCsrujEttmEsHnqqMyIJ_PFXymwFXN2d_YOrBrYCnYGtnXmBR-h98LPvKCSiua7xvPrJQYUqnuNWpwh20-oMiUQyK_hCGxufbhOejW5TQUwkQIS8rtPhygnPwub85fMUjFVIb8D-6RIZBR6sRyxw38I4IwhCwu-sexI1Cpu',
    challengerRank: 'Cyber Oni',
    objective: 'Cyber-Temple Rooftop Infiltration',
    description: 'Meet me at the Temple Street gate. First to the roof wins the tech-cache.',
  },
  {
    id: '2',
    type: 'coop',
    challengerName: 'J4D3_M4ST3R',
    challengerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI37yRRtGq14d6A2g4dBDgj4lMMmLlENWt8TgOkgCJAeYoyajmKv6mFBbrlMiZIZBOmhk43P04ke3V5eAWeWA5eW0sYNTx2_k2USSXzCjDGLiJMZ-tGjN-VpJza2IV6X-tfsvUlRsFceQysxot5d_hxVVVBhgkvMuLSni1FZ1dU0wDgG1A43ojYRg40KmBYIE5TeTwdys26n7VmfJsH9NLGY4V_xANy-3gmTRcZW7XTnnO3DQXuLpiLZgsI2dsDM47PK0msBU4t40T',
    challengerRank: 'Bamboo Guard',
    objective: 'Ancient Data-Scroll Retrieval',
    description: 'The digital archive in the Old District is leaking. Need a scout to watch my back.',
  },
  {
    id: '3',
    type: 'event',
    challengerName: 'Echo_Protocol',
    challengerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbi-q2K9942L2F7cBDXzSJiL-VMKcfepcgcAcr-QgSFzx4JtjgbgPXXe6gaLS_B9SVDh4AlHi2KGq9sE7tBUwtL5tU63ODncQz4_LXNjSTr7k5LOVptSwkHhGJhboVUmjsb614MLTLatCzAy9D0VjGlfdsKRJ3WVou1kq-WTLm0dB0dJjNJFmElvJJuVoIULT-MP7zcnQXftJuwe-eFyVXnEiXmLEqJNsJE5LtxsQWQV6LLstgIK8T9gjmjucLu6SrRM42UAlbo1Hf',
    challengerRank: 'Neon Legend',
    objective: 'The Kowloon Gate Race',
    reward: '5,000 Credits',
    difficulty: 'HARD',
    isLive: true,
  },
];

export const ChallengeInvitationsScreen: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

  const handleDecline = (id: string) => {
    setChallenges((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="pt-24 px-container-padding pb-32">
      {/* Animated Background Element */}
      <div className="fixed inset-0 -z-10 opacity-30" />

      {/* Section Title */}
      <div className="mb-lg">
        <div className="flex items-center gap-2 mb-unit">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#00dbe9]"></span>
          <span className="font-label-caps text-label-caps text-secondary uppercase">
            Incoming Comms
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Challenge Invitations
        </h2>
      </div>

      {/* Inbox Grid */}
      <div className="grid grid-cols-1 gap-md">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} onDecline={handleDecline} />
          ))
        ) : (
          <div className="glass-card p-xl rounded-xl text-center flex flex-col items-center justify-center gap-4 py-20">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/50">
              inbox
            </span>
            <p className="font-body-md text-on-surface-variant">No incoming comms right now.</p>
          </div>
        )}
      </div>
    </main>
  );
};
