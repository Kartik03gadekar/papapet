"use client";

import React from "react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";

const privacySections = [
  {
    title: "1. What Information We Collect",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Personal Details:</span> Name, email address, phone number, delivery address, and pet information (such as breed, age, and health conditions).
        </li>
        <li>
          <span className="font-medium">Payment Information:</span> Collected and processed through secure third-party payment gateways. <span className="italic">We do not store your card details.</span>
        </li>
        <li>
          <span className="font-medium">Technical and Usage Data:</span> IP address, browser type, device information, pages visited, session duration, and behavior on the platform.
        </li>
        <li>
          <span className="font-medium">Cookies and Tracking Technologies:</span> Used to remember preferences, analyze usage patterns, and enhance user experience.
        </li>
      </ul>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Process orders, appointments, and service bookings.</li>
        <li>Communicate with you about your account, updates, promotions, and offers.</li>
        <li>Personalize your experience, including pet product or health suggestions using AI.</li>
        <li>Improve our website, mobile app, services, and product offerings.</li>
        <li>Analyze user behavior to enhance user experience and platform performance.</li>
        <li>Conduct research, customer analysis, and marketing activities.</li>
        <li>Develop new services, features, or partnerships based on usage trends.</li>
        <li>Comply with applicable laws, regulations, and legal obligations.</li>
        <li className="mt-2 text-neutral-600 text-sm">
          <span className="font-medium">Note:</span> By using our platform, you consent to the use of your data for the purposes outlined above, including but not limited to marketing and service development, as long as it aligns with applicable data protection laws.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Who We Share Your Data With",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Service Providers:</span> Such as delivery agents, vet doctors, grooming professionals, and customer support teams.
        </li>
        <li>
          <span className="font-medium">Business Partners:</span> For service collaboration, marketing, and operational purposes.
        </li>
        <li>
          <span className="font-medium">Legal Authorities:</span> When required to comply with laws, regulations, or legal processes.
        </li>
        <li>
          <span className="font-medium">No Data Selling:</span> We do not sell your personal information to third parties under any circumstances.
        </li>
      </ul>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>We use encryption, secure servers, and access control to protect your information.</li>
        <li>Our team regularly reviews system security and compliance protocols.</li>
        <li>While we take strong precautions, no system is entirely immune to breaches.</li>
      </ul>
    ),
  },
  {
    title: "5. Your Rights and Choices",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>You may view, update, or delete your personal data at any time.</li>
        <li>You can unsubscribe from marketing communications at your discretion.</li>
        <li>You can manage cookies and tracking preferences through your browser settings.</li>
        <li>You may request access to or deletion of your data, subject to applicable legal rights.</li>
      </ul>
    ),
  },
  {
    title: "6. Children’s Privacy",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Our platform is not designed for use by children under the age of 13.</li>
        <li>We do not knowingly collect information from children without parental consent.</li>
      </ul>
    ),
  },
  {
    title: "7. Third-Party Links",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Our website/app may contain links to external websites not operated by us.</li>
        <li>We are not responsible for the privacy practices of those third-party platforms.</li>
      </ul>
    ),
  },
  {
    title: "8. Changes to This Policy",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>We may update this Privacy Policy from time to time.</li>
        <li>Any changes will be posted here with the updated &quot;Effective Date.&quot;</li>
      </ul>
    ),
  },
  {
    title: "9. Contact Us",
    content: (
      <div className="space-y-1 text-neutral-700">
        <div>
          <span className="font-medium">Email:</span>{" "}
          <span className="font-bold">papapetofficial03@gmail.com</span>
        </div>
        <div>
          <span className="font-medium">Phone:</span>{" "}
          <span className="font-bold">+91 92384 09621</span>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
 <div  className="w-full  overflow-hidden"  >
      <NavPapaPet />
     <div className="flex flex-col items-center justify-center py-10 max-md:pt-30 pt-[5%] px-4 max-md:overflow-hidden">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#FFAD22] mb-2 text-center tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 mb-8 text-sm sm:text-base text-center max-w-xl mx-auto">
          Your privacy is important to us. This Privacy Policy explains how PaPaPet collects, uses, shares, and protects your information when you use our website, app, or services.
        </p>
        <main className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-neutral-200 px-6 pt-2 sm:p-10">
            <div className="divide-y divide-neutral-200">
              {privacySections.map((section) => (
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
