"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E293B] p-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Left Section: Interview Title & Black Box */}
      <div className="flex flex-col items-center justify-start gap-8 p-4 bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Trainee Interview</h1>
        <div className="w-full h-64 bg-black mb-4 border border-gray-500">
          {/* Placeholder for Black Box */}
        </div>
      </div>

      {/* Right Section: Call to Action */}
      <div className="flex flex-col justify-start items-center gap-8 p-3">
        <h2 className="text-2xl font-semibold text-white">Zeko</h2>
        <p className="text-lg font-medium text-white">26 Minutes</p>

        <h3 className="text-xl font-semibold text-white mb-4">Get Ready for the Interview</h3>
        
        {/* Button to Start the Instructions Setup */}
        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mt-6"
          onClick={() => (window.location.href = "/instructions")}
        >
          Start Interview Instructions
        </button>
      </div>
    </div>
  );
}
