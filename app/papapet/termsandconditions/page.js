"use client";

import React from "react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";

const terms = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <>
        By accessing or using PaPaPet, you agree to comply with and be legally
        bound by these Terms and our Privacy Policy. If you do not agree with
        any part of these terms, please do not use our services.
      </>
    ),
  },
  {
    title: "2. Services Overview",
    content: (
      <>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Sale of pet food, accessories, and wellness products</li>
          <li>
            Booking of services such as grooming, walking, vet visits, and
            boarding
          </li>
          <li>AI-based health reports and consultations</li>
          <li>Same-day delivery and home visits (in select locations)</li>
        </ul>
        <p className="mt-2 text-neutral-500 text-xs">
          We reserve the right to modify or discontinue services without prior
          notice.
        </p>
      </>
    ),
  },
  {
    title: "3. User Account",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          To use certain features, you must register and create an account:
        </li>
        <ul className="list-[circle] pl-5 space-y-1">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the confidentiality of your account credentials</li>
          <li>We reserve the right to suspend accounts found in violation</li>
        </ul>
      </ul>
    ),
  },
  {
    title: "4. Data Collection, Usage & Security",
    content: (
      <div className="space-y-2">
        <div>
          <span className="font-medium">A. What Data We Collect</span>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-neutral-700">
            <li>Personal details (name, contact, location, pet info)</li>
            <li>Transaction details</li>
            <li>Technical data (device info, IP, behavior)</li>
          </ul>
        </div>
        <div>
          <span className="font-medium">B. How We Use Your Data</span>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-neutral-700">
            <li>Provide and personalize services</li>
            <li>Process orders and bookings</li>
            <li>Send notifications and promotions (with consent)</li>
            <li>Generate pet health insights (via AI)</li>
            <li>Improve user experience</li>
          </ul>
        </div>
        <div>
          <span className="font-medium">C. Data Sharing</span>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-neutral-700">
            <li>We may share data with:</li>
            <ul className="list-[circle] pl-5 space-y-1">
              <li>Service providers (e.g., payment, delivery)</li>
              <li>Vets (with consent)</li>
              <li>Legal authorities (if required)</li>
            </ul>
          </ul>
        </div>
        <div>
          <span className="font-medium">D. Data Security</span>
          <p className="text-neutral-700">
            We use encryption, secure servers, and access controls. However,
            100% internet security cannot be guaranteed.
          </p>
        </div>
        <div>
          <span className="font-medium">E. User Rights</span>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-neutral-700">
            <li>You may:</li>
            <ul className="list-[circle] pl-5 space-y-1">
              <li>Request, correct, or delete data</li>
              <li>Opt out of marketing</li>
              <li>Deactivate your account</li>
            </ul>
          </ul>
          <p className="mt-1 text-xs text-neutral-500">
            Contact:{" "}
            <span className="font-mono">papapetofficial03@gmail.com</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "5. Orders & Payments",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>All payments in INR via secure gateways</li>
        <li>Subject to availability</li>
        <li>Delivery times are estimates</li>
        <li>Service bookings may be rescheduled</li>
      </ul>
    ),
  },
  {
    title: "6. Cancellations & Refunds",
    content: (
      <div className="space-y-2">
        <div>
          <span className="font-medium">A. Product Returns</span>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-neutral-700">
            <li>Accepted for damaged/incorrect items</li>
            <li>Must be requested within 48 hours</li>
          </ul>
        </div>
        <div>
          <span className="font-medium">B. Service Cancellations</span>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-neutral-700">
            <li>Full refund if canceled 24 hours in advance</li>
            <li>No refund for last-minute cancellations unless valid reason</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "7. Acceptable Use",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Do not:</li>
        <ul className="list-[circle] pl-5 space-y-1">
          <li>Use for illegal purposes</li>
          <li>Impersonate others</li>
          <li>Upload harmful/offensive content</li>
          <li>Exploit platform features</li>
        </ul>
      </ul>
    ),
  },
  {
    title: "8. Intellectual Property",
    content: (
      <>
        All content is owned by PaPaPet and Thrivetrillion Innovations Pvt. ltd. Do not reproduce without written
        permission.
      </>
    ),
  },
  {
    title: "9. Third-Party Services",
    content: (
      <>We’re not responsible for third-party policies or performance.</>
    ),
  },
  {
    title: "10. Limitation of Liability",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Not liable for:</li>
        <ul className="list-[circle] pl-5 space-y-1">
          <li>Product misuse/allergies</li>
          <li>Delivery delays</li>
          <li>Health outcomes from user data</li>
          <li>Indirect or punitive damages</li>
        </ul>
      </ul>
    ),
  },
  {
    title: "11. Termination",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>We may suspend or terminate accounts for:</li>
        <ul className="list-[circle] pl-5 space-y-1">
          <li>Violations of terms</li>
          <li>Fraud or harmful activity</li>
          <li>At your request</li>
        </ul>
      </ul>
    ),
  },
  {
    title: "12. Governing Law",
    content: (
      <>
        Terms governed by Indian law. Disputes will be handled in{" "}
        <span className="font-mono font-bold">Bhopal,MP</span>.
      </>
    ),
  },
  {
    title: "13. Contact Us",
    content: (
      <div className="space-y-1 text-neutral-700">
        <div className="font-medium">PaPaPet Support Team</div>
        <div>
          <span className="font-medium">Email:</span>{" "}
          <span className="font-bold">papapetofficial03@gmail.com</span>
        </div>
        <div>
          <span className="font-medium">Phone:</span>{" "}
          <span className="font-bold">+91 70675 38194</span>
        </div>
        <div>
          <span className="font-medium">Address:</span>{" "}
          <span className="font-bold">
            Awadthpuri phase 2 , Hn no 52,53 , Bhopal
          </span>
        </div>
      </div>
    ),
  },
  
];

export default function TermsAndConditionsPage() {
  return (
  
       <div  className="w-full  overflow-hidden"  >
         <NavPapaPet />
        <div className="flex flex-col items-center justify-center py-10 max-md:pt-30 pt-[5%]  overflow-hidden px-4 max-md:overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#FFAD22] mb-2 text-center tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-neutral-500 mb-8 text-sm sm:text-base text-center max-w-xl mx-auto">
            Please read these terms carefully before using PaPaPet. By accessing
            or using our website, app, or services, you agree to these terms.
          </p>
          <main className="w-full flex flex-col items-center">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-neutral-200 px-6 pt-2 sm:p-10">
              <div className="divide-y divide-neutral-200">
                {terms.map((section, idx) => (
                  <section key={section.title} className="py-5">
                    <h2 className="text-base sm:text-lg font-medium text-[#FFAD22] mb-1 tracking-tight">
                      {section.title}
                    </h2>
                    <div className="text-neutral-700 text-sm sm:text-base leading-relaxed ">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </main>
        </div>

       </div>
      
    
  );
}
