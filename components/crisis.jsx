// pages/crisis.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Crisis() {
  const { user } = useAuth();
  const router = useRouter();
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const startBreathingExercise = () => {
    setShowBreathingExercise(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setBreathingProgress(progress);
      
      if (progress <= 40) {
        setBreathingPhase('inhale');
      } else if (progress <= 70) {
        setBreathingPhase('hold');
      } else if (progress <= 100) {
        setBreathingPhase('exhale');
      } else {
        clearInterval(interval);
        setBreathingProgress(0);
      }
    }, 100);
  };

  const callHelpline = () => {
    window.location.href = 'tel:988';
  };

  const messageContact = () => {
    // In a real app, this would open a messaging interface
    alert('This would open your messaging app to contact your trusted person');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">🛟</div>
      <div className="floating-element element-2">🤗</div>
      <div className="floating-element element-3">✨</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Crisis Support</h1>
            <p className="text-gray-600">Help is available when you need it</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <span className="text-lg">🛟</span>
          </div>
        </div>

        {showBreathingExercise ? (
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Breathing Exercise</h2>
            
            <div className="w-48 h-48 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <div 
                  className="w-full h-full rounded-full bg-purple-400 transition-all duration-100 absolute"
                  style={{ transform: `scale(${breathingPhase === 'inhale' ? breathingProgress/40 : 
                    breathingPhase === 'hold' ? 1 : 
                    1 - (breathingProgress-70)/30})` }}
                ></div>
                <div className="relative z-10 text-white text-lg font-medium">
                  {breathingPhase === 'inhale' && 'Breathe In'}
                  {breathingPhase === 'hold' && 'Hold'}
                  {breathingPhase === 'exhale' && 'Breathe Out'}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {breathingPhase === 'inhale' && 'Take a deep breath in for 4 seconds'}
              {breathingPhase === 'hold' && 'Hold your breath for 3 seconds'}
              {breathingPhase === 'exhale' && 'Slowly exhale for 6 seconds'}
            </p>

            <button
              onClick={() => setShowBreathingExercise(false)}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              I'm feeling better
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Immediate Support</h2>
              <p className="text-gray-600 mb-6">
                You're not alone. Help is available right now. Please reach out to:
              </p>

              <div className="space-y-4">
                <button
                  onClick={callHelpline}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <span className="text-2xl mr-2">📞</span>
                  Call Crisis Helpline (988)
                </button>

                <button
                  onClick={messageContact}
                  className="w-full bg-blue-500 text-white py-4 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <span className="text-2xl mr-2">💬</span>
                  Message Trusted Contact
                </button>

                <button
                  onClick={startBreathingExercise}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <span className="text-2xl mr-2">🌬️</span>
                  Start Breathing Exercise
                </button>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Grounding Techniques</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-medium text-gray-800 mb-2">5-4-3-2-1 Technique</h3>
                  <p className="text-sm text-gray-600">
                    Name 5 things you can see, 4 things you can touch, 3 things you can hear, 
                    2 things you can smell, and 1 thing you can taste.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-medium text-gray-800 mb-2">Body Scan</h3>
                  <p className="text-sm text-gray-600">
                    Slowly bring your attention to each part of your body, from your toes to the top of your head.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-medium text-gray-800 mb-2">Safe Place Visualization</h3>
                  <p className="text-sm text-gray-600">
                    Imagine yourself in a calm, safe place. Engage all your senses in this visualization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}