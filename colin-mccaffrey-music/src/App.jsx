import './App.css';
import Home from "./pages/Home.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" component={() => {
            window.location.href = 'https://colin-mccaffrey-music.sanity.studio/';
          }} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
