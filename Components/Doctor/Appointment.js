import { useMemo, useState } from "react";
import { CalendarDays, Clock, ChevronDown, Info, Video } from "lucide-react";

import { toast } from "react-toastify";

function formatDateLabel(date) {
  if (!date) return "Select Date";
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const defaultSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const parsedDate = useMemo(
    () => (selectedDate ? new Date(selectedDate + "T00:00:00") : undefined),
    [selectedDate]
  );

  const canSubmit = selectedDate && selectedTime && notes.trim().length > 3;

  const onSubmit = () => {
    const payload = {
      date: selectedDate,
      time: selectedTime,
      notes: notes.trim(),
    };
    toast.success("Appointment booked", {
      description: `${formatDateLabel(parsedDate)} at ${payload.time}`,
    });
    // Reset form
    setSelectedTime("");
  };

  return (
    <section className="w-full bg-white shadow-lg">
      <div className="mx-auto bg-card text-card-foreground rounded-2xl shadow-lg border border-border/60 p-6 sm:p-8">
        <header className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Book a Video Consultation
            </h2>
            <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
              <Video className="size-4 text-primary" /> Connect with a vetted
              expert from anywhere
            </p>
          </div>
        </header>

        {/* Date picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Date</label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
          </div>
        </div>

        {/* Time slots */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              Available Time Slots
            </label>
            <div className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
              <Clock className="size-3" /> All times in your local timezone
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {defaultSlots.map((slot) => {
              const selected = slot === selectedTime;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 ${
                    selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-accent/40 border-input"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Describe your pet's issue
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., My dog has been vomiting since morning"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="rounded-xl bg-muted/40 border border-border px-4 py-3 text-sm text-muted-foreground flex items-start gap-2 mb-6">
          <Info className="mt-0.5 size-4 text-primary" />
          You're connected with a vet approved by PaPaPet for trusted, expert
          care.
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            className="h-12 rounded-xl text-base shadow-md bg-[#FFAD22] px-5"
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            Confirm Appointment
          </button>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="hidden sm:block size-4" />
            You'll receive a confirmation email shortly
          </span>
        </div>
      </div>
    </section>
  );
}
