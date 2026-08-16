"use client";

import { format, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SLOT_START_MINUTES = 8 * 60;
const SLOT_END_MINUTES = 18 * 60;
const SLOT_STEP_MINUTES = 30;

function formatSlot(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export const TIME_SLOTS = Array.from(
  { length: (SLOT_END_MINUTES - SLOT_START_MINUTES) / SLOT_STEP_MINUTES + 1 },
  (_, index) => formatSlot(SLOT_START_MINUTES + index * SLOT_STEP_MINUTES),
);

function parseISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function toISODate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function slotDate(isoDate: string, slot: string) {
  const match = slot.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
  const date = parseISODate(isoDate);
  if (!match || !date) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3];
  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

type PreferredDateTimePickerProps = {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  dateError?: string;
  timeError?: string;
};

export function PreferredDateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
}: PreferredDateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const todayStart = startOfDay(now);
  const selectedDate = date ? parseISODate(date) : undefined;
  const isToday = date === toISODate(now);

  const availableSlots = useMemo(() => {
    if (!date) return [];
    if (!isToday) return TIME_SLOTS;
    return TIME_SLOTS.filter((slot) => {
      const value = slotDate(date, slot);
      return value ? value.getTime() > now.getTime() : false;
    });
  }, [date, isToday, now]);

  useEffect(() => {
    if (time && date && !availableSlots.includes(time)) {
      onTimeChange("");
    }
  }, [availableSlots, date, onTimeChange, time]);

  return (
    <div className={cn("grid gap-3", date ? "grid-cols-2" : "grid-cols-1")}>
      <div className="space-y-1">
        <span className="text-sm font-medium">Preferred date</span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                aria-invalid={!!dateError}
                className="h-8 w-full min-w-0 justify-start gap-2 px-2.5 font-normal"
              />
            }
          >
            <CalendarIcon className="size-3.5 shrink-0 text-muted-foreground" />
            <span className={cn("truncate", !selectedDate && "text-muted-foreground")}>
              {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select date"}
            </span>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="bottom"
            sideOffset={6}
            className="w-auto max-w-[calc(100vw-1.5rem)] p-1.5"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(next) => {
                if (!next) return;
                onDateChange(toISODate(next));
                onTimeChange("");
                setOpen(false);
              }}
              disabled={{ before: todayStart }}
              startMonth={todayStart}
              today={now}
              className="[--cell-size:--spacing(9)]"
            />
          </PopoverContent>
        </Popover>
        {dateError && <p className="text-sm text-destructive">{dateError}</p>}
      </div>

      {date ? (
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="preferred-time">
            Preferred time
          </label>
          {availableSlots.length > 0 ? (
            <select
              id="preferred-time"
              value={time}
              aria-invalid={!!timeError}
              onChange={(event) => onTimeChange(event.target.value)}
              className={selectClassName}
            >
              <option value="">Select time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          ) : (
            <p className="flex h-8 items-center text-xs leading-snug text-muted-foreground">
              No remaining times today
            </p>
          )}
          {timeError && <p className="text-sm text-destructive">{timeError}</p>}
        </div>
      ) : null}
    </div>
  );
}
