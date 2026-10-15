import { useState, useCallback } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { CanvasStudio } from './components/CanvasStudio';
import { PatternDetailsForm } from './components/PatternDetailsForm';
import { PatternViewer } from './components/PatternViewer';
import { CrochetPattern } from './types/crochet';
import { createWoolDollRender } from './utils/woolDollRenderer';
import { generateCrochetDesign } from './services/api';

export default function App() {
  const [sketchImage, setSketchImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#92400e');
  const [description, setDescription] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [generatedPattern, setGeneratedPattern] = useState<CrochetPattern | null>(null);
  const [dollDesignImage, setDollDesignImage] = useState<string | null>(null);

  const handleCanvasChange = useCallback((dataUrl: string) => {
    setSketchImage(dataUrl);
  }, []);

  const handleGenerate = async () => {
    if (!sketchImage) {
      setError('Please draw or color a sketch first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await generateCrochetDesign({
        sketchImage,
        description,
      });

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate crochet design.');
      }

      let dollImg = data.dollDesignImage;
      if (!dollImg && sketchImage) {
        dollImg = await createWoolDollRender(sketchImage);
      }

      setDollDesignImage(dollImg || null);
      setGeneratedPattern(data.pattern || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Generation error:', err);
      // Fallback seamlessly so user always gets their doll
      if (sketchImage) {
        const fallbackImg = await createWoolDollRender(sketchImage);
        setDollDesignImage(fallbackImg);
      }
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate crochet design. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans">
      {/* Clean Minimal Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧶</span>
            <h1 className="font-bold text-base text-stone-900">Crochet Studio</h1>
            <span className="text-xs text-stone-400 hidden sm:inline">| Turn sketches into crochet</span>
          </div>

          {generatedPattern && (
            <button
              type="button"
              onClick={() => {
                setGeneratedPattern(null);
                setDollDesignImage(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Sketch</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-stone-400 hover:text-stone-700 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200 text-center">
              <div className="w-10 h-10 mx-auto mb-3 border-3 border-amber-200 border-t-amber-700 rounded-full animate-spin" />
              <h3 className="text-sm font-bold text-stone-900">Creating Your Crochet Design</h3>
              <p className="text-xs text-stone-500 mt-1">Generating design and pattern...</p>
            </div>
          </div>
        )}

        {generatedPattern ? (
          <PatternViewer
            pattern={generatedPattern}
            dollDesignImage={dollDesignImage}
            sketchImage={sketchImage}
            onReset={() => {
              setGeneratedPattern(null);
              setDollDesignImage(null);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Left: Canvas Studio with Pen, Brush, Eraser & Colors (7 cols) */}
            <div className="md:col-span-7">
              <CanvasStudio
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                onCanvasChange={handleCanvasChange}
              />
            </div>

            {/* Right: Description & Action (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <PatternDetailsForm
                description={description}
                onChangeDescription={setDescription}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />

              <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3.5 text-xs text-stone-500">
                <p className="font-semibold text-stone-700 mb-1">How it works:</p>
                <ol className="list-decimal list-inside space-y-1 text-stone-600">
                  <li>Sketch your doll outlines with the <strong>Pen</strong>.</li>
                  <li>Color parts with the <strong>Brush</strong> (colors won&apos;t hide your ink).</li>
                  <li>Add optional notes in the description box.</li>
                  <li>Click <strong>Create Crochet Design</strong> to generate!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
