"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ stop: () => void } | null>(null);
  const [position, setPosition] = useState(50);
  const reduceMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.45 });

  const stopAnimation = useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    if (width === 0) return;
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    let cancelled = false;

    const run = async () => {
      const sweep = animate(82, 18, {
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: setPosition,
      });
      animationRef.current = sweep;
      await sweep;
      if (cancelled) return;

      const settle = animate(18, 50, {
        duration: 0.5,
        ease: "easeOut",
        onUpdate: setPosition,
      });
      animationRef.current = settle;
      await settle;
    };

    void run();

    return () => {
      cancelled = true;
      stopAnimation();
    };
  }, [inView, reduceMotion, stopAnimation]);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-[4/5] w-full max-h-80 cursor-ew-resize touch-none overflow-hidden rounded-lg select-none ring-1 ring-border",
          className,
        )}
        onPointerDown={(event) => {
          event.preventDefault();
          stopAnimation();
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          setFromClientX(event.clientX);
        }}
        role="group"
        aria-label="Before and after comparison slider"
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          draggable={false}
          className="pointer-events-none object-cover"
          sizes="(max-width: 640px) 100vw, 400px"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            draggable={false}
            className="pointer-events-none object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-md ring-1 ring-black/10">
            <ChevronsLeftRight className="size-5" />
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-2 bottom-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          After
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label="Reveal the restored headlight"
          className="sr-only"
          onChange={(event) => {
            stopAnimation();
            setPosition(Number(event.target.value));
          }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Drag the slider to compare before and after
      </p>
    </div>
  );
}
