import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import UserForm from "../components/UserForm";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this user?");
    if (!confirm) return;
    console.log(id);
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="mt-4 text-2xl font-bold mb-6 text-blue-600 dark:text-white">
        User Management
      </h1>

      <UserForm
        user={editingUser}
        onSuccess={() => {
          setEditingUser(null);
          fetchUsers();
        }}
      />

      <div className="overflow-x-auto mt-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                  <td className="px-4 py-2 space-x-3">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setEditingUser(u);
                      }}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
