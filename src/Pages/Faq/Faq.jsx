import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "How do I report a lost item?",
    answer:
      "Simply click on 'Post Lost Item' and fill out the form with a description and image. Our platform will help connect you with finders.",
  },
  {
    question: "How can I claim a found item?",
    answer:
      "If someone reports a found item matching your lost item, you'll get a notification. Contact them safely via the platform to recover your belongings.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes! We never share your contact details publicly. Communication between finders and owners is handled securely through our platform.",
  },
  {
    question: "Can I post multiple items?",
    answer:
      "Absolutely. You can post as many lost or found items as needed. Each item will get its own post and tracking.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center focus:outline-none"
            >
              <span className="font-semibold text-lg">{item.question}</span>
              <span className="text-xl">{activeIndex === index ? "−" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 py-4 bg-white text-gray-700"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
