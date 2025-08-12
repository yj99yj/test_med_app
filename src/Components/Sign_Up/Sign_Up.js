import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); 
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone,
                role,  
            }),
        });

        const json = await response.json();

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("role", role); 

            navigate("/");
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              type="email" 
                              name="email" 
                              id="email" 
                              className="form-control" 
                              placeholder="Enter your email" 
                              aria-describedby="helpId" 
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                              value={name} 
                              type="text" 
                              onChange={(e) => setName(e.target.value)} 
                              name="name" 
                              id="name" 
                              className="form-control" 
                              placeholder="Enter your name" 
                              aria-describedby="helpId" 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                              value={phone} 
                              onChange={(e) => setPhone(e.target.value)} 
                              type="tel" 
                              name="phone" 
                              id="phone" 
                              className="form-control" 
                              placeholder="Enter your phone number" 
                              aria-describedby="helpId" 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              name="password" 
                              id="password" 
                              className="form-control" 
                              placeholder="Enter your password" 
                              aria-describedby="helpId" 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select 
                              id="role" 
                              value={role} 
                              onChange={(e) => setRole(e.target.value)} 
                              className="form-control"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;
