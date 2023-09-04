import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import './App.css';

export const App: FC = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
    </Routes>
    </>
  );
};