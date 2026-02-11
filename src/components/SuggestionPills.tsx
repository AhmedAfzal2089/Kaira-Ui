import React from 'react';

interface SuggestionPillsProps {
  onSelect: (text: string) => void;
}

const SUGGESTIONS = [
  "How can I book a recovery session?",
  "What services does ALMATIQ offer?",
  "Tell me about the Focused Recovery session",
  "How does your technology work?"
];

const SuggestionPills: React.FC<SuggestionPillsProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-3xl mx-auto px-4">
      {SUGGESTIONS.map((text, index) => (
        <button
          key={index}
          onClick={() => onSelect(text)}
          className="text-left p-4 rounded-xl border border-gray-800 bg-[#1a1a1a] hover:bg-[#252525] hover:border-gray-700 transition-all text-sm text-gray-200 shadow-sm"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default SuggestionPills;
