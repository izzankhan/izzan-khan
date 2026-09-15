import React, { useState } from 'react';
import { Palette, Check, Sparkles, X, ChevronUp, ChevronDown, Layers, HelpCircle } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  urduTitle: string;
  badge: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  bgPreview: string;
  bestFor: string;
  gradient: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'ocean',
    name: 'Ocean Sky (Pure Clinical)',
    urduTitle: 'اوپشن ۱: اوشن اسکائی (فریش بلیو)',
    badge: 'Standard Medical',
    description: 'Clean Sky Blue & Cyan tones. Gives an ultra-fresh, sterile, trustworthy clinical standard.',
    primaryColor: '#0284c7',
    accentColor: '#06b6d4',
    bgPreview: '#f8fafc',
    bestFor: 'General Dentistry, Hygiene, Teeth Whitening & Ortho',
    gradient: 'from-sky-600 to-cyan-500',
  },
  {
    id: 'royal-gold',
    name: 'Royal Midnight & Gold (Luxury Cosmetic)',
    urduTitle: 'اوپشن ۲: رائل گولڈ (لگژری وینیرز)',
    badge: 'High-End Luxury',
    description: 'Executive Slate/Navy paired with Champagne Amber Gold. Emits high-end luxury cosmetic aesthetics.',
    primaryColor: '#0f172a',
    accentColor: '#d97706',
    bgPreview: '#fafaf9',
    bestFor: 'Porcelain Veneers, Smile Makeovers & Celebrity Smiles',
    gradient: 'from-slate-900 to-amber-600',
  },
  {
    id: 'mint-emerald',
    name: 'Mint & Emerald (Zen Dental Spa)',
    urduTitle: 'اوپشن ۳: منٹ ایمرلڈ (ڈینٹل اسپا)',
    badge: 'Anxiety-Free',
    description: 'Soothing organic Herbal Mint & Deep Emerald. Drastically lowers dental fear and anxiety.',
    primaryColor: '#0f766e',
    accentColor: '#10b981',
    bgPreview: '#f6fbf9',
    bestFor: 'Anxiety-free clinics, Holistic dental care, Sedation',
    gradient: 'from-teal-700 to-emerald-500',
  },
  {
    id: 'sapphire-ice',
    name: 'Sapphire & Cobalt (Modern Tech)',
    urduTitle: 'اوپشن ۴: نیوی و سیفائر (ہائی ٹیک)',
    badge: '3D Guided Tech',
    description: 'Vibrant Tech Sapphire & Electric Cobalt Blue. Highlights high-tech surgical implants and 3D precision.',
    primaryColor: '#2563eb',
    accentColor: '#4f46e5',
    bgPreview: '#f8faff',
    bestFor: 'Digital 3D Guided Implants, AI diagnostics & Laser surgery',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'rose-aesthetic',
    name: 'Rose & Orchid (Aesthetic Gentle)',
    urduTitle: 'اوپشن ۵: روز و آرکڈ (فیملی کیئر)',
    badge: 'Warm & Friendly',
    description: 'Gentle Rose Plum & Soft Coral Orchid. Soft, welcoming, non-intimidating and warm for families.',
    primaryColor: '#be185d',
    accentColor: '#db2777',
    bgPreview: '#fffbfd',
    bestFor: 'Gentle Family Dentistry, Aesthetic Smile Sculpting',
    gradient: 'from-pink-700 to-rose-500',
  },
];

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeThemeObj = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <>
      {/* Floating Theme Launcher Bar - Mobile & Desktop accessible */}
      <div className="fixed top-20 right-3 sm:top-24 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="theme-switcher-toggle"
          className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/90 hover:border-slate-300 text-slate-800 text-xs font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer group"
          title="Change Color Theme / رنگ تھیم منتخب کریں"
        >
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center text-white shadow-xs"
            style={{
              background: `linear-gradient(135deg, ${activeThemeObj.primaryColor}, ${activeThemeObj.accentColor})`,
            }}
          >
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>

          <span className="hidden sm:inline">Color Theme:</span>
          <span className="font-extrabold text-slate-900 max-w-[120px] truncate">
            {activeThemeObj.name.split('(')[0].trim()}
          </span>

          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold group-hover:bg-slate-200">
            5 Options
          </span>
        </button>
      </div>

      {/* Expanded Theme Selection Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    Choose Your Color Theme / رنگ تھیم منتخب کریں
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any palette below to preview how the dental funnel looks in real-time.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
                aria-label="Close theme selector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Theme Options List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-50 border-slate-900 ring-2 ring-slate-900/10 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Color Preview Swatch */}
                      <div
                        className="w-12 h-12 rounded-2xl shrink-0 shadow-sm border border-black/10 flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`,
                        }}
                      >
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                            {theme.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                            {theme.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                          {theme.description}
                        </p>

                        <div className="text-[11px] text-slate-500 font-medium pt-0.5">
                          <strong className="text-slate-700">Best for:</strong> {theme.bestFor}
                        </div>
                      </div>
                    </div>

                    {/* Select / Active Button */}
                    <div className="sm:shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onThemeChange(theme.id);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ Active Theme' : 'Apply Live Preview'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer advice */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span>You can test any theme now and let me know your favorite in the chat!</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
