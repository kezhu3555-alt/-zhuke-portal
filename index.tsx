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
  ChevronDown,
  MoveHorizontal
} from 'lucide-react';

// --- GLOBAL GSAP TYPES ---
declare global {
  interface Window {
    gsap: any;
  }
}

// --- 1. THE 53 SCRIPTURES (DATA) ---
const ALL_SCRIPTURES = [
  "1. 人啊，走在自己的人生路上，就不要怕肮脏！踩着白骨和血肉，一步步走向辉煌！",
  "2. 杰出者必孤独。",
  "3. 我喜欢无足鸟，因为它没有鸟足，只有翅膀。因此只能飞翔。当它落地之时，就意味着它的毁灭。孤注一掷，不飞则死！",
  "4. 我虽然不想死，但却不畏惧死亡。我已走在路上，纵死不悔。",
  "5. 千万不要低估旁人的智慧，往往只有蠢才才会认为别人愚蠢。",
  "6. 那些倚老卖老的人，常在教训后辈中，寻找自己的存在感和优越感。",
  "7. 每个人他生来就是孤独！人就像是一座座的浮冰孤岛。",
  "8. 真正的本事是破坏规矩而享受利益，却不受惩罚。",
  "9. 甘于弱小，而不自发努力，只想向强者乞讨的人，根本就不值得同情。",
  "10. 这个世界其实是灰色的。有的黑的未必比白的阴险，有的白的可能罪孽更深。",
  "11. 态度是心的面具。",
  "12. 他朝圣的方向，只是心中的光明——永生。没人明白他，他也不需要人明白。",
  "13. 红粉骷髅，白骨皮肉。",
  "14. 孤独是最深邃的黑暗，而亲情的光只是一种假象。",
  "15. 人，本就是天地间的宝石。每一次努力，都是一次雕琢。",
  "16. 你感到痛苦，是因为你在成长。",
  "17. 我的目光如磐石般坚硬，我的心中剩下坚持。",
  "18. 此生就愿成真月，出天山，戏云海，照古今，行走在黑暗的诸天之上。",
  "19. 走自己的路，让旁人失望和不喜欢去吧！",
  "20. 滴水之恩涌泉相报，星火之仇燎原往复！",
  "21. 我自居高笑傲，冷看世间之人如颗颗棋子。",
  "22. 唯恐做不到位！",
  "23. 大自然是公平的，不讲爱恨，是无情的。",
  "24. 青山落日,秋月春风。当真是朝如青丝暮成雪,是非成败转头空。",
  "25. 真正成熟的人，永远不会依靠别人雪中送炭。",
  "26. 险就一身乾坤精，我心依旧望苍天。",
  "27. 今曰暂且展翼去，明朝登仙笞凤凰。",
  "28. 往光明处踏出微微一步，就是佛。往黑暗迈出半步，就是魔。",
  "29. 他的底线就是没有原则，他的原则就是没有底线。",
  "30. 魔不魔，正不正，天地自有凤九歌。",
  "31. 踏上这条路，就注定举世皆敌。",
  "32. 当你想当上帝的时候，一定离成为魔鬼不远。",
  "33. 当一个人惧怕的时候，他就成了奴隶。",
  "34. 一个生命，最高的境界就是永生。",
  "35. 指望价值无双的传承留给自己，是涉世不深的想法。",
  "36. 大千世界功名尘土，依旧海阔天空。",
  "37. 态度是心的面具。如果你常常委屈自己，就会变成另外的人。",
  "38. 规矩只是无形的约束，时间越久，利益越大，就越无力。",
  "39. 命运不是不可以改变的！",
  "40. 若是被规则牵绊，反而因为自身所学而束手束脚，这才是真正的悲剧。",
  "41. 人最大的失败，就是失去自我。",
  "42. 此刻风流归天地，不胜水中明月光！",
  "43. 坚持到底，不惧失败，就是成功！",
  "44. 你我一见如故，你却要走。",
  "45. 这个世界上，谈何对错？只是每个人的道路不同罢了。",
  "46. 强大可以凭借，弱小也可以利用。",
  "47. 如果这世间单纯的仇恨有用，那还需要力量做什么？",
  "48. 世间上最大的利益，无疑是“生存”。",
  "49. 把生死放下，人生才见大宽宏，才有真潇洒。",
  "50. 这种自信的基础前提，是他自知！",
  "51. 感谢困苦，它教会人真理！",
  "52. 利益之船装了多少人，又沉了多少人。",
  "53. 可惜一溪风月，踏碎了琼瑶。"
];

