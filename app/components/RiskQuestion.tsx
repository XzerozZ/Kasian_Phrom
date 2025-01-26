import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextF from './TextF';

type RiskQuestionProps = {
  riskQuestion: {
    id: number;
    text: string;
    options: string[];
  };
  onAnswer: (questionId: number, selectedOptions: string[]) => void;
  isMultiSelect: boolean;
};

const RiskQuestion: React.FC<RiskQuestionProps> = ({
  riskQuestion,
  onAnswer,
  isMultiSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelectedOptions((prev) => {
      if (isMultiSelect) {
        // multi-select
        if (prev.includes(option)) {
          const updatedOptions = prev.filter((o) => o !== option);
          onAnswer(riskQuestion.id, updatedOptions);
          return updatedOptions;
        } else {
          const updatedOptions = [...prev, option];
          onAnswer(riskQuestion.id, updatedOptions);
          return updatedOptions;
        }
      } else {
        // one option
        const updatedOptions = [option];
        onAnswer(riskQuestion.id, updatedOptions);
        return updatedOptions;
      }
    });
  };

  return (
    <View 
    id='RiskQuestionContainer'
    className="mb-4">
      <TextF className="text-lg font-bold mb-2 mx-3">{riskQuestion.text}</TextF>
      {riskQuestion.options.map((option, index) => (
        <TouchableOpacity
          id='RiskQuestionOption'
          key={index}
          onPress={() => handleSelect(option)}
          className={`p-4 border rounded-xl mb-2 mx-3 ${
            selectedOptions.includes(option)
              ? 'bg-primary border-primary'
              : 'bg-neutral border-neutral2'
          }`}
        >
          <TextF
            className={`font-medium text-base ${
              selectedOptions.includes(option) ? 'text-neutral' : 'text-primary'
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
