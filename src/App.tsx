import "./App.css";
import { Header } from "./shared/Header";
import { HomePage } from "./pages/homePage/HomePage";
import { Details } from "./pages/homePage/components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-movie">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
