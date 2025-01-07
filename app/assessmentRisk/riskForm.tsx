import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import  TextF  from '../components/TextF';
import BackBtn from '../components/BackBtn';
import riskQuestions from './questions';
import WideBtn from '../components/WideBtn';
import RiskQuestion from '../components/RiskQuestion';

type Answer = {
  questionId: number;
  answer: string;
};

interface RiskFormProps {
  setStateAssessed: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
}
const RiskForm: React.FC<RiskFormProps> = ({ setActiveTab, setStateAssessed }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const isComplete = answers.length === riskQuestions.length;

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => {
      const updatedAnswers = prev.filter((a) => a.questionId !== questionId);
      return [...updatedAnswers, { questionId, answer }];
    });
  };

  const handleSubmit = () => {
    if (isComplete) {
      console.log('Submitting:', answers);
      // ส่งข้อมูลไปยัง backend หรือดำเนินการอื่น
    } else {
      console.log('Form is not complete!');
    }
  };

  return (
    <ScrollView className='flex-1 bg-neutral w-full'>
      <View className='flex-row'>
        <BackBtn />
        <TextF className='text-2xl font-extrabold'>แบบประเมินความเสี่ยง</TextF>
      </View>
      <View className='bg-neutral2 p-3 pb-2 pt-5 rounded-3xl'>
        {riskQuestions.map((q) => (
          <RiskQuestion
            key={q.id}
            riskQuestion={q}
            onAnswer={handleAnswer}
          />
        ))}
      </View>
      <WideBtn
          text="ประเมินความเสี่ยง"
          disabled={!isComplete} // ปิดปุ่มถ้ายังกรอกไม่ครบ
          onPress={handleSubmit}
        />
    </ScrollView>
  )
}

export default RiskForm