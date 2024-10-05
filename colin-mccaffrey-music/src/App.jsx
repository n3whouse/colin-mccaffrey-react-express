import './App.css';
import Admin from './components/Admin/Admin.jsx';
// import Navbar from './components/Navbar.jsx';
import Home from "./pages/Home.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/" element={<Performer />} /> */}
          {/* <Route path="/" element={<Engineer />} /> */}
          {/* <Route path="/" element={<Schedule />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
