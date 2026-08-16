import Image from "next/image";

import { InstagramIcon } from "@/components/instagram-icon";
import { BUSINESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Image
            src="/carwashlogo.jpg"
            alt={BUSINESS.name}
            width={96}
            height={95}
            className="h-14 w-auto rounded-md object-contain"
            sizes="56px"
          />
          <div>
            <p className="font-heading font-semibold text-brand-navy">
              {BUSINESS.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Mobile detailing · {BUSINESS.serviceArea}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href={BUSINESS.phoneHref}
            className="text-sm font-medium text-foreground transition-colors hover:text-brand-navy"
          >
            {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Carwash Elites Instagram profile"
            className="inline-flex h-10 min-h-10 items-center gap-2 rounded-lg border border-brand-navy/15 bg-brand-navy/5 px-4 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy/10"
          >
            <InstagramIcon className="size-4 shrink-0" />
            {BUSINESS.instagram}
          </a>
        </div>
      </div>
    </footer>
  );
}
