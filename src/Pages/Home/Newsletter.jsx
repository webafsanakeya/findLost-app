import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // handle subscription logic
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <section className="w-screen bg-gradient-to-r from-purple-800 to-indigo-900 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Join Our Newsletter
        </h2>
        <p className="mt-2 text-gray-200">
          Stay updated with the latest lost & found items and success stories.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-800 w-full sm:w-auto flex-1"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-white text-purple-800 font-semibold hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
