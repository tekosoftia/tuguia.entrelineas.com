import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Settings, 
  Heart, 
  Droplets, 
  CheckCircle2, 
  Bell,
  Moon,
  Sun,
  Coffee,
  Info,
  ChevronRight,
  ArrowLeft,
  Smile,
  Frown,
  Meh,
  User,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { format, addDays, differenceInDays, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from './lib/utils';
import { Cycle, Mood, MoodLog, UserSettings, AppTheme } from './types';
import { EDUCATION_CONTENT, MOODS, HYGIENE_METHODS, HygieneMethod, THEMES } from './constants';

// Mock Data for Initial State
const INITIAL_CYCLES: Cycle[] = [
  { id: '1', startDate: '2026-03-01', endDate: '2026-03-05', isPrediction: false },
  { id: '2', startDate: '2026-03-28', endDate: '2026-04-01', isPrediction: true },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'edu' | 'settings'>('home');
  const [cycles, setCycles] = useState<Cycle[]>(INITIAL_CYCLES);
  const [isPeriodActive, setIsPeriodActive] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    schoolMode: false,
    reminderInterval: 4,
    onboardingComplete: false,
    theme: 'luna',
  });
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [lastChangeTime, setLastChangeTime] = useState<Date>(new Date());
  const [nextChangeTime, setNextChangeTime] = useState<Date>(addDays(new Date(), 0)); // Will update in useEffect

  useEffect(() => {
    const next = new Date(lastChangeTime.getTime() + settings.reminderInterval * 60 * 60 * 1000);
    setNextChangeTime(next);
  }, [lastChangeTime, settings.reminderInterval]);

  const [selectedArticle, setSelectedArticle] = useState<typeof EDUCATION_CONTENT[0] | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<HygieneMethod | null>(null);
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  const handleOnboardingNext = () => setOnboardingStep(prev => prev + 1);
  const handleOnboardingBack = () => setOnboardingStep(prev => prev - 1);
  const finishOnboarding = () => setSettings(prev => ({ ...prev, onboardingComplete: true }));

  const filteredArticles = EDUCATION_CONTENT.filter(a => !settings.age || a.minAge <= settings.age);
  const filteredMethods = HYGIENE_METHODS.filter(m => !settings.age || m.minAge <= settings.age);

  const handleMoodSelect = (mood: Mood) => {
    setCurrentMood(mood);
    // In a real app, this would save to Firestore/SQLite
  };

  const handleChanged = () => {
    setLastChangeTime(new Date());
  };

  const getAffirmation = () => {
    if (currentMood === 'sensitive') return "Está bien llorar un poquito, tus emociones son importantes.";
    if (currentMood === 'tired') return "Tu cuerpo está trabajando duro, tómate un descanso extra.";
    if (currentMood === 'happy') return "¡Qué alegría verte brillar hoy! Disfruta tu energía.";
    return "Eres fuerte, eres valiente y tu cuerpo está haciendo algo maravilloso hoy.";
  };

  const togglePeriod = () => {
    setIsPeriodActive(!isPeriodActive);
    if (!isPeriodActive) {
      const newCycle: Cycle = {
        id: Date.now().toString(),
        startDate: format(new Date(), 'yyyy-MM-dd'),
        isPrediction: false
      };
      setCycles([...cycles, newCycle]);
    }
  };

  const currentTheme = THEMES.find(t => t.id === settings.theme) || THEMES[0];

  if (!settings.onboardingComplete) {
    return (
      <div 
        className="min-h-screen flex flex-col p-8 animate-in fade-in duration-700"
        style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
      >
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
          {onboardingStep === 1 && (
            <div className="space-y-6 text-center animate-in slide-in-from-bottom-8 duration-500">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white shadow-lg"
                style={{ backgroundColor: currentTheme.primary }}
              >
                <Sparkles size={40} />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold">¡Hola! Soy Luna</h1>
                <p className="opacity-70">Estoy aquí para acompañarte en esta nueva etapa. ¿Cómo te llamas?</p>
              </div>
              <input 
                type="text" 
                placeholder="Tu nombre o apodo"
                className="w-full p-4 rounded-2xl border border-[#E5E5E0] bg-white focus:outline-none focus:ring-2"
                style={{ borderColor: '#E5E5E0' }}
                value={settings.name || ''}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              />
              <button 
                onClick={handleOnboardingNext}
                className="w-full py-4 text-white rounded-2xl font-medium shadow-md active:scale-95 transition-all"
                style={{ backgroundColor: currentTheme.primary }}
              >
                Continuar
              </button>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-serif font-bold">¿Cuántos años tienes?</h2>
              <p className="opacity-70">Esto me ayuda a darte los mejores consejos para tu edad.</p>
              <div className="grid grid-cols-3 gap-3">
                {[9, 10, 11, 12, 13, 14].map(age => (
                  <button
                    key={age}
                    onClick={() => setSettings({ ...settings, age })}
                    className={cn(
                      "py-4 rounded-2xl border transition-all font-medium",
                      settings.age === age ? "text-white" : "bg-white"
                    )}
                    style={{ 
                      backgroundColor: settings.age === age ? currentTheme.primary : 'white',
                      borderColor: settings.age === age ? currentTheme.primary : '#E5E5E0',
                      color: settings.age === age ? 'white' : currentTheme.text
                    }}
                  >
                    {age}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleOnboardingBack} 
                  className="flex-1 py-4 border rounded-2xl font-medium"
                  style={{ borderColor: '#E5E5E0' }}
                >
                  Atrás
                </button>
                <button 
                  onClick={finishOnboarding} 
                  className="flex-1 py-4 text-white rounded-2xl font-medium shadow-md"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  ¡Empezar!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen font-sans pb-24 transition-colors duration-500"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Header */}
      <header 
        className="p-6 flex justify-between items-center backdrop-blur-sm sticky top-0 z-10"
        style={{ backgroundColor: `${currentTheme.bg}80` }}
      >
        <div>
          <h1 className="text-2xl font-serif font-bold" style={{ color: currentTheme.primary }}>Luna</h1>
          <p className="text-xs uppercase tracking-widest opacity-60">Tu guía segura</p>
        </div>
        <div className="flex gap-2">
          {settings.name && (
            <div 
              className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${currentTheme.primary}15` }}
            >
              <User size={12} />
              <span>{settings.name}</span>
            </div>
          )}
          <button 
            onClick={() => setActiveTab('settings')}
            className="p-2 rounded-full bg-white shadow-sm border"
            style={{ borderColor: '#E5E5E0' }}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="px-6 max-w-md mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Period Status Card */}
            <section 
              className="p-8 rounded-[32px] shadow-sm border transition-all duration-500"
              style={{ 
                backgroundColor: isPeriodActive ? `${currentTheme.accent}20` : 'white',
                borderColor: isPeriodActive ? currentTheme.accent : '#E5E5E0'
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-serif font-semibold mb-1">
                    {isPeriodActive 
                      ? `${settings.name ? settings.name + ', t' : 'T'}u periodo está activo` 
                      : `Hola ${settings.name || ''} 💛`}
                  </h2>
                  <p className="text-sm opacity-70">
                    {isPeriodActive ? "Día 2 de tu ciclo" : "Todo está tranquilo por aquí"}
                  </p>
                </div>
                <div 
                  className={cn(
                    "p-3 rounded-full transition-all duration-500",
                    isPeriodActive ? "text-white animate-pulse" : "bg-[#E5E5E0] text-[#8E8E80]"
                  )}
                  style={{ backgroundColor: isPeriodActive ? currentTheme.accent : '#E5E5E0' }}
                >
                  <Droplets size={24} />
                </div>
              </div>

              <button 
                onClick={togglePeriod}
                className={cn(
                  "w-full py-4 rounded-2xl font-medium transition-all active:scale-95",
                  isPeriodActive ? "bg-white border" : "text-white"
                )}
                style={{ 
                  backgroundColor: isPeriodActive ? 'white' : currentTheme.primary,
                  borderColor: isPeriodActive ? currentTheme.accent : 'transparent',
                  color: isPeriodActive ? currentTheme.accent : 'white'
                }}
              >
                {isPeriodActive ? "Terminar periodo" : "Empezó mi periodo"}
              </button>
            </section>

            {/* Mood Tracker */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold opacity-60 px-1">¿Cómo te sientes hoy?</h3>
              <div className="flex justify-between gap-2 overflow-x-auto pb-2 no-scrollbar">
                {MOODS.map((m) => (
                  <button
                    key={m.type}
                    onClick={() => handleMoodSelect(m.type as Mood)}
                    className={cn(
                      "flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border",
                      currentMood === m.type 
                        ? "text-white scale-105 shadow-md" 
                        : "bg-white border-[#E5E5E0] hover:bg-[#F5F2ED]"
                    )}
                    style={{ 
                      backgroundColor: currentMood === m.type ? currentTheme.primary : 'white',
                      borderColor: currentMood === m.type ? currentTheme.primary : '#E5E5E0'
                    }}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-[10px] font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Hygiene Reminder */}
            {isPeriodActive && (
              <section className="bg-[#151619] text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 opacity-70">
                    <Bell size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-mono">
                      {settings.schoolMode ? "Recordatorio de Hidratación" : "Recordatorio de Higiene"}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm opacity-60 mb-1">
                      {settings.schoolMode ? "Siguiente toma en:" : "Próximo cambio en:"}
                    </p>
                    <p className="text-4xl font-serif font-light">
                      {format(nextChangeTime, 'HH:mm')}
                    </p>
                  </div>

                  <button 
                    onClick={handleChanged}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors w-full justify-center"
                  >
                    <CheckCircle2 size={20} className="text-[#00FF00]" />
                    <span className="text-sm font-medium">
                      {settings.schoolMode ? "Ya tomé agua" : "Ya me cambié"}
                    </span>
                  </button>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-white/5 rounded-full" />
              </section>
            )}

            {/* Daily Affirmation */}
            <section className="bg-[#F5F2ED] p-6 rounded-[32px] border border-[#E5E5E0] italic text-center">
              <Heart size={20} className="mx-auto mb-3 text-[#FF8080]" />
              <p className="text-[#5A5A40] opacity-80">
                "{getAffirmation()}"
              </p>
            </section>

            {/* Quick Tips */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-[24px] border border-[#E5E5E0] flex flex-col items-center text-center">
                <Coffee size={24} className="mb-2 text-[#8B4513]" />
                <span className="text-xs font-medium">Té de manzanilla</span>
                <span className="text-[10px] opacity-60">Para los cólicos</span>
              </div>
              <div className="bg-white p-5 rounded-[24px] border border-[#E5E5E0] flex flex-col items-center text-center">
                <Moon size={24} className="mb-2 text-[#483D8B]" />
                <span className="text-xs font-medium">Descanso</span>
                <span className="text-[10px] opacity-60">Duerme 8 horas</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif font-bold">Tu Calendario</h2>
            <div className="bg-white p-6 rounded-[32px] border border-[#E5E5E0] shadow-sm">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                  <div key={`${d}-${i}`} className="text-center text-[10px] font-bold opacity-40">{d}</div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const isPeriod = day >= 1 && day <= 5;
                  const isPrediction = day >= 28;
                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-full text-sm transition-all",
                        isPeriod ? "text-white" : "",
                        isPrediction ? "border-2 border-dashed" : "",
                        !isPeriod && !isPrediction ? "hover:bg-[#F5F2ED]" : ""
                      )}
                      style={{ 
                        backgroundColor: isPeriod ? currentTheme.accent : 'transparent',
                        borderColor: isPrediction ? `${currentTheme.accent}80` : 'transparent',
                        color: isPeriod ? 'white' : (isPrediction ? currentTheme.accent : 'inherit')
                      }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-6 text-[10px] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                  <span>Periodo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-dashed" style={{ borderColor: `${currentTheme.accent}80` }} />
                  <span>Predicción</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edu' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {selectedArticle ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 font-medium"
                  style={{ color: currentTheme.primary }}
                >
                  <ArrowLeft size={20} />
                  <span>Volver</span>
                </button>
                <div className="space-y-6">
                  <div className="rounded-[32px] overflow-hidden border border-[#E5E5E0] aspect-video w-full">
                    <img 
                      src={`https://picsum.photos/seed/luna-article-${selectedArticle.id}/800/450`} 
                      alt={selectedArticle.title} 
                      className="w-full h-full object-cover"
                      style={{ filter: 'sepia(0.1) saturate(0.9) brightness(1.05)' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h2 className="text-3xl font-serif font-bold leading-tight">{selectedArticle.title}</h2>
                  <div className="prose prose-stone">
                    {selectedArticle.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-[#4A4A40] opacity-80 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-[#F5F2ED] rounded-3xl border border-[#E5E5E0]">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Consejo de Luna</p>
                  <p className="text-sm italic">"Recuerda que siempre puedes hablar con un adulto de confianza si tienes dudas."</p>
                </div>
              </div>
            ) : selectedMethod ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <button 
                  onClick={() => setSelectedMethod(null)}
                  className="flex items-center gap-2 font-medium"
                  style={{ color: currentTheme.primary }}
                >
                  <ArrowLeft size={20} />
                  <span>Volver</span>
                </button>
                
                <div className="space-y-6">
                  <div className="rounded-[32px] overflow-hidden border border-[#E5E5E0] aspect-video w-full">
                    <img 
                      src={selectedMethod.mainImage} 
                      alt={selectedMethod.title} 
                      className="w-full h-full object-cover"
                      style={{ filter: 'sepia(0.1) saturate(0.9) brightness(1.05)' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold leading-tight">{selectedMethod.title}</h2>
                    <p className="opacity-70">{selectedMethod.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider opacity-40">Ventajas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMethod.advantages.map((adv, i) => (
                        <span key={i} className="px-3 py-1 bg-[#E8F5E9] text-green-800 rounded-full text-xs font-medium">{adv}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm uppercase tracking-wider opacity-40">Guía Paso a Paso</h3>
                      <span className="text-[10px] opacity-30 italic">* Imágenes ilustrativas</span>
                    </div>
                    <div className="space-y-8">
                      {selectedMethod.steps.map((step, i) => (
                        <div key={i} className="space-y-4">
                          <img 
                            src={step.imageUrl} 
                            alt={step.title} 
                            className="w-full h-48 object-cover rounded-3xl shadow-sm border border-[#E5E5E0]"
                            style={{ filter: 'sepia(0.1) saturate(0.9) brightness(1.05)' }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                              style={{ backgroundColor: currentTheme.primary }}
                            >
                              {i + 1}
                            </div>
                            <h4 className="font-bold">{step.title}</h4>
                          </div>
                          <p className="text-sm opacity-70 leading-relaxed">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-[#FFF3E0] rounded-3xl border border-[#FFE0B2]">
                    <h4 className="font-bold text-sm mb-2">💡 Recomendaciones de Higiene</h4>
                    <ul className="space-y-2">
                      {selectedMethod.hygieneTips.map((tip, i) => (
                        <li key={i} className="text-sm opacity-80 flex gap-2">
                          <span>•</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif font-bold">Aprende más</h2>
                
                <div className="space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Métodos de Higiene</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredMethods.map((method) => (
                        <button 
                          key={method.id} 
                          onClick={() => setSelectedMethod(method)}
                          className="w-full text-left p-6 rounded-[24px] bg-white border border-[#E5E5E0] transition-all flex items-center justify-between group"
                          style={{ borderColor: '#E5E5E0' }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = currentTheme.primary}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E0'}
                        >
                          <div className="flex items-center gap-4">
                            <div 
                              className="p-3 rounded-2xl transition-colors group-hover:text-white"
                              style={{ backgroundColor: '#F5F2ED' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.primary}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F2ED'}
                            >
                              {method.icon === 'droplets' && <Droplets size={24} />}
                              {method.icon === 'info' && <Info size={24} />}
                              {method.icon === 'moon' && <Moon size={24} />}
                            </div>
                            <div>
                              <h4 className="font-bold">{method.title}</h4>
                              <p className="text-xs opacity-60">Guía paso a paso</p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="opacity-30" />
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Artículos</h3>
                    <div className="space-y-4">
                      {filteredArticles.map((item) => (
                        <button 
                          key={item.id} 
                          onClick={() => setSelectedArticle(item)}
                          className="w-full text-left p-6 rounded-[24px] bg-white border border-[#E5E5E0] transition-all group"
                          style={{ borderColor: '#E5E5E0' }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = currentTheme.primary}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E5E0'}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div 
                              className="p-2 rounded-xl transition-colors group-hover:text-white"
                              style={{ backgroundColor: '#F5F2ED' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.primary}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F2ED'}
                            >
                              {item.icon === 'info' && <Info size={20} />}
                              {item.icon === 'droplets' && <Droplets size={20} />}
                              {item.icon === 'coffee' && <Coffee size={20} />}
                            </div>
                            <ChevronRight size={16} className="opacity-30" />
                          </div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm opacity-60 line-clamp-2">{item.excerpt}</p>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif font-bold">Configuración</h2>
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 px-1">Personalización</h3>
              <div className="bg-white rounded-[32px] border border-[#E5E5E0] overflow-hidden">
                <div className="p-6 space-y-4">
                  <p className="font-medium">Tema de la app</p>
                  <div className="grid grid-cols-5 gap-3">
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSettings({ ...settings, theme: theme.id as AppTheme })}
                        className={cn(
                          "aspect-square rounded-full border-2 transition-all flex items-center justify-center",
                          settings.theme === theme.id ? "scale-110" : "opacity-60 hover:opacity-100"
                        )}
                        style={{ 
                          backgroundColor: theme.bg, 
                          borderColor: settings.theme === theme.id ? theme.primary : '#E5E5E0' 
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: theme.primary }}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-center opacity-40 uppercase tracking-widest">
                    {currentTheme.label}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 px-1">Preferencias</h3>
              <div className="bg-white rounded-[32px] border border-[#E5E5E0] overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-[#F5F2ED]">
                  <div>
                    <p className="font-medium">Modo Colegio</p>
                    <p className="text-xs opacity-60">Notificaciones discretas</p>
                  </div>
                  <button 
                    onClick={() => setSettings({ ...settings, schoolMode: !settings.schoolMode })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      settings.schoolMode ? "" : "bg-[#E5E5E0]"
                    )}
                    style={{ backgroundColor: settings.schoolMode ? currentTheme.primary : '#E5E5E0' }}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      settings.schoolMode ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Intervalo de cambio</p>
                    <p className="text-xs opacity-60">Cada {settings.reminderInterval} horas</p>
                  </div>
                  <select 
                    value={settings.reminderInterval}
                    onChange={(e) => setSettings({ ...settings, reminderInterval: Number(e.target.value) })}
                    className="bg-[#F5F2ED] border-none rounded-lg px-3 py-1 text-sm"
                  >
                    <option value={3}>3h</option>
                    <option value={4}>4h</option>
                    <option value={5}>5h</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t px-6 py-4 flex justify-around items-center z-20"
        style={{ backgroundColor: `${currentTheme.bg}CC`, borderColor: '#E5E5E0' }}
      >
        <button 
          onClick={() => setActiveTab('home')}
          className={cn("p-2 transition-all", activeTab === 'home' ? "scale-110" : "opacity-50")}
          style={{ color: activeTab === 'home' ? currentTheme.primary : '#8E8E80' }}
        >
          <Heart size={24} fill={activeTab === 'home' ? "currentColor" : "none"} />
        </button>
        <button 
          onClick={() => setActiveTab('calendar')}
          className={cn("p-2 transition-all", activeTab === 'calendar' ? "scale-110" : "opacity-50")}
          style={{ color: activeTab === 'calendar' ? currentTheme.primary : '#8E8E80' }}
        >
          <Calendar size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('edu')}
          className={cn("p-2 transition-all", activeTab === 'edu' ? "scale-110" : "opacity-50")}
          style={{ color: activeTab === 'edu' ? currentTheme.primary : '#8E8E80' }}
        >
          <BookOpen size={24} />
        </button>
      </nav>
    </div>
  );
}
