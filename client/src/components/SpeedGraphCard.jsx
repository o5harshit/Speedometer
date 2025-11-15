// src/components/SpeedGraphCard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SpeedGraphCard = ({ history }) => {
  return (
    <Card className="relative bg-gray-900/80 border border-gray-700 shadow-2xl rounded-2xl backdrop-blur-lg overflow-hidden hover:shadow-[0_0_25px_#ec4899]/50 transition-shadow duration-500">
      <div className="absolute inset-0 rounded-2xl  opacity-20 blur-3xl animate-pulse" />

      <CardHeader>
        <CardTitle className="text-center text-xl text-gray-200 relative z-10">
          Speed History (Last 4s)
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <XAxis dataKey="time" stroke="#aaa" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 200]} stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "1px solid #6366f1",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#00eaff"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpeedGraphCard;
