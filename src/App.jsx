import { useState } from 'react'
import Login from './components/Login';

function App() {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [error, setError] = useState('');

  return (
    <>
  <Login/>
    </>
  )
}

export default App
