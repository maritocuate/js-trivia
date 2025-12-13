"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

type QuestionCardProps = {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
};

const renderQuestion = (question: string) => {
  // Detectar si la pregunta contiene código (saltos de línea dobles seguidos de código)
  const parts = question.split(/\n\n+/);
  
  if (parts.length > 1) {
    // Hay separación entre texto y código
    const textPart = parts[0];
    const codePart = parts.slice(1).join("\n\n");
    
    return (
      <div className="space-y-4">
        {textPart && (
          <h2 className="text-xl font-semibold text-foreground">{textPart}</h2>
        )}
        {codePart && (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            <code className="font-mono text-foreground whitespace-pre-wrap">
              {codePart}
            </code>
          </pre>
        )}
      </div>
    );
  }
  
  // Si no hay código, renderizar normalmente pero preservar saltos de línea
  if (question.includes("\n")) {
    return (
      <h2 className="text-xl font-semibold text-foreground whitespace-pre-wrap">
        {question}
      </h2>
    );
  }
  
  // Texto simple sin saltos de línea
  return (
    <h2 className="text-xl font-semibold text-foreground">{question}</h2>
  );
};

export const QuestionCard = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  onAnswerChange,
}: QuestionCardProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {questionNumber} / {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderQuestion(question)}
        <RadioGroup
          value={selectedAnswer}
          onValueChange={onAnswerChange}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer text-sm font-medium"
              >
                {option}
              </label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

