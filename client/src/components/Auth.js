import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    village: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await fetch("https://checkirpala.onrender.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        
        const result = await res.json();
        
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/dashboard');
        } else {
          alert(result.error || "Login failed");
        }
        
      } else {
        // REGISTER
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("village", formData.village);
        data.append("password", formData.password);
        data.append("photo", formData.photo);

        const res = await fetch("https://checkirpala.onrender.com/api/register", {
          method: "POST",
          body: data,
        });
        
        const result = await res.json();
        
        if (res.ok) {
          alert("Registration successful! Please login.");
          setIsLogin(true); // Switch to login form
        } else {
          alert(result.error || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Register</button>
        </div>

  

{isLogin ? (
  // LOGIN FORM
  <form className="auth-form login-form" onSubmit={handleSubmit}>
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <button type="submit">Login</button>
  </form>
) : (
  // REGISTER FORM (no class needed - will use grid)
  <form className="auth-form" onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
    <select name="village" onChange={handleChange} required>
      <option value="">Select Village</option>
      <option value="Ghatal">Ghatal</option>
      <option value="Daspur">Daspur</option>
    </select>
    <input type="file" accept="image/*" onChange={handlePhotoChange} />
    {photoPreview && <img src={photoPreview} alt="Preview" />}
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
    <button type="submit">Submit Register</button>
  </form>
)}
      </div>
    </div>
  );
};

export default Auth;