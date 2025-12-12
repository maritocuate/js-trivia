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

export const getQuestions = async (limit: number = 10): Promise<QuestionWithOptions[]> => {
  const questions = await prisma.question.findMany({
    take: limit,
    include: {
      options: {
        select: {
          id: true,
          text: true,
          correct: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      correct: opt.correct,
    })),
  }));
};

