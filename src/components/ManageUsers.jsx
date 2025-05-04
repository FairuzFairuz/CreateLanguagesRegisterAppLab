import React, { useEffect, useState } from "react";
import UserLanguages from "./UserLanguages";

const API_Base = "http://localhost:5001"; // Base API URL

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "", country: "" });
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // ✅ Initialize selectedUser state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_Base}/lab/users`, { method: "GET" });
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Could not load users. Try again.");
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.age || !newUser.country) return;

    // Generate unique ID based on existing users
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUserWithID = { ...newUser, id };

    try {
      const response = await fetch(`${API_Base}/lab/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserWithID),
      });

      if (!response.ok) throw new Error("Failed to add user");

      setUsers((prev) => [...prev, newUserWithID]); // Update UI
      setNewUser({ name: "", age: "", country: "" }); // Reset input fields
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Could not add user. Try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    console.log("Attempting to delete user with ID:", id); // Debugging step

    try {
      const response = await fetch(`${API_Base}/lab/users`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id }), // Send user_id as JSON
      });

      const responseData = await response.json(); // Convert response to JSON
      console.log("Delete API Response:", responseData);

      if (!response.ok)
        throw new Error(responseData.message || "Failed to delete user");

      setUsers((prev) => prev.filter((user) => user.id !== id)); // Update UI
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Could not delete user. Try again.");
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    console.log(
      "Attempting to update user with ID:",
      id,
      "New Data:",
      updatedData
    ); // Debugging step

    try {
      const response = await fetch(`${API_Base}/lab/users`, {
        // Ensure the correct API route
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, ...updatedData }), // Send user_id and updated fields as JSON
      });

      const responseData = await response.json(); // Convert response to JSON
      console.log("Update API Response:", responseData);

      if (!response.ok)
        throw new Error(responseData.message || "Failed to update user");

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        )
      ); // Update UI with modified user data
      setEditUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Could not update user. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {editUser && (
        <div>
          <h3>Update User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            value={editUser.age}
            onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            value={editUser.country}
            onChange={(e) =>
              setEditUser({ ...editUser, country: e.target.value })
            }
          />
          <button onClick={() => handleUpdateUser(editUser.id, editUser)}>
            Update
          </button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}

      {/* Add User Form */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newUser.country}
          onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Display Existing Users */}
      <h3>Existing Users</h3>
      {!users.length ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.age} - {user.country}
              <br />
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              <button onClick={() => setEditUser(user)}>Update</button>
              <button onClick={() => setSelectedUser(user)}>Languages</button>
            </li>
          ))}
        </ul>
      )}
      {selectedUser && (
        <div>
          <UserLanguages
            userId={selectedUser.id}
            userName={selectedUser.name}
          />
          <button onClick={() => setSelectedUser(null)}>Close Languages</button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
