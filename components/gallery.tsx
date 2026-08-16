"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { GALLERY_ITEMS } from "@/lib/constants";

function useFineHover() {
  const [fineHover, setFineHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFineHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return fineHover;
}

function GalleryItem({
  item,
  index,
}: {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const fineHover = useFineHover();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-[4/3] max-h-[32rem] cursor-pointer touch-manipulation overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-border"
      onMouseEnter={fineHover ? () => setRevealed(true) : undefined}
      onMouseLeave={fineHover ? () => setRevealed(false) : undefined}
      onClick={
        fineHover ? undefined : () => setRevealed((prev) => !prev)
      }
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setRevealed((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      aria-label={`${item.label}: tap to reveal after photo`}
    >
      <Image
        src={item.before}
        alt={`${item.label} before detailing`}
        fill
        className="object-contain transition-opacity duration-500"
        style={{ opacity: revealed ? 0 : 1 }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <Image
        src={item.after}
        alt={`${item.label} after detailing`}
        fill
        className="object-contain transition-opacity duration-500"
        style={{ opacity: revealed ? 1 : 0 }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="font-medium text-white">{item.label}</p>
        <p className="text-sm text-white/70">
          {revealed ? "After" : "Before"} — hover or tap to compare
        </p>
      </div>

      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-sm">
        {revealed ? "After" : "Before"}
      </div>
    </motion.article>
  );
}

export function Gallery() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Real Results
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Before &amp; After Gallery
          </h2>
          <p className="mt-4 text-muted-foreground">
            See the difference our mobile detailing makes. Hover or tap each
            photo to reveal the transformation.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
