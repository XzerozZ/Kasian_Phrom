import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import riskQuestions from './questions';
import WideBtn from '../components/WideBtn';
import RiskQuestion from '../components/RiskQuestion';
import HeadTitle from '../components/headTitle';

type Answer = {
  questionId: number;
  selectedOptions: string[];
  score: number;
};

interface RiskFormProps {
  setStateAssessed: (state: boolean) => void;
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}

const RiskForm: React.FC<RiskFormProps> = ({
  setActiveTab,
  setStateAssessed,
  isDarkMode,
  setStateNavbar,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const isComplete = answers.length === riskQuestions.length;

  const handleAnswer = (questionId: number, selectedOptions: string[]) => {
    const question = riskQuestions.find((q) => q.id === questionId);
    if (!question) return;

    // Calculate score
    const score = selectedOptions.reduce((acc, option) => {
      const optionIndex = question.options.indexOf(option);
      return acc + (optionIndex + 1); // Option 1 = 1 point, Option 2 = 2 points
    }, 0);

    setAnswers((prev) => {
      const updatedAnswers = prev.filter((a) => a.questionId !== questionId);
      return [...updatedAnswers, { questionId, selectedOptions, score }];
    });
  };

  const handleSubmit = () => {
    if (isComplete) {
      console.log('Submitting:', answers);
      // Total score
      const totalScore = answers.reduce((acc, answer) => acc + answer.score, 0);
      console.log('Total Score:', totalScore);

      setStateAssessed(true);
    } else {
      console.log('Form is not complete!');
    }
  };

  return (
    <>
      <HeadTitle
        isDarkMode={isDarkMode}
        setActiveTab={setActiveTab}
        setStateNavbar={setStateNavbar}
        title="แบบประเมินความเสี่ยง"
        route="finance"
      />
      <ScrollView
        className="flex-1 bg-neutral w-full"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-neutral2 p-3 pb-2 pt-5 rounded-3xl">
          {riskQuestions.map((q) => (
            <RiskQuestion
              key={q.id}
              riskQuestion={q}
              onAnswer={handleAnswer}
              isMultiSelect={q.id === 4} // multi-select for question 4
            />
          ))}
        </View>
        <WideBtn
          text="ประเมินความเสี่ยง"
          disabled={!isComplete}
          onPress={handleSubmit}
        />
      </ScrollView>
    </>
  );
};

export default RiskForm;
