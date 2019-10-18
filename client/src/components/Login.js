import React, { useState } from "react";
import axios from 'axios';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formData, setFormData] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {
    axios
      .post('http://localhost:5000/api/login', formData)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        setFormData({ username: '', password: '', });
        props.history.push('/');
      })
      .catch(err => {
        alert(err.message);
      })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <label htmlFor='username'>Username: </label>
        <input name='username' type='text' value={formData.username} onChange={handleChange} />
        <label htmlFor='password'>Password: </label>
        <input name='password' type='password' value={formData.password} onChange={handleChange} />
        <button onClick={handleSubmit} >Submit</button>
      </div>
    </div>
  );
};

export default Login;
