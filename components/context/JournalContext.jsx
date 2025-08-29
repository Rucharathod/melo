// context/JournalContext.js
import { createContext, useContext, useState } from 'react';

const JournalContext = createContext();

export function useJournal() {
  return useContext(JournalContext);
}

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      date: new Date(),
      ...entry
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const updateEntry = (id, updates) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const value = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}