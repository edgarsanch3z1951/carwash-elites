"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { BookNowButton } from "@/components/book-now-button";
import { BUSINESS, HERO_SECTION_ID } from "@/lib/constants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1920&q=80";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const step = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  const logoMotion = step(0.05);
  const brandMotion = step(0.22);
  const copyMotion = step(0.4);
  const ctaMotion = step(0.58);

  return (
    <section
      id={HERO_SECTION_ID}
      className="relative min-h-[70vh] overflow-hidden bg-brand-navy sm:min-h-[85vh]"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Professional mobile car detailing"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/80 to-brand-navy" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20 sm:min-h-[85vh] sm:px-6">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-4 sm:mb-8 sm:gap-5">
            <motion.div {...logoMotion}>
              <Image
                src="/carwashlogo.jpg"
                alt={BUSINESS.name}
                width={220}
                height={217}
                priority
                className="h-24 w-auto rounded-xl object-contain shadow-lg ring-1 ring-white/15 sm:h-32 md:h-36"
                sizes="(max-width: 640px) 96px, 144px"
              />
            </motion.div>
            <motion.div {...brandMotion}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Mobile Detailing · {BUSINESS.serviceArea}
              </p>
              <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                {BUSINESS.name}
              </h1>
            </motion.div>
          </div>

          <motion.div {...copyMotion}>
            <p className="font-heading text-xl font-semibold leading-snug text-white/95 sm:text-2xl">
              Spotless results, delivered to your driveway
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Showroom-quality mobile detailing across Ventura County — we come
              to you.
            </p>
          </motion.div>

          <motion.div {...ctaMotion} className="mt-10">
            <BookNowButton
              size="lg"
              className="h-12 bg-white px-8 text-base font-bold text-brand-navy shadow-md shadow-black/20 hover:bg-white/90 hover:shadow-lg sm:h-14 sm:px-10 sm:text-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
