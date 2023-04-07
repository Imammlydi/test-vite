import React from "react";
import { Route, Routes } from "react-router-dom";
import { Report, DetailReport, Gallery, Home, Login, Register } from "../pages";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="report" element={<Report />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="detail_report" element={<DetailReport />} />
        </Routes>
    );
}
