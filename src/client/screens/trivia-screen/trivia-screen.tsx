"use client";

import {useEffect, useState} from "react";
import {QuestionCard} from "@/client/components/question-card";
import {ResultsScreen} from "@/client/screens/results-screen";
import {Button} from "@/components/ui/button";
import {getQuestionsAction} from "@/server/actions/get-questions-action/get-questions";
import type {QuestionWithOptions} from "@/server/repositories/question-repository/get-questions";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const TriviaScreen = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const dbQuestions: QuestionWithOptions[] = await getQuestionsAction(10);
        const transformedQuestions: Question[] = dbQuestions.map((q: QuestionWithOptions) => {
          const correctOption = q.options.find((opt) => opt.correct);
          const shuffledOptions = shuffleArray(q.options);
          return {
            id: q.id,
            question: q.text,
            options: shuffledOptions.map((opt) => opt.text),
            correctAnswer: correctOption?.text || "",
          };
        });
        const shuffledQuestions = shuffleArray(transformedQuestions);
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Cargando preguntas...</h1>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">No hay preguntas disponibles</h1>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateCorrectAnswers = () => {
    return questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
  };

  const getIncorrectQuestions = () => {
    return questions
      .filter((q) => answers[q.id] !== q.correctAnswer)
      .map((q) => ({
        question: q.question,
        userAnswer: answers[q.id] || "No respondida",
        correctAnswer: q.correctAnswer,
      }));
  };

  if (showResults) {
    return (
      <ResultsScreen
        totalQuestions={questions.length}
        correctAnswers={calculateCorrectAnswers()}
        incorrectQuestions={getIncorrectQuestions()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">JavaScript Challenge</h1>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <QuestionCard
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerChange={handleAnswerChange}
          />

          <div className="flex w-full max-w-2xl">
            <Button
              onClick={handleNext}
              className="min-w-[120px] w-full"
            >
              {isLastQuestion ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

