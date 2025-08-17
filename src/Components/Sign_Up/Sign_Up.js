// Sign_Up.jsx
import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState([]);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });

    const json = await response.json();
    console.log(json);

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);

      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        setShowerr(json.errors);
      } else if (json.error) {
        setShowerr([{ msg: json.error }]);
      } else {
        setShowerr([{ msg: "알 수 없는 오류가 발생했습니다." }]);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            {showerr.length > 0 && (
              <div className="err" style={{ color: 'red' }}>
                {showerr.map((errObj, idx) => (
                  <p key={idx}>{errObj.msg}</p>
                ))}
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
