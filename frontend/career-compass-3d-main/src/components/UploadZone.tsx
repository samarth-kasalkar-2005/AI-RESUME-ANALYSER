import React, { useState, useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`upload-zone group ${isDragOver ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-xl" />
      </div>

      {/* Floating icon */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center animate-float">
            <FileText className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-2">
          Drop your resume here
        </h3>
        <p className="text-muted-foreground mb-6 text-center max-w-sm">
          We'll analyze your skills and match you with the perfect career opportunities
        </p>

        <Button variant="hero" size="lg" className="relative z-10">
          <Upload className="w-5 h-5 mr-2" />
          Browse Files
        </Button>

        <p className="text-sm text-muted-foreground mt-4">
          Supports PDF, DOCX
        </p>

        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadZone;
