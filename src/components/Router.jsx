import React from "react";
import { Route, Routes } from "react-router-dom";
import { About, Gallery, Home, Login, Register } from "../pages";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}
