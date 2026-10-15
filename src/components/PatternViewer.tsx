import React from 'react';
import { CrochetPattern } from '../types/crochet';

interface PatternViewerProps {
  pattern: CrochetPattern;
  dollDesignImage?: string | null;
  sketchImage: string;
  onReset: () => void;
}

export const PatternViewer: React.FC<PatternViewerProps> = ({
  pattern,
  dollDesignImage,
  sketchImage,
  onReset,
}) => {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-200">
      {/* Top Simple Action Bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
        <button
          type="button"
          onClick={onReset}
          className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          ← Back to Sketch
        </button>

        <h2 className="text-sm font-bold text-stone-900 truncate max-w-md">
          {pattern.dollTitle || 'Crochet Doll'}
        </h2>

        <div className="w-16" />
      </div>

      {/* Side-by-Side View ONLY */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Original Sketch */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-600 mb-2">Original Sketch</span>
            <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50 aspect-square flex items-center justify-center p-2">
              <img
                src={sketchImage}
                alt="Original Sketch"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* 2. Crochet Design */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-800 mb-2">Crochet Design</span>
            <div className="relative rounded-xl overflow-hidden border border-amber-200 bg-amber-50/30 aspect-square flex items-center justify-center p-2">
              {dollDesignImage ? (
                <img
                  src={dollDesignImage}
                  alt="Crochet Design"
                  className="w-full h-full object-cover rounded-lg shadow-xs"
                />
              ) : (
                <div className="text-center p-4">
                  <p className="text-xs text-stone-500">Crochet design generated</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {pattern.dollSummary && (
          <p className="text-xs text-stone-600 mt-4 pt-4 border-t border-stone-100 leading-relaxed">
            {pattern.dollSummary}
          </p>
        )}
      </div>
    </div>
  );
};
