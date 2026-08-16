"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { BeforeAfterSlider } from "@/components/before-after-slider";
import { BookNowButton } from "@/components/book-now-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBooking } from "@/lib/booking-context";
import { ADD_ONS, PACKAGES, VEHICLE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { selectedVehicle, setSelectedVehicle } = useBooking();
  const reduceMotion = useReducedMotion();
  const vehicle = selectedVehicle;

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Simple Pricing
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Package
          </h2>
          <p className="mt-4 text-muted-foreground">
            Transparent pricing with no hidden fees. Every package includes our
            mobile convenience — we come to you anywhere in Ventura County.
          </p>
        </div>

        <div className="sticky top-16 z-30 mb-8 flex justify-center sm:top-[4.25rem]">
          <div
            role="tablist"
            aria-label="Vehicle type"
            className="inline-flex w-full max-w-md rounded-xl border border-border bg-background/95 p-1.5 shadow-md backdrop-blur-md sm:w-auto"
          >
            {VEHICLE_TYPES.map((type) => {
              const selected = vehicle === type.key;
              return (
                <button
                  key={type.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setSelectedVehicle(type.key)}
                  className={cn(
                    "min-h-12 flex-1 cursor-pointer rounded-lg px-5 text-sm font-semibold transition-colors sm:min-w-[6.5rem]",
                    selected
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg, index) => {
            const isPopular = "popular" in pkg && pkg.popular;
            const tagline = "tagline" in pkg ? pkg.tagline : undefined;
            const note = "note" in pkg ? pkg.note : undefined;
            const price = pkg.pricing[vehicle];

            return (
              <motion.div
                key={pkg.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={cn("relative", isPopular && "xl:z-10")}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-accent-foreground shadow-sm">
                    Most Popular
                  </div>
                )}
                <Card
                  className={cn(
                    "relative h-full",
                    isPopular &&
                      "bg-brand-navy text-white ring-2 ring-brand-accent shadow-lg shadow-brand-navy/20 xl:scale-[1.03]",
                  )}
                >
                  <CardHeader className={cn(isPopular && "pt-6")}>
                    <CardTitle
                      className={cn("text-xl", isPopular && "text-white")}
                    >
                      {pkg.name}
                    </CardTitle>
                    {tagline && (
                      <CardDescription className="font-medium text-brand-accent">
                        {tagline}
                      </CardDescription>
                    )}
                    <div className="pt-3">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={`${pkg.id}-${vehicle}`}
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            reduceMotion ? undefined : { opacity: 0, y: -6 }
                          }
                          transition={{ duration: reduceMotion ? 0 : 0.2 }}
                          className={cn(
                            "font-heading text-4xl font-bold tabular-nums tracking-tight",
                            isPopular ? "text-white" : "text-foreground",
                          )}
                        >
                          ${price}
                        </motion.p>
                      </AnimatePresence>
                      <p
                        className={cn(
                          "mt-1 text-sm capitalize",
                          isPopular
                            ? "text-white/65"
                            : "text-muted-foreground",
                        )}
                      >
                        {vehicle} pricing
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                          <span
                            className={cn(
                              isPopular
                                ? "text-white/80"
                                : "text-muted-foreground",
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {note && (
                      <p
                        className={cn(
                          "mt-4 text-sm font-medium",
                          isPopular
                            ? "text-brand-accent"
                            : "text-muted-foreground",
                        )}
                      >
                        {note}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter
                    className={cn(isPopular && "border-white/10 bg-white/5")}
                  >
                    <BookNowButton
                      packageId={pkg.id}
                      vehicle={vehicle}
                      label="Book This Package"
                      className={cn(
                        "h-10 w-full font-semibold",
                        isPopular &&
                          "bg-white text-brand-navy shadow-none hover:bg-white/90",
                      )}
                    />
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16"
        >
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h3 className="font-heading text-2xl font-bold tracking-tight">
              Add-Ons
            </h3>
            <p className="mt-2 text-muted-foreground">
              Pair any package with these upgrades for an even deeper clean.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {ADD_ONS.map((addon) => (
              <Card key={addon.id} size="sm" className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{addon.name}</CardTitle>
                    <p className="shrink-0 font-heading text-xl font-bold text-brand-navy">
                      +${addon.price}
                    </p>
                  </div>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                {"before" in addon && addon.before && "after" in addon && addon.after && (
                  <CardContent>
                    <BeforeAfterSlider
                      beforeSrc={addon.before}
                      afterSrc={addon.after}
                      beforeAlt="Headlights before restoration"
                      afterAlt="Headlights after restoration"
                    />
                  </CardContent>
                )}
                {"image" in addon && addon.image && (
                  <CardContent>
                    <div className="relative aspect-[4/3] max-h-52 w-full overflow-hidden rounded-lg bg-neutral-950 ring-1 ring-border">
                      <Image
                        src={addon.image}
                        alt={`${addon.name} before and after`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
