import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "@/lib/axios";

export default function UserForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // leave blank
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user?._id) {
        await axios.put(`/api/users/${user._id}`, formData);
      } else {
        await axios.post("/api/users", formData);
      }

      setFormData({ name: "", email: "", password: "", role: "viewer" });
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-6 rounded bg-white dark:bg-gray-900"
    >
      <h2 className="font-semibold">
        {user ? "Edit User" : "Create New User"}
      </h2>

      <input
        name="name"
        placeholder="Name"
        className="w-full p-2 border dark:bg-gray-800"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border dark:bg-gray-800"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={!!user}
      />

      {!user && (
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border dark:bg-gray-800"
          value={formData.password}
          onChange={handleChange}
          required
        />
      )}

      <Select
        value={formData.role}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, role: value }))
        }
      >
        <SelectTrigger className="w-full text-sm px-3 py-1.5 rounded-none dark:bg-gray-800 dark:text-white">
          <SelectValue className="" placeholder="Role" />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-900">
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-gray-700"
        >
          {user ? "Update" : "Create"}
        </button>

        {user && (
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                password: "",
                role: "viewer",
              });
              onSuccess(); // exit editing mode
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded dark:bg-gray-600 dark:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
