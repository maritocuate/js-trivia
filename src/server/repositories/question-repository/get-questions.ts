import {prisma} from "@/lib/prisma";

export type QuestionWithOptions = {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
    correct: boolean;
  }>;
};

type AggregationResult = {
  _id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
    correct: boolean;
  }>;
};

export const getQuestions = async (limit: number = 10): Promise<QuestionWithOptions[]> => {
  // Usar $sample de MongoDB para seleccionar preguntas aleatorias
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregationPipeline: any[] = [
    {
      $sample: { size: limit }
    },
    {
      $lookup: {
        from: "Option",
        localField: "_id",
        foreignField: "questionId",
        as: "options"
      }
    },
    {
      $project: {
        _id: { $toString: "$_id" },
        text: 1,
        options: {
          $map: {
            input: "$options",
            as: "opt",
            in: {
              id: { $toString: "$$opt._id" },
              text: "$$opt.text",
              correct: "$$opt.correct"
            }
          }
        }
      }
    }
  ];

  // aggregateRaw espera un objeto con la propiedad pipeline
  const randomQuestions = await prisma.question.aggregateRaw({
    pipeline: aggregationPipeline
  });

  // Convertir el resultado de la agregación al tipo esperado
  return (randomQuestions as unknown as AggregationResult[]).map((q) => ({
    id: q._id,
    text: q.text,
    options: q.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      correct: opt.correct,
    })),
  }));
};

