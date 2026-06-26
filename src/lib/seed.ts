import { collection, doc, setDoc, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Challenge } from '../types';

const INITIAL_CHALLENGES: Partial<Challenge>[] = [
  {
    type: 'versus',
    challengerName: 'Neon_Ghost',
    challengerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAm7HeUsaUQqLIt_EFhn5Ip8Ck7zBF5is2hoWzwgLs2NSYhi2O8FSqS14WiBb9jAX6MyzNoZJXhh4DwaXY8JnwCE_kc9pk9o0fQgRDOxdCsrujEttmEsHnqqMyIJ_PFXymwFXN2d_YOrBrYCnYGtnXmBR-h98LPvKCSiua7xvPrJQYUqnuNWpwh20-oMiUQyK_hCGxufbhOejW5TQUwkQIS8rtPhygnPwub85fMUjFVIb8D-6RIZBR6sRyxw38I4IwhCwu-sexI1Cpu',
    challengerRank: 'Cyber Oni',
    objective: 'Cyber-Temple Rooftop Infiltration',
    description: 'Meet me at the Temple Street gate. First to the roof wins the tech-cache.',
  },
  {
    type: 'coop',
    challengerName: 'J4D3_M4ST3R',
    challengerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI37yRRtGq14d6A2g4dBDgj4lMMmLlENWt8TgOkgCJAeYoyajmKv6mFBbrlMiZIZBOmhk43P04ke3V5eAWeWA5eW0sYNTx2_k2USSXzCjDGLiJMZ-tGjN-VpJza2IV6X-tfsvUlRsFceQysxot5d_hxVVVBhgkvMuLSni1FZ1dU0wDgG1A43ojYRg40KmBYIE5TeTwdys26n7VmfJsH9NLGY4V_xANy-3gmTRcZW7XTnnO3DQXuLpiLZgsI2dsDM47PK0msBU4t40T',
    challengerRank: 'Bamboo Guard',
    objective: 'Ancient Data-Scroll Retrieval',
    description: 'The digital archive in the Old District is leaking. Need a scout to watch my back.',
  },
  {
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

export async function seedChallengesIfNeeded(userId: string) {
  try {
    const challengesRef = collection(db, 'challenges');
    const q = query(challengesRef, where('recipientId', '==', userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      for (let i = 0; i < INITIAL_CHALLENGES.length; i++) {
        const item = INITIAL_CHALLENGES[i];
        const newDocRef = doc(challengesRef);
        await setDoc(newDocRef, {
          ...item,
          status: 'pending',
          recipientId: userId,
          challengerId: 'system_bot_' + i, // Dummy ID
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (err) {
    console.error("Failed to seed:", err);
  }
}
