import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type ResultsScreenProps = {
  totalQuestions: number;
  correctAnswers: number;
};

export const ResultsScreen = ({
  totalQuestions,
  correctAnswers,
}: ResultsScreenProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Resultados</h1>
          <p className="text-muted-foreground">
            Has completado el JavaScript Challenge
          </p>
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
                Respuestas correctas:{" "}
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
      </div>
    </div>
  );
};

