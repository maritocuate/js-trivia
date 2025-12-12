"use server";

import {getQuestions} from "@/server/repositories/question-repository/get-questions";

export const getQuestionsAction = async (limit: number = 10) => {
  return await getQuestions(limit);
};