// --- 2. TITAN DATA (7 Chapters) ---
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
    subtitle: "The Library of Truth (Scroll Right)",
    icon: <Snowflake size={28} />,
    bgImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop", 
    quote: "不过是些许风霜罢了。",
    isQuoteWall: true,
    content: [
      "落魄谷中，风雪漫天。这是我精神的道场。在这个浮躁的时代，我不需要廉价的共情，我只需要像古月方源一样，拥有一颗磐石之心。",
      "哪怕前路布满荆棘，也要踏出一条血路。风霜可以侵蚀我的肉体，但无法磨损我的意志。",
      "下方记载了支撑我行走的 53 句真经。它们比代码更冷酷，比黄金更珍贵。"
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

// --- 3. SUB-COMPONENTS ---

// Cinematic Background Engine
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>
      ))}
    </div>
  );
};

// Fixed Top-Left Identity
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

// Fixed Right Navigation Dots
const NavHUD = ({ activeIndex }: { activeIndex: number }) => (
  <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-none mix-blend-screen">
    {TITAN_DATA.map((item, index) => (
      <div key={index} className="flex items-center justify-end gap-4 group transition-all duration-500">
        <span className={`hidden md:block text-[10px] tracking-widest uppercase font-mono transition-all duration-500
          ${activeIndex === index ? 'text-cyan-400 opacity-100 translate-x-0' : 'text-white/30 opacity-0 translate-x-4'}`}>
          {item.header}
        </span>
        <div className={`h-[1px] bg-white transition-all duration-500 
          ${activeIndex === index ? 'w-8 bg-cyan-400 shadow-[0_0_8px_cyan]' : 'w-2 bg-white/20'}`} />
      </div>
    ))}
  </div>
);

// Bottom Scroll Hint
const ScrollPrompt = () => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/50 animate-bounce flex flex-col items-center gap-2 pointer-events-none">
    <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
    <ChevronDown size={16} />
  </div>
);

// --- 4. MAIN APP COMPONENT ---
const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer for Vertical Snapping Detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
            
            // GSAP Entry Animation for Text Blocks
            const contentBlock = entry.target.querySelector('.content-block');
            if (contentBlock && window.gsap) {
              window.gsap.fromTo(contentBlock, 
                { y: 50, opacity: 0, filter: 'blur(10px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.2 }
              );
            }
          }
        });
      },
      { threshold: 0.5 }
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

      {/* Main Scroll Container (Vertical Scroll Snap) */}
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
             {/* Content Glass Card (Responsive) */}
             <div className="content-block w-full max-w-[95%] md:max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 md:p-12 bg-black/40 backdrop-blur-xl md:backdrop-blur-2xl border border-white/10 rounded-sm shadow-2xl flex flex-col gap-6 md:gap-8 transform transition-transform duration-500">
                
                {/* Header Badge */}
                <div className="flex items-center gap-4 flex-shrink-0">
                   <div className="p-2 md:p-3 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                      {chapter.icon}
                   </div>
                   <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                   <span className="text-cyan-200/60 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">{chapter.header}</span>
                </div>

                {/* Main Titles */}
                <div className="flex-shrink-0">
                  <h2 className="text-3xl md:text-6xl font-bold font-serif text-white mb-2 md:mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                     {chapter.title}
                  </h2>
                  <h3 className="text-sm md:text-xl text-cyan-400/80 font-light italic tracking-widest border-l-2 border-cyan-500/50 pl-3 md:pl-4">
                     {chapter.subtitle}
                  </h3>
                </div>

                {/* Quote Block */}
                {!chapter.isQuoteWall && (
                <div className="relative py-2 md:py-6 flex-shrink-0">
                   <Quote className="absolute top-0 left-0 text-white/10 -translate-x-2 -translate-y-2 transform scale-75 md:scale-100" size={40} />
                   <p className="text-lg md:text-2xl font-serif text-white/90 italic leading-relaxed z-10 relative px-4">
                      {chapter.quote}
                   </p>
                </div>
                )}

                {/* Body Text */}
                <div className="space-y-4 md:space-y-6 text-xs md:text-base leading-relaxed md:leading-loose text-gray-300 font-serif text-justify border-t border-white/10 pt-6">
                  {chapter.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* SPECIAL FEATURE: 53 SCRIPTURES SCROLL (Only for Chapter 3/4) */}
                {chapter.isQuoteWall && (
                  <div className="w-full mt-4 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2 text-cyan-500/70 text-[10px] uppercase tracking-widest animate-pulse">
                      <MoveHorizontal size={14} />
                      <span>Swipe for Truth</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                      {ALL_SCRIPTURES.map((scripture, sIdx) => (
                        <div key={sIdx} className="snap-center flex-shrink-0 w-64 md:w-80 p-4 bg-black/50 border border-white/20 rounded-sm">
                           <p className="text-xs md:text-sm text-gray-200 font-serif leading-relaxed">{scripture}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Buttons (Only for last chapter) */}
                {chapter.contact && (
                  <div className="flex flex-col md:flex-row gap-4 mt-2 flex-shrink-0">
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
          </section>
        ))}
        
        {/* Footer Padding for Scroll Buffer */}
        <div className="h-1 w-full bg-transparent snap-start" />
      </div>

    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);