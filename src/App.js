import { Routes, Route, Outlet } from "react-router-dom";

import Home from './pages/Home';
import Jogos from './pages/Jogos';
import './App.css';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="jogos" element={<Jogos />} />
        </Route>
    </Routes>
  );
}

export default App;

function Layout() {
  return (
    <Outlet />
  );
}