import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // For now, let's just log the data. 
    // Step 4 will be connecting this to a backend!
    console.log("Logging in with:", formData);
    
    if(!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
 
  try {
    const response = await fetch("http://localhost:3000/api/register",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json()

  console.log('Server response:', data);

  if(data.status === "success"){
    setError("")
      alert("Login successful")
  }
  else{
    setError("Login failed")
  }

}
catch(error){
  console.error(error);
  setError("Sever error. Try again later")
}

}

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;