import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type IncorrectQuestion = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
};

type ResultsScreenProps = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectQuestions: IncorrectQuestion[];
};

export const ResultsScreen = ({
  totalQuestions,
  correctAnswers,
  incorrectQuestions,
}: ResultsScreenProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Results</h1>
        </div>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-foreground">
              {percentage}%
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg text-muted-foreground">
                Correct answers:{" "}
                <span className="font-semibold text-foreground">
                  {correctAnswers} de {totalQuestions}
                </span>
              </p>
            </div>

            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{width: `${percentage}%`}}
              />
            </div>
          </CardContent>
        </Card>

        {incorrectQuestions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Incorrect answers ({incorrectQuestions.length})
            </h2>
            <div className="space-y-4">
              {incorrectQuestions.map((item, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Your answer:
                      </p>
                      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                        <p className="text-sm text-destructive font-medium">
                          {item.userAnswer}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Correct answer:
                      </p>
                      <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-3">
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                          {item.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {incorrectQuestions.length === 0 && (
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Perfect! All answers are correct 🎉
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

