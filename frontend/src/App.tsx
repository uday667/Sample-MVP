import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import SellCropPage from './pages/SellCropPage';
import ProductionCentersPage from './pages/ProductionCentersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TaskListPage from './pages/TaskListPage';
import TaskCreatePage from './pages/TaskCreatePage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import LabourHirePage from './pages/LabourHirePage';
import MiddlemenPage from './pages/MiddlemenPage';
import TractorHirePage from './pages/TractorHirePage';
import AnnouncementsPage from './pages/AnnouncementsPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/create" element={<TaskCreatePage />} />
          <Route path="/labour" element={<LabourHirePage />} />
          <Route path="/middlemen" element={<MiddlemenPage />} />
          <Route path="/tractors" element={<TractorHirePage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/sell-crop" element={<SellCropPage />} />
          <Route path="/production-centers" element={<ProductionCentersPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
