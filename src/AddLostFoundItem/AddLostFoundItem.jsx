import React, { useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddLostFoundItem = () => {
  const { user } = UseAuth();
  const [photoUrl, setPhotoUrl] = useState('')

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if(user?.photoUrl){
        data.user.userPhoto = user.photoUrl;
    }
    //
    console.log(data);
    // save post to the database
    axios
      .post("http://localhost:3000/items", data)
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
          setPhotoUrl('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Add Lost & Found Item
      </h2>

      <form
        onSubmit={handleAddPost}
        className="space-y-6 bg-base-100 p-6 rounded-xl shadow-md"
      >
        {/* Post Type */}
        <div>
          <label className="block text-lg font-medium mb-2">Post Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="postType"
                value="Lost"
                className="radio"
              />
              <span>Lost</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="postType"
                value="Found"
                className="radio"
              />
              <span>Found</span>
            </label>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-medium mb-2">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option disabled value="">
              Select Category
            </option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Rabbit</option>
            <option>Other</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Lost Golden Retriever in Banani"
            className="input input-bordered w-full"
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
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Date Lost or Found
          </label>
          <input
            type="date"
            name="date"
            className="input input-bordered w-full"
          />
        </div>

        {/* User Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="userName"
              defaultValue={user?.displayName || ""}
              placeholder="Your full name"
              className="input input-bordered w-full"
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
            />
          </div>
        </div>

        {/* Optional: Send user's photo */}
        {user?.photoURL && (
          <input type="hidden" name="userPhoto" value={user.photoURL} />
        )}

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
