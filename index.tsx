import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  User, 
  Mountain, 
  Cpu, 
  Snowflake, 
  Waves, 
  Zap, 
  Moon,
  MoveHorizontal,
  ChevronRight,
  Quote,
  MapPin,
  Terminal
} from 'lucide-react';

// --- Global Types ---
declare global {
  interface Window {
    gsap: any;
    Observer: any;
  }
}

// --- VERIFIED SCRIPTURE DATA ---
const ALL_SCRIPTURES = [
  "1. 人啊，走在自己的人生路上，就不要怕肮脏！踩着白骨和血肉，一步步走向辉煌！人啊，走在自己的人生路上，就不要怕悲伤！踏着汗水和泪水，一步步行向光芒！人啊！走在自己的人生路上，就不要怕仿徨！循着信念和理想，一步步走出迷惘！人啊！走在自己的人生路上，就注定要漂泊流浪！无需愤恨你没有知己，因为你还有自己！去吧，走向巅峰，踏向属于自己的天堂。",
  "2. 人们总是害怕孤独，总要贪恋热闹的人群，总不愿无所事事。因为当他们面对孤独，往往就会面对痛苦。但是一旦能直面这种痛苦，人就往往有了才华和勇气。所以。有句俗语——杰出者必孤独。",
  "3. “我喜欢无足鸟，你知道为什么吗？”他的笑容，着实有些渗人。“为什么？”“因为它没有鸟足，只有翅膀。因此只能飞翔。当它落地之时，就意味着它的毁灭。” 孤注一掷，不飞则死！",
  "4. 人生匆匆百年，如梦幻泡影。人活在这个世界上是为了什么？无非是走上一遭见证精彩罢了。我虽然不想死，但却不畏惧死亡。我已走在路上，纵死不悔。",
  "5. 千万不要低估旁人的智慧，往往只有蠢才才会认为别人愚蠢。",
  "6. 这个世界上，总会有一群“老”人。他们四处兜售着社会的经验，把他人的理想当做幻想，把他人的热情当做轻狂，把他人的坚持当做桀骜。他们常在教训后辈中，寻找自己的存在感和优越感。",
  "7. 每个人他生来就是孤独！人就像是一座座的浮冰孤岛，在命运的海洋中漂浮流荡。人和人的相遇，就像是浮冰孤岛之间的相互碰撞，只要是碰撞，就必有影响。有时候，浮冰孤岛相互粘在了一起，以“利益”、“亲情”、“友情”、“爱情”、“仇恨”之名。但是最终，它们都将分开。孤独地走向毁灭。这就是人生的真相。",
  "8. 遵守规矩不算是本事，真正的本事是破坏规矩而享受利益，却不受惩罚。真正的大本事，是破坏旧秩序，建立新规矩，一直享受利益。",
  "9. 甘于弱小，而不自发努力，只想向强者乞讨的人，根本就不值得同情。",
  "10. 这个世界其实是灰色的。有时候黑的能转成白的，白的能转成黑的。有的黑的未必比白的阴险，有的白的可能罪孽更深。",
  "11. 态度是心的面具。",
  "12. 他走的路，注定是无边的黑暗，注定是无比的孤独。他朝圣的方向，只是心中的光明——永生——一丝微小到不存在的可能。这个世界上，没有人明白他，而他，也不需要别人明白。",
  "13. 无我相，无人相，无众生相，无寿者相，红粉骷髅，白骨皮肉。",
  "14. 孤独是最深邃的黑暗，而亲情的光只是一种假象。",
  "15. 人，本就是天地间的宝石。只是宝石璀璨与否，需要我们自己的雕琢。我们的每一次努力，每一次选择，都是一次雕琢。",
  "16. 我们既然意识到自己的渺小，那就更应该变得强大。我们本来就是渺小的，只是从无知变得有知，你感到痛苦，是因为你在成长。",
  "17. 我曾经呐喊过，渐渐的我不发出声音。我曾经哭泣过，渐渐的我不再流泪。我曾经悲伤过，渐渐的我能承受一切。我曾经喜悦过，渐渐的我看淡世间。而如今！我只剩下面无表情，我的目光如磐石般坚硬，我的心中剩下坚持。这就是我，一个小人物，我的——坚持！",
  "18. 此生就愿成真月，出天山，戏云海，照古今，行走在黑暗的诸天之上。",
  "19. 人的一生之精彩，在于自己追逐梦想的过程。不必苛求旁人的不失望或者喜欢。走自己的路，让旁人失望和不喜欢去吧！",
  "20. 滴水之恩涌泉相报，星火之仇燎原往复！",
  "21. 居高临下，目光洞穿繁芜世事。或抽丝剥茧，或一针见血。我自居高笑傲，冷看世间之人如颗颗棋子，遵循着各自的规矩，按部就班地行进。",
  "22. 这世人几多可笑，被偷被盗被抢，稍微有丁点损失，就反抗激烈，大呼不平。向上层贿赂，送礼送身体送贞操，却都心甘情愿。还唯恐做不到位！",
  "23. 万物平等，天地不仁以万物为刍狗。大自然是公平的，不讲爱恨，是无情的，从不会区别对待万物。",
  "24. 青山落日,秋月春风。当真是朝如青丝暮成雪,是非成败转头空。",
  "25. 真正可靠的还是自己，真正成熟的人，永远不会依靠别人雪中送炭。",
  "26. 雄山漫道真如铁，如今迈步从头越。险就一身乾坤精，我心依旧望苍天。",
  "27. 千古地仙随风逝，昔曰三王归青冢。阳莽憾陨谁无败？卷土重来再称王。天河一挂淘龙鱼，逆天独行顾八荒。今曰暂且展翼去，明朝登仙笞凤凰 。",
  "28. 这神性往光明处踏出微微一步，就是佛。往黑暗迈出半步，就是魔。",
  "29. 他的底线就是没有原则，他的原则就是没有底线。",
  "30. 魔不魔，正不正，天地自有凤九歌，走不走，留不留，生死皆在我心头。",
  "31. 心中的野望太大，踏上这条路，就注定举世皆敌，就注定独来独往，就注定杀劫重重。",
  "32. 当你想当上帝的时候，一定离成为魔鬼不远。",
  "33. 当一个人惧怕的时候，他就成了奴隶。",
  "34. 一个生命，最高的境界就是永生，最大的欲望就是永生。",
  "35. 指望价值无双的传承、遗产，无人发现，只为留给自己，那是涉世不深的年轻人天真无知、自以为是的想法。",
  "36. 风虎云龙笑谈兴亡，多少失败成功？大千世界功名尘土，依旧海阔天空。",
  "37. 不要因为他们的态度，而委屈自己的心意。如果你常常委屈自己，那么就会收获后悔，你会时常带上面具，变成另外的人，反正不是真正的你。",
  "38. 规矩只是无形的约束，时间越久，利益越大，就越无力。",
  "39. 人之道，在于抗争。君子如龙，自强不息的精神意志，即使天塌地陷，也不能湮灭斗争之精神。命运不是不可以改变的！",
  "40. 人千方百计的学习，来认知世界，知晓规则，就是要利用规则。若是被规则牵绊，反而因为自身所学而束手束脚，这才是真正的悲剧。",
  "41. 在寻找成功的过程中，人往往会变得面目全非，而人最大的失败，就是失去自我。",
  "42. 万丈红尘缤纷彩，天涯云水路遥长。此刻风流归天地，不胜水中明月光！",
  "43. 什么是失败？什么是成功？一开始就坚持住，不放弃，结束后欣然接受结果，不后悔，就是成功！坚持到底，不惧失败，就是成功！",
  "44. 你我一见如故，你却要走。分别在即，好友，让我送你一送。",
  "45. 这个世界上，谈何对错？孰对孰错？只是每个人的道路不同罢了。",
  "46. 强大可以凭借，弱小也可以利用。",
  "47. 如果这世间单纯的仇恨、憎恶、咒骂有用，那还需要力量做什么？",
  "48. 不论在哪个世界上，人们之所以争斗，大多都是为了利益。然而世间上最大的利益，无疑是“生存”。",
  "49. 把生死放下，人生才见大宽宏，才有真潇洒。",
  "50. 方源绝不缺少自信，他对自己向来有充沛的信心。但这种自信的基础前提，是他自知！",
  "51. 感谢困苦，它教会人真理！",
  "52. 钱财都是身外物，人因财而死，是可悲的。可笑这许多世人都看不破这点。利益之船装了多少人，又沉了多少人。",
  "53. 可惜一溪风月，踏碎了琼瑶。"
];

