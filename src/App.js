import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import './App.css';
import Cities from './components/Cities';
import Details from './components/Details';

function App() {
  return (
    <div className="wrapper">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Cities/:country" element={<Cities />} />
        <Route path="/Details/:lat/:lon" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
