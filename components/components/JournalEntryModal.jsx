// components/JournalEntryModal.js
import { useState, useEffect } from 'react';
import { useJournal } from '../context/JournalContext';
import { useMood } from '../context/MoodContext';

const moods = [
  { emoji: '😢', label: 'Sad', color: 'bg-blue-100' },
  { emoji: '😔', label: 'Down', color: 'bg-indigo-100' },
  { emoji: '😐', label: 'Neutral', color: 'bg-gray-100' },
  { emoji: '🙂', label: 'Okay', color: 'bg-yellow-100' },
  { emoji: '😊', label: 'Happy', color: 'bg-green-100' },
  { emoji: '😄', label: 'Excited', color: 'bg-orange-100' },
  { emoji: '😌', label: 'Calm', color: 'bg-purple-100' },
  { emoji: '😴', label: 'Tired', color: 'bg-blue-100' },
  { emoji: '😰', label: 'Anxious', color: 'bg-red-100' },
];

export default function JournalEntryModal({ entry, onClose }) {
  const { addEntry, updateEntry } = useJournal();
  const { currentMood, setCurrentMood } = useMood();
  const [selectedMood, setSelectedMood] = useState(entry?.mood || currentMood || null);
  const [content, setContent] = useState(entry?.content || '');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (currentMood && !entry) {
      setSelectedMood(currentMood);
    }
  }, [currentMood, entry]);

  const handleSave = () => {
    if (content.trim() === '') return;

    const entryData = {
      mood: selectedMood,
      content: content.trim(),
      date: entry?.date || new Date()
    };

    if (entry) {
      updateEntry(entry.id, entryData);
    } else {
      addEntry(entryData);
    }

    onClose();
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, you would initialize voice recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, you would process the recorded audio here
    // For now, we'll simulate a voice-to-text conversion
    const simulatedVoiceText = "Today was a good day. I felt productive and connected with friends.";
    setContent(prev => prev + (prev ? ' ' : '') + simulatedVoiceText);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {entry ? 'Edit Entry' : 'New Journal Entry'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">How are you feeling?</h3>
            <div className="grid grid-cols-5 gap-2">
              {moods.map(mood => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                    selectedMood?.label === mood.label 
                      ? `${mood.color} transform scale-105 border-2 border-purple-300` 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.emoji}</span>
                  <span className="text-xs text-gray-600">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Your thoughts
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write about your day, your feelings, or anything on your mind..."
              className="w-full h-40 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 mb-6">
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`flex-1 flex items-center justify-center py-3 rounded-xl ${
                isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              {isRecording ? 'Recording...' : 'Voice Note'}
            </button>
            <button className="flex-1 flex items-center justify-center py-3 bg-gray-100 text-gray-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add Photo
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={content.trim() === ''}
              className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}