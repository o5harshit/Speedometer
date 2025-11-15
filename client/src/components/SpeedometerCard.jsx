// src/components/SpeedometerCard.jsx
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ReactSpeedometer from "react-d3-speedometer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SpeedometerCard = ({ speed }) => {
  return (
    <Card className="relative bg-gray-900/80 border border-gray-700 shadow-2xl rounded-2xl backdrop-blur-lg overflow-hidden hover:shadow-[0_0_25px_#6366f1]/50 transition-shadow duration-500">
      <div className="absolute inset-0 rounded-2xl  opacity-20 blur-3xl animate-pulse" />

      <CardHeader>
        <CardTitle className="text-center text-xl text-gray-200 relative z-10">
          Current Speed
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center relative z-10">
        <ReactSpeedometer
          maxValue={200}
          value={speed}
          needleColor="#ff4d4d"
          startColor="#00ff99"
          endColor="#ff0000"
          segments={10}
          height={280}
        />

        <motion.h2
          key={speed}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mt-4 text-blue-300 drop-shadow-lg"
        >
          {speed} km/h
        </motion.h2>
      </CardContent>
    </Card>
  );
};

export default SpeedometerCard;
