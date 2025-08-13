import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUpload, FaHandsHelping, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload className="text-4xl text-blue-500" />,
    title: "Post Your Item",
    description:
      "Report lost or found items with a detailed description and image to help others identify it.",
  },
  {
    icon: <FaSearch className="text-4xl text-green-500" />,
    title: "Browse Listings",
    description:
      "Explore all reported lost & found items and find potential matches for your belongings.",
  },
  {
    icon: <FaHandsHelping className="text-4xl text-yellow-500" />,
    title: "Connect Safely",
    description:
      "Contact item owners or finders securely through our platform to arrange recovery.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-purple-500" />,
    title: "Recover & Celebrate",
    description:
      "Successfully reunite items with their owners and celebrate each recovery story!",
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
