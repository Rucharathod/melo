// pages/voice.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Voice() {
  const { user } = useAuth();
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, you would initialize voice recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, you would process the recorded audio here
    const newRecording = {
      id: Date.now(),
      date: new Date(),
      duration: '1:24', // Mock duration
      transcript: 'This is a mock transcript of what was said in the voice recording.'
    };
    setRecordings(prev => [newRecording, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">🎙️</div>
      <div className="floating-element element-2">🎧</div>
      <div className="floating-element element-3">✨</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Voice Journal</h1>
            <p className="text-gray-600">Speak your thoughts out loud</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <span className="text-lg">🎙️</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg mb-6 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              isRecording ? 'bg-red-400 animate-pulse' : 'bg-purple-200'
            }`}>
              <span className="text-4xl">🎤</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {isRecording ? 'Recording...' : 'Ready to record'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isRecording ? 'Speak now - your words are being recorded' : 'Press and hold to start recording'}
          </p>

          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`px-8 py-4 rounded-full font-medium text-white ${
              isRecording ? 'bg-red-500' : 'bg-purple-600 hover:bg-purple-700'
            } transition-colors`}
          >
            {isRecording ? 'Release to Stop' : 'Hold to Record'}
          </button>
        </div>

        {recordings.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Recordings</h2>
            <div className="space-y-4">
              {recordings.map(recording => (
                <div key={recording.id} className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {recording.date.toLocaleDateString()} • {recording.duration}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{recording.transcript}</p>
                  <div className="flex justify-between items-center mt-3">
                    <button className="text-purple-600 text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play
                    </button>
                    <button className="text-gray-600 text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Transcript
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}