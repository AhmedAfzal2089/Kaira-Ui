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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      {SUGGESTIONS.map((text, index) => (
        <button
          key={index}
          onClick={() => onSelect(text)}
          className="text-left p-3 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 hover:border-gray-600 transition-all text-sm text-gray-200"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default SuggestionPills;
