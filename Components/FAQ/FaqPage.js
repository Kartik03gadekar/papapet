"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Fusce molestie condimentum facilisis.",
    answer: `Nulla malesuada iaculis nisi, vitae sagittis lacus laoreet in. Morbi aliquet pulvinar orci non vulputate. 
Donec aliquet ullamcorper gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
    bullets: [
      "Vivamus sed est non arcu porta aliquet et vitae nulla.",
      "Integer et lacus vitae justo fermentum rutrum. In nec ultrices massa.",
      "Proin blandit nunc risus, at semper turpis sagittis nec.",
      "Quisque ut dolor erat.",
    ],
  },
  {
    question: "Suspendisse ultrices pharetra libero sed interdum.",
  },
  {
    question: "Quisque quis nunc quis urna tempor lobortis vel non orci.",
  },
  {
    question:
      "Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus.",
  },
  {
    question: "Nulla sed sapien maximus, faucibus massa vitae.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
  

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12">
        {/* Left: FAQs */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded shadow-sm border transition duration-300 ${
                  index === activeIndex
                    ? "bg-orange-100 border-orange-500"
                    : "bg-white"
                }`}
              >
                <button
                  className={`w-full text-left p-4 font-semibold flex justify-between items-center ${
                    index === activeIndex ? "bg-[#FD890E] text-white" : ""
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span>{index === activeIndex ? "−" : "+"}</span>
                </button>
                {index === activeIndex && (
                  <div className="px-6 py-4 bg-white text-sm text-gray-700">
                    {faq.answer && <p className="mb-2">{faq.answer}</p>}
                    {faq.bullets && (
                      <ul className="list-disc list-inside space-y-1">
                        {faq.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full md:w-1/3 h-fit  bg-orange-100 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Don’t find your answer, Ask for support.
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed
            molestie accumsan dui.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="p-2 rounded border focus:outline-orange-400"
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-2 rounded border focus:outline-orange-400"
            />
            <textarea
              placeholder="Message (Optional)"
              rows={4}
              className="p-2 rounded border focus:outline-orange-400"
            ></textarea>
            <button
              type="submit"
              className="bg-[#FD890E] hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
            >
              SEND MESSAGE →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
 