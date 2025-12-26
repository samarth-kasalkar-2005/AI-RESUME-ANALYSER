import React from 'react';
import { Brain, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

interface SkillsCardProps {
  title: string;
  skills: string[];
  type: 'extracted' | 'missing';
}

const SkillsCard: React.FC<SkillsCardProps> = ({ title, skills, type }) => {
  const isExtracted = type === 'extracted';
  const isEmpty = skills.length === 0;

  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isExtracted ? 'bg-primary/20' : 'bg-destructive/20'
        }`}>
          {isExtracted ? (
            <Brain className="w-5 h-5 text-primary" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-destructive" />
          )}
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>

      {!isExtracted && isEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-success/20 rounded-full blur-xl" />
            <div className="relative w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </div>
          <p className="text-success font-semibold mb-1">Perfect Match!</p>
          <p className="text-sm text-muted-foreground">No critical skills missing</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className={isExtracted ? 'skill-tag' : 'skill-tag-missing'}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isExtracted && <Sparkles className="w-3 h-3 mr-1 inline" />}
              {skill}
            </span>
          ))}
        </div>
      )}

      {!isExtracted && !isEmpty && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Add these to your resume to improve your score
        </p>
      )}
    </div>
  );
};

export default SkillsCard;
