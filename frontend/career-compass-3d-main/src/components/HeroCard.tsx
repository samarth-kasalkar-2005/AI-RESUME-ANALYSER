import React from 'react';
import { Briefcase } from 'lucide-react';
import ScoreRing from './ScoreRing';

interface HeroCardProps {
  score: number;
  role: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ score, role }) => {
  return (
    <div className="glass-card col-span-full p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Score Ring */}
        <div className="flex-shrink-0">
          <ScoreRing score={score} />
        </div>

        {/* Role Info */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
            Best Fit Role
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {role}
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
            <Briefcase className="w-5 h-5" />
            <span>Based on your skills and experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
