"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BookNowButton } from "@/components/book-now-button";
import { InstagramIcon } from "@/components/instagram-icon";
import { BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-brand-navy/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${BUSINESS.name} home`}
        >
          <Image
            src="/carwashlogo.jpg"
            alt={BUSINESS.name}
            width={148}
            height={146}
            priority
            className="h-11 w-auto rounded-md object-contain sm:h-12"
            sizes="96px"
          />
          <span className="hidden font-heading text-lg font-bold tracking-tight text-white sm:inline">
            {BUSINESS.name}
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Carwash Elites Instagram profile"
            className="inline-flex h-10 min-h-10 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white sm:px-3.5"
          >
            <InstagramIcon className="size-4 shrink-0" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a
            href={BUSINESS.phoneHref}
            aria-label={`Call ${BUSINESS.phone}`}
            className="flex size-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Phone className="size-5" />
          </a>
          <BookNowButton
            size="sm"
            className="bg-white px-4 font-semibold text-brand-navy shadow-none hover:bg-white/90 sm:h-9 sm:px-5 sm:text-sm"
          />
        </div>
      </div>
    </header>
  );
}
