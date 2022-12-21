import { Route, Routes } from "react-router-dom";
import { Index } from "../pages/index";
import { About } from "../pages/about";
import { Status } from "../pages/status";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/status" element={<Status />} />
    </Routes>
  );
};
