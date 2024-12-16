import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Redirect from "./Redirect.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/:shortCode" element={<Redirect />} />
      <Route path="/home" element={<App />} />
    </Routes>
  </BrowserRouter>
);
