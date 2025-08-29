// components/MoodPicker.js
import { useState } from 'react';

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

export default function MoodPicker({ currentMood, onSelect }) {
  const [intensity, setIntensity] = useState(5);

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling?</h2>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {moods.map(mood => (
          <button
            key={mood.label}
            onClick={() => onSelect(mood)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              currentMood?.label === mood.label 
                ? `${mood.color} transform scale-105 border-2 border-purple-300` 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs text-gray-600">{mood.label}</span>
          </button>
        ))}
      </div>

      {currentMood && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Intensity: {intensity}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {currentMood && (
        <div className="flex space-x-3">
          <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md">
            Save Mood
          </button>
          <button className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors">
            Add Note
          </button>
        </div>
      )}
    </div>
  );
}