"use client";

import {
  BadgeCheck,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

import { BUSINESS, CITIES } from "@/lib/constants";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Mobile Convenience",
    description: "We come to your home, office, or anywhere in Ventura County.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guarantee",
    description:
      "Not happy with the results? We'll make it right — your shine is guaranteed.",
  },
  {
    icon: MapPin,
    title: "Local & Trusted",
    description:
      "Ventura County owned and operated. Follow us on Instagram for real results.",
  },
] as const;

const TRUST_BADGES = [
  { icon: Sparkles, label: "Quality Service" },
  { icon: ShieldCheck, label: "Premium Products" },
  { icon: Clock, label: "On Time Every Time" },
  { icon: BadgeCheck, label: "Satisfaction Guaranteed" },
] as const;

export function ServiceArea() {
  return (
    <section className="border-y bg-brand-navy py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
                <badge.icon className="size-5" aria-hidden />
              </div>
              <p className="text-xs font-semibold leading-snug sm:text-sm">
                {badge.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Service Area
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Proudly serving Ventura County
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">
              Carwash Elites brings premium mobile detailing to neighborhoods
              across {BUSINESS.serviceArea}. Book your appointment and
              we&apos;ll meet you wherever you are.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90"
                >
                  {city}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-1">
            {TRUST_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