const TITAN_DATA = [
  {
    id: 0,
    realm: "POSSIBILITY",
    title: "祝 · 可能性",
    subtitle: "ZHU KE: 183cm / 83kg",
    icon: <User size={32} />,
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
    realm: "SOLITUDE",
    title: "阳明 · 独行",
    subtitle: "Yongzhou Yangming Mountain",
    icon: <Mountain size={32} />,
    bgImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop", 
    quote: "落魄谷中寒风吹，春秋蝉鸣少年归。",
    content: [
      "落魄谷中寒风吹，春秋蝉鸣少年归。",
      "荡魂山处石人泪，定仙游走魔向北。",
      "逆流和上万仙退，爱情不敌坚持泪。",
      "宿命天成命中败，仙尊悔而我不悔。",
      "---",
      "永州阳明山，杜鹃如血。我独自骑行冲破云霭，听到了春秋蝉的鸣叫。在茫茫云海中，我悟出了真正的真理：『这世间，唯有利益是永恒的，而最大的利益，就是我的存在。』"
    ]
  },
  {
    id: 2,
    realm: "LOGIC",
    title: "秩序 · 逻辑",
    subtitle: "Python & The True Moon",
    icon: <Cpu size={32} />,
    bgImage: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?q=80&w=2000&auto=format&fit=crop", 
    quote: "早岁已知世事艰，仍许飞鸿荡云间。",
    content: [
      "早岁已知世事艰，仍许飞鸿荡云间。",
      "一路寒风身如絮，命海沉浮客独行。",
      "千磨万击心铸铁，殚精竭虑铸一剑。",
      "今朝剑指叠云处，炼蛊炼人还炼天！",
      "---",
      "幽蓝的冰洞象征着代码的绝对冷静。技术是唯一的秩序，我将现实解构为 0 和 1，在数据的洪流中寻找那个唯一的‘真月’。"
    ]
  },
  {
    id: 3,
    realm: "ROCK",
    title: "方源 · 磐石",
    subtitle: "The Library of Truth",
    icon: <Snowflake size={32} />,
    bgImage: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop", 
    quote: "不过是些许风霜罢了。",
    isQuoteWall: true,
    content: [
       "落魄谷中，风雪漫天。这是我精神的道场。",
       "这些源自《人祖传》与古月方源的 53 条真言，字字泣血，句句如铁。它们是我对抗虚无的武器，是我行走世间的准则。",
       "拖动下方经文，见证真正的‘坚持’："
    ],
    quotes: ALL_SCRIPTURES
  },
  {
    id: 4,
    realm: "AMBITION",
    title: "真经 · 志向",
    subtitle: "Legends of Ren Zu",
    icon: <Waves size={32} />,
    bgImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop", 
    quote: "态度是心的面具。",
    content: [
      "逆流河中，人祖赤足而行。他告诉我们：‘态度是心的面具。’在这个充满伪装的社会里，我戴上面具，是为了更好地保护那颗追求永恒的心。",
      "『人呐，只要想走，路就在脚下。』",
      "人祖最终发现：‘路在脚下，命在手中。’ 没有什么天注定，只有我注定。只要想走，路就在脚下延伸。"
    ]
  },
  {
    id: 5,
    realm: "STRATEGY",
    title: "博弈 · 棋局",
    subtitle: "Honor of Kings",
    icon: <Zap size={32} />,
    bgImage: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop", 
    quote: "朝如青丝暮成雪，是非成败转头空。",
    content: [
      "雷暴平原，废墟之上。王者荣耀的峡谷不仅仅是游戏，它是微缩的战场，是智力与人性的博弈。",
      "我行走在废墟之中，于阴影里仰望星空。每一次团战的拉扯，每一波兵线的运营，都是对‘势’的掌控。是非成败转头空，唯有那一刻的算计与决断是真实的。",
      "人生如棋，我既是棋子，也是棋手。"
    ]
  },
  {
    id: 6,
    realm: "ETERNAL",
    title: "联结 · 永恒",
    subtitle: "The True Moon",
    icon: <Moon size={32} />,
    bgImage: "https://images.unsplash.com/photo-1532978023344-977a211997a3?q=80&w=2000&auto=format&fit=crop", 
    quote: "此生就愿成真月，行走在黑暗的诸天之上。",
    contact: { wx: "198 9291 9069", qq: "2164460896" },
    content: [
       "天门之外，诸天黑暗。我愿化身真月，独自照亮我的前路。",
       "在这个浩瀚的宇宙中，如果你看到了我的光芒，那便是一种联结。无论你是想探讨 Python 的奥秘，还是共赴一场改变命运的冒险，我的锚点就在这里。",
       "信号已锁定，等待同类。"
    ]
  }
];

