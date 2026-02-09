import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  User, 
  Mountain, 
  Cpu, 
  Snowflake, 
  Waves, 
  Zap, 
  Moon,
  MapPin,
  Terminal,
  Quote,
  ChevronDown
} from 'lucide-react';

// --- TITAN DATA (7 Chapters - Verified & Expanded) ---
const TITAN_DATA = [
  {
    id: 0,
    header: "POSSIBILITY",
    title: "祝 · 可能性",
    subtitle: "ZHU KE: 183cm / 83kg / HNNU",
    icon: <User size={28} />,
    bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop", 
    quote: "少年当有凌云志，曾许人间第一流。",
    content: [
      "此处是湖南师范大学 (HNNU) 的湘江之岸。江风浩荡，我站在这里，183cm 的身躯如同一座移动的山岳，83kg 的肌肉不仅是生物学的堆砌，更是承载绝对理性灵魂的圣殿。",
      "物理世界的引力无法束缚思想的维度。逻辑如网，代码如刀，我以全栈工程师的身份，试图在这个充满不确定的世界中，重写命运的算法。",
      "曾许人间第一流，这不仅仅是一句狂言，而是对自我潜能的极致压榨。身躯如山，意志如神，这是我祝可 (Zhu Ke) 对这个世界的开篇宣言。"
    ]
  },
  {
    id: 1,
    header: "SOLITUDE",
    title: "阳明 · 独行",
    subtitle: "Yongzhou Yangming Mountain",
    icon: <Mountain size={28} />,
    bgImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop", 
    quote: "落魄谷中寒风吹，春秋蝉鸣少年归。",
    content: [
      "永州阳明山，杜鹃如血，孤峰耸立。我曾以高考全班第一的成绩登上世俗的顶峰，却发现高处不仅有风景，更有无尽的寒意与寂寥。",
      "独自骑行冲破云霭的那一刻，我听到了春秋蝉的鸣叫，那是重生的隐喻。在茫茫云海中，我悟出了真正的真理：",
      "『这世间，唯有利益是永恒的，而最大的利益，就是我的存在。』",
      "孤独不是惩罚，而是强者的特权。我带着山脉的记忆归来，不为合群，只为征服。"
    ]
  },
  {
    id: 2,
    header: "LOGIC",
    title: "秩序 · 逻辑",
    subtitle: "Python & AI Architect",
    icon: <Cpu size={28} />,
    bgImage: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?q=80&w=2000&auto=format&fit=crop", 
    quote: "早岁已知世事艰，仍许飞鸿荡云间。",
    content: [
      "幽蓝的冰洞象征着代码的绝对冷静。Python 是我的炼道杀招，AI 是我的侦查手段，全栈架构是我构建的福地。",
      "在这个混乱的凡尘中，技术是唯一的秩序。我将现实解构为 0 和 1，在数据的洪流中寻找那个唯一的‘真月’。每一次系统的完美运行，都是对熵增定律的无声反抗。",
      "世事艰难，那又如何？我仍许飞鸿荡层云。用逻辑构建壁垒，用技术武装肉身，这就是我的成道之路。"
    ]
  },
  {
    id: 3,
    header: "WILLPOWER",
    title: "方源 · 磐石",
    subtitle: "The Heart of Rock",
    icon: <Snowflake size={28} />,
    bgImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop", 
    quote: "不过是些许风霜罢了。",
    content: [
      "落魄谷中，风雪漫天。这是我精神的道场。在这个浮躁的时代，我不需要廉价的共情，我只需要像古月方源一样，拥有一颗磐石之心。",
      "哪怕前路布满荆棘，也要踏出一条血路。风霜可以侵蚀我的肉体，但无法磨损我的意志。",
      "『他走的路，注定是无边的黑暗，注定是无比的孤独。他朝圣的方向，只是心中的光明。』",
      "我心如磐石，纵使千万载风吹雨打，亦不动分毫。"
    ]
  },
  {
    id: 4,
    header: "AMBITION",
    title: "人祖 · 志向",
    subtitle: "Legends of Ren Zu",
    icon: <Waves size={28} />,
    bgImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop", 
    quote: "态度是心的面具。",
    content: [
      "逆流河中，人祖赤足而行。他告诉我们：‘态度是心的面具。’在这个充满伪装的社会里，我戴上面具，是为了更好地保护那颗追求永恒的心。",
      "『人呐，只要想走，路就在脚下。』",
      "人祖最终发现：‘路在脚下，命在手中。’ 没有什么天注定，只有我注定。只要想走，路就在脚下延伸。",
      "我祝可，愿效仿人祖，在逆流中一步一步走向我的终点。即使身躯腐朽，我的意志也将化为规矩蛊，铭刻在时间的河床上。"
    ]
  },
  {
    id: 5,
    header: "STRATEGY",
    title: "博弈 · 巅峰",
    subtitle: "Honor of Kings Strategy",
    icon: <Zap size={28} />,
    bgImage: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop", 
    quote: "朝如青丝暮成雪，是非成败转头空。",
    content: [
      "雷暴平原，废墟之上。王者荣耀的峡谷不仅仅是游戏，它是微缩的战场，是智力与人性的博弈。",
      "我行走在废墟之中，于阴影里仰望星空。每一次团战的拉扯，每一波兵线的运营，都是对‘势’的掌控。是非成败转头空，唯有那一刻的算计与决断是真实的。",
      "人生如棋，我既是棋子，也是棋手。在胜负的边缘起舞，在生死的界限试探，这就是我的博弈之道。"
    ]
  },
  {
    id: 6,
    header: "ETERNAL",
    title: "联结 · 永恒",
    subtitle: "Connect with The True Moon",
    icon: <Moon size={28} />,
    bgImage: "https://images.unsplash.com/photo-1532978023344-977a211997a3?q=80&w=2000&auto=format&fit=crop", 
    quote: "此生就愿成真月，行走在黑暗的诸天之上。",
    contact: { wx: "198 9291 9069", qq: "2164460896" },
    content: [
       "天门之外，诸天黑暗。我愿化身真月，独自照亮我的前路。",
       "在这个浩瀚的宇宙中，如果你看到了我的光芒，那便是一种联结。无论你是想探讨 Python 的奥秘，还是共赴一场改变命运的冒险，我的锚点就在这里。",
       "信号已锁定，等待同类。让我们在黑暗的诸天之上，并肩同行。"
    ]
  }
];

