import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Challenge } from '../types';
import { ChallengeCard } from '../components/ChallengeCard';
import { db } from '../lib/firebase';
import { useFirebase } from '../contexts/FirebaseContext';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import { seedChallengesIfNeeded } from '../lib/seed';

export const ChallengeInvitationsScreen: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { user } = useFirebase();

  useEffect(() => {
    if (!user) return;

    // Seed dummy data if needed
    seedChallengesIfNeeded(user.uid);

    const q = query(
      collection(db, 'challenges'),
      where('recipientId', '==', user.uid),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: Challenge[] = [];
      snapshot.forEach((docSnap) => {
        docs.push({ id: docSnap.id, ...docSnap.data() } as Challenge);
      });
      // Sort in memory to avoid needing a composite index immediately
      docs.sort((a, b) => {
        if (a.type === 'event') return -1;
        if (b.type === 'event') return 1;
        return 0;
      });
      setChallenges(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'challenges', { currentUser: user });
    });

    return () => unsubscribe();
  }, [user]);

  const handleDecline = async (id: string) => {
    if (!user) return;
    try {
      const challengeRef = doc(db, 'challenges', id);
      await updateDoc(challengeRef, {
        status: 'declined',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `challenges/${id}`, { currentUser: user });
    }
  };

  const handleAccept = async (id: string) => {
    if (!user) return;
    try {
      const challengeRef = doc(db, 'challenges', id);
      await updateDoc(challengeRef, {
        status: 'accepted',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `challenges/${id}`, { currentUser: user });
    }
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
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              onDecline={handleDecline}
              onAccept={handleAccept}
            />
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
