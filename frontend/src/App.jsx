import { useState } from 'react'
import './App.css'
import Signup from './components/signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import {SendMoney} from './components/Sendmoney'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sendmoney" element={<SendMoney />} />
            </Routes>
          </BrowserRouter>
  )
}

export default App
