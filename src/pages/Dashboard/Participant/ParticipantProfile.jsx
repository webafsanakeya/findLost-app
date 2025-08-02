import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ParticipantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Prefill form with user data on load
    if (user) {
      setValue("name", user.displayName || "");
      setValue("image", user.photoURL || "");
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, data);
      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        setEditing(false);
        reset();
        // Optionally update the local user object if you use a global auth context
      } else {
        toast("No changes made.");
      }
    } catch (error) {
        if (error) return <p className="text-red-500">Something went wrong: {error?.message || "Unknown error"}</p>;
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">My Profile</h2>

      {!editing ? (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          {/* Optional field */}
          {user?.phone && <p><strong>Phone:</strong> {user.phone}</p>}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setEditing(true)}
          >
            Update
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              {...register("image")}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              className="text-red-500"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ParticipantProfile;