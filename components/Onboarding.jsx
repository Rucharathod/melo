// pages/onboarding.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Track Your Emotions",
      description: "Understand your feelings with our emotion tracker and insights",
      image: "📊",
      color: "bg-blue-100"
    },
    {
      title: "AI Support Chat",
      description: "Talk to Melo, your AI companion for emotional support",
      image: "🤖",
      color: "bg-purple-100"
    },
    {
      title: "Crisis Safety",
      description: "Get immediate help and support when you need it most",
      image: "🛡️",
      color: "bg-pink-100"
    },
    {
      title: "Personalized Insights",
      description: "Discover patterns and get recommendations for your wellbeing",
      image: "📈",
      color: "bg-green-100"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/auth/login');
    }
  };

  const skipOnboarding = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">😊</div>
      <div className="floating-element element-2">😌</div>
      <div className="floating-element element-3">😴</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-end mb-8">
          <button 
            onClick={skipOnboarding}
            className="text-purple-600 font-medium px-4 py-2 rounded-full hover:bg-purple-50 transition-colors"
          >
            Skip
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-full max-w-md mx-auto">
            <div className="h-64 mb-8 flex items-center justify-center">
              <div className={`w-56 h-56 rounded-full flex items-center justify-center text-6xl ${slides[currentSlide].color} transition-all duration-500`}>
                {slides[currentSlide].image}
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-gray-600 text-lg">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="flex justify-center space-x-2 mb-8">
              {slides.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}