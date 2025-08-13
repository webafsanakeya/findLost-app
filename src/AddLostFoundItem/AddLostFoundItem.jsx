import React, { useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLostFoundItem = () => {
  const { user } = UseAuth();
  const [photoUrl, setPhotoUrl] = useState("");
  const [date, setDate] = useState(null);
  const [postType, setPostType] = useState(""); // For button style selection
  const [category, setCategory] = useState("");

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.date = date;
    data.postType = postType;
    data.category = category;

    if (user?.photoURL) {
      data.userPhoto = user.photoURL;
    }

    // Validation
    if (!postType) return Swal.fire({ icon: "error", title: "Select a post type" });
    if (!category) return Swal.fire({ icon: "error", title: "Select a category" });

    axios
      .post("https://find-lost-server-plum.vercel.app/items", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New post has been saved and published",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          setPhotoUrl("");
          setDate(null);
          setPostType("");
          setCategory("");
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({ icon: "error", title: "Failed to save post" });
      });
  };

  const categories = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Add Lost & Found Item
      </h2>

      <form
        onSubmit={handleAddPost}
        className="space-y-6 bg-base-100 p-6 rounded-xl shadow-md"
      >
        {/* Post Type Buttons */}
        <div>
          <label className="block text-lg font-medium mb-2">Post Type</label>
          <div className="flex gap-4">
            {["Lost", "Found"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setPostType(type)}
                className={`px-4 py-2 rounded-lg border ${
                  postType === type
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Category Buttons */}
        <div>
          <label className="block text-lg font-medium mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg border ${
                  category === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Lost Golden Retriever in Banani"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Describe the item, where it was last seen, any identifiers..."
            required
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g., Banani Park, Dhaka"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-lg font-medium mb-2">Date Lost or Found</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered w-full"
            placeholderText="Select Date"
            required
          />
        </div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="userName"
              defaultValue={user?.displayName || ""}
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Optional user photo */}
        {user?.photoURL && <input type="hidden" name="userPhoto" value={user.photoURL} />}

        {/* Image URL */}
        <div>
          <label className="block text-lg font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://your-image-url.com/photo.jpg"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full"
          />
          {photoUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <img
                src={photoUrl}
                alt="Preview"
                className="w-full max-w-xs rounded-lg shadow-md border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <input
            type="submit"
            value="Add Post"
            className="btn btn-primary px-8 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default AddLostFoundItem;
