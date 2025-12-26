import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface LoadingStep {
  message: string;
  completed: boolean;
}

interface LoadingScreenProps {
  steps: LoadingStep[];
  currentMessage: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ steps, currentMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-scale-in">
      {/* Animated loader */}
      <div className="relative mb-12">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        
        {/* Spinning ring */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>
      </div>

      {/* Current step message */}
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {currentMessage}
      </h2>

      {/* Completed steps */}
      <div className="space-y-3 w-full max-w-md">
        {steps.filter(s => s.completed).map((step, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 text-success animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">{step.message.replace('...', ' complete')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
