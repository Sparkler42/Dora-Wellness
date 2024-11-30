import React, { useState } from 'react';
import { 
  Brain, 
  Heart, 
  Zap, 
  ChevronRight, 
  BarChart, 
  Target,
  ArrowUpRight 
} from 'lucide-react';

const GrowingTree = () => {
  return (
    <div className="w-full h-32">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="twinkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Ground */}
        <path d="M40 180 C80 180, 120 180, 160 180" stroke="#B0C4B1" fill="none" strokeWidth="4">
          <animate 
            attributeName="d" 
            dur="3s"
            repeatCount="indefinite"
            values="M40 180 C80 180, 120 180, 160 180;
                    M40 180 C80 178, 120 182, 160 180;
                    M40 180 C80 180, 120 180, 160 180"
          />
        </path>

        {/* Trunk */}
        <path d="M100 180 L100 80" stroke="#8B4513" fill="none" strokeWidth="6">
          <animate
            attributeName="d"
            dur="3s"
            begin="0s"
            values="M100 180 L100 180;
                    M100 180 L100 80"
            fill="freeze"
          />
        </path>

        {/* Branches */}
        <g>
          {/* Lower branches */}
          {[
            { start: 160, controlX: 130, endX: 140, delay: "1s" },
            { start: 160, controlX: 70, endX: 60, delay: "1.2s" },
            { start: 140, controlX: 135, endX: 145, delay: "1.4s" },
            { start: 140, controlX: 65, endX: 55, delay: "1.6s" },
            { start: 120, controlX: 140, endX: 150, delay: "1.8s" },
            { start: 120, controlX: 60, endX: 50, delay: "2s" },
            { start: 100, controlX: 130, endX: 140, delay: "2.2s" },
            { start: 100, controlX: 70, endX: 60, delay: "2.4s" }
          ].map((branch, index) => (
            <path
              key={index}
              d={`M100 ${branch.start} Q${branch.controlX} ${branch.start - 10} ${branch.endX} ${branch.start - 5}`}
              stroke="#8B4513"
              fill="none"
              strokeWidth="3"
            >
              <animate
                attributeName="d"
                dur="2s"
                begin={branch.delay}
                values={`M100 ${branch.start} Q100 ${branch.start} 100 ${branch.start};
                        M100 ${branch.start} Q${branch.controlX} ${branch.start - 10} ${branch.endX} ${branch.start - 5}`}
                fill="freeze"
              />
            </path>
          ))}
        </g>

        {/* Flowers/Sparks */}
        <g>
          {[
            { cx: 140, cy: 155, color: "#E9EDC9", delay: "2.6s" },
            { cx: 145, cy: 135, color: "#CFE1B9", delay: "2.8s" },
            { cx: 150, cy: 115, color: "#B0C4B1", delay: "3s" },
            { cx: 140, cy: 95, color: "#E9EDC9", delay: "3.2s" },
            { cx: 60, cy: 155, color: "#CFE1B9", delay: "2.7s" },
            { cx: 55, cy: 135, color: "#E9EDC9", delay: "2.9s" },
            { cx: 50, cy: 115, color: "#B0C4B1", delay: "3.1s" },
            { cx: 60, cy: 95, color: "#CFE1B9", delay: "3.3s" },
            { cx: 100, cy: 75, color: "#E9EDC9", delay: "3.4s" },
            { cx: 85, cy: 80, color: "#B0C4B1", delay: "3.5s" },
            { cx: 115, cy: 80, color: "#CFE1B9", delay: "3.6s" }
          ].map((flower, index) => (
            <g key={index}>
              <circle
                cx={flower.cx}
                cy={flower.cy}
                r="4"
                fill={flower.color}
              >
                <animate
                  attributeName="opacity"
                  dur="2s"
                  begin={flower.delay}
                  values="0;1"
                  fill="freeze"
                />
                <animate
                  attributeName="r"
                  dur="1.5s"
                  begin={flower.delay}
                  repeatCount="indefinite"
                  values="4;5;4"
                />
              </circle>
              <circle
                cx={flower.cx}
                cy={flower.cy}
                r="1"
                fill="url(#twinkle)"
              >
                <animate
                  attributeName="r"
                  dur="1s"
                  begin={flower.delay}
                  repeatCount="indefinite"
                  values="1;2;1"
                />
              </circle>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const SparkApp = () => {
  // ... rest of the SparkApp component code remains the same ...
};

export default SparkApp;
