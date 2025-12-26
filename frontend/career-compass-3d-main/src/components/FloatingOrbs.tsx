import React from 'react';

const FloatingOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary large orb */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full animate-float"
        style={{
          top: '-20%',
          right: '-10%',
          background: 'radial-gradient(circle, hsl(185 70% 45% / 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDuration: '8s',
        }}
      />
      
      {/* Secondary orb */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full animate-float"
        style={{
          bottom: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, hsl(200 70% 35% / 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: '10s',
          animationDelay: '2s',
        }}
      />
      
      {/* Small accent orb */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full animate-float"
        style={{
          top: '40%',
          left: '10%',
          background: 'radial-gradient(circle, hsl(185 60% 50% / 0.05) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
            animationDuration: `${6 + i * 2}s`,
            animationDelay: `${i * 0.5}s`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
