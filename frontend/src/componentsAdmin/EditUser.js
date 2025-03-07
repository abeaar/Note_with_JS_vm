import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://34.135.67.5:3002"; // URL API


const EditUser = () => {
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const navigate = useNavigate();
const { id } = useParams();

useEffect(() => {
    getUserById();
}, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try{
      await axios.patch(`${API_URL}/users/${id}`, {
        name,
        password,
        email,
        title,
        category,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  const getUserById = async () => {
      const response = await axios.get(`${API_URL}/users/${id}`);
      setName(response.data.name);
      setPassword(response.data.password);
      setEmail(response.data.email);
      setTitle(response.data.title);
      setCategory(response.data.category);
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input 
                      type="text" 
                      className="input"
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input type="text" 
                      className="input"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input type="text" className="input" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input type="text" className="input"
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder='Title'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                      <input type="text" className="input" 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder='Category'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
  }

export default EditUser