// --- CINEMATIC BACKGROUND ENGINE (FILM CUTS) ---
const CinematicBackgrounds = ({ pageIndex }: { pageIndex: number }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {TITAN_DATA.map((chapter, idx) => (
        <div 
          key={chapter.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === pageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${chapter.bgImage})` }}
        >
          {/* Heavy Dark Overlay for White Text Contrast */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0px]" /> 
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </div>
      ))}
    </div>
  );
};

// --- DRAGGABLE QUOTE WALL ---
const DraggableQuoteWall = ({ quotes }: { quotes: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  
  const handleMove = (e: React.MouseEvent) => {
     if(!isDragging || !scrollRef.current) return;
     e.preventDefault();
     const x = e.pageX - scrollRef.current.offsetLeft;
     const walk = (x - startX) * 2;
     scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full mt-8 group" onWheel={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
       <div className="flex items-center gap-2 mb-4 text-cyan-400/80 text-xs tracking-widest uppercase animate-pulse">
          <MoveHorizontal size={14} /> <span>Drag to Read All 53 Scriptures</span>
       </div>
       <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing no-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMove}
       >
          {quotes.map((q, i) => (
             <div key={i} className="flex-shrink-0 w-[32rem] p-8 bg-black/60 backdrop-blur-3xl border border-white/20 rounded-sm shadow-xl hover:border-cyan-500/50 transition-colors">
                <Quote size={20} className="text-cyan-500/80 mb-4" />
                <p className="text-white font-serif text-lg leading-relaxed italic drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] whitespace-pre-line">{q}</p>
             </div>
          ))}
          <div className="w-8 flex-shrink-0" />
       </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // GSAP Observer for Rigid Snap
  useLayoutEffect(() => {
    if (typeof window.Observer === 'undefined') return;
    
    const observer = window.Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => { if (!isAnimating && page > 0) changePage(page - 1); },
      onDown: () => { if (!isAnimating && page < TITAN_DATA.length - 1) changePage(page + 1); },
      tolerance: 10,
      preventDefault: true
    });
    return () => observer.kill();
  }, [page, isAnimating]);

  const changePage = (next: number) => {
    setIsAnimating(true);
    setPage(next);
    setTimeout(() => setIsAnimating(false), 1000); // Lock during transition
  };

  return (
    <div className="relative w-full h-full bg-black text-slate-200 overflow-hidden font-sans select-none">
      
      {/* 1. Cinematic Background Engine */}
      <CinematicBackgrounds pageIndex={page} />
      
      {/* 2. Fixed HUD */}
      {/* Top-Left: Identity */}
      <div className="fixed top-8 left-8 z-50 flex flex-col pointer-events-none">
         <h1 className="text-white font-bold tracking-[0.2em] text-sm md:text-base drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
            祝可 (ZHU KE)
         </h1>
         <div className="flex items-center gap-2 text-[10px] text-cyan-200/90 tracking-widest uppercase font-mono mt-1 drop-shadow-md">
            <span>183cm</span> <span className="text-white/40">|</span>
            <span>83kg</span> <span className="text-white/40">|</span>
            <span>HNNU</span>
         </div>
         <div className="w-12 h-[2px] bg-cyan-500 mt-2 shadow-[0_0_15px_#22d3ee]"></div>
      </div>

      {/* Bottom-Left: Page Index */}
      <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
         <span className="text-6xl font-thin font-mono text-white/60 drop-shadow-lg">{`0${page + 1}`}</span>
         <span className="text-sm text-cyan-500/80 ml-2 font-mono drop-shadow-md">/ 07</span>
      </div>

      {/* Right Sidebar: Scripture Anchor */}
      <div className="fixed right-0 top-0 bottom-0 w-20 md:w-24 border-l border-white/5 bg-black/20 backdrop-blur-[4px] z-40 flex flex-col items-center justify-center pointer-events-none">
         <div className="h-[70vh] flex flex-col justify-between items-center py-4">
            {TITAN_DATA.map((item, idx) => (
               <div key={idx} className={`transition-all duration-700 writing-vertical-rl text-xs tracking-[0.3em] font-serif relative
                  ${idx === page ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,1)] opacity-100 scale-110' : 'text-white/30 opacity-40 scale-90 blur-[0.5px]'}`}>
                  {idx === page ? item.quote.substring(0, 10) + (item.quote.length > 10 ? "..." : "") : "·"}
               </div>
            ))}
         </div>
      </div>

      {/* 3. Horizontal Scroll Container */}
      <div 
        className="flex w-[700vw] h-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{ transform: `translateX(-${page * 100}vw)` }}
      >
         {TITAN_DATA.map((chapter) => (
            <section key={chapter.id} className="w-[100vw] h-full flex items-center justify-center relative px-6 md:pl-32 md:pr-48">
               
               {/* Content Card (High-End Deep Glassmorphism) */}
               <div className={`w-full max-w-4xl p-10 md:p-14 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-sm shadow-2xl transition-all duration-1000 delay-300
                  ${page === chapter.id ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-20 blur-sm'}`}>
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-cyan-900/20 border border-cyan-500/30 rounded text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        {chapter.icon}
                     </div>
                     <div className="h-[1px] w-16 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                     <span className="text-cyan-200/60 font-mono text-xs tracking-[0.4em] uppercase">{chapter.realm}</span>
                  </div>

                  {/* Title Block */}
                  <h2 className="text-4xl md:text-7xl font-bold font-serif text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                     {chapter.title}
                  </h2>
                  <h3 className="text-lg md:text-xl text-cyan-400/90 font-light italic tracking-widest mb-10 pl-1 border-l-2 border-cyan-500/50">
                     {chapter.subtitle}
                  </h3>

                  {/* Text Content */}
                  {!chapter.isQuoteWall && (
                     <div className="space-y-6 text-sm md:text-lg leading-loose text-white font-serif text-justify border-l border-white/20 pl-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {chapter.content && chapter.content.map((p, i) => (
                           <p key={i}>{p}</p>
                        ))}
                     </div>
                  )}

                  {/* Quote Wall (Intro Text + Scroll) */}
                  {chapter.isQuoteWall && (
                     <div className="space-y-6">
                        <div className="text-sm md:text-lg leading-loose text-white font-serif text-justify border-l border-white/20 pl-8 drop-shadow-md">
                           {chapter.content && chapter.content.map((p, i) => (
                              <p key={i}>{p}</p>
                           ))}
                        </div>
                        {chapter.quotes && <DraggableQuoteWall quotes={chapter.quotes} />}
                     </div>
                  )}

                  {/* Contact */}
                  {chapter.contact && (
                     <div className="mt-12 flex flex-col md:flex-row gap-8">
                        <div className="group cursor-pointer">
                           <div className="text-xs text-cyan-500/80 uppercase tracking-widest mb-2 group-hover:text-cyan-400 flex items-center gap-2">
                              <MapPin size={12} /> Mobile / WeChat
                           </div>
                           <div className="text-3xl font-mono text-white border-b border-white/20 pb-2 group-hover:border-cyan-400 transition-all drop-shadow-glow">{chapter.contact.wx}</div>
                        </div>
                        <div className="group cursor-pointer">
                           <div className="text-xs text-purple-500/80 uppercase tracking-widest mb-2 group-hover:text-purple-400 flex items-center gap-2">
                              <Terminal size={12} /> QQ
                           </div>
                           <div className="text-3xl font-mono text-white border-b border-white/20 pb-2 group-hover:border-purple-400 transition-all drop-shadow-glow">{chapter.contact.qq}</div>
                        </div>
                     </div>
                  )}

               </div>
            </section>
         ))}
      </div>

      {/* Navigation Hint */}
      <div className="fixed bottom-8 right-32 z-30 flex items-center gap-3 text-cyan-500/60 animate-pulse hidden md:flex">
         <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Pan</span>
         <ChevronRight size={14} />
      </div>

   </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);