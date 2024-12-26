import React, { useState } from 'react';
import background from './VCET.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

function FacultyLoginForm() {
  const [facultyinput, Setfacultyinput] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = facultyinput;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      const data = await res.json();

      // Store the token
      localStorage.setItem('token', data.token);

      // Assuming `data.userId` contains the faculty_id      
      navigate(`/faculty-home/${data.userId}`, { state: { username } });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    Setfacultyinput((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '10px',
    color: '#6c757d', 
    cursor: 'pointer',
    zIndex: 2,
  };

  return (
    <form className="text-center shadow p-3 d-flex flex-column gap-3" onSubmit={handleSubmit}>
      <h2>Faculty Login</h2>
      <div className="form-group position-relative d-flex align-items-center">
        <label htmlFor="facultyUsername" className="me-2 col-2">Username</label>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type="text"
            className="form-control"
            id="facultyUsername"
            name="username"
            placeholder="Enter Username"
            value={facultyinput.username}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <FaUser style={iconStyle} size={20} />
        </div>
      </div>
      <div className="form-group position-relative d-flex align-items-center">
        <label htmlFor="facultyPassword" className="me-2 col-2">Password</label>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="facultyPassword"
            name="password"
            placeholder="Password"
            value={facultyinput.password}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <span onClick={togglePasswordVisibility} style={iconStyle}>
            {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
          </span>
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

function LoginForm() {
  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }} className="d-flex flex-column justify-content-center align-items-center">
      <div className="container d-inline-flex justify-content-center fs-2 text-dark"><span>Velammal College of Engineering and Technology</span></div>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="d-flex flex-column align-items-center shadow p-4 bg-dark" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="w-100 mt-3 text-white">
            {<FacultyLoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;