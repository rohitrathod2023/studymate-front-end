import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Sample Quiz Data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  // Add more questions as needed
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setSelectedOption(null); // Reset selection on question change
    setTimeLeft(30); // Reset timer
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Quiz Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Your Score: {score}/{quizData.length}</p>
            <p className="text-gray-600">Focus on weak areas to improve.</p>
            <Button className="mt-4 w-full" onClick={() => window.location.reload()}>
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {/* Progress Bar */}
      <Progress value={(currentQuestion / quizData.length) * 100} className="w-full max-w-md mb-4" />

      {/* Quiz Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1}/{quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg">{quizData[currentQuestion].question}</p>
            <span className="text-sm font-bold">{timeLeft}s</span>
          </div>

          {/* Options */}
          <RadioGroup onValueChange={setSelectedOption} value={selectedOption || ""}>
            {quizData[currentQuestion].options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer">
                <RadioGroupItem value={option} />
                <span>{option}</span>
              </label>
            ))}
          </RadioGroup>

          {/* Next Button */}
          <Button className="mt-4 w-full" onClick={handleNext} disabled={!selectedOption}>
            {currentQuestion < quizData.length - 1 ? "Next" : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
