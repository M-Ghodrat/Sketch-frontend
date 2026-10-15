import React from 'react';

interface PatternDetailsFormProps {
  description: string;
  onChangeDescription: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PatternDetailsForm: React.FC<PatternDetailsFormProps> = ({
  description,
  onChangeDescription,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">
          Description &amp; Notes (Optional)
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Describe your doll idea, colors, or special details (e.g. a cozy soft bear with a little knitted scarf and pink cheeks)..."
          className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 transition-all text-stone-800 placeholder:text-stone-400 resize-none"
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-amber-700 hover:bg-amber-800 active:scale-[0.99]"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Creating Crochet Design...</span>
          </div>
        ) : (
          <span>Create Crochet Design</span>
        )}
      </button>
    </div>
  );
};
