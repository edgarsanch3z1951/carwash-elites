"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "Do I need to provide water or power?",
    answer:
      "No — we bring our own water tank and power source. You don't need a spigot or outlet ready. Just give us a safe place to park next to your vehicle.",
  },
  {
    question: "How long does a detail take?",
    answer:
      "Exterior Refresh is typically 30–45 minutes. Basic Package runs about 45–75 minutes. Premium and Elite packages usually take 1.5–3 hours depending on vehicle size and condition.",
  },
  {
    question: "Where do you service?",
    answer:
      "We come to you anywhere in Ventura County — home, work, or another convenient spot.",
  },
  {
    question: "What should I do before you arrive?",
    answer:
      "Clear personal items from the cabin if you booked an interior package, and make sure the vehicle is unlocked or a key is available. That's it — we bring the water, power, and supplies.",
  },
] as const;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Before we roll up
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quick answers about timing, service area, and what to expect on
            detail day.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-xl border border-border bg-card"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-heading text-base font-semibold sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-brand-navy transition-transform duration-200",
                      open && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
