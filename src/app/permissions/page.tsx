"use client";

import { useState } from "react";

export default function Permissions() {
  const [cameraStatus, setCameraStatus] = useState(false);
  const [microphoneStatus, setMicrophoneStatus] = useState(false);
  const [speakerStatus, setSpeakerStatus] = useState(false);
  const [screenShareStatus, setScreenShareStatus] = useState(false);
  const [canHearMessage, setCanHearMessage] = useState(false);

  // Check Camera and Microphone
  const checkCameraAndMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (stream) {
        setCameraStatus(true);
        setMicrophoneStatus(true);
        stream.getTracks().forEach((track) => track.stop()); // Stop tracks after use
      }
    } catch (err) {
      console.error("Error accessing camera or microphone:", err);
      setCameraStatus(false);
      setMicrophoneStatus(false);
    }
  };

  // Check Speaker (play test sound)
  const checkSpeaker = () => {
    const audio = new Audio("audio.mp3"); // Sample beep sound
    audio.play()
      .then(() => {
        setSpeakerStatus(true);
        setCanHearMessage(true); // If the sound is played successfully, show the "Can I hear you?" message
      })
      .catch((err) => {
        console.error("Error playing sound:", err);
        setSpeakerStatus(false);
      });
  };

  // Check Screen Sharing
  const checkScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (stream) {
        setScreenShareStatus(true);
        stream.getTracks().forEach((track) => track.stop()); // Stop tracks after use
      }
    } catch (err) {
      console.error("Error accessing screen sharing:", err);
      setScreenShareStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Left Section: Title and Black Box */}
      <div className="flex flex-col items-center justify-start gap-8 p-4 bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Trainee Interview</h1>
        <div className="w-full h-64 bg-black mb-4 border border-gray-500">
          {/* Placeholder for Black Box */}
        </div>
      </div>

      {/* Right Section: Permissions */}
      <div className="flex flex-col justify-start items-start gap-8 p-3">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-semibold text-white">Zeko</h2>
          <p className="text-lg font-medium text-white">26 Minutes</p>
        </div>

        {/* Permission Title */}
        <h3 className="text-xl font-semibold text-white mb-2">Ready to join?</h3>
        <p className="text-base text-gray-300 mb-4">
          Please make sure your device is properly configured.
        </p>

        {/* Permission Checklist */}
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between bg-[#1F2937] p-3 rounded-lg border border-gray-600">
            <span className="text-white">📷 Check Camera</span>
            <button
              onClick={checkCameraAndMic}
              className={`px-4 py-1 text-sm rounded ${
                cameraStatus ? "bg-green-600" : "bg-blue-600"
              } text-white hover:bg-blue-700`}
            >
              {cameraStatus ? "Checked" : "Check"}
            </button>
          </div>
          <div className="flex items-center justify-between bg-[#1F2937] p-3 rounded-lg border border-gray-600">
            <span className="text-white">🎤 Check Microphone</span>
            <button
              onClick={checkCameraAndMic}
              className={`px-4 py-1 text-sm rounded ${
                microphoneStatus ? "bg-green-600" : "bg-blue-600"
              } text-white hover:bg-blue-700`}
            >
              {microphoneStatus ? "Checked" : "Check"}
            </button>
          </div>
          <div className="flex items-center justify-between bg-[#1F2937] p-3 rounded-lg border border-gray-600">
            <span className="text-white">🔊 Check Speaker</span>
            <button
              onClick={checkSpeaker}
              className={`px-4 py-1 text-sm rounded ${
                speakerStatus ? "bg-green-600" : "bg-blue-600"
              } text-white hover:bg-blue-700`}
            >
              {speakerStatus ? "Checked" : "Check"}
            </button>
          </div>
         
          {canHearMessage && (
            <div className="mt-4 text-white">
              <p>Can I hear you?</p>
              <button className="px-6 py-2 mt-2 bg-green-600 text-white rounded hover:bg-green-700">
                Yes
              </button>
            </div>
          )}
          <div className="flex items-center justify-between bg-[#1F2937] p-3 rounded-lg border border-gray-600">
            <span className="text-white">🖥️ Enable Screen Share</span>
            <button
              onClick={checkScreenShare}
              className={`px-4 py-1 text-sm rounded ${
                screenShareStatus ? "bg-green-600" : "bg-blue-60  0"
              } text-white hover:bg-blue-700`}
            >
              {screenShareStatus ? "Checked" : "Check"}
            </button>
          </div>
        </div>

        {/* Start Interview Button */}
        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mt-6"
          onClick={() => (window.location.href="/interviewscreen")}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
