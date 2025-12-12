import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

type QuestionCardProps = {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
};

export const QuestionCard = ({
  questionNumber,
  totalQuestions,
  question,
  options,
}: QuestionCardProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-muted-foreground">
          Pregunta {questionNumber} de {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">{question}</h2>
        <RadioGroup className="space-y-3">
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

