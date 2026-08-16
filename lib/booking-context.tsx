"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  BOOKING_SECTION_ID,
  type VehicleType,
} from "@/lib/constants";

type BookingContextValue = {
  selectedPackage: string | null;
  selectedVehicle: VehicleType;
  setSelectedVehicle: (vehicle: VehicleType) => void;
  scrollToBooking: (packageId?: string, vehicle?: VehicleType) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>("car");

  const scrollToBooking = useCallback(
    (packageId?: string, vehicle?: VehicleType) => {
      if (packageId) {
        setSelectedPackage(packageId);
      }
      if (vehicle) {
        setSelectedVehicle(vehicle);
      }

      requestAnimationFrame(() => {
        document.getElementById(BOOKING_SECTION_ID)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      selectedPackage,
      selectedVehicle,
      setSelectedVehicle,
      scrollToBooking,
    }),
    [selectedPackage, selectedVehicle, scrollToBooking],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
