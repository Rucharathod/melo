// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useMood } from '../context/MoodContext';
import MoodPicker from '../MoodPicker';
import JournalEntryCard from '../JournalEntryCard';
import QuickActions from '../quickactions';
import QuoteWidget from '../QuoteWidget';

export default function Dashboard() {
  const { user } = useAuth();
  const { currentMood, setCurrentMood } = useMood();
  const router = useRouter();
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  // Mock data for recent entries
  useEffect(() => {
    setRecentEntries([
      { id: 1, date: new Date(), mood: 'happy', content: 'Had a great day today! Met with friends and had fun.' },
      { id: 2, date: new Date(Date.now() - 86400000), mood: 'calm', content: 'Meditated for 20 minutes. Feeling peaceful.' },
      { id: 3, date: new Date(Date.now() - 172800000), mood: 'sad', content: 'Feeling a bit down today. Need to practice self-care.' }
    ]);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">😊</div>
      <div className="floating-element element-2">😌</div>
      <div className="floating-element element-3">😴</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hi {user.displayName || 'User'}!
            </h1>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
          <button 
            onClick={() => router.push('/profile')}
            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
            ) : (
              <span className="text-lg">{user.displayName ? user.displayName.charAt(0) : 'U'}</span>
            )}
          </button>
        </div>

        <MoodPicker currentMood={currentMood} onSelect={setCurrentMood} />

        <QuickActions />

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Journal Entries</h2>
            <button 
              onClick={() => router.push('/journal')}
              className="text-purple-600 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentEntries.map(entry => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>

        <QuoteWidget />
      </div>
    </div>
  );
}