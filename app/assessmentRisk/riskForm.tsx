import React, { useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import riskQuestions from './questions';
import RiskQuestion from '../components/RiskQuestion';
import HeadTitle from '../components/headTitle';
import TextF from '../components/TextF';

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

const ProgressBar: React.FC<{ currentPage: number; totalPages: number }> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <View className="flex-row justify-center my-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={index}
          className={`h-2 w-8 mx-1 rounded-full ${
            index < currentPage ? 'bg-primary' : 'bg-neutral2'
          }`}
        />
      ))}
    </View>
  );
};

const RiskForm: React.FC<RiskFormProps> = ({
  setActiveTab,
  setStateAssessed,
  isDarkMode,
  setStateNavbar,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);

  const questionsPerPage = [
    riskQuestions.slice(0, 3), // Page 1: 3 questions
    riskQuestions.slice(3, 6), // Page 2: 3 questions
    riskQuestions.slice(6),    // Page 3: 4 questions
  ];

  const handleAnswer = (questionId: number, selectedOptions: string[]) => {
    const question = riskQuestions.find((q) => q.id === questionId);
    if (!question) return;

    const score = selectedOptions.reduce((acc, option) => {
      const optionIndex = question.options.indexOf(option);
      return acc + (optionIndex + 1);
    }, 0);

    setAnswers((prev) => {
      const updatedAnswers = prev.filter((a) => a.questionId !== questionId);
      return [...updatedAnswers, { questionId, selectedOptions, score }];
    });
  };

  const getSavedAnswer = (questionId: number) => {
    const answer = answers.find((a) => a.questionId === questionId);
    return answer ? answer.selectedOptions : [];
  };

  const handleSubmit = () => {
    const isComplete = answers.length === riskQuestions.length;
    if (isComplete) {
      console.log('Submitting:', answers);
      const totalScore = answers.reduce((acc, answer) => acc + answer.score, 0);
      console.log('Total Score:', totalScore);
      setStateAssessed(true);
    } else {
      console.log('Form is not complete!');
    }
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const goToNextPage = () => {
    if (currentPage < questionsPerPage.length) {
      setCurrentPage((prev) => prev + 1);
      scrollToTop();
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToTop();
    }
  };

  const isPageComplete = questionsPerPage[currentPage - 1].every((q) =>
    answers.some((a) => a.questionId === q.id)
  );

  return (
    <>
      <HeadTitle
        setActiveTab={setActiveTab}
        title="แบบประเมินความเสี่ยง"
        onPress={() => setActiveTab('finance')}
      />
      <ProgressBar currentPage={currentPage} totalPages={questionsPerPage.length} />
      <ScrollView
        ref={scrollViewRef}
        id="RiskFormContainer"
        className="flex-1 bg-neutral w-full"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-neutral2 p-3 pb-2 pt-5 rounded-3xl">
          {questionsPerPage[currentPage - 1].map((q) => (
            <RiskQuestion
              key={q.id}
              riskQuestion={q}
              onAnswer={handleAnswer}
              isMultiSelect={q.id === 4} // multi-select for question 4
              savedOptions={getSavedAnswer(q.id)}
            />
          ))}
        </View>
        <View className="flex-row justify-between items-center gap-2 mx-2 mt-6 mb-16 px-4">
          {currentPage > 1 && (
            <TouchableOpacity
              id="RiskFormPrevBtn"
              onPress={goToPreviousPage}
              className="flex-1 h-14 bg-primary justify-center items-center px-6 py-3 rounded-lg"
            >
              <TextF className="text-neutral text-center font-medium">ย้อนกลับ</TextF>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            id="RiskFormNextBtn"
            onPress={() => {
              if (currentPage < questionsPerPage.length) {
                goToNextPage();
              } else {
                handleSubmit();
              }
            }}
            className={`flex-1 h-14 justify-center items-center px-6 py-3 rounded-lg ${
              isPageComplete ? 'bg-primary' : 'bg-label'
            }`}
            disabled={!isPageComplete}
          >
            <TextF
              className={`text-center font-medium text-neutral`}
            >
              {currentPage < questionsPerPage.length ? 'ถัดไป' : 'ประเมินความเสี่ยง'}
            </TextF>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default RiskForm;