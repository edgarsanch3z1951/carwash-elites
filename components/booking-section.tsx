"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { PreferredDateTimePicker } from "@/components/preferred-datetime-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBooking } from "@/lib/booking-context";
import {
  ADD_ONS,
  BOOKING_SECTION_ID,
  BUSINESS,
  PACKAGES,
  VEHICLE_TYPES,
  type VehicleType,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.union([
    z.literal(""),
    z.string().email("Please enter a valid email"),
  ]),
  package: z.string().min(1, "Please select a package"),
  vehicle: z.enum(["car", "truck", "suv"]),
  address: z.string().min(5, "Please enter your service address"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  addOns: z.array(z.string()),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingSection() {
  const { selectedPackage, selectedVehicle, setSelectedVehicle } = useBooking();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      package: selectedPackage ?? "elite",
      vehicle: selectedVehicle,
      address: "",
      preferredDate: "",
      preferredTime: "",
      addOns: [],
      notes: "",
    },
  });

  const watchedPackage = useWatch({ control, name: "package" });
  const watchedVehicle = useWatch({ control, name: "vehicle" });
  const watchedAddOns = useWatch({ control, name: "addOns" }) ?? [];
  const watchedDate = useWatch({ control, name: "preferredDate" }) ?? "";
  const watchedTime = useWatch({ control, name: "preferredTime" }) ?? "";

  useEffect(() => {
    if (selectedPackage) {
      setValue("package", selectedPackage, { shouldValidate: true });
    }
  }, [selectedPackage, setValue]);

  useEffect(() => {
    setValue("vehicle", selectedVehicle, { shouldValidate: true });
  }, [selectedVehicle, setValue]);

  const estimate = useMemo(() => {
    const pkg = PACKAGES.find((item) => item.id === watchedPackage);
    const vehicle = (watchedVehicle ?? "car") as VehicleType;
    const packagePrice = pkg?.pricing[vehicle] ?? 0;
    const addOnTotal = ADD_ONS.filter((addon) =>
      watchedAddOns.includes(addon.id),
    ).reduce((sum, addon) => sum + addon.price, 0);
    return { packagePrice, addOnTotal, total: packagePrice + addOnTotal };
  }, [watchedPackage, watchedVehicle, watchedAddOns]);

  async function onSubmit(data: BookingFormValues) {
    setSubmitError(null);

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      setSubmitError(
        "Booking is temporarily unavailable. Please call us or try again later.",
      );
      return;
    }

    const pkg = PACKAGES.find((item) => item.id === data.package);
    const selectedAddOns = ADD_ONS.filter((addon) =>
      data.addOns.includes(addon.id),
    );
    const packagePrice = pkg?.pricing[data.vehicle] ?? 0;
    const addOnTotal = selectedAddOns.reduce(
      (sum, addon) => sum + addon.price,
      0,
    );

    const payload = {
      fullName: data.name,
      phone: data.phone,
      email: data.email || "",
      serviceAddress: data.address,
      package: pkg?.name ?? data.package,
      vehicleType:
        VEHICLE_TYPES.find((v) => v.key === data.vehicle)?.label ?? data.vehicle,
      addOns: selectedAddOns.map((addon) => addon.name),
      estimatedTotal: packagePrice + addOnTotal,
      preferredDate: data.preferredDate || "",
      preferredTime: data.preferredTime || "",
      notes: data.notes || "",
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }

      setIsSuccess(true);
      reset({
        name: "",
        phone: "",
        email: "",
        package: selectedPackage ?? "elite",
        vehicle: selectedVehicle,
        address: "",
        preferredDate: "",
        preferredTime: "",
        addOns: [],
        notes: "",
      });
    } catch {
      setSubmitError(
        "Something went wrong sending your request. Please call us or try again.",
      );
    }
  }

  return (
    <section
      id={BOOKING_SECTION_ID}
      className="scroll-mt-20 bg-gradient-to-b from-brand-navy to-brand-navy-light py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Book Your Detail Today!
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Thank you for supporting local.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              size="sm"
              className="shadow-xl ring-1 ring-brand-accent/20 text-foreground"
            >
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl sm:text-3xl">
                  Book Your Detail
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we&apos;ll confirm your
                  appointment within 24 hours. Or call us at{" "}
                  <a
                    href={BUSINESS.phoneHref}
                    className="font-medium text-brand-accent hover:underline"
                  >
                    {BUSINESS.phone}
                  </a>
                  .
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="rounded-xl bg-brand-accent/10 p-6 text-center">
                    <p className="font-heading text-xl font-bold">
                      Request received!
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Thanks for booking with Carwash Elites. We&apos;ll be in
                      touch shortly to confirm your appointment.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-5 cursor-pointer"
                      onClick={() => {
                        setIsSuccess(false);
                        setSubmitError(null);
                      }}
                    >
                      Submit another request
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Full Name" error={errors.name?.message}>
                        <Input
                          {...register("name")}
                          placeholder="John Smith"
                          aria-invalid={!!errors.name}
                        />
                      </Field>
                      <Field label="Phone" error={errors.phone?.message}>
                        <Input
                          {...register("phone")}
                          type="tel"
                          placeholder="(805) 555-0123"
                          aria-invalid={!!errors.phone}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Email (optional)"
                      error={errors.email?.message}
                    >
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="you@email.com"
                        aria-invalid={!!errors.email}
                      />
                    </Field>

                    <Field
                      label="Service Address"
                      error={errors.address?.message}
                    >
                      <Input
                        {...register("address")}
                        placeholder="123 Main St, Ventura, CA"
                        aria-invalid={!!errors.address}
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Package" error={errors.package?.message}>
                        <select
                          {...register("package")}
                          aria-invalid={!!errors.package}
                          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {PACKAGES.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.name}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field
                        label="Vehicle Type"
                        error={errors.vehicle?.message}
                      >
                        <select
                          {...register("vehicle", {
                            onChange: (event) => {
                              setSelectedVehicle(
                                event.target.value as VehicleType,
                              );
                            },
                          })}
                          aria-invalid={!!errors.vehicle}
                          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {VEHICLE_TYPES.map((type) => (
                            <option key={type.key} value={type.key}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <PreferredDateTimePicker
                      date={watchedDate}
                      time={watchedTime}
                      onDateChange={(next) => {
                        setValue("preferredDate", next, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      onTimeChange={(next) => {
                        setValue("preferredTime", next, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      dateError={errors.preferredDate?.message}
                      timeError={errors.preferredTime?.message}
                    />

                    <fieldset className="space-y-1.5">
                      <legend className="text-sm font-medium">Add-Ons</legend>
                      <div className="space-y-1.5">
                        {ADD_ONS.map((addon) => {
                          const checked = watchedAddOns.includes(addon.id);
                          return (
                            <label
                              key={addon.id}
                              className={cn(
                                "flex cursor-pointer flex-col gap-0.5 rounded-lg border px-2.5 py-2 transition-colors",
                                checked
                                  ? "border-brand-navy/30 bg-brand-navy/5"
                                  : "border-border hover:bg-muted/50",
                              )}
                            >
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  value={addon.id}
                                  {...register("addOns")}
                                  className="size-4 shrink-0 accent-brand-navy"
                                />
                                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                  {addon.name}
                                </span>
                                <span className="shrink-0 text-sm font-semibold text-brand-navy">
                                  +${addon.price}
                                </span>
                              </span>
                              <span className="pl-6 text-xs leading-snug text-muted-foreground">
                                {addon.description}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="rounded-xl border border-brand-navy/15 bg-brand-navy/5 px-3 py-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Package estimate
                        </span>
                        <span className="font-medium">
                          ${estimate.packagePrice}
                        </span>
                      </div>
                      {estimate.addOnTotal > 0 && (
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Add-ons</span>
                          <span className="font-medium">
                            +${estimate.addOnTotal}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between border-t border-brand-navy/10 pt-2">
                        <span className="font-semibold">Estimated total</span>
                        <span className="font-heading text-xl font-bold text-brand-navy">
                          ${estimate.total}
                        </span>
                      </div>
                    </div>

                    <Field label="Notes (optional)" error={errors.notes?.message}>
                      <textarea
                        {...register("notes")}
                        rows={2}
                        placeholder="Special requests, gate code, parking notes..."
                        className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      />
                    </Field>

                    {submitError && (
                      <p
                        role="alert"
                        className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                      >
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full cursor-pointer bg-brand-navy text-base font-bold text-white hover:bg-brand-navy/90 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="size-4 animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        "Book Now"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
