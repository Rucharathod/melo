// pages/profile.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, logout, updateUserProfile } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('I love using Melo to track my emotions and improve my mental wellbeing!');
  const [saving, setSaving] = useState(false);

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateUserProfile({ displayName });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">👤</div>
      <div className="floating-element element-2">⚙️</div>
      <div className="floating-element element-3">✨</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <button 
            onClick={handleLogout}
            className="text-red-600 text-sm font-medium"
          >
            Logout
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-3xl text-purple-600 mb-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full" />
              ) : (
                <span>{user.displayName ? user.displayName.charAt(0) : 'U'}</span>
              )}
            </div>
            
            {editing ? (
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="text-xl font-bold text-center bg-gray-100 rounded-lg px-3 py-1 mb-2"
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-800">{user.displayName || 'User'}</h2>
            )}
            
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Bio</h3>
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-gray-100 rounded-lg p-3 text-sm"
                rows={3}
              />
            ) : (
              <p className="text-gray-700 text-sm">{bio}</p>
            )}
          </div>

          <div className="flex space-x-3">
            {editing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Dark Mode</h3>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-600">Daily reminders and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Privacy Lock</h3>
                <p className="text-sm text-gray-600">Require PIN to open app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">About Melo</h2>
          <p className="text-sm text-gray-600 mb-4">
            Melo is a mental health & emotional well-being app designed for young adults to track emotions, 
            journal thoughts, and receive AI-powered support.
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Created by:</p>
            <p>Rucha Rathod & Arya Shinde</p>
            <p className="mt-2">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}