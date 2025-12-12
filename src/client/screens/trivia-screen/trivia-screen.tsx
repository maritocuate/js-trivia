"use client";

import {useState} from "react";
import {QuestionCard} from "@/client/components/question-card";
import {Button} from "@/components/ui/button";

const QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es la diferencia entre let, const y var en JavaScript?",
    options: [
      "let y const tienen scope de bloque, var tiene scope de función",
      "No hay diferencia, son sinónimos",
      "var es más moderno que let y const",
      "const permite reasignación, let y var no",
    ],
  },
  {
    id: 2,
    question: "¿Qué es un closure en JavaScript?",
    options: [
      "Una función que tiene acceso a variables de su scope externo",
      "Un método para cerrar una aplicación",
      "Una forma de importar módulos",
      "Un tipo de dato primitivo",
    ],
  },
  {
    id: 3,
    question: "¿Qué método se usa para agregar un elemento al final de un array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
  },
  {
    id: 4,
    question: "¿Qué es el hoisting en JavaScript?",
    options: [
      "El comportamiento de mover declaraciones al inicio del scope",
      "Una forma de optimizar el código",
      "Un método para elevar elementos del DOM",
      "Una técnica de compilación",
    ],
  },
  {
    id: 5,
    question: "¿Cuál es la diferencia entre == y === en JavaScript?",
    options: [
      "== compara valor, === compara valor y tipo",
      "=== compara valor, == compara valor y tipo",
      "No hay diferencia",
      "== es más estricto que ===",
    ],
  },
  {
    id: 6,
    question: "¿Qué es una Promise en JavaScript?",
    options: [
      "Un objeto que representa el resultado de una operación asíncrona",
      "Una función síncrona",
      "Un tipo de dato primitivo",
      "Un método para hacer peticiones HTTP",
    ],
  },
  {
    id: 7,
    question: "¿Qué método se usa para transformar un array en JavaScript?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
  },
  {
    id: 8,
    question: "¿Qué es el event loop en JavaScript?",
    options: [
      "El mecanismo que maneja la ejecución asíncrona del código",
      "Un bucle infinito",
      "Una estructura de control",
      "Un método de depuración",
    ],
  },
  {
    id: 9,
    question: "¿Qué es destructuring en JavaScript?",
    options: [
      "Una sintaxis para extraer valores de arrays u objetos",
      "Un método para destruir variables",
      "Una forma de eliminar código",
      "Un patrón de diseño",
    ],
  },
  {
    id: 10,
    question: "¿Qué es el spread operator (...) en JavaScript?",
    options: [
      "Un operador que expande elementos de arrays u objetos",
      "Un método para copiar archivos",
      "Una función para distribuir datos",
      "Un operador matemático",
    ],
  },
];

export const TriviaScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">JavaScript Challenge</h1>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <QuestionCard
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
            question={currentQuestion.question}
            options={currentQuestion.options}
          />

          <div className="flex justify-end w-full max-w-2xl">
            <Button
              onClick={handleNext}
              disabled={isLastQuestion}
              className="min-w-[120px]"
            >
              {isLastQuestion ? "Finalizar" : "Siguiente"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

