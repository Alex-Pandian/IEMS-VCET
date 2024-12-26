import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login.js';
import FacultyHome from './components/faculty/faculty_nav.js';
import AdminLogin from './admin/admin.js';
import AdminHome from './admin/admin_home.js';
import Participanthome from './components/participant/std-nav.js';
import FeedbackQuestions from './components/participant/feedbackfill.js';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Participanthome />} />
        <Route index path='/feedback/:id' element={<FeedbackQuestions />} />
        <Route path='/login' element={<LoginForm />} />
        <Route 
          path='/faculty-home/:faculty_id' 
          element={
            <ProtectedRoute element={FacultyHome} />
          } 
        />
        <Route path='/participant-home/:username' element={<Participanthome />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminlogin/admin-home' element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
