// src/App.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SpeedometerCard from "./components/SpeedometerCard";
import SpeedGraphCard from "./components/SpeedGraphCard";
const Host = import.meta.env.VITE_SERVER_URL;

const socket = io(Host);


const App = () => {
  const [speed, setSpeed] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("newSpeed", (data) => {
      setSpeed(data);
      setHistory((prev) => {
        const now = new Date().toLocaleTimeString();
        const updated = [...prev, { time: now, speed: data }];
        if (updated.length > 10) updated.shift();
        return updated;
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 animate-gradient text-white px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">
          🚗 Live Speedometer Dashboard
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Real-time vehicle speed monitoring
        </p>
      </motion.div>

      {/* Main Grid */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl"
      >
        <SpeedometerCard speed={speed} />
        <SpeedGraphCard history={history} />
      </motion.div>
    </div>
  );
};

export default App;
