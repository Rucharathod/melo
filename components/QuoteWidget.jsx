// components/QuoteWidget.js
export default function QuoteWidget() {
  const quotes = [
    "The only journey is the journey within. - Rainer Maria Rilke",
    "You yourself, as much as anybody in the entire universe, deserve your love and affection. - Buddha",
    "Mental health is not a destination, but a process. It's about how you drive, not where you're going. - Noam Shpancer",
    "What mental health needs is more sunlight, more candor, and more unashamed conversation. - Glenn Close",
    "Your present circumstances don't determine where you can go; they merely determine where you start. - Nido Qubein"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-5 mt-6 shadow-lg">
      <div className="text-lg font-medium mb-2">Daily Inspiration</div>
      <p className="text-sm">"{randomQuote}"</p>
    </div>
  );
}