"use client";

export default function Instruction() {
  return (
    <div className="min-h-screen bg-[#1E293B] p-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Left Section: Interview Title & Black Box */}
      <div className="flex flex-col items-center justify-start gap-8 p-4 bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Trainee Interview</h1>
        <div className="w-full h-64 bg-black mb-4 border border-gray-500">
          {/* Placeholder for Black Box */}
        </div>
      </div>

      {/* Right Section: Instructions */}
      <div className="flex flex-col justify-start items-center gap-8 p-3">
        {/* Title and Timer */}
        <div className="flex justify-between items-center w-full mb-2">
          <h2 className="text-2xl font-semibold text-white">Zeko</h2>
          <p className="text-lg font-medium text-white">26 Minutes</p>
        </div>

        {/* Instructions */}
        <h3 className="text-xl font-semibold text-white mb-4">Instructions</h3>
        <ol className="list-decimal list-inside mb-6 text-base text-left font-medium text-white">
          <li>Ensure stable internet and choose a clean, quiet location.</li>
          <li>Permission for access of camera, microphone, and entire screen sharing is required.</li>
          <li>Be in professional attire and avoid distractions.</li>
          <li>Give a detailed response, providing as much information as you can.</li>
          <li>Answer the question with examples and projects youve worked on.</li>
        </ol>

        {/* Mock Interview Link */}
        <p className="text-center text-white mb-6">
          <span className="font-semibold">
            Click here to try a mock interview with Avya, our AI Interviewer,
          </span>
          <br />
          <a
            href="https://example.com/mock-interview" // Replace with the actual link
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            and build your confidence before the main interview!
          </a>
        </p>

        {/* Start Now Button */}
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => (window.location.href = "/permissions")}
        >
          Start Now
        </button>
      </div>
    </div>
  );
}
