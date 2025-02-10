import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Course from './pages/Course';

function App() {
  const [mobileView, setMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar mobileView={mobileView}/>
      <Routes>
        <Route index element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/course/:id" element={<Course />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
