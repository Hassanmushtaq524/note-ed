import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';



function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