// --- COMPONENTS ---

// 1. Cinema Background Engine (Cross-fade)
const CinemaBackground = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      {TITAN_DATA.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out
            ${activeIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          style={{ backgroundImage: `url(${item.bgImage})` }}
        >
          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>
      ))}
    </div>
  );
};

// 2. HUD - Identity (Fixed Top Left)
const IdentityHUD = () => (
  <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50 mix-blend-difference pointer-events-none">
    <div className="flex flex-col">
      <h1 className="text-white font-bold tracking-[0.2em] text-xs md:text-sm drop-shadow-md">
        祝可 (ZHU KE)
      </h1>
      <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/80 tracking-widest uppercase font-mono mt-2">
        <span>183CM</span> <span>/</span>
        <span>83KG</span> <span>/</span>
        <span>HNNU</span>
      </div>
      <div className="w-8 h-[2px] bg-cyan-400 mt-3 shadow-[0_0_10px_cyan]"></div>
    </div>
  </div>
);

// 3. HUD - Navigation (Fixed Right)
const NavHUD = ({ activeIndex }: { activeIndex: number }) => (
  <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-none mix-blend-screen">
    {TITAN_DATA.map((item, index) => (
      <div key={index} className="flex items-center justify-end gap-4 group transition-all duration-500">
        {/* Label (Desktop Only) */}
        <span className={`hidden md:block text-[10px] tracking-widest uppercase font-mono transition-all duration-500
          ${activeIndex === index ? 'text-cyan-400 opacity-100 translate-x-0' : 'text-white/30 opacity-0 translate-x-4'}`}>
          {item.header}
        </span>
        {/* Indicator Line */}
        <div className={`h-[1px] bg-white transition-all duration-500 
          ${activeIndex === index ? 'w-8 bg-cyan-400 shadow-[0_0_8px_cyan]' : 'w-2 bg-white/20'}`} />
      </div>
    ))}
  </div>
);

