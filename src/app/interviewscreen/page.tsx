"use client";

import { useState, useEffect } from "react";

export default function InterviewScreen() {
  const [timer, setTimer] = useState(60); // Initial timer value
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1); // Track the current question
  const [processing, setProcessing] = useState(false); // Track if the question is being processed
  const [testCompleted, setTestCompleted] = useState(false); // Flag for test completion

  // Define the questions
  const questions = [
    "Hi, I'm Avya, and I'll be conducting the interview today. How are you doing?",
    "What motivates you to pursue a career in AI & Data Science?",
    "Can you tell us about a challenging project you’ve worked on?",
    "How do you approach problem-solving?",
    "What tools and technologies are you most comfortable with?",
    "How do you stay updated with industry trends?",
    "Can you explain a situation where you learned something new?",
    "How do you manage time during a project?",
    "What’s your long-term vision for your career?",
    "What is your approach to teamwork and collaboration?",
  ];

  // Start Timer
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0 && !testCompleted) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer, testCompleted]);

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) setChunks((prev) => [...prev, event.data]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setMediaRecorder(null);
    }
    setRecording(false);
    console.log("Recorded Chunks:", chunks);
  };

  // Handle Speech Synthesis to read out the question
  const readQuestion = (question: string) => {
    const utterance = new SpeechSynthesisUtterance(question);
    speechSynthesis.speak(utterance);
  };

  // Handle "Save & Next" button click
  const handleSaveAndNext = () => {
    if (questionNumber < 10) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setQuestionNumber(questionNumber + 1);
        setTimer(60); // Reset the timer for the next question
        readQuestion(questions[questionNumber]); // Read the next question
      }, 2000); // Simulating the processing time (2 seconds)
    } else {
      setTestCompleted(true); // Mark the test as completed after 10 questions
    }
  };

  useEffect(() => {
    if (questionNumber <= 10 && !processing) {
      readQuestion(questions[questionNumber - 1]);
    }
  }, [questionNumber, processing]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {testCompleted ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-center text-green-500">Test Completed Successfully!</h1>
          <p className="text-xl mt-4">Thank you for completing the interview!</p>
        </div>
      ) : processing ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-white">Processing your question...</h1>
        </div>
      ) : (
        <>
          <h1 className="text-lg mb-2">{`${questionNumber}/10`}</h1>
          <h2 className="text-2xl font-bold text-center mb-6">{questions[questionNumber - 1]}</h2>

          <div className="flex items-center justify-center mb-6">
            <span className="text-orange-500 font-bold text-xl">Timer:</span>
            <span className="text-xl font-bold ml-2">{`00:${timer < 10 ? `0${timer}` : timer}`}</span>
          </div>

          <div className="w-full max-w-md h-64 bg-black flex items-center justify-center rounded-lg mb-6">
            {recording ? (
              <video
                autoPlay
                muted
                className="w-full h-full object-cover"
                ref={(video) => {
                  if (video && mediaRecorder?.stream) {
                    video.srcObject = mediaRecorder.stream;
                  }
                }}
              />
            ) : (
              <span className="text-gray-500">Video Frame Placeholder</span>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded text-white ${
                recording ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </button>
            <button
              className="px-6 py-2 bg-purple-500 rounded hover:bg-purple-600"
              onClick={handleSaveAndNext}
            >
              Save & Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
