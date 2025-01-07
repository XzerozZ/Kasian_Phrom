import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextF from './TextF';

type RiskQuestionProps = {
  riskQuestion: {
    id: number;
    text: string;
    options: string[];
  };
  onAnswer: (questionId: number, answer: string) => void;
};

const RiskQuestion: React.FC<RiskQuestionProps> = ({ riskQuestion, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(riskQuestion.id, option);
  };

  return (
    <View className="mb-4">
      <TextF className="text-lg font-bold mb-2 mx-3">{riskQuestion.text}</TextF>
      {riskQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(option)}
          className={`p-4 border rounded-xl mb-2 mx-3 ${
            selectedOption === option
              ? 'bg-primary border-primary'
              : 'bg-neutral border-neutral2'
          }`}
        >
          <TextF
            className={`font-medium text-base ${
              selectedOption === option ? 'text-neutral' : 'text-primary'
            }`}
          >
            {option}
          </TextF>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RiskQuestion;
