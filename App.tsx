
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Wifi, 
  Battery, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ArrowLeft,
  Coffee,
  UtensilsCrossed,
  Pizza,
  IceCream,
  RotateCcw,
  Leaf,
  ShoppingBag,
  Star,
  CameraOff
} from 'lucide-react';
import { SAMPLE_RESTAURANTS } from './constants';
import { MenuItem, MenuCategory, Restaurant } from './types';

// --- AR Background Component ---

const CameraBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or unavailable:", err);
        setError("Optical Sensors Offline");
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 bg-[#010409] flex flex-col items-center justify-center gap-4">
        <CameraOff size={48} className="text-red-500/50" />
        <span className="text-red-500/50 font-orbitron text-xs tracking-widest">{error}</span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010409_100%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover opacity-60 grayscale-[0.2] brightness-75"
      />
      {/* HUD Vignette / Color Grade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/80 via-transparent to-[#010409]/40" />
      <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay" />
    </div>
  );
};

// --- Sub-components ---

const RatingDisplay: React.FC<{ rating: number; size?: number }> = ({ rating, size = 12 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          size={size} 
          className={`${star <= Math.round(rating) ? 'fill-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-cyan-500/20'}`} 
        />
      ))}
      <span className="ml-2 text-[10px] font-mono text-cyan-400/60">({rating.toFixed(1)})</span>
    </div>
  );
};

const HUDFrame: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-cyan-500/50 rounded-br-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]" />

      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40">
        <div className="h-64 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent relative">
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -left-1 w-3 h-1 bg-cyan-400 shadow-[0_0_8px_cyan]"
          />
        </div>
        <div className="flex flex-col gap-2 text-[8px] font-mono">
          <span>LAT: 34.0522 N</span>
          <span>LNG: 118.2437 W</span>
          <span>ALT: 42M</span>
        </div>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-12 text-xs font-orbitron text-cyan-400 tracking-widest bg-slate-900/40 backdrop-blur-xl py-3 px-8 rounded-full border border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Activity size={14} className="animate-pulse" />
          <span>SYSTEM: AR_LINK</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={14} />
          <span>SIGNAL: OPTIMAL</span>
        </div>
        <div className="flex items-center gap-2">
          <Battery size={14} />
          <span>CHARGE: 88%</span>
        </div>
      </div>
    </div>
  );
};

const RestaurantCard: React.FC<{ 
  restaurant: Restaurant; 
  active: boolean; 
  onClick: () => void;
}> = ({ restaurant, active, onClick }) => {
  const featureItem = restaurant.menu[0];
  
  return (
    <motion.div
      onClick={onClick}
      className={`
        relative w-72 h-96 flex-shrink-0 cursor-pointer overflow-hidden border-x border-cyan-500/20 transition-all duration-300
        ${active ? 'opacity-100 z-20 scale-100 shadow-[0_0_40px_rgba(6,182,212,0.15)]' : 'opacity-40 z-10 scale-95 grayscale-[0.8]'}
      `}
      whileHover={active ? { scale: 1.02 } : { opacity: 0.6 }}
    >
      <img src={featureItem?.image} alt={restaurant.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[9px] font-orbitron bg-cyan-500/40 px-2 py-0.5 rounded border border-cyan-500/50 backdrop-blur-md text-white">
            {restaurant.distance}
          </span>
          <div className="flex items-center gap-1">
            <Zap size={10} className="fill-cyan-500 text-cyan-500" />
            <span className="text-[10px] font-bold tracking-tighter text-cyan-400">SEC_{restaurant.location}</span>
          </div>
        </div>
        <h3 className="text-2xl font-orbitron font-black text-white mb-1 uppercase leading-[0.85] tracking-tighter italic">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-[9px] text-cyan-400 font-mono tracking-[0.2em] uppercase">{restaurant.category}</p>
          <RatingDisplay rating={featureItem?.rating || 4.5} size={8} />
        </div>
        
        {active && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             className="flex items-center justify-between mt-2 pt-2 border-t border-cyan-500/30"
           >
             <span className="text-[10px] font-bold text-cyan-500/60 font-mono uppercase tracking-widest">Est. Access: Immediate</span>
             <button className="bg-cyan-500 hover:bg-white text-black px-4 py-1.5 rounded-sm text-[10px] font-black uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
               Enter
             </button>
           </motion.div>
        )}
      </div>

      {active && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
        </>
      )}
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeResIdx, setActiveResIdx] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeLayer, setActiveLayer] = useState<MenuCategory>('MAIN');
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Computed data for terminal view
  const categoryItems = useMemo(() => {
    if (!selectedRestaurant) return [];
    const items = selectedRestaurant.menu.filter(item => item.itemCategory === activeLayer);
    if (items.length === 0 && selectedRestaurant.menu.length > 0) {
      return [selectedRestaurant.menu[0]];
    }
    return items;
  }, [selectedRestaurant, activeLayer]);

  useEffect(() => {
    if (selectedRestaurant) {
      const firstAvailableCategory = selectedRestaurant.menu[0]?.itemCategory || 'MAIN';
      setActiveLayer(firstAvailableCategory);
      setActiveItemIdx(0);
    }
  }, [selectedRestaurant]);

  const currentItem = categoryItems[activeItemIdx] || null;

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidthWithGap = 288 + 16;
    const index = Math.round(scrollLeft / cardWidthWithGap);
    if (index !== activeResIdx && index >= 0 && index < SAMPLE_RESTAURANTS.length) {
      setActiveResIdx(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidthWithGap = 288 + 16;
    carouselRef.current.scrollTo({
      left: index * cardWidthWithGap,
      behavior: 'smooth'
    });
    setActiveResIdx(index);
  };

  const layers: { id: MenuCategory; icon: React.ReactNode; label: string }[] = [
    { id: 'MAIN', icon: <UtensilsCrossed size={16} />, label: 'MAIN COURSE' },
    { id: 'SALAD', icon: <Leaf size={16} />, label: 'GREENS / SALAD' },
    { id: 'SIDES', icon: <Pizza size={16} />, label: 'ALA CART / SIDES' },
    { id: 'DRINK', icon: <Coffee size={16} />, label: 'HYDRATION' },
    { id: 'SWEET', icon: <IceCream size={16} />, label: 'DESSERT OPS' },
    { id: 'MERCH', icon: <ShoppingBag size={16} />, label: 'HARDWARE / GEAR' },
  ];

  const cycleItem = () => {
    if (categoryItems.length <= 1) return;
    setActiveItemIdx((prev) => (prev + 1) % categoryItems.length);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-cyan-50 font-mono">
      <CameraBackground />
      <HUDFrame />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      {/* Main UI */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Film Roll Decor */}
        <div className="absolute top-[calc(50%-230px)] left-0 w-full flex justify-center gap-4 opacity-10 pointer-events-none overflow-hidden">
           {Array.from({length: 15}).map((_, i) => (
             <div key={i} className="min-w-[48px] h-4 border border-cyan-500/40 rounded-sm" />
           ))}
        </div>

        {/* Active Title */}
        <div className="absolute top-24 text-center px-4 w-full pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeResIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-orbitron text-cyan-500/60 mb-2 tracking-[0.4em] uppercase">AR_TARGET_LOCKED</span>
              <h2 className="text-3xl md:text-5xl font-orbitron font-black tracking-[0.2em] text-cyan-400 mb-1 uppercase italic leading-none drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                {SAMPLE_RESTAURANTS[activeResIdx].name}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Roller Deck Carousel */}
        <div className="relative w-full h-[450px] flex items-center justify-center" style={{ perspective: '1500px' }}>
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-144px)] h-full no-scrollbar pt-8"
            style={{ 
              transformStyle: 'preserve-3d',
              maskImage: 'linear-gradient(90deg, transparent, black 30%, black 70%, transparent)'
            }}
          >
            {SAMPLE_RESTAURANTS.map((res, idx) => {
              const isActive = activeResIdx === idx;
              const offset = idx - activeResIdx;
              const rotationY = offset * 18; 
              const translateZ = Math.abs(offset) * -220;
              const translateX = offset * -25;
              const skewY = offset * -1.2;

              return (
                <div key={res.id} className="snap-center" style={{ transformStyle: 'preserve-3d' }}>
                  <motion.div
                    animate={{ rotateY: rotationY, z: translateZ, x: translateX, skewY: skewY }}
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <RestaurantCard 
                      restaurant={res} 
                      active={isActive}
                      onClick={() => setSelectedRestaurant(res)}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => scrollToIndex(Math.max(0, activeResIdx - 1))} 
          className="absolute left-10 p-4 border border-cyan-500/20 text-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all z-40 backdrop-blur-xl"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={() => scrollToIndex(Math.min(SAMPLE_RESTAURANTS.length - 1, activeResIdx + 1))} 
          className="absolute right-10 p-4 border border-cyan-500/20 text-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all z-40 backdrop-blur-xl"
        >
          <ChevronRight size={32} />
        </button>

        {/* Bottom Bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-20 bg-black/40 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl flex items-center justify-between px-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[7px] text-cyan-500/50 uppercase font-black tracking-widest mb-1">TERMINAL</span>
                <span className="text-xs font-orbitron text-white">#V_{activeResIdx + 1}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] text-cyan-500/50 uppercase font-black tracking-widest mb-1">CATEGORY</span>
                <span className="text-xs font-orbitron text-white">{SAMPLE_RESTAURANTS[activeResIdx].category}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setSelectedRestaurant(SAMPLE_RESTAURANTS[activeResIdx])}
                className="bg-cyan-500 text-black px-12 py-3 rounded-sm font-orbitron text-[10px] font-black tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase italic"
              >
                ACCESS FEED
              </button>
           </div>
        </div>
      </main>

      {/* Full Menu Terminal Overlay */}
      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-[12px] overflow-hidden"
          >
            {/* Top Navigation */}
            <motion.button 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-10 left-10 z-[110] flex items-center gap-4 bg-cyan-500/10 border border-cyan-500/30 px-8 py-4 rounded-sm hover:bg-cyan-400 hover:text-black transition-all group backdrop-blur-md"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-orbitron text-[10px] font-black tracking-[0.4em] uppercase">ABORT FEED / RETURN TO AR</span>
            </motion.button>

            <motion.button 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-10 right-10 z-[110] p-4 bg-black/40 border border-cyan-500/20 text-cyan-400 hover:text-white transition-colors rounded-full backdrop-blur-md"
            >
              <X size={28} />
            </motion.button>

            {/* Menu Terminal Content */}
            <motion.div 
              initial={{ scale: 0.85, y: 100, rotateX: 15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, y: 100, rotateX: 15 }}
              className="relative w-full max-w-7xl h-full md:h-auto bg-[#0a0f14]/85 border border-cyan-500/20 rounded-none md:rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              {/* Internal Category Layer Selector */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] flex flex-col gap-4">
                {layers.map((layer) => {
                  const itemsInCategory = selectedRestaurant.menu.filter(m => m.itemCategory === layer.id);
                  if (itemsInCategory.length === 0) return null;

                  const isActive = activeLayer === layer.id;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setActiveLayer(layer.id);
                        setActiveItemIdx(0);
                      }}
                      className={`group relative flex items-center transition-all duration-300 ${isActive ? 'translate-x-4' : ''}`}
                    >
                      <div className={`p-4 rounded-full border transition-all ${isActive ? 'bg-cyan-500 text-black border-cyan-400 scale-110 shadow-[0_0_30px_rgba(6,182,212,0.6)]' : 'border-cyan-500/20 text-cyan-500/40 hover:border-cyan-500/60 bg-black/40 backdrop-blur-md'}`}>
                        {layer.icon}
                      </div>
                      <span className={`ml-4 font-orbitron text-[9px] font-black tracking-widest transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                        {layer.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Item Display Area */}
              <div 
                className="relative h-[45vh] md:h-[700px] cursor-pointer group"
                onClick={cycleItem}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentItem?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    src={currentItem?.image} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] via-transparent to-[#0a0f14]/40 md:bg-gradient-to-r" />
                
                {/* Item Navigation Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                   {categoryItems.map((_, i) => (
                     <div key={i} className={`h-1 rounded-full transition-all ${i === activeItemIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-cyan-500/20'}`} />
                   ))}
                </div>
                
                <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                   <span className="bg-cyan-500 text-black text-[9px] px-3 py-1 font-black tracking-widest rounded-sm uppercase italic">Tap Feed to Cycle</span>
                   <span className="text-[10px] text-cyan-400/60 font-mono">SCAN_PT: {activeItemIdx + 1} / {categoryItems.length}</span>
                </div>
              </div>

              {/* Info Details Area */}
              <div className="p-10 md:p-16 flex flex-col gap-8 md:pl-24 bg-black/20 backdrop-blur-sm">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-500/40 font-orbitron text-[11px] tracking-[0.6em] block uppercase italic">{selectedRestaurant.name} // {activeLayer}</span>
                    <button onClick={() => setActiveItemIdx(0)} className="text-cyan-500/20 hover:text-cyan-400 transition-colors"><RotateCcw size={16}/></button>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="mb-4">
                         <RatingDisplay rating={currentItem?.rating || 4.5} size={16} />
                      </div>
                      <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white italic leading-[0.85] mb-6 uppercase tracking-tighter">
                        {currentItem?.name || 'OUT OF STOCK'}
                      </h2>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {currentItem?.tags.map(t => (
                          <span key={t} className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 text-[9px] text-cyan-400 rounded-sm font-bold tracking-[0.3em] uppercase italic backdrop-blur-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-cyan-100/70 leading-loose font-light text-base italic border-l-4 border-cyan-500/40 pl-8 py-4 bg-gradient-to-r from-cyan-500/10 to-transparent">
                        "{currentItem?.description}"
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-auto pt-10 border-t border-cyan-500/20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-cyan-500/40 block mb-3 font-black uppercase tracking-[0.5em]">VALUATION</span>
                    <span className="text-6xl font-orbitron font-black text-white leading-none tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{currentItem?.price}</span>
                  </div>
                  <button className="w-full md:w-auto bg-cyan-400 text-black px-16 py-6 rounded-sm font-orbitron font-black text-[13px] hover:bg-white transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] uppercase tracking-[0.3em] active:scale-95 italic">
                    CONFIRM SELECTION
                  </button>
                </div>
              </div>
              
              <div className="absolute top-10 right-10 text-cyan-500/5 pointer-events-none">
                <Target size={300} strokeWidth={0.5} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
