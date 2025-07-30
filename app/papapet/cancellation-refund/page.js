"use client";

import React from "react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";

const cancellationSections = [
  {
    title: "1. Service Cancellations",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Customers may cancel booked pet services (e.g., grooming, walking, vet visits) up to <span className="font-medium">24 hours before</span> the scheduled time for a full refund.
        </li>
        <li>
          Cancellations made <span className="font-medium">within 24 hours</span> of the service time will not be eligible for a refund.
        </li>
        <li>
          Emergency cancellations may be considered on a case-by-case basis. Please contact our support team.
        </li>
      </ul>
    ),
  },
  {
    title: "2. Product Order Cancellations",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Orders for pet food, accessories, or other items can be cancelled <span className="font-medium">before dispatch</span> for a 100% refund.
        </li>
        <li>
          Once an order is shipped, it cannot be cancelled. You may request a return instead (if eligible).
        </li>
      </ul>
    ),
  },
  {
    title: "3. Returns & Refunds (Products)",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          You may return unused and unopened products within <span className="font-medium">7 days</span> of delivery.
        </li>
        <li>
          Items must be in original condition with packaging and invoice.
        </li>
        <li>
          Refunds will be processed within <span className="font-medium">7-10 business days</span> of receiving the returned item.
        </li>
        <li>
          <span className="font-medium">Non-returnable items</span> include perishable food items, opened packages, customized products, and hygiene-based items (e.g., pet diapers, brushes).
        </li>
      </ul>
    ),
  },
  {
    title: "4. Service Refunds",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          If a booked service is not delivered or canceled by PaPaPet, a full refund will be issued.
        </li>
        <li>
          If the pet owner is dissatisfied with a service, a partial refund or rescheduling may be offered after reviewing the issue.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Refund Method",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          All refunds will be credited back to the original payment method (UPI, card, wallet, etc.).
        </li>
        <li>
          In case of COD orders, refunds will be initiated to the user's bank account or wallet, upon confirmation.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Delayed or Missing Refunds",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          If you haven’t received a refund yet, first check your bank account or payment service.
        </li>
        <li>
          If still not received after 10 business days, please contact us at <a href="mailto:support@papapet.in" className="text-blue-600 underline">support@papapet.in</a>.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Contact for Support",
    content: (
      <div className="space-y-1 text-neutral-700">
        <div>
          <span className="font-medium">Email:</span>{" "}
          <span className="font-bold">support@papapet.in</span>
        </div>
        <div>
          <span className="font-medium">Phone:</span>{" "}
          <span className="font-bold">+91-9238409621</span>
        </div>
        <div>
          <span className="font-medium">Phone:</span>{" "}
          <span className="font-bold">+91-7067538194</span>
        </div>
      </div>
    ),
  },
];

export default function CancellationRefundPage() {
  return (
    <div className="w-full overflow-hidden">
      <NavPapaPet />
      <div className="flex flex-col items-center justify-center py-10 max-md:pt-30 pt-[5%] px-4 max-md:overflow-hidden">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#FFAD22] mb-2 text-center tracking-tight">
          Cancellation &amp; Refund Policy
        </h1>
        <p className="text-neutral-500 mb-8 text-sm sm:text-base text-center max-w-xl mx-auto">
          Please read our cancellation and refund policy carefully. For any questions or concerns, feel free to contact our support team.
        </p>
        <main className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-neutral-200 px-6 pt-2 sm:p-10">
            <div className="divide-y divide-neutral-200">
              {cancellationSections.map((section) => (
                <section key={section.title} className="py-5">
                  <h2 className="text-base sm:text-lg font-medium text-[#FFAD22] mb-1 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
        <div className="mt-8 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} PaPaPet. All rights reserved.
        </div>
      </div>
    </div>
  );
}

