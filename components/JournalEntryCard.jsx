// components/JournalEntryCard.js
import { format } from 'date-fns';

export default function JournalEntryCard({ entry }) {
  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    calm: '😌',
    anxious: '😰',
    tired: '😴',
    excited: '😄',
    neutral: '😐',
    down: '😔'
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-md">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{moodEmojis[entry.mood] || '📝'}</span>
          <div>
            <h3 className="font-medium text-gray-800 capitalize">{entry.mood}</h3>
            <p className="text-xs text-gray-500">{format(entry.date, 'MMM dd, yyyy')}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      <p className="text-gray-700 text-sm line-clamp-2">{entry.content}</p>
    </div>
  );
}