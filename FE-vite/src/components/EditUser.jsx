import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setTitle(response.data.title);
    setCategory(response.data.category);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    await axios.patch(`${API_URL}/users/${id}`, { name, email, title, category });
    navigate("/");
  };

  return (
    <form onSubmit={updateUser}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;
