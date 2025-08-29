// pages/insights.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';

export default function Insights() {
  const { user } = useAuth();
  const { moodHistory } = useMood();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('weekly');

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  // Mock data for charts
  const moodData = {
    weekly: [
      { day: 'Mon', mood: 4 },
      { day: 'Tue', mood: 3 },
      { day: 'Wed', mood: 5 },
      { day: 'Thu', mood: 2 },
      { day: 'Fri', mood: 4 },
      { day: 'Sat', mood: 5 },
      { day: 'Sun', mood: 4 }
    ],
    monthly: [
      { week: 'Week 1', mood: 4.2 },
      { week: 'Week 2', mood: 3.8 },
      { week: 'Week 3', mood: 4.5 },
      { week: 'Week 4', mood: 4.0 }
    ]
  };

  const emotionFrequency = [
    { emotion: 'Happy', value: 35, color: 'bg-green-400' },
    { emotion: 'Calm', value: 25, color: 'bg-blue-400' },
    { emotion: 'Neutral', value: 20, color: 'bg-gray-400' },
    { emotion: 'Anxious', value: 12, color: 'bg-yellow-400' },
    { emotion: 'Sad', value: 8, color: 'bg-indigo-400' }
  ];

  const recommendations = [
    {
      title: "Sleep Quality",
      description: "Your mood tends to be lower when you get less than 7 hours of sleep",
      icon: "😴",
      action: "Try going to bed 30 minutes earlier tonight"
    },
    {
      title: "Exercise",
      description: "You report higher mood on days when you exercise",
      icon: "🏃‍♂️",
      action: "Schedule a 20-minute walk for tomorrow"
    },
    {
      title: "Social Connection",
      description: "Your mood improves after social interactions",
      icon: "👥",
      action: "Message a friend to make plans this week"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">📊</div>
      <div className="floating-element element-2">📈</div>
      <div className="floating-element element-3">✨</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Insights</h1>
            <p className="text-gray-600">Understand your emotional patterns</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <span className="text-lg">📊</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex space-x-2 mb-4">
            {['weekly', 'monthly', 'all-time'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Mood Trends</h2>
            <div className="h-40 flex items-end space-x-2">
              {moodData[activeTab].map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-purple-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${item.mood * 15}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{item.day || item.week}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Emotion Frequency</h2>
            <div className="space-y-2">
              {emotionFrequency.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 flex items-center">
                    <span className="text-xl mr-2">{item.emotion === 'Happy' ? '😊' : 
                      item.emotion === 'Calm' ? '😌' : 
                      item.emotion === 'Neutral' ? '😐' : 
                      item.emotion === 'Anxious' ? '😰' : '😢'}</span>
                    <span className="text-sm font-medium">{item.emotion}</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 ml-2">
                    <div
                      className={`h-3 rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2 w-8">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Personalized Recommendations</h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl mr-3">{rec.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{rec.title}</h3>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                  <p className="text-sm text-purple-600 font-medium mt-1">{rec.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}