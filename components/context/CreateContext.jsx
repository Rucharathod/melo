// context/MoodContext.js
import { createContext, useContext, useState } from 'react';

const MoodContext = createContext();

export function useMood() {
  return useContext(MoodContext);
}

export function MoodProvider({ children }) {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const addMoodToHistory = (mood) => {
    const newEntry = {
      ...mood,
      timestamp: new Date(),
      intensity: 5 // Default intensity
    };
    setMoodHistory(prev => [newEntry, ...prev]);
  };

  const value = {
    currentMood,
    setCurrentMood,
    moodHistory,
    addMoodToHistory
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
}