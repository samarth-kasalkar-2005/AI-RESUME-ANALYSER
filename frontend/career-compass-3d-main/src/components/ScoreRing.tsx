import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreRing: React.FC<ScoreRingProps> = ({ 
  score, 
  size = 180, 
  strokeWidth = 12 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  const getScoreColor = () => {
    if (score >= 90) return { stroke: 'hsl(var(--success))', glow: 'var(--glow-success)' };
    if (score >= 70) return { stroke: 'hsl(var(--warning))', glow: 'var(--glow-warning)' };
    return { stroke: 'hsl(var(--destructive))', glow: 'var(--glow-danger)' };
  };

  const colors = getScoreColor();

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-50"
        style={{ 
          background: `radial-gradient(circle, ${colors.stroke}40 0%, transparent 70%)` 
        }}
      />
      
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.stroke}80)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-5xl font-extrabold"
          style={{ color: colors.stroke }}
        >
          {Math.round(score)}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">ATS Score</span>
      </div>
    </div>
  );
};

export default ScoreRing;
