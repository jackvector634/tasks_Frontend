import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskAssignment from './components/TaskAssignment';
import TaskSummary from './components/TaskSummary';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/assign" element={<TaskAssignment />} />
          <Route path="/tasks/summary" element={<TaskSummary />} />
          <Route path="/profile" element={<UserProfile />} /> 
          <Route path="/users" element={<UserList />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
