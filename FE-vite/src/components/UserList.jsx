import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSort, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL = "/api/";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Link to={`add`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New
          </Link>
          <input
            type="text"
            className="w-1/3 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3 border border-gray-600">No</th>
                <th className="p-3 border border-gray-600">
                  Name
                  <button onClick={toggleSortOrder} className="ml-2">
                    <FaSort />
                  </button>
                </th>
                <th className="p-3 border border-gray-600">Email</th>
                <th className="p-3 border border-gray-600">Title</th>
                <th className="p-3 border border-gray-600">Category</th>
                <th className="p-3 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-700">
                  <td className="p-3 border border-gray-600">{index + 1}</td>
                  <td className="p-3 border border-gray-600">{user.name}</td>
                  <td className="p-3 border border-gray-600">{user.email}</td>
                  <td className="p-3 border border-gray-600">{user.title}</td>
                  <td className="p-3 border border-gray-600">{user.category}</td>
                  <td className="p-3 border border-gray-600 flex gap-2">
                    <Link to={`edit/${user.id}`} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
