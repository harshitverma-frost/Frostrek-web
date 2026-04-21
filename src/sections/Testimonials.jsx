import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Surendra Yadav",
    role: "Founder",
    feedback:
      "Frostrek has been a game-changer for our e-commerce operations. Their AI-powered solutions helped us scale efficiently while maintaining quality. Our order processing time reduced by 60%.",
    avatar: "surendrasir.jpg",
    rating: 5,
    category: "Crescent Etail"
  },
  {
    name: "Arjun Kapoor",
    role: "Head of Growth",
    feedback:
      "Implementing Frostrek's WhatsApp automation doubled our conversion rate overnight. The AI understands context so well, our customers don't even realize they're chatting with a bot.",
    avatar: "/testi5.png",
    rating: 5,
    category: "QuickCart",
  },
  {
    name: "Vikram Patel",
    role: "Co-Founder & CEO",
    feedback:
      "Frostrek's AI agents transformed our customer support. We went from 4-hour response times to instant resolutions. Our customer satisfaction score jumped from 72% to 94% in just 3 months.",
    avatar: "/testi1.png",
    rating: 5,
    category: "LegalEase"
  },
  {
    name: "Priya Malhotra",
    role: "Founder & CTO",
    feedback:
      "The voice AI integration was seamless. Our sales team can now handle 10x more customer calls while maintaining that personal touch. It's like having 50 expert sales reps working 24/7.",
    avatar: "/testi2.png",
    rating: 5,
    category: "SkillNest"
  },
];

const ROTATION_INTERVAL = 5000;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isPausedRef = useRef(false);

  const paginate = (dir) => {
    setDirection(dir);
    setCurrentIndex((prev) =>
      dir > 0
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        paginate(1);
      }
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const testimonial = testimonials[currentIndex];

  return (
    <section
      className="bg-black py-24 min-h-[80vh] flex items-center overflow-hidden relative"
      onMouseEnter={() => (isPausedRef.current = true)}
      onMouseLeave={() => (isPausedRef.current = false)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2EE1C7]/[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#2EE1C7]/[0.02] rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header - Refined sizing */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Don't take our word for it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic text-[#2EE1C7] tracking-tight mt-2"
          >
            Take theirs...
          </motion.p>
        </motion.div>

        {/* Testimonial Block - Horizontal Layout */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (dir) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
            >
              {/* Left Side: Scaled Image with Decorative Backgrounds */}
              <div className="relative w-full max-w-[285px] md:w-1/2 group">
                {/* Decorative teal divs behind image - Increased visibility */}
                <div className="absolute -inset-6 rounded-[2rem] bg-[#2EE1C7]/20 -z-10 blur-3xl opacity-60" />
                <div className="absolute inset-0 rounded-[1.5rem] bg-[#2EE1C7]/15 -z-10 -rotate-6 border border-[#2EE1C7]/30" />
                <div className="absolute inset-0 rounded-[1.5rem] bg-[#2EE1C7]/10 -z-10 rotate-3 border border-[#2EE1C7]/20" />
                <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 rounded-full bg-[#2EE1C7]/20 -z-10 blur-2xl" />

                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden border border-white/10 p-3 bg-white/[0.05]">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-full w-full object-contain rounded-[1rem]"
                  />
                </div>
              </div>

              {/* Right Side: Refined Text */}
              <div className="w-full md:w-1/2 text-left space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2EE1C7]">
                    {testimonial.name}
                  </h3>
                  <p className="text-base text-slate-400 font-medium">
                    {testimonial.role}
                  </p>
                  <p className="text-[#2EE1C7]/80 text-sm font-bold tracking-tight">
                    {testimonial.category}
                  </p>
                </div>

                <div className="relative">
                  <div className="text-5xl text-[#2EE1C7]/10 font-serif absolute -top-10 -left-6 pointer-events-none">
                    "
                  </div>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed relative z-10 italic font-normal max-w-lg">
                    {testimonial.feedback}
                  </p>
                </div>

                {/* Mobile Navigation arrows */}
                <div className="flex md:hidden items-center gap-4 pt-2">
                  <button onClick={() => paginate(-1)} className="p-2 rounded-full border border-white/10 text-white"><ChevronLeft size={18} /></button>
                  <button onClick={() => paginate(1)} className="p-2 rounded-full border border-white/10 text-white"><ChevronRight size={18} /></button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-16 flex flex-col items-center">
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#2EE1C7] hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/20"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#2EE1C7] hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Simple mobile dots */}
            <div className="flex md:hidden gap-2">
              {testimonials.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/20"}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section >
  );
};

export default Testimonials;