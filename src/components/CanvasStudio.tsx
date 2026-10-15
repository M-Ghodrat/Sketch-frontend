import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  PenTool,
  Paintbrush,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';
import { renderHandDrawnDoll } from './StarterTemplates';

export type DrawingTool = 'pen' | 'brush' | 'eraser';

interface CanvasStudioProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onCanvasChange: (dataUrl: string) => void;
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const MAX_HISTORY = 25;

// Simple, focused essential colors
const ESSENTIAL_COLORS = [
  { name: 'Dark Charcoal', hex: '#1f2937' },
  { name: 'Teddy Brown', hex: '#92400e' },
  { name: 'Soft Cream', hex: '#fde68a' },
  { name: 'Pastel Pink', hex: '#f472b6' },
  { name: 'Sky Blue', hex: '#60a5fa' },
  { name: 'Sage Green', hex: '#4ade80' },
  { name: 'Warm Terracotta', hex: '#ea580c' },
  { name: 'Pure White', hex: '#ffffff' },
];

export const CanvasStudio: React.FC<CanvasStudioProps> = ({
  selectedColor,
  onSelectColor,
  onCanvasChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTool, setActiveTool] = useState<DrawingTool>('pen');
  const [brushSize, setBrushSize] = useState<number>(6);
  const [brushOpacity, setBrushOpacity] = useState<number>(60); // 0-100%
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  // Undo / Redo history
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Initialize canvas with organic hand-drawn sketch
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    renderHandDrawnDoll(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);

    const initialImageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHistory([initialImageData]);
    setHistoryIndex(0);

    onCanvasChange(canvas.toDataURL('image/png'));
  }, [onCanvasChange]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const currentImg = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      if (trimmed.length >= MAX_HISTORY) {
        trimmed.shift();
      }
      return [...trimmed, currentImg];
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));

    onCanvasChange(canvas.toDataURL('image/png'));
  }, [historyIndex, onCanvasChange]);

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const nextIndex = historyIndex - 1;
    ctx.putImageData(history[nextIndex], 0, 0);
    setHistoryIndex(nextIndex);
    onCanvasChange(canvas.toDataURL('image/png'));
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const nextIndex = historyIndex + 1;
    ctx.putImageData(history[nextIndex], 0, 0);
    setHistoryIndex(nextIndex);
    onCanvasChange(canvas.toDataURL('image/png'));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    saveToHistory();
  };

  const handleResetToSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    renderHandDrawnDoll(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    saveToHistory();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const scale = Math.min(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
        const nw = img.width * scale;
        const nh = img.height * scale;
        const ox = (CANVAS_WIDTH - nw) / 2;
        const oy = (CANVAS_HEIGHT - nh) / 2;

        ctx.drawImage(img, ox, oy, nw, nh);
        saveToHistory();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'crochet-sketch.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const applyToolStyle = (ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = brushSize * 3;
    } else if (activeTool === 'brush') {
      // Multiply blend mode ensures coloring NEVER covers or obscures dark sketch lines!
      ctx.globalCompositeOperation = 'multiply';
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      ctx.globalAlpha = Math.max(0.1, brushOpacity / 100);
      ctx.lineWidth = brushSize * 2.8;
    } else {
      // Pen: crisp dark/colored sketch lines
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = brushSize;
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches.length > 1) return;
    const coords = getCanvasCoordinates(e);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    setIsDrawing(true);
    setLastPoint(coords);

    ctx.save();
    applyToolStyle(ctx);

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPoint) return;
    const coords = getCanvasCoordinates(e);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    applyToolStyle(ctx);

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.restore();

    setLastPoint(coords);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setLastPoint(null);
      saveToHistory();
    }
  };

  return (
    <div className="flex flex-col bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
      {/* Unified Toolbar: Tools + Colors sitting together on top */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-stone-100">
        {/* Left: Pen, Brush, Eraser */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTool('pen')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTool === 'pen'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Pen</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('brush')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTool === 'brush'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span>Brush (Color)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('eraser')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTool === 'eraser'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Eraser</span>
          </button>
        </div>

        {/* Center: Colors sitting directly beside tools */}
        <div className="flex items-center gap-1.5 bg-stone-50 p-1 rounded-xl border border-stone-200/80">
          {ESSENTIAL_COLORS.map((c) => {
            const isSelected = selectedColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => onSelectColor(c.hex)}
                title={c.name}
                className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}

          {/* Custom color picker */}
          <label
            title="Custom Color"
            className="w-6 h-6 rounded-full border border-stone-300 relative overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-tr from-rose-400 via-amber-300 to-sky-400"
          >
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onSelectColor(e.target.value)}
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* Right: Undo, Redo, Reset, Clear */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo"
            className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-lg disabled:opacity-30 cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo"
            className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-lg disabled:opacity-30 cursor-pointer"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleResetToSketch}
            title="Reset to starter sketch"
            className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 rounded-lg font-medium cursor-pointer"
          >
            Reset Sketch
          </button>

          <label
            title="Upload sketch"
            className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-lg cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <button
            type="button"
            onClick={handleDownload}
            title="Download Sketch"
            className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleClear}
            title="Clear canvas"
            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Adjusters: Size & Opacity */}
      <div className="flex flex-wrap items-center gap-5 px-3 py-2 mb-3 bg-stone-50 rounded-xl text-xs text-stone-600">
        {/* Stroke Width Slider */}
        <div className="flex items-center gap-2 min-w-[150px]">
          <span className="font-medium text-stone-500">Size:</span>
          <input
            type="range"
            min="2"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
          />
          <span className="w-4 text-center font-mono text-[11px]">{brushSize}</span>
        </div>

        {/* Brush Opacity Slider (so coloring never covers edges) */}
        {activeTool === 'brush' && (
          <div className="flex items-center gap-2 min-w-[180px]">
            <span className="font-medium text-stone-500">Color Opacity:</span>
            <input
              type="range"
              min="15"
              max="100"
              value={brushOpacity}
              onChange={(e) => setBrushOpacity(Number(e.target.value))}
              className="w-24 accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <span className="w-8 text-center font-mono text-[11px]">{brushOpacity}%</span>
            <span className="text-[10px] text-stone-400 italic">(won&apos;t hide sketch lines)</span>
          </div>
        )}
      </div>

      {/* Drawing Canvas */}
      <div className="relative mx-auto rounded-xl overflow-hidden border border-stone-200 bg-white shadow-inner touch-none">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full max-w-[480px] aspect-square block cursor-crosshair"
        />
      </div>
    </div>
  );
};