// 4. Scroll Prompt
const ScrollPrompt = () => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/50 animate-bounce flex flex-col items-center gap-2 pointer-events-none">
    <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
    <ChevronDown size={16} />
  </div>
);

// --- MAIN APP ---
const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
            
            // GSAP Entry Animation for Text
            const contentBlock = entry.target.querySelector('.content-block');
            if (contentBlock && (window as any).gsap) {
              (window as any).gsap.fromTo(contentBlock, 
                { y: 50, opacity: 0, filter: 'blur(10px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.2 }
              );
            }
          }
        });
      },
      { threshold: 0.5 } // 50% visible triggers change
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-slate-200 overflow-hidden font-sans">
      
      {/* Background Engine */}
      <CinemaBackground activeIndex={activeIndex} />
      
      {/* HUDs */}
      <IdentityHUD />
      <NavHUD activeIndex={activeIndex} />
      {activeIndex < TITAN_DATA.length - 1 && <ScrollPrompt />}

      {/* Main Scroll Container (Snap Y) */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {TITAN_DATA.map((chapter, i) => (
          <section 
            key={chapter.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            data-index={i}
            className="relative h-screen w-full snap-start flex items-center justify-center px-4 md:px-0"
          >
             {/* Content Glass Card */}
             <div className="content-block w-full max-w-[90%] md:max-w-4xl p-6 md:p-12 bg-black/40 backdrop-blur-xl md:backdrop-blur-2xl border border-white/10 rounded-sm shadow-2xl flex flex-col gap-6 md:gap-8 transform transition-transform duration-500">
                
                {/* Header Badge */}
                <div className="flex items-center gap-4">
                   <div className="p-2 md:p-3 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                      {chapter.icon}
                   </div>
                   <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                   <span className="text-cyan-200/60 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">{chapter.header}</span>
                </div>

                {/* Main Titles */}
                <div>
                  <h2 className="text-3xl md:text-6xl font-bold font-serif text-white mb-2 md:mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                     {chapter.title}
                  </h2>
                  <h3 className="text-sm md:text-xl text-cyan-400/80 font-light italic tracking-widest border-l-2 border-cyan-500/50 pl-3 md:pl-4">
                     {chapter.subtitle}
                  </h3>
                </div>

                {/* Quote Block */}
                <div className="relative py-4 md:py-6">
                   <Quote className="absolute top-0 left-0 text-white/10 -translate-x-2 -translate-y-2 transform scale-75 md:scale-100" size={40} />
                   <p className="text-lg md:text-2xl font-serif text-white/90 italic leading-relaxed z-10 relative px-4">
                      {chapter.quote}
                   </p>
                </div>

                {/* Body Text */}
                <div className="space-y-4 md:space-y-6 text-xs md:text-base leading-relaxed md:leading-loose text-gray-300 font-serif text-justify border-t border-white/10 pt-6">
                  {chapter.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Contact Buttons (Only for last chapter) */}
                {chapter.contact && (
                  <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <div className="flex items-center gap-3 p-3 border border-white/10 bg-white/5 rounded hover:bg-white/10 transition-colors">
                      <MapPin size={16} className="text-green-400" />
                      <span className="font-mono text-sm md:text-base">{chapter.contact.wx}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-white/10 bg-white/5 rounded hover:bg-white/10 transition-colors">
                      <Terminal size={16} className="text-purple-400" />
                      <span className="font-mono text-sm md:text-base">{chapter.contact.qq}</span>
                    </div>
                  </div>
                )}

             </div>