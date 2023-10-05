import React from 'react'
import Weather from './Weather'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Nav from './Nav'
import TodoApp from './TodoApp'

const App = () => {
  return (
    <BrowserRouter >
      {/* Navigation Bar */}
      <Nav />
      {/* Routes for navigation */}
      <Routes>
        <Route path="/" element={<Navigate to="/weather"/>} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/todoapp" element={<TodoApp />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
