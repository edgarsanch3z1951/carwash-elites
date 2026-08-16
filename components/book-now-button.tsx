"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/lib/booking-context";
import type { VehicleType } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BookNowButtonProps = {
  packageId?: string;
  vehicle?: VehicleType;
  label?: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | "xs" | "icon-xs";
  className?: string;
};

export function BookNowButton({
  packageId,
  vehicle,
  label = "Book Now",
  size = "default",
  className,
}: BookNowButtonProps) {
  const { scrollToBooking, selectedVehicle } = useBooking();

  return (
    <Button
      type="button"
      size={size}
      className={cn(
        "cursor-pointer bg-brand-navy text-white shadow-lg shadow-brand-navy/25 transition-[transform,box-shadow,background-color] duration-200 hover:bg-brand-navy/90 hover:shadow-xl hover:shadow-brand-navy/30 active:scale-[0.98] active:shadow-md",
        className,
      )}
      onClick={() => scrollToBooking(packageId, vehicle ?? selectedVehicle)}
    >
      {label}
    </Button>
  );
}
