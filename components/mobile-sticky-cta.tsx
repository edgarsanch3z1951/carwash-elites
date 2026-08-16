"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { BookNowButton } from "@/components/book-now-button";
import {
  BOOKING_SECTION_ID,
  BUSINESS,
  HERO_SECTION_ID,
} from "@/lib/constants";

export function MobileStickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_SECTION_ID);
    const booking = document.getElementById(BOOKING_SECTION_ID);
    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    heroObserver.observe(hero);

    let bookingObserver: IntersectionObserver | undefined;
    if (booking) {
      bookingObserver = new IntersectionObserver(
        ([entry]) => setBookingVisible(entry.isIntersecting),
        { threshold: 0.2 },
      );
      bookingObserver.observe(booking);
    }

    return () => {
      heroObserver.disconnect();
      bookingObserver?.disconnect();
    };
  }, []);

  if (!heroGone || bookingVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-navy/10 bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a
          href={BUSINESS.phoneHref}
          aria-label={`Call ${BUSINESS.phone}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-navy/20 bg-white text-brand-navy transition-colors hover:bg-muted"
        >
          <Phone className="size-5" />
        </a>
        <BookNowButton
          label="Book Now"
          className="h-12 flex-1 font-bold shadow-none"
        />
      </div>
    </div>
  );
}
