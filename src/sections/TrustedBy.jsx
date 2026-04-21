import { motion } from "framer-motion";

const brands = [
  { name: "Clutch", logo: "/trusted/clutch.webp" },
  { name: "GoodFirms", logo: "/trusted/goodfirms.webp" },
  { name: "TopDevelopers", logo: "/trusted/topDevelopers.webp" },
];

const TrustedBy = () => {
  // Triple the brands array to ensure a seamless infinite scroll loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="bg-black py-20 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 mb-20 md:mb-28">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Trusted by <span className="text-[#2EE1C7] font-Raleway">Industry Leaders</span>
          </h2>
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Industry leaders trust us to deliver excellence
          </motion.p>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradient overlays for smooth fade effect at edges */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center py-6"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex items-center justify-center min-w-[180px] md:min-w-[280px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 sm:h-16 md:h-20 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
