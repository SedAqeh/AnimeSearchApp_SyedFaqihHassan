import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import ThemeToggle from "./components/ThemeToggle";
import ScrollManager from "./components/ScrollManager";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <>
      <ThemeToggle />
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/anime/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
