import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero3D from "../components/Hero3D";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import usePerformanceMode from "../hooks/usePerformanceMode";




const HeroAboutPage = () => {
  const performanceMode = usePerformanceMode();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsSmallScreen(mediaQuery.matches);

    handleChange();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (performanceMode) {
      setMousePosition({ x: 0, y: 0 });
      return undefined;
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [performanceMode]);

  const ambientParticles = useMemo(() => {
    const count = performanceMode ? 8 : isSmallScreen ? 12 : 18;

    if (count <= 0) {
      return [];
    }

    return Array.from({ length: count }, (_, index) => ({
      id: `hero-particle-${index}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 3,
      delay: Math.random() * 2,
      offset: Math.random() * 14,
    }));
  }, [isSmallScreen, performanceMode]);



  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-black font-raleway flex flex-col items-center justify-center"
      >
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />

        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div> */}

        {ambientParticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            {ambientParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute block h-[2px] w-[2px] rounded-full bg-cyan-300/60 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: ["0%", "-10%", "0%"] }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* <motion.div
              className="inline-flex items-center gap-3 self-start rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-lg w-fit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
            </motion.div> */}

            <motion.h1
              className="mt-24 text-5xl font-bold leading-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl xl:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <span className="text-[#2EE1C7] font-Raleway">
                Intelligent Systems<br />
              </span>{" "}
              built to scale with<br /> how your business thinks.
            </motion.h1>

            <motion.p
              className="mt-12 max-w-3xl text-base font-normal leading-relaxed text-slate-300/80 md:text-lg font-quicksand mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Frostrek builds the intelligent systems, agentic workflows, and scalable
              software that turn your data into decisions at enterprise speed.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="group relative flex items-center justify-center gap-3 rounded-full bg-[#2EE1C7] px-10 py-4 text-[15px] font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(46,225,199,0.4)] active:scale-95">
                Contact Us
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

               <button 
                onClick={scrollToServices}
                className="group flex items-center justify-center gap-3 rounded-full border-2 border-[#2EE1C7]/30 bg-white/5 px-10 py-4 text-[15px] font-bold text-white backdrop-blur-md transition-all hover:bg-[#2EE1C7]/10 hover:border-[#2EE1C7]/60 active:scale-95"
              >
                Explore Services
              </button>
            </motion.div>
          </motion.div>

          {/* <motion.div
            className="relative flex flex-1 flex-col justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full h-[500px] flex items-center justify-between cursor-grab">
              <Hero3D />
            </div>
          </motion.div> */}
        </div>

        {/* <div className="absolute right-12 top-24 hidden h-28 w-28 rounded-full border border-cyan-400/40 bg-cyan-400/10 blur-3xl lg:block" />
        <div className="absolute left-10 bottom-10 hidden h-24 w-24 rounded-full border border-indigo-500/40 bg-indigo-400/10 blur-3xl lg:block" /> */}

        <motion.div
          className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

    </div>
  );
};

export default HeroAboutPage;
