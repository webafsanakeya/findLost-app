import React from "react";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Happy User",
    image: "https://i.pravatar.cc/100?img=1",
    message:
      "I lost my wallet and thanks to this platform, I got it back within a day! Amazing service.",
  },
  {
    id: 2,
    name: "Michael Smith",
    title: "Verified Finder",
    image: "https://i.pravatar.cc/100?img=2",
    message:
      "Reporting found items has never been easier. I love how simple the process is!",
  },
  {
    id: 3,
    name: "Sarah Williams",
    title: "Satisfied Customer",
    image: "https://i.pravatar.cc/100?img=3",
    message:
      "The notifications and updates are really helpful. Found my lost phone fast.",
  },
];

export default function Reviews() {
  return (
    <section className="w-screen bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800">
          What Our Users Say
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Real stories from our community about finding and recovering lost items.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-purple-800">{review.name}</h4>
                  <p className="text-gray-500 text-sm">{review.title}</p>
                </div>
              </div>
              <p className="text-gray-700">{review.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
