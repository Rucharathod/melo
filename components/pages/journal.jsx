// pages/journal.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useJournal } from '../context/JournalContext';
import JournalEntryModal from '../components/JournalEntryModal';

export default function Journal() {
  const { user } = useAuth();
  const { entries } = useJournal();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const openEntryModal = (entry = null) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">📝</div>
      <div className="floating-element element-2">📔</div>
      <div className="floating-element element-3">✨</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Journal</h1>
            <p className="text-gray-600">Your personal thoughts and reflections</p>
          </div>
          <button 
            onClick={() => openEntryModal()}
            className="bg-purple-600 text-white p-3 rounded-full shadow-md hover:bg-purple-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No entries yet</h2>
            <p className="text-gray-500 mb-6">Start journaling to track your thoughts and emotions</p>
            <button 
              onClick={() => openEntryModal()}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md"
            >
              Create Your First Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {entries.map(entry => (
              <div 
                key={entry.id} 
                onClick={() => openEntryModal(entry)}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{entry.mood?.emoji || '📝'}</span>
                    <div>
                      <h3 className="font-medium text-gray-800 capitalize">{entry.mood?.label || 'Entry'}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">{entry.content}</p>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <JournalEntryModal 
            entry={selectedEntry}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}