import { useState } from 'react'
import Button from './Button'
import Heading from './Heading'
import Textinput from './Textinput'
import Subheading from './Subheading'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: userName,
        firstName,
        lastName,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return(
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="flex flex-col p-3 w-auto border border-gray-300 rounded-lg md:w-xs items-center justify-center bg-white">
        <Heading>Sign up</Heading>
        <Subheading>Sign up to start your free trial</Subheading>
        <Textinput onChange={(e) => setUserName(e.target.value)} label={"enter email"} placeholder="email@example.com" />
        <Textinput onChange={(e) => setFirstName(e.target.value)} label={"enter firstname"} placeholder="John" />
        <Textinput onChange={(e)=>setLastName(e.target.value)} label={"enter lastname"}  placeholder="Doe" />
        <Textinput onChange={(e) => setPassword(e.target.value)} label={"enter password"}  placeholder="Password" />
        <Button onClick={handleSignup}>Sign up</Button>
        <span className="mt-3 text-sm text-gray-600">Already have an account? <Link to="/signin">Sign in</Link></span>
      </div>
    </div>
  )
}