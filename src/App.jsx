import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Course from './pages/Course';

function App() {
  return (
    <>
      <Navbar/>
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
