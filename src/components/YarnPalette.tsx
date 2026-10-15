import React, { useState } from 'react';
import { Palette, Sparkles, Pipette } from 'lucide-react';

export interface YarnSwatch {
  name: string;
  hex: string;
  yarnType: string;
}

export const YARN_PALETTES: { category: string; swatches: YarnSwatch[] }[] = [
  {
    category: 'Cozy Pastels',
    swatches: [
      { name: 'Cream Wool', hex: '#FAF5EE', yarnType: 'Natural Merino' },
      { name: 'Powder Pink', hex: '#FBCFE8', yarnType: 'Soft Baby Yarn' },
      { name: 'Baby Sky Blue', hex: '#BAE6FD', yarnType: 'Soft Acrylic' },
      { name: 'Mint Sorbet', hex: '#A7F3D0', yarnType: 'Combed Cotton' },
      { name: 'Soft Lavender', hex: '#E9D5FF', yarnType: 'Fluffy Alpaca' },
      { name: 'Peach Fuzz', hex: '#FED7AA', yarnType: 'Velvet Chenille' },
      { name: 'Buttercup', hex: '#FEF08A', yarnType: 'DK Merino' },
      { name: 'Warm Sand', hex: '#E7D7C1', yarnType: 'Wool Blend' },
    ],
  },
  {
    category: 'Forest & Earthy',
    swatches: [
      { name: 'Teddy Brown', hex: '#92400E', yarnType: 'Rustic Wool' },
      { name: 'Acorn Tan', hex: '#D97706', yarnType: 'Wool Blend' },
      { name: 'Moss Green', hex: '#4D7C0F', yarnType: 'Highland Wool' },
      { name: 'Pine Forest', hex: '#166534', yarnType: 'Heathered Wool' },
      { name: 'Mushroom Taupe', hex: '#A8A29E', yarnType: 'Cashmere Blend' },
      { name: 'Warm Cinnamon', hex: '#B45309', yarnType: 'Alpaca DK' },
      { name: 'Mustard Gold', hex: '#EAB308', yarnType: 'Mercerized Cotton' },
      { name: 'Oatmeal Tweed', hex: '#D6D3D1', yarnType: 'Tweed Wool' },
    ],
  },
  {
    category: 'Vibrant & Sweet',
    swatches: [
      { name: 'Strawberry Red', hex: '#EF4444', yarnType: 'Plush Chenille' },
      { name: 'Tangerine Pop', hex: '#F97316', yarnType: 'Bright Acrylic' },
      { name: 'Sunshine Yellow', hex: '#FBBF24', yarnType: 'Cotton Yarn' },
      { name: 'Bubblegum Pink', hex: '#F43F5E', yarnType: 'Velvet Yarn' },
      { name: 'Bright Turquoise', hex: '#06B6D4', yarnType: 'Silky Bamboo' },
      { name: 'Berry Violet', hex: '#8B5CF6', yarnType: 'DK Acrylic' },
      { name: 'Leaf Green', hex: '#22C55E', yarnType: 'Pure Wool' },
      { name: 'Coral Rose', hex: '#FB7185', yarnType: 'Soft Cotton' },
    ],
  },
  {
    category: 'Essentials & Neutrals',
    swatches: [
      { name: 'Pure White', hex: '#FFFFFF', yarnType: 'Clean Cotton' },
      { name: 'Natural Ecru', hex: '#F5EBE0', yarnType: 'Raw Wool' },
      { name: 'Rosy Blush', hex: '#FDA4AF', yarnType: 'Cheek Tint Wool' },
      { name: 'Chestnut Brown', hex: '#78350F', yarnType: 'Sturdy Worsted' },
      { name: 'Cozy Charcoal', hex: '#374151', yarnType: 'Heather Wool' },
      { name: 'Soft Black', hex: '#18181B', yarnType: 'Embroidery Yarn' },
    ],
  },
];

interface YarnPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  recentColors: string[];
}

export const YarnPalette: React.FC<YarnPaletteProps> = ({
  selectedColor,
  onSelectColor,
  recentColors,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Cozy Pastels');
  const [customColor, setCustomColor] = useState<string>(selectedColor);

  const currentSwatches =
    YARN_PALETTES.find((p) => p.category === activeCategory)?.swatches ||
    YARN_PALETTES[0].swatches;

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-800 flex items-center justify-center">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800 text-sm">Wool Yarn Palette</h3>
            <p className="text-xs text-stone-500">Pick authentic yarn hues for your doll</p>
          </div>
        </div>

        {/* Current Selected Color Preview Badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 bg-white rounded-full border border-stone-200 shadow-2xs">
          <span
            className="w-4 h-4 rounded-full border border-black/15 shadow-inner"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-xs font-mono font-medium text-stone-700 uppercase">
            {selectedColor}
          </span>
        </div>
      </div>

      {/* Palette Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-none">
        {YARN_PALETTES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat.category
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-amber-100'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Yarn Swatches Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
        {currentSwatches.map((swatch) => {
          const isSelected = selectedColor.toLowerCase() === swatch.hex.toLowerCase();
          return (
            <button
              key={swatch.hex + swatch.name}
              onClick={() => {
                onSelectColor(swatch.hex);
                setCustomColor(swatch.hex);
              }}
              title={`${swatch.name} (${swatch.yarnType})`}
              className={`group relative flex flex-col items-center p-1.5 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white shadow-md ring-2 ring-amber-600 scale-105'
                  : 'bg-white/60 hover:bg-white hover:shadow-sm'
              }`}
            >
              {/* Skein Swatch representation */}
              <div
                className="w-8 h-8 rounded-full border border-stone-300/80 shadow-inner relative flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: swatch.hex }}
              >
                {/* Wool yarn texture lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white_0,transparent_60%)] pointer-events-none" />
                <div className="w-1.5 h-full bg-black/10 rotate-45 transform pointer-events-none" />
                {isSelected && (
                  <Sparkles className="w-3.5 h-3.5 text-stone-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]" />
                )}
              </div>
              <span className="text-[10px] text-stone-600 truncate max-w-full mt-1 font-medium group-hover:text-stone-900">
                {swatch.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer: Custom Color Picker & Recent Colors */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-200/60">
        {/* Custom Hex / Color Input */}
        <label className="flex items-center gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-stone-200 cursor-pointer hover:border-amber-400 transition-colors">
          <Pipette className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-xs text-stone-600 font-medium">Custom Color:</span>
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              onSelectColor(e.target.value);
            }}
            className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
          />
        </label>

        {/* Recent Color Swatches */}
        {recentColors.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-stone-500 font-medium">Recent:</span>
            <div className="flex items-center gap-1">
              {recentColors.slice(0, 5).map((color, idx) => (
                <button
                  key={`${color}-${idx}`}
                  onClick={() => {
                    onSelectColor(color);
                    setCustomColor(color);
                  }}
                  title={color}
                  className="w-5 h-5 rounded-full border border-stone-300 shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
